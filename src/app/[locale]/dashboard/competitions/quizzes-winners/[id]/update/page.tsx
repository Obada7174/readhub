"use client";

import UseQuizWinnerForm from "@/components/dashboard/quiz-winner/UseQuizWinnerForm";
import { useQuizWinnerQuery } from "@/hooks/react-query/quizzes/useQuizzesQuery";
import { useParams } from "next/navigation";

export default function UpdateQuizWinner() {
  const params = useParams<{ id: string }>();
  const id = String(params.id);

  const { data, isLoading, error } = useQuizWinnerQuery(id);
  //   const updateCategoryMutation = useUpdateCategory(id);

  // const handleUpdate = async (data: QuizWinnerFormValues) => {
  const handleUpdate = async () => {
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
