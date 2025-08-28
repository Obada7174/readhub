"use client";

import {
  useCategoryQuery,
  useUpdateCategory,
} from "@/hooks/react-query/categories/useCategoriesQuery";
import UseCategoryForm from "@/components/dashboard/categories/UseCategoryForm";
import { Category } from "@/types/category";
import { CategoryFormValues } from "@/lib/validators/category.validator";
import { useParams } from "next/navigation";

export default function UpdateCategory() {
  const params = useParams<{ id: string }>();
  const id = String(params.id);

  const { data: category, isLoading } = useCategoryQuery(id);
  const updateCategoryMutation = useUpdateCategory(id);

  const handleUpdate = async (data: CategoryFormValues) => {
    await updateCategoryMutation.mutateAsync({
      id,
      ...data,
    } as unknown as Category);
  };

  if (isLoading) return;
  if (!category) return <h1>Can&apos;t find category {id}</h1>;

  return (
    <UseCategoryForm
      mode="edit"
      onSubmit={handleUpdate}
      defaultValues={category}
    />
  );
}
