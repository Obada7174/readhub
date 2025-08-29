"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Input from "@/components/dashboard/Input";
import DashButton from "@/components/dashboard/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";

import { z } from "zod";
import { useCreateCartItem } from "@/hooks/react-query/carts/useCartsQuery";

// تعريف الـ schema مع الرسائل المترجمة، مع جعل userId و quantity تلقائي
const createCartSchema = (t: (key: string) => string) =>
  z.object({
    bookId: z
      .number()
      .positive(t("errors.required.bookId"))
      .int(t("errors.required.bookId")),
    userId: z.number(),      // سنمرره تلقائياً
    quantity: z.number(),    // سنمرره تلقائياً
  });

export type CartFormValues = z.infer<ReturnType<typeof createCartSchema>>;

interface Props {
  id: number; // معرف المستخدم أو السلة
}

export default function UseCartItemForm({ id }: Props) {
  const router = useRouter();
  const t = useTranslations("Dashboard.add_cart_item");
  const createCartMutation = useCreateCartItem();

  const schema = createCartSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CartFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      bookId: undefined,
      userId: id,    
      quantity: 1,  
    },
  });

  const handleAdd = async (data: CartFormValues) => {
    await createCartMutation.mutateAsync({
      id: data.userId,     
      bookId: data.bookId,
    });
  };

  const submitHandler: SubmitHandler<CartFormValues> = async (data) => {
    try {
      await handleAdd(data);
      router.push("/dashboard/carts/" + id);
    } catch (err) {
      console.error("خطأ عند إرسال النموذج", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={t("cart_item")} />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-xl mx-auto"
      >
        {/* حقل اختيار الكتاب */}
        <Input
          label={t("bookId_label")}
          placeholder={t("bookId_placeholder")}
          type="number"
          {...register("bookId", { valueAsNumber: true })}
          error={errors.bookId?.message}
        />

        {/* زر الإرسال */}
        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4"
          text={t("submit_button")}
        />
      </form>
    </DashContainer>
  );
}
