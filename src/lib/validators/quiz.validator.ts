import { z } from "zod";

export const quizSchema = z.object({
  title: z.string().min(1, "The quiz title is required").transform(val => val.trim()),
  ar_title: z.string().min(1, "The quiz title is required").transform(val => val.trim()),
  bookId: z.number({ invalid_type_error: "Please select a valid book" }).nullable()
    .refine(val => val !== null && typeof val === "number", {
      message: "A book must be selected",
    }),
});

export type QuizFormValues = z.infer<typeof quizSchema>;