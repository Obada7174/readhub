'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Input from '@/components/dashboard/Input';
import Select from '@/components/dashboard/Select';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';
import DashButton from '@/components/ui/Button'
import { addUserSchema, editUserSchema, AddUserFormValues ,EditUserFormValues } from '@/lib/validators/user.validator';

interface UserFormProps {
    mode: 'add' | 'edit';
    defaultValues?: Partial<AddUserFormValues | EditUserFormValues>;
    onSubmit: (data: AddUserFormValues | EditUserFormValues) => Promise<void>;
}

export default function UserForm({ mode, defaultValues, onSubmit }: UserFormProps) {
    const t = useTranslations('Dashboard.users');
    const router = useRouter();
    const schema = mode === 'add' ? addUserSchema : editUserSchema;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AddUserFormValues | EditUserFormValues>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });
    

    const submitHandler: SubmitHandler<AddUserFormValues | EditUserFormValues> = async (data) => {
        try {
            await onSubmit(data);
            router.push('/dashboard/users');
        } catch (err) {
            console.error('Error submitting form', err);
        }
    };
      

    return (
        <DashContainer>
            <DashHeader category="Page" title={mode === 'add' ? t('add_user') : t('edit_user')} />

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-xl mx-auto">
                <Input
                    label={t('first_name')}
                    placeholder={t('first_name_placeholder')}
                    {...register('first_name')}
                    error={errors.first_name?.message}
                />

                <Input
                    label={t('last_name')}
                    placeholder={t('last_name_placeholder')}
                    {...register('last_name')}
                    error={errors.last_name?.message}
                />

                <Input
                    label={t('email')}
                    type="email"
                    placeholder={t('email_placeholder')}
                    {...register('email')}
                    error={errors.email?.message}
                />

                {mode === 'add' && (
                    <Input
                        label={t('password')}
                        type="password"
                        placeholder={t('password_placeholder')}
                        {...register('password')}
                        error={errors.password?.message}
                    />
                )}

                <Input
                    label={t('location')}
                    placeholder={t('location_placeholder')}
                    {...register('location')}
                    error={errors.location?.message}
                />

                <Select
                    label={t('role')}
                    options={[
                        { value: 'admin', label: t('roles.admin') },
                        { value: 'user', label: t('roles.user') },
                        { value: 'writer', label: t('roles.writer') },
                        { value: 'product_manager', label: t('roles.product_manager') },
                    ]}
                    {...register('role')}
                    error={errors.role?.message}
                />

                <DashButton type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md">
                    {isSubmitting ? 'جاري الإرسال...' : mode === 'add' ? t('add_user') : t('save_changes')}
                </DashButton>

            </form>
        </DashContainer>
    );
}