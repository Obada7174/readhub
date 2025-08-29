/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import UserForm from '@/components/dashboard/users/UserForm';
import { useTranslations } from 'next-intl';
import { showErrorToast, showSuccessToast } from '@/helpers/Toast';
import { useUpdateUser, useUserQuery } from '@/hooks/react-query/users/useUsersQuery';
import { UpdateUserPayload } from '@/types/user';

export default function EditUser() {
  const t = useTranslations("toastMessages");
  const params = useParams<{ id: string }>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const userId = parseInt(params.id);

  // استدعاء الـ hooks بدون شروط
  const { data: user, isLoading } = useUserQuery(userId);
  const updateUserMutation = useUpdateUser();

  if (!isClient) return null;
  if (isNaN(userId)) return <div>{t("invalid_user_id")}</div>;
  if (isLoading || !user) return <div>{t("loading")}</div>;

  const handleUpdate = async (data: UpdateUserPayload) => {
    try {
      await updateUserMutation.mutateAsync({ id: userId, data });
      showSuccessToast(t("user_updated_successfully"));
    } catch (error) {
      console.log(error)
      showErrorToast(t("failed_to_update_user"));
    }
  };

  return (
    <UserForm
      mode="edit"
      defaultValues={{
        
        email: user.email,
        role: user.role,
      }}
      onSubmit={handleUpdate}
    />
  );
}
