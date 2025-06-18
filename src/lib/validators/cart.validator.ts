import { z } from "zod";

export const createCartSchema = (t: (key: string) => string) =>
  z.object({
    userId: z.number().positive(t("error_required_userId")),
  });

export type CartFormValues = z.infer<ReturnType<typeof createCartSchema>>;
