"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Input from "@/components/dashboard/Input";
import DashButton from "@/components/dashboard/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";

import {
  QuizResultFormValues,
  quizResultSchema,
} from "@/lib/validators/quiz-result.validator";

interface CategoryFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<QuizResultFormValues>;
  onSubmit: (data: QuizResultFormValues) => Promise<void>;
}

export default function UseQuizResultForm({
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
  } = useForm<QuizResultFormValues>({
    resolver: zodResolver(quizResultSchema),
    defaultValues: defaultValues || {
      quizId: undefined,
      userId: undefined,
      total_correct: undefined,
      total_questions: undefined,
    },
  });

  const submitHandler: SubmitHandler<QuizResultFormValues> = async (data) => {
    try {
      await onSubmit(data);
      router.push("/dashboard/competitions/quizzes-results");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={mode === "add" ? t("add_result") : t("edit_result")} />

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

        {/* Total Questions */}
        <Input
          label={t("total_questions")}
          placeholder={t("total_questions_placeholder")}
          {...register("total_questions")}
          error={errors.total_questions?.message}
        />

        {/* Total Correct */}
        <Input
          label={t("total_correct")}
          placeholder={t("total_correct_placeholder")}
          {...register("total_correct")}
          error={errors.total_correct?.message}
        />

        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4"
          text={
            mode === "add" ? t("submit_add_result") : t("submit_edit_result")
          }
        />
      </form>
    </DashContainer>
  );
}
