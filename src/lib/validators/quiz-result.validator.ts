import { z } from "zod";

export const quizResultSchema = z.object({
  quizId: z
    .string()
    .min(1, "Quiz ID is required")
    .regex(/^[1-9]\d*$/, "Must be a positive integer"),
  userId: z
    .string()
    .min(1, "Quiz ID is required")
    .regex(/^[1-9]\d*$/, "Must be a positive integer"),
  total_questions: z
    .string()
    .min(1, "Quiz ID is required")
    .regex(/^[1-9]\d*$/, "Must be a positive integer"),
  total_correct: z
    .string()
    .min(1, "Quiz ID is required")
    .regex(/^[1-9]\d*$/, "Must be a positive integer"),
});

export type QuizResultFormValues = z.infer<typeof quizResultSchema>;
