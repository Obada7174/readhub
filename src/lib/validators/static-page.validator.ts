import { z } from "zod";

export const addPageSchema = z.object({
  en_title: z
    .string()
    .min(2, "English title must be at least 2 characters")
    .trim(),

  en_content: z
    .string()
    .min(10, "English content must be at least 10 characters")
    .trim(),

  ar_title: z
    .string()
    .min(2, "Arabic title must be at least 2 characters")
    .trim(),

  ar_content: z
    .string()
    .min(10, "Arabic content must be at least 10 characters")
    .trim(),

  url: z.string().url("URL must be a valid URL").trim(),

  is_published: z.boolean({
    required_error: "Published status is required",
    invalid_type_error: "Published must be a boolean value",
  }),
});

// يمكنك استخدام هذا الـ type لاحقًا في الكود
export type AddPageFormValues = z.infer<typeof addPageSchema>;