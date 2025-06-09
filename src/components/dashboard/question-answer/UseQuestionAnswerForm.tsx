"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Input from "@/components/dashboard/Input";
import DashButton from "@/components/dashboard/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";
import Select from "@/components/dashboard/Select";

import {
  QuestionAnswerFormValues,
  questionAnswerSchema,
} from "@/lib/validators/question-answer.validator";

interface QuestionAnswerFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<QuestionAnswerFormValues>;
  onSubmit: (data: QuestionAnswerFormValues) => Promise<void>;
}

export default function UseQuestionAnswerForm({
  mode,
  defaultValues,
  onSubmit,
}: QuestionAnswerFormProps) {
  const router = useRouter();
  const t = useTranslations("Dashboard.question");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionAnswerFormValues>({
    resolver: zodResolver(questionAnswerSchema),
    defaultValues: defaultValues || {
      questionId: undefined,
      userId: undefined,
      selected_option: undefined,
      isCorrect: undefined,
    },
  });

  const submitHandler: SubmitHandler<QuestionAnswerFormValues> = async (
    data
  ) => {
    try {
      await onSubmit(data);
      router.push("/dashboard/competitions/questions-answers");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader
        title={
          mode === "add" ? t("add_question_answer") : t("edit_question_answer")
        }
      />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-xl mx-auto"
      >
        {/* Question ID */}
        <Input
          type="number"
          label={t("question_id")}
          placeholder={t("enter_question_id")}
          {...register("questionId", { valueAsNumber: true })}
          error={errors.questionId?.message}
        />

        {/* User ID */}
        <Input
          type="number"
          label={t("user_id")}
          placeholder={t("enter_user_id")}
          {...register("userId", { valueAsNumber: true })}
          error={errors.userId?.message}
        />

        {/* Selected Option */}
        <Select
          label={t("selected_option")}
          {...register("selected_option")}
          error={errors.selected_option?.message}
          options={[
            { value: "a", label: t("option_a") },
            { value: "b", label: t("option_b") },
            { value: "c", label: t("option_c") },
            { value: "d", label: t("option_d") },
          ]}
          placeholder={t("select_option")}
        />

        {/* Is Correct */}
        <Select
          label={t("is_correct")}
          {...register("isCorrect", { valueAsNumber: true })}
          error={errors.isCorrect?.message}
          options={[
            { value: 1, label: t("correct") },
            { value: 0, label: t("incorrect") },
          ]}
          placeholder={t("select_correctness")}
        />

        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4"
          text={mode === "add" ? t("add_answer") : t("update_answer")}
        />
      </form>
    </DashContainer>
  );
}
