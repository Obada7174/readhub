import { z } from "zod";

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

  total_pages: z
    .string()
    .min(1, "Total pages is required")
    .refine((val) => /^\d+$/.test(val) && parseInt(val) >= 1, {
      message: "Must be a positive integer",
    }),

  categories: z
    .array(
      z
        .number()
        .int()
        .positive()
        .or(z.string().transform((v) => +v))
    )
    .nonempty("Categories must contain at least one item"),
});

export type BookFormValues = z.infer<typeof bookSchema>;
