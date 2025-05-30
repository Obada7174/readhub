"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Input from "@/components/dashboard/Input";
import TextArea from "@/components/dashboard/TextArea";
import DashButton from "@/components/dashboard/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";

import { bookSchema, BookFormValues } from "@/lib/validators/book.validator";
import { Category } from "@/types/category";
import { useEffect } from "react";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      <DashHeader
        category="Page"
        title={mode === "add" ? "إضافة كتاب" : "تعديل كتاب"}
      />

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-2xl mx-auto"
      >
        {/* English Title */}
        <Input
          label="Title (English)"
          placeholder="Book title in English"
          {...register("title")}
          error={errors.title?.message}
        />

        {/* Arabic Title */}
        <Input
          label="العنوان (عربي)"
          placeholder="عنوان الكتاب بالعربية"
          {...register("ar_title")}
          error={errors.ar_title?.message}
        />

        {/* English Description */}
        <TextArea
          label="Description (English)"
          placeholder="Book description in English"
          {...register("description")}
          error={errors.description?.message}
        />

        {/* Arabic Description */}
        <TextArea
          label="الوصف (عربي)"
          placeholder="وصف الكتاب بالعربية"
          {...register("ar_description")}
          error={errors.ar_description?.message}
        />

        {/* Author */}
        <Input
          label="Author"
          placeholder="Book author"
          {...register("author")}
          error={errors.author?.message}
        />

        {/* Image URL */}
        <Input
          label="Cover Image URL"
          placeholder="https://example.com/book-cover.jpg"
          {...register("img")}
          error={errors.img?.message}
        />

        {/* Price */}
        <Input
          label="Price"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("price")}
          error={errors.price?.message}
        />

        {/* Discount */}
        <Input
          label="Discount (0.00-1.00)"
          type="number"
          step="0.01"
          min="0"
          max="1"
          placeholder="0.00"
          {...register("discount")}
          error={errors.discount?.message}
        />

        {/* PDF URL */}
        <Input
          label="PDF URL"
          placeholder="book.pdf"
          {...register("pdf")}
          error={errors.pdf?.message}
        />

        {/* Price */}
        <Input
          label="Pages"
          type="number"
          step="1"
          placeholder="0"
          {...register("total_pages")}
          error={errors.total_pages?.message}
        />

        {/* Categories */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Categories</label>
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
            <p className="text-sm text-red-600">{errors.categories.message}</p>
          )}
        </div>

        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4 cursor-pointer"
          text={mode === "add" ? "إضافة كتاب" : "حفظ التغييرات"}
        />
      </form>
    </DashContainer>
  );
}
