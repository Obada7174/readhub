"use client";

import UseQuestionAnswerForm from "@/components/dashboard/question-answer/UseQuestionAnswerForm";
import { useCreateQuestionAnswer } from "@/hooks/react-query/questions/useQuestionsQuery";
import { QuestionAnswerFormValues } from "@/lib/validators/question-answer.validator";

export default function AddQuestionAnswer() {
  const createQuestionAnswerMutation = useCreateQuestionAnswer();

  const handleAdd = async (data: QuestionAnswerFormValues) => {
    await createQuestionAnswerMutation.mutateAsync(data);
  };

  return <UseQuestionAnswerForm mode="add" onSubmit={handleAdd} />;
}
