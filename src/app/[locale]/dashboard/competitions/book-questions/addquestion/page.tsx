'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import QuestionForm from '@/components/dashboard/competitions/book-questions/BookQuestionForm';
import { QuestionPayload } from '@/types/competitions';

export default function AddBookQuestion() {
  const router = useRouter();
  const t = useTranslations('Dashboard.bookQuestions'); // بيقرأ من namespace bookQuestions

  // دالة الإضافة
  const handleAdd = async (data: QuestionPayload) => {
    try {
      const res = await fetch('http://127.0.0.1:5000/book-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(t('addError'));

      await res.json();

      // ممكن هون تحط toast أو alert بنجاح العملية
      alert(t('addSuccess'));

      // رجوع لصفحة الأسئلة بعد النجاح
      router.push('/dashboard/competitions/book-questions');
    } catch (err) {
      console.error(t('addError'), err);
    }
  };

  return (
    <QuestionForm
      mode="add"
      onSubmit={handleAdd}
    />
  );
}
