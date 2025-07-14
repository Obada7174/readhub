'use client';

import { useCreateQuestion } from '@/hooks/react-query/questions/useQuestionsQuery';
import { QuestionPayload, Question } from '@/types/competitions';
import QuestionForm from '@/components/dashboard/competitions/book-questions/BookQuestionForm';

export default function AddUser() {
    const createQuestionMutation = useCreateQuestion();

    const handleAdd = async (data: QuestionPayload) => {
        await createQuestionMutation.mutateAsync(data as Question);
    };

    return <QuestionForm mode="add" onSubmit={handleAdd} />;
}