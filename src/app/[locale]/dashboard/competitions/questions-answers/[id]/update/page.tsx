"use client";

import UseQuestionAnswerForm from "@/components/dashboard/question-answer/UseQuestionAnswerForm";
import {
  useQuestionAnswerQuery,
  useUpdateQuestionAnswer,
} from "@/hooks/react-query/questions/useQuestionsQuery";
import { QuestionAnswerFormValues } from "@/lib/validators/question-answer.validator";
import { useParams } from "next/navigation";

export default function AddQuizResult() {
  const params = useParams<{ id: string }>();
  const id = String(params.id);

  const { data, isLoading, error } = useQuestionAnswerQuery(id);
  const updateQuizResultMutation = useUpdateQuestionAnswer(id);

  const handleUpdate = async (data: QuestionAnswerFormValues) => {
    await updateQuizResultMutation.mutateAsync(data);
  };

  if (isLoading) return null;
  if (error) return <h1>{error.message}</h1>;
  if (!data) return <h1>There is no Question Answer with this ID</h1>;

  return (
    <UseQuestionAnswerForm
      mode="edit"
      onSubmit={handleUpdate}
      defaultValues={{
        isCorrect: data.isCorrect ? 1 : 0,
        questionId: data.question.id,
        selected_option: undefined,
        userId: data.user.id,
      }}
    />
  );
}
