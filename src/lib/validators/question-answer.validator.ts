import { z } from "zod";

export const questionAnswerSchema = z.object({
  isCorrect: z.number().int().min(0).max(1, "Must be either 0 or 1"),
  selected_option: z.string(),
  userId: z.number().int().positive("User ID must be a positive integer"),
  questionId: z
    .number()
    .int()
    .positive("Question ID must be a positive integer"),
});

export type QuestionAnswerFormValues = z.infer<typeof questionAnswerSchema>;
