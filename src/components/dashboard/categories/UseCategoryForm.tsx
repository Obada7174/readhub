"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Input from "@/components/dashboard/Input";
import DashButton from "@/components/dashboard/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";

import {
  categorySchema,
  CategoryFormValues,
} from "@/lib/validators/category.validator";

interface CategoryFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<CategoryFormValues>;
  onSubmit: (data: CategoryFormValues) => Promise<void>;
}

export default function UseCategoryForm({
  mode,
  defaultValues,
  onSubmit,
}: CategoryFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues || {
      title: "",
      ar_title: null,
    },
  });

  const submitHandler: SubmitHandler<CategoryFormValues> = async (data) => {
    try {
      await onSubmit(data);
      router.push("/dashboard/categories");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={mode === "add" ? "إضافة تصنيف" : "تعديل تصنيف"} />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-xl mx-auto"
      >
        {/* English Title */}
        <Input
          label="Category Name (English)"
          placeholder="Category name in English"
          {...register("title")}
          error={errors.title?.message}
        />

        {/* Arabic Title */}
        <Input
          label="اسم التصنيف (عربي)"
          placeholder="اسم التصنيف بالعربية"
          {...register("ar_title")}
          error={errors.ar_title?.message}
        />

        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4"
          text={mode === "add" ? "إضافة تصنيف" : "حفظ التغييرات"}
        />
      </form>
    </DashContainer>
  );
}
