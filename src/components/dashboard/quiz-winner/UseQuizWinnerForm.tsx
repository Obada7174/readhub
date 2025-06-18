"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Input from "@/components/dashboard/Input";
import DashButton from "@/components/dashboard/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";

import {
  QuizWinnerFormValues,
  quizWinnerSchema,
} from "@/lib/validators/quiz-winner.validator";
import { useTranslations } from "next-intl";

interface CategoryFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<QuizWinnerFormValues>;
  onSubmit: (data: QuizWinnerFormValues) => Promise<void>;
}

export default function UseQuizWinnerForm({
  mode,
  defaultValues,
  onSubmit,
}: CategoryFormProps) {
  const router = useRouter();
  const t = useTranslations("Dashboard.quiz");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizWinnerFormValues>({
    resolver: zodResolver(quizWinnerSchema),
    defaultValues: defaultValues || {
      quizId: undefined,
      userId: undefined,
      coupon: undefined,
    },
  });

  const submitHandler: SubmitHandler<QuizWinnerFormValues> = async (data) => {
    try {
      await onSubmit(data);
      router.push("/dashboard/categories");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={mode === "add" ? t("add_winner") : t("edit_winner")} />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-xl mx-auto"
      >
        {/* Quiz ID */}
        <Input
          label={t("quiz_id")}
          placeholder={t("quiz_id_placeholder")}
          {...register("quizId")}
          error={errors.quizId?.message}
        />

        {/* User ID */}
        <Input
          label={t("user_id")}
          placeholder={t("user_id_placeholder")}
          {...register("userId")}
          error={errors.userId?.message}
        />

        {/* Coupon */}
        <Input
          label={t("coupon")}
          placeholder={t("coupon_placeholder")}
          {...register("coupon")}
          error={errors.coupon?.message}
        />

        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4"
          text={
            mode === "add" ? t("submit_add_winner") : t("submit_edit_winner")
          }
        />
      </form>
    </DashContainer>
  );
}
