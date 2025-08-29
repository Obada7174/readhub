'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Input from '@/components/dashboard/Input';
import Select from '@/components/dashboard/Select';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';
import DashButton from '@/components/ui/Button';
import { useBooksOptions } from '@/hooks/react-query/books/useBooksQuery';
import { useEffect, useMemo } from 'react';
import { QuestionPayload, QuestionFormValues } from '@/types/competitions'
import { useQuizzesOptions } from '@/hooks/react-query/quizzes/useQuizzesQuery';

interface QuestionFormProps {
    mode: 'add' | 'edit';
    defaultValues?: Partial<QuestionFormValues>;
    onSubmit: (data: QuestionPayload) => Promise<void>;
}

export default function QuestionForm({ mode, defaultValues, onSubmit }: QuestionFormProps) {
    const t = useTranslations('Dashboard.question_add');
    const router = useRouter();
    const locale = useLocale();
    const { data: books, isLoading, error: fetchError } = useBooksOptions();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<QuestionFormValues>({
        defaultValues: defaultValues || {
            question_text: '',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            correct_option: '',
            ar_question_text: '',
            ar_option_a: '',
            ar_option_b: '',
            ar_option_c: '',
            ar_option_d: '',
            bookId: undefined,
            quizId: undefined,
        },
    });

    const watchedBookId = watch('bookId');

    const bookOptions = useMemo(() => {
        return (
            books?.map((book) => ({
                value: book.id,
                label: book.title[locale as keyof typeof book.title],
            })) || []
        );
    }, [books, locale]);

    const { data: quizzes } = useQuizzesOptions();

    const watchedQuizId = watch('quizId');

    const quizOptions = useMemo(() => {
        return (
            quizzes?.map((quiz) => ({
                value: quiz.id,
                label: quiz.title[locale as keyof typeof quiz.title],
            })) || []
        );
    }, [quizzes, locale]);

    useEffect(() => {
        if (defaultValues?.quizId) {
            const exists = quizOptions.some((opt) => opt.value === defaultValues.quizId);
            if (exists) {
                setValue('quizId', defaultValues.quizId);
            }
        }
    }, [defaultValues?.quizId, quizOptions, setValue]);



    useEffect(() => {
        if (defaultValues?.bookId) {
            const exists = bookOptions.some((opt) => opt.value === defaultValues.bookId);
            if (exists) {
                setValue('bookId', defaultValues.bookId);
            }
        }
    }, [defaultValues?.bookId, bookOptions, setValue]);

    const submitHandler: SubmitHandler<QuestionFormValues> = async (data) => {
        const validationErrors: Partial<Record<keyof QuestionFormValues, string>> = {};

        if (!data.question_text || data.question_text.trim().length < 2) {
            validationErrors.question_text = t('errors.question_required');
        }
        if (!data.correct_option) {
            validationErrors.correct_option = t('errors.correct_option_required');
        }
        if (!data.bookId) {
            validationErrors.bookId = t('errors.book_required');
        }

        if (Object.keys(validationErrors).length > 0) {
            Object.entries(validationErrors).forEach(([field, message]) => {
                setError(field as keyof QuestionFormValues, {
                    type: 'manual',
                    message,
                });
            });
            return;
        }

        const payload = {
            bookId: data.bookId,
            quizId: data.quizId,
            question_text: data.question_text,
            option_a: data.option_a,
            option_b: data.option_b,
            option_c: data.option_c,
            option_d: data.option_d,
            correct_option: data.correct_option,
            translations: [
                {
                    lang: 'ar',
                    question_text: data.ar_question_text,
                    option_a: data.ar_option_a,
                    option_b: data.ar_option_b,
                    option_c: data.ar_option_c,
                    option_d: data.ar_option_d,
                },
            ],
        };

        try {
            await onSubmit(payload);
            router.push('/dashboard/competitions/book-questions');
        } catch (err) {
            console.error('Error submitting question form', err);
        }
    };

    if (isLoading) {
        return <DashContainer><p>جاري التحميل...</p></DashContainer>;
    }

    if (fetchError) {
        return (
            <DashContainer>
                <p className="text-red-500">{t('errors.books_fetch_error')}</p>
            </DashContainer>
        );
    }

    return (
        <DashContainer>
            <DashHeader title={mode === 'add' ? t('add_question') : t('edit_question')} />

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-xl mx-auto">



                {/* Question Text */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label={t('question_text')} {...register('question_text')} error={errors.question_text?.message} />
                    <Input label={t('ar_question_text')} {...register('ar_question_text')} />
                </div>

                {/* Option A */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label={t('option_a')} {...register('option_a')} />
                    <Input label={t('ar_option_a')} {...register('ar_option_a')} />
                </div>

                {/* Option B */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label={t('option_b')} {...register('option_b')} />
                    <Input label={t('ar_option_b')} {...register('ar_option_b')} />
                </div>

                {/* Option C */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label={t('option_c')} {...register('option_c')} />
                    <Input label={t('ar_option_c')} {...register('ar_option_c')} />
                </div>

                {/* Option D */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label={t('option_d')} {...register('option_d')} />
                    <Input label={t('ar_option_d')} {...register('ar_option_d')} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        label={t('book_id')}
                        options={bookOptions}
                        placeholder={t('select_book_placeholder')}
                        value={watchedBookId ?? ''}
                        name="bookId"
                        onChange={(e) => setValue('bookId', Number(e.target.value))}
                        error={errors.bookId?.message}
                    />

                    <Select
                        label={t('quiz_id')}
                        options={quizOptions}
                        placeholder={t('select_quiz_placeholder')}
                        value={watchedQuizId ?? ''}
                        name="quizId"
                        onChange={(e) => setValue('quizId', Number(e.target.value))}
                        error={errors.quizId?.message}
                    />
                </div>

                {/* Correct Option */}
                <Input label={t('correct_option')} {...register('correct_option')} error={errors.correct_option?.message} />

                <DashButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('submitting') : mode === 'add' ? t('add_question') : t('save_changes')}
                </DashButton>
            </form>

        </DashContainer>
    );
}
