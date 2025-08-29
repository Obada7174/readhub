/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/faqs/[id]/edit/page.tsx

"use client";

import FaqForm, { UpdateFaqPayload } from "@/components/dashboard/faqformupade";
import { useFaqQuery } from "@/hooks/react-query/faqs/usefetchfaqbyid";
import { useUpdateFaq } from "@/hooks/react-query/faqs/useupdatequery";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function EditFaqPage() {
  const params = useParams<{ id: string }>();
  const faqId = parseInt(params.id);

  const { data: faq, isLoading } = useFaqQuery(faqId);
  const updateFaqMutation = useUpdateFaq();

  if (isLoading || !faq) return <div>جاري التحميل...</div>;

  const handleUpdate = async (data: UpdateFaqPayload) => {
    try {
      console.log("Sending Data:", data); // 👈 راقب هذا في DevTools
      await updateFaqMutation.mutateAsync({
        id: faqId,
        ...data,
      });
      console.log("Success!");
      toast.success("تم تحديث الفاك بنجاح");
    } catch (error: any) {
      console.error("Error updating FAQ:", error?.response?.data || error.message);
      toast.error("فشل في تحديث الفاك");
    }
  };

  return (
    <FaqForm
      mode="edit"
      defaultValues={{
        enQuestion: faq.enQuestion || "",
        arQuestion: faq.arQuestion || "",
        enAnswer: faq.enAnswer || "",
        arAnswer: faq.arAnswer || "",
        isPublished: faq.isPublished || "inactive",
      }}
      onSubmit={handleUpdate}
    />
  );
}