'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';
import Input from '@/components/dashboard/Input';
import { useEditUserForm } from '@/hooks/profile/edit/useEditUserForm';

export default function UserEditForm() {
  const t = useTranslations('Panel.edit_account');
  const {
    user,
    errors,
    previewImg,
    register,
    handleSubmit,
    error,
    success,
    onSubmit,
  } = useEditUserForm();

  if (!user) return <div className="text-center p-10">{t('loading')}</div>;

  return (
    <DashContainer>
      <DashHeader title={t('title')} />

      {error && <div className="text-red-600 text-center mb-4 font-medium">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4 font-medium">{t('success_message')}</div>}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto p-8 "
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full crusor overflow-hidden border-4 border-[#36419B] shadow-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {previewImg ? (
              <img src={previewImg} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-500">No Image</div>
            )}
          </div>
          <input type="file" accept="image/*" {...register('img')} className="mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={t('first_name_label')} placeholder={t('first_name_placeholder')} {...register('first_name', { required: t('required') })} error={errors.first_name?.message} />
          <Input label={t('last_name_label')} placeholder={t('last_name_placeholder')} {...register('last_name', { required: t('required') })} error={errors.last_name?.message} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={t('location_label')} placeholder={t('location_placeholder')} {...register('location')} error={errors.location?.message} />
          <Input label={t('role_label')} placeholder={t('role_placeholder')} {...register('role', { required: t('required') })} error={errors.role?.message} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={t('email_label')} placeholder={t('email_placeholder')} type="email" {...register('email', { required: t('required') })} error={errors.email?.message} />
          <Input label={t('password_label')} placeholder={t('password_placeholder')} type="password" {...register('password')} error={errors.password?.message} />
        </div>

        <button type="submit" className="w-full mt-4 bg-[#36419B] hover:bg-[#2e377f] text-white font-semibold py-3 rounded-xl shadow-md transition">
          {t('submit_button')}
        </button>
      </form>
    </DashContainer>
  );
}
