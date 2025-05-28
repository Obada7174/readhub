"use client";

import {
  useCategoryQuery,
  useUpdateCategory,
} from "@/hooks/react-query/categories/useCategoriesQuery";
import UseCategoryForm from "@/components/dashboard/categories/UseCategoryForm";
import { Category } from "@/types/category";
import { CategoryFormValues } from "@/lib/validators/category.validator";

interface Props {
  params: { id: string };
}

export default function UpdateCategory({ params: { id } }: Props) {
  const { data: category, isLoading } = useCategoryQuery(id);
  const updateCategoryMutation = useUpdateCategory(id);

  const handleUpdate = async (data: CategoryFormValues) => {
    await updateCategoryMutation.mutateAsync({
      id,
      ...data,
    } as unknown as Category);
  };

  if (isLoading) return;
  if (!category) return <h1>Can&apos;t find book {id}</h1>;

  return (
    <UseCategoryForm
      mode="edit"
      onSubmit={handleUpdate}
      defaultValues={category}
    />
  );
}
