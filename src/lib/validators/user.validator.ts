import { z } from 'zod';

export const userSchema = z.object({
  first_name: z
    .string()
    .min(2, 'الاسم الأول يجب أن يحتوي على حرفين على الأقل')
    .transform(val => val.trim()),

  last_name: z
    .string()
    .min(2, 'الاسم الأخير يجب أن يحتوي على حرفين على الأقل')
    .transform(val => val.trim()),

  email: z.string().email('البريد الإلكتروني غير صحيح'),
  location: z
  .string()
  .min(2, 'الاسم الأخير يجب أن يحتوي على حرفين على الأقل')
  .transform(val => val.trim()),
  password: z.string().min(6, 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل'),
  role: z.string().nonempty('الدور مطلوب'),
});

export type UserFormValues = z.infer<typeof userSchema>;