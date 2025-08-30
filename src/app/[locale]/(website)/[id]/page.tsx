'use client';

import { usePageQuery } from "@/hooks/react-query/static-pages/usePagesQuery";
import { useParams } from "next/navigation";

const StaticPage = () => {
    const { id } = useParams();
    const pageId = Number(id); // param بيرجع string، فلازم نحوله لـ number

    const { data, isLoading, isError } = usePageQuery(pageId);
    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <p className="text-center text-gray-500">جارِ التحميل...</p>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="container mx-auto py-10">
                <p className="text-center text-red-500">حدث خطأ أثناء تحميل الصفحة</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 prose max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">
                {data.ar_title || data.en_title}
            </h1>
            <div
                className="prose prose-lg"
                dangerouslySetInnerHTML={{
                    __html: data.ar_content || data.en_content,
                }}
            />
        </div>
    );
};

export default StaticPage;
