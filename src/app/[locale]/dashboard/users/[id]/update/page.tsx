'use client';

import { useUserQuery } from '@/hooks/react-query/users/useUsersQuery';
import { useUpdateUser } from '@/hooks/react-query/users/useUsersQuery';
import UserForm from '@/components/dashboard/users/UserForm';
import { useParams } from 'next/navigation';
import { UpdateUserPayload } from '@/types/user';

export default function EditUser() {
    const params = useParams<{ id: string }>();
    const userId = parseInt(params.id);
    const { data: user, isLoading } = useUserQuery(userId);
    const updateUserMutation = useUpdateUser();

    if (isLoading || !user) return <div>جارٍ التحميل...</div>;

    const handleUpdate = async (data: UpdateUserPayload) => {
        const updateData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
            location: data.location
        };

        await updateUserMutation.mutateAsync({ id: userId, data: updateData });
    };

    return (
        <UserForm
            mode="edit"
            defaultValues={{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: '',
                role: user.role,
                location: user.location
            }}
            onSubmit={handleUpdate}
        />
    );
}