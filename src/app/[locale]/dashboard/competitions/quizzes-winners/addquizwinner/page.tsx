"use client";

import UseQuizWinnerForm from "@/components/dashboard/quiz-winner/UseQuizWinnerForm";
// import { QuizWinnerFormValues } from "@/lib/validators/quiz-winner.validator";

export default function AddCategory() {
  //   const createQuizWinnerMutation = useCreateCategory();

  // const handleAdd = async (data: QuizWinnerFormValues) => {
  const handleAdd = async () => {
    // await createBookMutation.mutateAsync(data as Category);
  };

  return <UseQuizWinnerForm mode="add" onSubmit={handleAdd} />;
}
