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
import { QuizFormValues } from '@/lib/validators/quiz.validator';
import { useEffect } from 'react';
import { useMemo } from 'react';


interface QuizFormProps {
    mode: 'add' | 'edit';
    defaultValues?: Partial<QuizFormValues>;
    onSubmit: (data: QuizFormValues) => Promise<void>;
}

export default function QuizForm({ mode, defaultValues, onSubmit }: QuizFormProps) {
    const t = useTranslations('Dashboard.quizzes');
    const router = useRouter();
    const locale = useLocale();
    const { data: books, error: fetchError, isLoading } = useBooksOptions();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<QuizFormValues>({
        defaultValues: defaultValues || {
            title: '',
            ar_title: '',
            bookId: undefined,
        },
    });
    const watchedBookId = watch('bookId');



    const bookOptions = useMemo(() => {
        return books?.map((book) => ({
            value: book.id,
            label: book.title[locale as keyof typeof book.title],
        })) || [];

    }, [books, locale]);
    useEffect(() => {
        if (defaultValues?.bookId) {
            const exists = bookOptions.some(opt => opt.value === defaultValues.bookId);
            if (exists) {
                setValue('bookId', defaultValues.bookId);
            }
        }
    }, [defaultValues?.bookId, bookOptions, setValue]);


    const submitHandler: SubmitHandler<QuizFormValues> = async (data) => {
        const validationErrors: Partial<Record<keyof QuizFormValues, string>> = {};

        if (!data.title || data.title.trim().length < 2) {
            validationErrors.title = t('errors.title_required');
        }

        if (!data.bookId) {
            validationErrors.bookId = t('errors.bookId_required');
        }

        if (Object.keys(validationErrors).length > 0) {
            Object.entries(validationErrors).forEach(([field, message]) => {
                setError(field as keyof QuizFormValues, {
                    type: 'manual',
                    message,
                });
            });
            return;
        }

        try {
            await onSubmit(data);
            router.push('/dashboard/competitions/quizzes');
        } catch (err) {
            console.error('Error submitting quiz form', err);
        }
    };

    if (isLoading) {
        return <DashContainer><p>جاري التحميل...</p></DashContainer>;
    }

    if (fetchError) {
        return (
            <DashContainer>
                <p className="text-red-500">
                    {t('errors.books_fetch_error')}
                </p>
            </DashContainer>
        );
    }


    return (
        <DashContainer>
            <DashHeader title={mode === 'add' ? t('add_quiz') : t('edit_quiz')} />

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-xl mx-auto">
                <Input
                    label={t('title')}
                    placeholder={t('title_placeholder')}
                    {...register('title')}
                    error={errors.title?.message}
                />
                <Input
                    label={t('ar_title')}
                    placeholder={t('ar_title_placeholder')}
                    {...register('ar_title')}
                    error={errors.ar_title?.message}
                />


                <Select
                    label={t('book_id')}
                    options={bookOptions}
                    placeholder={t('select_book_placeholder')}
                    value={watchedBookId ?? ''}
                    name="bookId"
                    onChange={(e) => {
                        const selectedValue = Number(e.target.value);
                        setValue('bookId', selectedValue);
                    }}
                    error={errors.bookId?.message}
                />

                <DashButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    {isSubmitting ? t('submitting') : mode === 'add' ? t('add_quiz') : t('save_changes')}
                </DashButton>
            </form>
        </DashContainer>
    );
}