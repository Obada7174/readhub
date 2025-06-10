"use client";

import UseQuizWinnerForm from "@/components/dashboard/quiz-winner/UseQuizWinnerForm";
import { useQuizWinnerQuery } from "@/hooks/react-query/quizzes/useQuizzesQuery";
// import { useUpdateCategory } from "@/hooks/react-query/categories/useCategoriesQuery";
import { QuizWinnerFormValues } from "@/lib/validators/quiz-winner.validator";
// import { QuizWinner } from "@/types/quiz";

interface Props {
  params: { id: string };
}

export default function UpdateQuizWinner({ params: { id } }: Props) {
  const { data, isLoading, error } = useQuizWinnerQuery(id);
  //   const updateCategoryMutation = useUpdateCategory(id);

  const handleUpdate = async (data: QuizWinnerFormValues) => {
    // await updateCategoryMutation.mutateAsync({
    //   id,
    //   ...data,
    // } as unknown as QuizWinner);
  };

  if (isLoading) return null;
  if (error) return <h1>{error.message}</h1>;
  if (!data) return <h1>There is no Quiz Winner with this ID</h1>;

  return (
    <UseQuizWinnerForm
      mode="edit"
      onSubmit={handleUpdate}
      defaultValues={{
        quizId: `${data.quiz.id}`,
        userId: `${data.user.id}`,
        coupon: `${data.coupon.id}`,
      }}
    />
  );
}
