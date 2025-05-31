'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Input from '@/components/dashboard/Input';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';
import DashButton from '@/components/ui/Button';

import { Coupon, UpdateCouponPayload } from '@/types/coupons';

interface CouponFormProps {
  mode: 'add' | 'edit';
  defaultValues?: Partial<Coupon>;
  onSubmit: (data: UpdateCouponPayload) => Promise<void>;
}

export default function CouponForm({ mode, defaultValues, onSubmit }: CouponFormProps) {
  const t = useTranslations('Dashboard.coupons');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdateCouponPayload>({
    defaultValues: {
      code: defaultValues?.code || '',
      discount_value: defaultValues?.discount_value || 0,
    },
  });

  const submitHandler: SubmitHandler<UpdateCouponPayload> = async (data) => {
    const validationErrors: Partial<Record<keyof UpdateCouponPayload, string>> = {};

    if (!data.code || data.code.trim().length < 2) {
      validationErrors.code = t('errors.code_required');
    }

    if (typeof data.discount_value !== 'number' || data.discount_value < 0 || data.discount_value > 100) {
      validationErrors.discount_value = t('errors.invalid_discount');
    }

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        setError(field as keyof UpdateCouponPayload, {
          type: 'manual',
          message,
        });
      });
      return;
    }

    try {
      await onSubmit(data);
      router.push('/dashboard/copons');
    } catch (err) {
      console.error('Error submitting coupon form', err);
    }
  };

  return (
    <DashContainer>
      <DashHeader
        category="Page"
        title={mode === 'add' ? t('add_coupon') : t('edit_coupon')}
      />

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-xl mx-auto">
        <Input
          label={t('code_label')}
          placeholder={t('code_placeholder')}
          {...register('code')}
          error={errors.code?.message}
        />

        <Input
          label={t('discount_label')}
          type="number"
          placeholder={t('discount_placeholder')}
          {...register('discount_value', { valueAsNumber: true })}
          error={errors.discount_value?.message}
        />

        <DashButton
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {isSubmitting
            ? t('submitting')
            : mode === 'add'
            ? t('add_coupon')
            : t('save_changes')}
        </DashButton>
      </form>
    </DashContainer>
  );
}