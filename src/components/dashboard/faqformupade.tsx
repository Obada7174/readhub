// components/dashboard/faqs/FaqForm.tsx

"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Input from "@/components/dashboard/Input";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";
import DashButton from "@/components/ui/Button";

// Types
export type UpdateFaqPayload = {
  enQuestion: string;
  arQuestion: string;
  enAnswer: string;
  arAnswer: string;
  isPublished: "active" | "inactive";
};

interface FaqFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<UpdateFaqPayload>;
  onSubmit: (data: UpdateFaqPayload) => Promise<void>;
}

export default function FaqForm({ mode, defaultValues, onSubmit }: FaqFormProps) {
  const t = useTranslations("Dashboard.edit_faq");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFaqPayload>({
    defaultValues: {
      enQuestion: defaultValues?.enQuestion || "",
      arQuestion: defaultValues?.arQuestion || "",
      enAnswer: defaultValues?.enAnswer || "",
      arAnswer: defaultValues?.arAnswer || "",
      isPublished: defaultValues?.isPublished || "active",
    },
  });

  const submitHandler: SubmitHandler<UpdateFaqPayload> = async (data) => {
    const validationErrors: Partial<Record<keyof UpdateFaqPayload, string>> = {};

    if (!data.enQuestion || data.enQuestion.trim().length < 2) {
      validationErrors.enQuestion = t("errors.en_question_required");
    }

    if (!data.arQuestion || data.arQuestion.trim().length < 2) {
      validationErrors.arQuestion = t("errors.ar_question_required");
    }

    if (!data.enAnswer || data.enAnswer.trim().length < 2) {
      validationErrors.enAnswer = t("errors.en_answer_required");
    }

    if (!data.arAnswer || data.arAnswer.trim().length < 2) {
      validationErrors.arAnswer = t("errors.ar_answer_required");
    }

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field as keyof UpdateFaqPayload, {
          type: "manual",
          message,
        });
      });
      return;
    }

    try {
      await onSubmit(data);
      router.push("/dashboard/faqs");
    } catch (err) {
      console.error("Error submitting FAQ form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={mode === "add" ? t("add") : t("edit")} />

      {Object.values(errors).some((e) => e) && (
        <div className="text-red-500 text-center mb-4">
          {t("errors.general")}
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-3xl mx-auto">
        {/* السؤال بالإنجليزية والعربي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t("en_question_label")}
            placeholder={t("en_question_placeholder")}
            {...register("enQuestion")}
            error={errors.enQuestion?.message}
          />
          <Input
            label={t("ar_question_label")}
            placeholder={t("ar_question_placeholder")}
            {...register("arQuestion")}
            error={errors.arQuestion?.message}
          />
        </div>

        {/* الإجابة بالإنجليزية والعربي */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t("en_answer_label")}
            placeholder={t("en_answer_placeholder")}
            {...register("enAnswer")}
            error={errors.enAnswer?.message}
          />
          <Input
            label={t("ar_answer_label")}
            placeholder={t("ar_answer_placeholder")}
            {...register("arAnswer")}
            error={errors.arAnswer?.message}
          />
        </div>

        {/* الحالة */}
        <div>
          <label className="block mb-2 font-medium">{t("status_label")}</label>
          <select
            {...register("isPublished")}
            className="w-full border rounded p-2"
          >
            <option value="active">{t("status_active")}</option>
            <option value="inactive">{t("status_inactive")}</option>
          </select>
        </div>

        <DashButton
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {isSubmitting
            ? t("submitting")
            : mode === "add"
            ? t("add")
            : t("save_changes")}
        </DashButton>
      </form>
    </DashContainer>
  );
}