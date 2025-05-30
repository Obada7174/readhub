"use client";

import {
  useBookQuery,
  useUpdateBook,
} from "@/hooks/react-query/books/useBooksQuery";
import { Book } from "@/types/book";
import { BookFormValues } from "@/lib/validators/book.validator";
import UseBookForm from "@/components/dashboard/books/UseBookForm";
import { useCategoriesQuery } from "@/hooks/react-query/categories/useCategoriesQuery";

interface Props {
  params: { id: string };
}

export default function UpdateBook({ params: { id } }: Props) {
  const { data } = useCategoriesQuery();
  const { data: book, isLoading } = useBookQuery(id);
  const updateBookMutation = useUpdateBook(id);

  const handleUpdate = async (data: BookFormValues) => {
    await updateBookMutation.mutateAsync({ id, ...data } as unknown as Book);
  };

  if (isLoading) return;
  if (!book) return <h1>Can&apos;t find book {id}</h1>;

  return (
    <UseBookForm
      mode="edit"
      onSubmit={handleUpdate}
      availableCategories={data?.data || []}
      defaultValues={
        {
          ...book,
          total_pages: `${book.total_pages}`,
          categories: book.categories.map((category) => category.id),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
    />
  );
}
