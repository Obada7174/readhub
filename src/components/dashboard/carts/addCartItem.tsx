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

const createCartSchema = (t: (key: string) => string) =>
  z.object({
    bookId: z
      .number()
      .positive(t("error.required.bookId"))
      .int(t("error.required.bookId")),
  });

export type CartFormValues = z.infer<ReturnType<typeof createCartSchema>>;

interface Props {
  id: number;
}

export default function UseCartItemForm({ id }: Props) {
  const router = useRouter();
  const t = useTranslations("Dashboard.add_cart_item");
  const createCartMutation = useCreateCartItem(id);

  const schema = createCartSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CartFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      bookId: undefined,
    },
  });

  const handleAdd = async (data: CartFormValues) => {
    await createCartMutation.mutateAsync(data.bookId);
  };

  const submitHandler: SubmitHandler<CartFormValues> = async (data) => {
    try {
      await handleAdd(data);
      router.push("/dashboard/carts/" + id);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader category="Cart Item" title={t("title")} />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-xl mx-auto"
      >
        <Input
          label={t("bookId_label")}
          placeholder={t("bookId_placeholder")}
          type="number"
          {...register("bookId", { valueAsNumber: true })}
          error={errors.bookId?.message}
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
