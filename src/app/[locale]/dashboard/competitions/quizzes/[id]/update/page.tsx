'use client';

import { useQuizQuery } from '@/hooks/react-query/quizzes/useQuizzesQuery';
import { useUpdateQuiz } from '@/hooks/react-query/quizzes/useQuizzesQuery';
import { useParams } from 'next/navigation';
import { CreateQuiz } from '@/types/competitions';
import QuizForm from '@/components/dashboard/competitions/quizzes/QuizForm';

export default function EditUser() {
    const params = useParams<{ id: string }>();
    const quizId = parseInt(params.id);
    const { data: quiz, isLoading } = useQuizQuery(quizId);
    const updateQuizMutation = useUpdateQuiz();

    if (isLoading || !quiz) return <div>جارٍ التحميل...</div>;

    const handleUpdate = async (data: CreateQuiz) => {
        const updateData = {
            title: data?.title,
            ar_title: data?.ar_title,
            bookId: data?.bookId
        };

        await updateQuizMutation.mutateAsync({ id: quizId, data: updateData });
    };

    return (
        <QuizForm
            mode="edit"
            defaultValues={{
                title: quiz.title,
                ar_title: quiz.ar_title,
                bookId: quiz.book.id,
            }}
            onSubmit={handleUpdate}
        />
    );
}