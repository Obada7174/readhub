import { z } from "zod";

export const quizWinnerSchema = z.object({
  quizId: z
    .string()
    .min(1, "Quiz ID is required")
    .regex(/^[1-9]\d*$/, "Must be a positive integer"),
  userId: z
    .string()
    .min(1, "Quiz ID is required")
    .regex(/^[1-9]\d*$/, "Must be a positive integer"),
  coupon: z
    .string()
    .min(1, "Quiz ID is required")
    .regex(/^[1-9]\d*$/, "Must be a positive integer"),
});

export type QuizWinnerFormValues = z.infer<typeof quizWinnerSchema>;
