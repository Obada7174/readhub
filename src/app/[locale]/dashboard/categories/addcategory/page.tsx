"use client";

import UseCategoryForm from "@/components/dashboard/categories/UseCategoryForm";
import { useCreateCategory } from "@/hooks/react-query/categories/useCategoriesQuery";
import { CategoryFormValues } from "@/lib/validators/category.validator";
import { Category } from "@/types/category";

export default function AddUser() {
  const createBookMutation = useCreateCategory();

  const handleAdd = async (data: CategoryFormValues) => {
    await createBookMutation.mutateAsync(data as Category);
  };

  return <UseCategoryForm mode="add" onSubmit={handleAdd} />;
}
