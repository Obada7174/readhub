"use client";

import UseQuizResultForm from "@/components/dashboard/quiz-result/UseQuizResultForm";
import {
  useQuizResultQuery,
  useUpdateQuizResult,
} from "@/hooks/react-query/quizzes/useQuizzesQuery";
import { QuizResultFormValues } from "@/lib/validators/quiz-result.validator";
import { useParams } from "next/navigation";

export default function AddQuizResult() {
  const params = useParams<{ id: string }>();
  const id = String(params.id);

  const { data, isLoading, error } = useQuizResultQuery(id);
  const updateQuizResultMutation = useUpdateQuizResult(id);

  const handleUpdate = async (data: QuizResultFormValues) => {
    await updateQuizResultMutation.mutateAsync(data);
  };

  if (isLoading) return null;
  if (error) return <h1>{error.message}</h1>;
  if (!data) return <h1>There is no Quiz Result with this ID</h1>;

  return (
    <UseQuizResultForm
      mode="edit"
      onSubmit={handleUpdate}
      defaultValues={{
        quizId: `${data.quiz.id}`,
        userId: `${data.user.id}`,
        total_questions: `${data.total_questions}`,
        total_correct: `${data.total_correct}`,
      }}
    />
  );
}
