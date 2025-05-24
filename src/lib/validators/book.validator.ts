import { z } from "zod";
import { categorySchema } from "./category.validator";

export const categoryWithIdSchema = categorySchema.extend({
  id: z.number().int().positive(),
});

export const bookSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").trim(),

  ar_title: z
    .string()
    .min(2, "Arabic title must be at least 2 characters")
    .trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .trim(),

  ar_description: z
    .string()
    .min(10, "Arabic description must be at least 10 characters")
    .trim(),

  img: z.string().url("Image must be a valid URL"),

  author: z.string().min(2, "Author name must be at least 2 characters").trim(),

  price: z
    .string()
    .regex(/^\d+\.\d{2}$/, 'Price must be in format "00.00" (e.g., 14.99)'),

  discount: z
    .string()
    .regex(/^0\.\d{1,2}$/, 'Discount must be in format "0.00" to "0.99"'),

  pdf: z.string().endsWith(".pdf", 'PDF must end with ".pdf"'),

  rating: z
    .string()
    .regex(/^[0-5](\.\d{1,2})?$/, "Rating must be between 0.00 and 5.00"),

  rating_count: z.number().int().min(0, "Rating count cannot be negative"),

  total_pages: z.number().int().min(1, "Total pages must be at least 1"),

  total_ratings: z.number().int().min(0, "Total ratings cannot be negative"),

  categories: z
    .array(categoryWithIdSchema)
    .min(1, "At least 1 category is required"),
});

export type BookFormValues = z.infer<typeof bookSchema>;
