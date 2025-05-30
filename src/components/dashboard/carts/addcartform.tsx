
"use client"
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/services/axios';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Input from '@/components/dashboard/Input';
import DashButton from '@/components/dashboard/Button';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';

import { z } from 'zod';
import { useState } from 'react';

const createCartSchema = (t: (key: string) => string) =>
  z.object({
    userId: z
      .number()
      .positive(t('error.required.userId')) 
      .int(t('error.required.userId')),
  });

export type CartFormValues = z.infer<ReturnType<typeof createCartSchema>>;

export default function NewCartForm() {
  const router = useRouter();
  const t = useTranslations('Dashboard.add_cart');

  const schema = createCartSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CartFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId: undefined,
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitHandler: SubmitHandler<CartFormValues> = async (data) => {
    try {
      const res = await axios.post('/carts', data);

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard/carts');
        }, 1500);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || t('error.required.userId');
      setError(message);
    }
  };

  return (
    <DashContainer>
      <DashHeader category="Cart" title={t('title')} />

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-500 text-center mb-4">
          {t('success_message')}
        </div>
      )}

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-xl mx-auto">
        <Input
          label={t('userId_label')}
          placeholder={t('userId_placeholder')}
          type="number"
          {...register('userId', { valueAsNumber: true })}
          error={errors.userId?.message}
        />

        <DashButton
          type="submit"
          size="md"
          className="font-bold w-full mt-4"
          text={t('submit_button')}
        />
      </form>
    </DashContainer>
  );
}