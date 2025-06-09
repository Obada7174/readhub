"use client";

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

const createCouponSchema = (t: (key: string) => string) =>
  z.object({
    code: z
      .string()
      .min(3, t('error.required.code'))
      .max(20, t('error.required.code')),
    discount_value: z
      .number()
      .min(1, t('error.required.discount_value'))
      .max(100, t('error.required.discount_value')),
  });

export type CouponFormValues = z.infer<ReturnType<typeof createCouponSchema>>;

export default function NewCouponForm() {
  const router = useRouter();
  const t = useTranslations('Dashboard.add_coupon');

  const schema = createCouponSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      discount_value: undefined,
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitHandler: SubmitHandler<CouponFormValues> = async (data) => {
    try {
      const res = await axios.post('/coupons', data);

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard/copons');
        }, 1500);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || t('error.general');
      setError(message);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={t('title')} />

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
          label={t('code_label')}
          placeholder={t('code_placeholder')}
          type="text"
          {...register('code')}
          error={errors.code?.message}
        />

        <Input
          label={t('discount_label')}
          placeholder={t('discount_placeholder')}
          type="number"
          {...register('discount_value', { valueAsNumber: true })}
          error={errors.discount_value?.message}
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