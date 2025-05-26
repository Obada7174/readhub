'use client';

import { useUserQuery } from '@/hooks/react-query/users/useUsersQuery';
import { useUpdateUser } from '@/hooks/react-query/users/useUsersQuery';
import UserForm from '@/components/dashboard/users/UserForm';
import { UserFormValues } from '@/lib/validators/user.validator';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditUser() {
    const params = useParams<{ id: string }>();
    const userId = parseInt(params.id);

    const { data: user, isLoading } = useUserQuery(userId);
    console.log(user);
    const updateUserMutation = useUpdateUser();

    const [defaultValues, setDefaultValues] = useState<UserFormValues | null>(null);

    useEffect(() => {
        if (user) {
            setDefaultValues({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: '',
                role: user.role,
                location: user.location
            });
        }
    }, [user]);

    const handleUpdate = async (data: UserFormValues) => {
        const updateData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password || undefined,
            role: data.role,
            location:data.location
        };

        await updateUserMutation.mutateAsync({ id: userId, data: updateData });
    };

    if (isLoading) return <div>جارٍ التحميل...</div>;
    if (!defaultValues) return <div>تعذر تحميل بيانات المستخدم</div>;

    return (
        <UserForm
            mode="edit"
            defaultValues={defaultValues}
            onSubmit={handleUpdate}
        />
    );
}