'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UpdateBookQuestionPayload, QuestionFormValues } from '@/types/competitions';
import QuestionForm from '@/components/dashboard/competitions/book-questions/BookQuestionForm';

export default function EditBookQuestion() {
  const params = useParams<{ id: string }>();
  const questionId = parseInt(params.id);
  const [question, setQuestion] = useState<QuestionFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/book-questions/${questionId}`);
        if (!res.ok) throw new Error('Failed to fetch question');
        const data: UpdateBookQuestionPayload = await res.json();

        // Extract Arabic translation
        const arTranslation = data.translations?.find((t) => t.lang === 'ar');

        const mappedValues: QuestionFormValues = {
          bookId: data.bookId,
          quizId: data.quizId ?? undefined,
          question_text: data.question_text,
          option_a: data.option_a,
          option_b: data.option_b,
          option_c: data.option_c,
          option_d: data.option_d,
          correct_option: data.correct_option,
          ar_question_text: arTranslation?.question_text || '',
          ar_option_a: arTranslation?.option_a || '',
          ar_option_b: arTranslation?.option_b || '',
          ar_option_c: arTranslation?.option_c || '',
          ar_option_d: arTranslation?.option_d || '',
        };

        setQuestion(mappedValues);
      } catch (err) {
        console.error('Error fetching question', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [questionId]);

  const handleUpdate = async (data: UpdateBookQuestionPayload) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/book-questions/${questionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update question');
    } catch (err) {
      console.error('Error updating question', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!question) return <div>Not found</div>;

  return (
    <QuestionForm
      mode="edit"
      defaultValues={question}
      onSubmit={handleUpdate}
    />
  );
}
