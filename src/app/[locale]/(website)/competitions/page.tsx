"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuizzesQuery } from "@/hooks/react-query/quizzes/useQuizzesQuery";
import Link from "next/link";

const QuizPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // قراءة الصفحة من الرابط، افتراضياً 1
  const page = Number(searchParams.get("page")) || 1;
  const limit = 6;
  const locale = "en";

  const { data, isLoading } = useQuizzesQuery(page, limit, locale);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading quizzes...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen p-6">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>

        <div className="grid gap-4">
          {data?.data?.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/competitions/${quiz.id}`}
              className="block bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold">{quiz.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {quiz.ar_title}
              </p>
              <p className="mt-2">
                <strong>Book:</strong> {quiz.book?.title ?? "Unknown"}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => router.push(`/competitions?page=${page - 1}`)}
            disabled={page === 1}
            className="bg-gray-300 dark:bg-gray-700 disabled:opacity-50 text-black dark:text-white py-2 px-4 rounded"
          >
            Previous
          </button>

          <span>
            Page {page} of {data?.meta?.total_pages}
          </span>

          <button
            onClick={() => router.push(`/competitions?page=${page + 1}`)}
            disabled={page >= (data?.meta?.total_pages || 1)}
            className="bg-gray-300 dark:bg-gray-700 disabled:opacity-50 text-black dark:text-white py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
