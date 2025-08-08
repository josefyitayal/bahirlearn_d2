"use server"

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";

export const saveLesson = async (lessons, courseId) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authorized");


    if (!courseId) {
      return { errors: { message: "Missing courseId in lesson data." }, data: null };
    }

    // Fetch existing lessons from DB
    const originalLessons = await client.lesson.findMany({
      where: { course_id: courseId },
    });

    const submittedIds = new Set(lessons.map((l) => l.id));

    // Delete lessons that were removed on the client
    const lessonsToDelete = originalLessons.filter((lesson) => !submittedIds.has(lesson.id));

    await Promise.all(
      lessonsToDelete.map((lesson) =>
        client.lesson.delete({
          where: { id: lesson.id },
        })
      )
    );

    // Upsert submitted lessons
    const upserts = await Promise.all(
      lessons.map((lesson, index) =>
        client.lesson.upsert({
          where: { id: lesson.id },
          update: {
            title: lesson.title,
            content: lesson.content,
            postion: lesson.postion,
          },
          create: {
            id: lesson.id,
            title: lesson.title,
            content: lesson.content,
            course_id: courseId,
            postion: lesson.postion,
          },
        })
      )
    );

    return { errors: null, data: upserts };
  } catch (error) {
    console.error(error);
    return {
      errors: { message: "Failed to save course." },
      data: null,
    };
  }
};
