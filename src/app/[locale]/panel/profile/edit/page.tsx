'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Input from '@/components/dashboard/Input';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';
import { useTranslations } from 'next-intl';
import { useUser } from '@/hooks/userContext';

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
  const { user, setUser } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      location: user?.location || '',
      role: user?.role || '',
      email: user?.email || '',
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('location', user.location || '');
      setValue('role', user.role);
      setValue('email', user.email);
      setPreviewImg(user.img || null);
    }
  }, [user, setValue]);

  const watchImg = watch('img');
  useEffect(() => {
    if (watchImg && watchImg.length > 0) {
      const file = watchImg[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [watchImg]);

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

      if (data.password?.trim()) {
        formData.append('password', data.password);
      }

      if (data.img && data.img.length > 0 && data.img[0]) {
        formData.append('img', data.img[0]);
      }

      const response = await axios.patch(
        `http://localhost:5000/users/${user?.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setUser(response.data);
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || t('error_message');
      setError(message);
    }
  };

  if (!user) {
    return <div className="text-center p-10">{t('loading')}</div>;
  }

  return (
    <DashContainer>
      <DashHeader title={t('title')} />

      {error && <div className="text-red-600 text-center mb-4 font-medium">{error}</div>}
      {success && <div className="text-green-600 text-center mb-4 font-medium">{t('success_message')}</div>}

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-[#36419B] text-center mb-4">{t('title')}</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#36419B] shadow-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            {previewImg ? (
              <img
                src={previewImg}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500">No Image</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            {...register('img')}
            className="mt-4"
          />
        </div>

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
            {...register('location')}
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

        <button
          type="submit"
          className="w-full mt-4 bg-[#36419B] hover:bg-[#2e377f] text-white font-semibold py-3 rounded-xl shadow-md transition"
        >
          {t('submit_button')}
        </button>
      </form>
    </DashContainer>
  );
}
