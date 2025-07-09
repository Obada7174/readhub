'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useUser } from '@/hooks/userContext';
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

export function useEditUserForm() {
  const t = useTranslations('Panel.edit_account');
  const { user: storedUser, setUser: setStoredUser } = useUser();
  const router = useRouter();

  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!storedUser?.id || !storedUser?.token) return;

      try {
        const res = await axios.get(`http://localhost:5000/users/${storedUser.id}`, {
          headers: { Authorization: `Bearer ${storedUser.token}` },
        });

        const data = res.data;
        setUser(data);
        setValue('first_name', data.first_name || '');
        setValue('last_name', data.last_name || '');
        setValue('location', data.location || '');
        setValue('role', data.role || '');
        setValue('email', data.email || '');

        const img = data.img;
        if (img?.startsWith('http')) {
          setPreviewImg(img);
        } else if (img?.startsWith('/')) {
          setPreviewImg(`http://localhost:5000${img}`);
        } else {
          setPreviewImg(`http://localhost:5000/uploads/users/${img}`);
        }
      } catch (err) {
        setError(t('error_message'));
        console.error('❌ فشل في جلب المستخدم للتعديل', err);
      }
    };

    fetchUser();
  }, [storedUser, setValue, t]);

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

  const onSubmit = async (data: FormValues) => {
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('location', data.location);
      formData.append('role', data.role);
      formData.append('email', data.email);

      if (data.password?.trim()) {
        formData.append('password', data.password);
      }

      if (data.img && data.img.length > 0) {
        formData.append('img', data.img[0]);
      }

      const res = await axios.patch(
        `http://localhost:5000/users/${storedUser?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedUser?.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.status === 200) {
        setSuccess(true);
        setUser(res.data);
        setStoredUser({ ...res.data, token: storedUser?.token }); // تحديث الكوكيز/context
        router.push('/panel/profile');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || t('error_message');
      setError(msg);
    }
  };

  return {
    user,
    errors,
    register,
    handleSubmit,
    previewImg,
    error,
    success,
    onSubmit,
  };
}
