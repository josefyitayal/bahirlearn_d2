"use server";

import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/db";

/**
 * Save modules payload where each module has a `contents` array.
 * Each content: { id, content_type: "LESSON"|"QUIZ", lesson?, quiz?, position? }
 */
export const saveModule = async (modules, courseId) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not authorized");

    if (!courseId) {
      return { errors: { message: "Missing courseId in payload." }, data: null };
    }

    // Fetch existing modules + contents for this course
    const originalModules = await client.module.findMany({
      where: { course_id: courseId },
      include: {
        contents: {
          include: {
            lesson: true,
            quiz: { include: { questions: true } },
          },
        },
      },
    });

    const originalModulesMap = new Map(originalModules.map((m) => [m.id, m]));
    const submittedModuleIds = new Set(modules.map((m) => m.id));

    // Delete modules that were removed on the client
    const modulesToDelete = originalModules.filter((m) => !submittedModuleIds.has(m.id));
    if (modulesToDelete.length > 0) {
      await Promise.all(
        modulesToDelete.map((m) => client.module.delete({ where: { id: m.id } }))
      );
    }

    // Process each submitted module (create or update)
    const results = [];
    for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
      const module = modules[moduleIndex];

      // Upsert module row (we keep client-side id to simplify sync)
      let moduleRow;
      const existingModule = originalModulesMap.get(module.id);
      if (existingModule) {
        moduleRow = await client.module.update({
          where: { id: module.id },
          data: {
            title: module.title,
            description: module.description ?? null,
            position: moduleIndex,
            updated_at: new Date(),
          },
        });
      } else {
        moduleRow = await client.module.create({
          data: {
            id: module.id,
            title: module.title,
            description: module.description ?? null,
            position: moduleIndex,
            course: { connect: { id: courseId } },
            created_at: new Date(),
            updated_at: new Date(),
          },
        });
      }

      const moduleId = moduleRow.id;

      // Fetch original contents for this module (if any)
      const originalContents = (existingModule && existingModule.contents) || [];
      const origContentIds = new Set(originalContents.map((c) => c.id));
      const submittedContentIds = new Set((module.contents || []).map((c) => c.id));

      // Delete contents removed on client
      const contentsToDelete = originalContents.filter((c) => !submittedContentIds.has(c.id));
      if (contentsToDelete.length > 0) {
        await client.moduleContent.deleteMany({
          where: {
            module_id: moduleId,
            id: { notIn: Array.from(submittedContentIds) },
          },
        });
      }

      // Upsert each submitted content (and its lesson/quiz)
      for (let contentIndex = 0; contentIndex < (module.contents || []).length; contentIndex++) {
        const content = module.contents[contentIndex];

        if (content.content_type === "LESSON") {
          const lessonPayload = content.lesson || {};
          const lessonId = lessonPayload.id || undefined;

          // Upsert lesson (use id if provided)
          if (lessonId) {
            await client.lesson.upsert({
              where: { id: lessonId },
              update: {
                title: lessonPayload.title ?? null,
                content: lessonPayload.content ?? "",
                updated_at: new Date(),
              },
              create: {
                id: lessonId,
                title: lessonPayload.title ?? null,
                content: lessonPayload.content ?? "",
                created_at: new Date(),
                updated_at: new Date(),
              },
            });
          } else {
            // create new lesson and capture id
            const createdLesson = await client.lesson.create({
              data: {
                title: lessonPayload.title ?? null,
                content: lessonPayload.content ?? "",
                created_at: new Date(),
                updated_at: new Date(),
              },
            });
            // attach returned id to content for moduleContent creation below
            content.lesson = content.lesson || {};
            content.lesson.id = createdLesson.id;
          }

          // Upsert ModuleContent linking to the lesson
          await client.moduleContent.upsert({
            where: { id: content.id },
            update: {
              position: contentIndex,
              content_type: "LESSON",
              lesson: { connect: { id: content.lesson.id } },
              quiz: { disconnect: true },
              updated_at: new Date(),
            },
            create: {
              id: content.id,
              module: { connect: { id: moduleId } },
              position: contentIndex,
              content_type: "LESSON",
              lesson: { connect: { id: content.lesson.id } },
              created_at: new Date(),
              updated_at: new Date(),
            },
          });

        } else if (content.content_type === "QUIZ") {
          const quizPayload = content.quiz || {};
          const quizId = quizPayload.id || undefined;

          // Prepare questions create payload
          const questionsCreate = (quizPayload.questions || []).map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options.map((o) => (typeof o === "string" ? o : o.text)),
            correct_index: Number(q.correct ?? q.correct_index ?? 0),
          }));

          // Upsert quiz and its questions. For updates we remove existing questions and recreate them.
          if (quizId) {
            await client.quiz.upsert({
              where: { id: quizId },
              update: {
                prompt: quizPayload.prompt ?? "",
                updated_at: new Date(),
                questions: {
                  deleteMany: {},
                  create: questionsCreate,
                },
              },
              create: {
                id: quizId,
                prompt: quizPayload.prompt ?? "",
                created_at: new Date(),
                updated_at: new Date(),
                questions: { create: questionsCreate },
              },
            });
          } else {
            const createdQuiz = await client.quiz.create({
              data: {
                prompt: quizPayload.prompt ?? "",
                created_at: new Date(),
                updated_at: new Date(),
                questions: { create: questionsCreate },
              },
            });
            content.quiz = content.quiz || {};
            content.quiz.id = createdQuiz.id;
          }

          // Upsert ModuleContent linking to the quiz
          await client.moduleContent.upsert({
            where: { id: content.id },
            update: {
              position: contentIndex,
              content_type: "QUIZ",
              quiz: { connect: { id: content.quiz.id } },
              lesson: { disconnect: true },
              updated_at: new Date(),
            },
            create: {
              id: content.id,
              module: { connect: { id: moduleId } },
              position: contentIndex,
              content_type: "QUIZ",
              quiz: { connect: { id: content.quiz.id } },
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
        } else {
          // unknown content_type: skip or throw
          console.warn("Unknown content_type for ModuleContent:", content.content_type);
        }
      } // end contents loop

      // Optionally fetch updated module + contents for response
      const saved = await client.module.findUnique({
        where: { id: moduleId },
        include: {
          contents: { include: { lesson: true, quiz: { include: { questions: true } } }, orderBy: { position: "asc" } },
        },
      });

      results.push(saved);
    } // end modules loop

    return { errors: null, data: results };
  } catch (error) {
    console.error("saveModule error:", error);
    return { errors: { message: "Failed to save modules." }, data: null };
  }
};
