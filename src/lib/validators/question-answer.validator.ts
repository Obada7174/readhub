import { z } from "zod";

export const questionAnswerSchema = z.object({
  isCorrect: z.number().int().min(0).max(1, "Must be either 0 or 1"),
  selected_option: z.enum(["a", "b", "c", "d"], {
    required_error: "Selected option is required",
    invalid_type_error: "Option must be one of: a, b, c, d",
  }),
  userId: z.number().int().positive("User ID must be a positive integer"),
  questionId: z
    .number()
    .int()
    .positive("Question ID must be a positive integer"),
});

export type QuestionAnswerFormValues = z.infer<typeof questionAnswerSchema>;
