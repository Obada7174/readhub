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
import { useCreateCart } from "@/hooks/react-query/carts/useCartsQuery";

const createCartSchema = (t: (key: string) => string) =>
  z.object({
    userId: z
      .number()
      .positive(t("error.required.userId"))
      .int(t("error.required.userId")),
  });

export type CartFormValues = z.infer<ReturnType<typeof createCartSchema>>;

export default function UseCartForm() {
  const router = useRouter();
  const t = useTranslations("Dashboard.add_cart");
  const createCartMutation = useCreateCart();

  const schema = createCartSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CartFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: undefined,
    },
  });

  const handleAdd = async (data: CartFormValues) => {
    await createCartMutation.mutateAsync(data.userId);
  };

  const submitHandler: SubmitHandler<CartFormValues> = async (data) => {
    try {
      await handleAdd(data);
      router.push("/dashboard/carts");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader  title={t("title")} />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-xl mx-auto"
      >
        <Input
          label={t("userId_label")}
          placeholder={t("userId_placeholder")}
          type="number"
          {...register("userId", { valueAsNumber: true })}
          error={errors.userId?.message}
        />

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
