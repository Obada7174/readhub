"use client";

import { useCreateBook } from "@/hooks/react-query/books/useBooksQuery";
import { Book } from "@/types/book";
import { BookFormValues } from "@/lib/validators/book.validator";
import UseBookForm from "@/components/dashboard/books/UseBookForm";
import { useCategoriesQuery } from "@/hooks/react-query/categories/useCategoriesQuery";

export default function AddBook() {
  const { data } = useCategoriesQuery();
  const createBookMutation = useCreateBook();

  const handleAdd = async (data: BookFormValues) => {
    await createBookMutation.mutateAsync(data as unknown as Book);
  };

  return (
    <UseBookForm
      mode="add"
      onSubmit={handleAdd}
      availableCategories={data || []}
    />
  );
}
