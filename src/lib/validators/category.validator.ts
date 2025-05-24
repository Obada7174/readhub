import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string()
    .min(1, "Category title is required")
    .transform((val) => val.trim()),
  ar_title: z
    .string()
    .nullable()
    .transform((val) => (val ? val.trim() : null)),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
