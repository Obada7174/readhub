'use client';

import QuizForm from '@/components/dashboard/competitions/quizzes/QuizForm';
import { QuizFormValues } from '@/lib/validators/quiz.validator';
import { CreateQuiz } from '@/types/competitions';
import { useCreateQuiz } from '@/hooks/react-query/quizzes/useQuizzesQuery';

export default function AddQuiz() {
    const createQuizMutation = useCreateQuiz();

    const handleAdd = async (data: QuizFormValues) => {
        await createQuizMutation.mutateAsync(data as CreateQuiz);
    };

    return (
        <div>
            <QuizForm mode="add" onSubmit={handleAdd} />
        </div>
    );
}