"use server"

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";

export const saveModule = async (modules, courseId) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authorized");


    if (!courseId) {
      return { errors: { message: "Missing courseId in lesson data." }, data: null };
    }

    // Fetch existing module from DB
    const originalModules = await client.module.findMany({
      where: { course_id: courseId },
    });

    const submittedIds = new Set(modules.map((l) => l.id));

    // Delete module that were removed on the client
    const modulesToDelete = originalModules.filter((module) => !submittedIds.has(module.id));

    await Promise.all(
      modulesToDelete.map((module) =>
        client.module.delete({
          where: { id: module.id },
        })
      )
    );

    // Upsert submitted lessons
    const upserts = await Promise.all(
      modules.map((module, index) =>
        client.module.upsert({
          where: { id: module.id },
          update: {
            title: module.title,
            description: module.description,
            position: index,
            type: module.type.toUpperCase(),
            updated_at: new Date()
          },
          create: {
            title: module.title,
            description: module.description,
            position: index,
            type: module.type.toUpperCase(),
            course_id: courseId,
            created_at: new Date(),
            updated_at: new Date(),
            ...(module.type === "lesson"
              ? {
                lesson: {
                  create: {
                    content: module.lesson.content,
                    // LessonQuiz[] can also be nested here if needed
                  }
                }
              }
              : {
                quiz: {
                  create: {
                    prompt: module.quiz.prompt,
                    questions: {
                      create: module.quiz.questions.map((q) => ({
                        text: q.text,
                        options: q.options.map((o) => o.text), // matches String[] in Prisma
                        correct_index: Number(q.correct),
                      })),
                    },
                  }
                }
              })
          }
        })
      )
    );
    if (upserts) {
      return { errors: null, data: upserts };
    } else {
      return {
        errors: {
          message: "Updating or create module faild"
        },
        data: null
      }
    }
  } catch (error) {
    console.error(error);
    return {
      errors: { message: "Failed to save course." },
      data: null,
    };
  }
};
