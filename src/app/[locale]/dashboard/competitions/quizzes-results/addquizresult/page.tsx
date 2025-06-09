"use client";

import UseQuizResultForm from "@/components/dashboard/quiz-result/UseQuizResultForm";
import { useCreateQuizResult } from "@/hooks/react-query/quizzes/useQuizzesQuery";
import { QuizResultFormValues } from "@/lib/validators/quiz-result.validator";

export default function AddQuizResult() {
  const createQuizResultMutation = useCreateQuizResult();

  const handleAdd = async (data: QuizResultFormValues) => {
    await createQuizResultMutation.mutateAsync(data);
  };

  return <UseQuizResultForm mode="add" onSubmit={handleAdd} />;
}
