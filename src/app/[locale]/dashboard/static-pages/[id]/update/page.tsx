"use client";

import { AddPageFormValues } from "@/lib/validators/static-page.validator";
import { usePageQuery, useUpdatePage } from "@/hooks/react-query/static-pages/usePagesQuery";
import PageForm from "@/components/dashboard/static-pages/PageForm";
import { useParams } from "next/navigation";

export default function UpdatePage() {
  const params = useParams<{ id: string }>();
  const id = String(params.id);

  const { data: page, isLoading } = usePageQuery(Number(id));
  const updatePageMutation = useUpdatePage();

  const handleUpdate = async (data: AddPageFormValues) => {
    const idn = Number(id);
    await updatePageMutation.mutateAsync({ id: idn, data });
  };

  if (isLoading) return null;

  if (!page) {
    return <h1>Can&apos;t find page with ID: {id}</h1>;
  }

  return (
    <PageForm
      mode="edit"
      onSubmit={handleUpdate}
      defaultValues={{
        ...page,
      }}
    />
  );
}