import { z } from "zod";

// ─── QuizQuestionOption Schema (for the array of objects with id + text) ───
export const quizQuestionOptionSchema = z.object({
  id: z.string().cuid(),
  text: z.string().min(1, "Option text is required"),
});

// ─── QuizQuestion Schema ───
export const quizQuestionSchema = z.object({
  id: z.string().cuid(),
  text: z.string().min(1, "Question text is required"),
  options: z.array(quizQuestionOptionSchema).min(1, "At least one option is required"),
  correct: z.number().int().nonnegative(), // index in options[]
});

// ─── Quiz Schema ───
export const quizSchema = z.object({
  id: z.string().cuid(),
  prompt: z.string().min(1, "Prompt is required"),
  questions: z.array(quizQuestionSchema),
});

// ─── Lesson Schema ───
export const lessonSchema = z.object({
  id: z.string().cuid(),
  content: z.string().min(1, "Lesson content is required"),
});

// ─── Module Schema ───
// type: "lesson" | "quiz" — if this matches your Prisma enum ModuleType
export const moduleSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  type: z.enum(["lesson", "quiz"]), // If you have more ModuleType values, add them here
  position: z.number().int().nonnegative().optional(), // Another variant seen in payload
  
  created_at: z.union([z.string().datetime(), z.date()]).optional(),
  updated_at: z.union([z.string().datetime(), z.date()]).optional(),

  lesson: lessonSchema.nullable().optional(),
  quiz: quizSchema.nullable().optional(),
});

// ─── Array Schema for Whole Payload ───
export const modulesSchema = z.array(moduleSchema);

