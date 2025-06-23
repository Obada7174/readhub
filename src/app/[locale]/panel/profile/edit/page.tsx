'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Input from '@/components/dashboard/Input';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';
import Button from '@/components/dashboard/Button';
import { useTranslations } from 'next-intl';

type FormValues = {
  first_name: string;
  last_name: string;
  location: string;
  role: string;
  email: string;
  password: string;
  img: FileList;
};

export default function UserEditForm() {
  const t = useTranslations('Panel.edit_account');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('first_name', data.first_name ?? '');
      formData.append('last_name', data.last_name ?? '');
      formData.append('location', data.location ?? '');
      formData.append('role', data.role ?? '');
      formData.append('email', data.email ?? '');

      // إضافة كلمة المرور فقط إذا كانت غير فارغة
      if (data.password?.trim()) {
        formData.append('password', data.password);
      }

      // إضافة الصورة إذا تم رفعها
      if (data.img && data.img.length > 0 && data.img[0]) {
        formData.append('img', data.img[0]);
      }

      // ✅ طباعة البيانات للـ Debug
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await axios.patch('http://localhost:5000/users/6', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (err: any) {
      console.error('Error object:', err);
      console.error('Response data:', err.response?.data);

      const message = err?.response?.data?.message || t('error_message');
      setError(message);
    }
  };

  return (
    <DashContainer>
      <DashHeader title={t('title')} />

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && (
        <div className="text-green-500 text-center mb-4">
          {t('success_message')}
        </div>
      )}

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('first_name_label')}
            placeholder={t('first_name_placeholder')}
            {...register('first_name', { required: t('required') })}
            error={errors.first_name?.message}
          />
          <Input
            label={t('last_name_label')}
            placeholder={t('last_name_placeholder')}
            {...register('last_name', { required: t('required') })}
            error={errors.last_name?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('location_label')}
            placeholder={t('location_placeholder')}
            {...register('location', { required: t('required') })}
            error={errors.location?.message}
          />
          <Input
            label={t('role_label')}
            placeholder={t('role_placeholder')}
            {...register('role', { required: t('required') })}
            error={errors.role?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t('email_label')}
            placeholder={t('email_placeholder')}
            type="email"
            {...register('email', { required: t('required') })}
            error={errors.email?.message}
          />
          <Input
            label={t('password_label')}
            placeholder={t('password_placeholder')}
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('img_label')}
          </label>
          <input
            type="file"
            accept="image/*"
            {...register('img')}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>

        <Button
          text={t('submit_button')}
          type="submit"
          className="w-full mt-4"
          borderRadius="8px"
        />
      </form>
    </DashContainer>
  );
}
