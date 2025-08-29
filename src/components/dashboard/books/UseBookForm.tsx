"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import Input from "@/components/dashboard/Input";
import TextArea from "@/components/dashboard/TextArea";
import DashButton from "@/components/dashboard/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";
import ImageUploader from "@/components/dashboard/ImageUploader";

import { bookSchema, BookFormValues } from "@/lib/validators/book.validator";
import { Category } from "@/types/category";
import PdfUploader from "../pdfUpload";

interface BookFormProps {
  mode: "add" | "edit";
  defaultValues?: Partial<BookFormValues>;
  availableCategories: Category[];
  onSubmit: (data: BookFormValues) => Promise<void>;
}

export default function UseBookForm({
  mode,
  defaultValues,
  availableCategories,
  onSubmit,
}: BookFormProps) {
  const router = useRouter();
  const t = useTranslations("Dashboard.BookForm");

  const [coverImage, setCoverImage] = useState<string>(defaultValues?.img || "");
  const [pdfPreview, setPdfPreview] = useState<string>(""); // blob للعرض
  const [pdfFile, setPdfFile] = useState<string>(defaultValues?.pdf || ""); // اسم الملف

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(bookSchema) as any,
    defaultValues: defaultValues || {
      title: "",
      ar_title: "",
      description: "",
      ar_description: "",
      img: "",
      author: "",
      price: "0.00",
      discount: "0.00",
      pdf: "",
      rating: "0.00",
      rating_count: 0,
      total_pages: "0",
      categories: [],
    },
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // ✅ handle image upload
  const handleUploadImages = (files: FileList) => {
    const file = files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
      setValue("img", url);
    }
  };

  // ✅ handle pdf upload
  const handleUploadPdf = (files: FileList) => {
    const file = files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPdfPreview(blobUrl); // للعرض
      setPdfFile(file.name); // للتخزين مع اسم الملف
      setValue("pdf", file.name); // الـ schema بيتحقق على اسم الملف
    }
  };

  const submitHandler: SubmitHandler<BookFormValues> = async (data) => {
    try {
      await onSubmit(data);
      router.push("/dashboard/books");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={mode === "add" ? t("addTitle") : t("editTitle")} />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        <Input
          label={t("titleEn")}
          placeholder={t("titleEnPlaceholder")}
          {...register("title")}
          error={errors.title?.message}
        />

        <Input
          label={t("titleAr")}
          placeholder={t("titleArPlaceholder")}
          {...register("ar_title")}
          error={errors.ar_title?.message}
        />

        <TextArea
          label={t("descEn")}
          placeholder={t("descEnPlaceholder")}
          {...register("description")}
          error={errors.description?.message}
        />

        <TextArea
          label={t("descAr")}
          placeholder={t("descArPlaceholder")}
          {...register("ar_description")}
          error={errors.ar_description?.message}
        />

        <Input
          label={t("author")}
          placeholder={t("authorPlaceholder")}
          {...register("author")}
          error={errors.author?.message}
        />

        {/* ✅ Image Uploader */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">{t("cover")}</label>
          <ImageUploader
            sent={true}
            currentColor="#2563eb"
            text={t("cover")}
            onUpload={handleUploadImages}
          />
          {coverImage && (
            <img
              src={coverImage}
              alt="Book cover preview"
              className="mt-3 w-32 h-40 object-cover rounded-md border"
            />
          )}
          <input type="hidden" value={coverImage} {...register("img")} />
          {errors.img && (
            <p className="text-sm text-red-600">{errors.img.message}</p>
          )}
        </div>

        <Input
          label={t("price")}
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("price")}
          error={errors.price?.message}
        />

        <Input
          label={t("discount")}
          type="number"
          step="0.01"
          min="0"
          max="1"
          placeholder="0.00"
          {...register("discount")}
          error={errors.discount?.message}
        />

        {/* ✅ PDF Uploader */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">{t("pdf")}</label>
          <PdfUploader
            sent={true}
            currentColor="#16a34a"
            text={t("pdf")}
            onUpload={handleUploadPdf}
          />
          {pdfPreview && (
            <p className="mt-2 text-sm text-gray-700">
              📄 {pdfFile}
            </p>
          )}
          <input type="hidden" value={pdfFile} {...register("pdf")} />
          {errors.pdf && (
            <p className="text-sm text-red-600">{errors.pdf.message}</p>
          )}
        </div>

        <Input
          label={t("pages")}
          type="number"
          step="1"
          placeholder="0"
          {...register("total_pages")}
          error={errors.total_pages?.message}
        />

        {/* Categories */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">{t("categories")}</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableCategories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2">
                <input
                  defaultChecked={defaultValues?.categories?.includes(
                    category.id
                  )}
                  type="checkbox"
                  value={+category.id}
                  {...register("categories")}
                  className="h-4 w-4"
                />
                <span>{category.title}</span>
              </label>
            ))}
          </div>
          {errors.categories && (
            <p className="text-sm text-red-600">
              {errors.categories.message}
            </p>
          )}
        </div>

        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4 cursor-pointer"
          text={mode === "add" ? t("btnAdd") : t("btnSave")}
        />
      </form>
    </DashContainer>
  );
}
