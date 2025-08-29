/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/services/axios";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import Input from "@/components/dashboard/Input";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";


import { z } from "zod";
import { useState } from "react";
import Button from "./Button";

const createFaqSchema = (t: (key: string) => string) =>
  z.object({
    enQuestion: z.string().min(2, t("error.en_question_required")),
    arQuestion: z.string().min(2, t("error.ar_question_required")),
    enAnswer: z.string().min(2, t("error.en_answer_required")),
    arAnswer: z.string().min(2, t("error.ar_answer_required")),
    isPublished: z.enum(["active", "inactive"]),
  });

export type FaqFormValues = z.infer<ReturnType<typeof createFaqSchema>>;

export default function AddFaqForm() {
  const router = useRouter();
  const t = useTranslations("Dashboard.add_faq");

  const schema = createFaqSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      enQuestion: "",
      arQuestion: "",
      enAnswer: "",
      arAnswer: "",
      isPublished: "active",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitHandler: SubmitHandler<FaqFormValues> = async (data) => {
    try {
      const res = await axios.post("/faqs", data);

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/faqs");
        }, 1500);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message || t("error.something_went_wrong");
      setError(message);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={t("title")} />

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {success && (
        <div className="text-green-500 text-center mb-4">
          {t("success_message")}
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
        <Button
          text={t("submit_button")}
          type="submit"
          className="w-full mt-4"
          borderRadius="8px"
        />
      </form>
    </DashContainer>
  );
}