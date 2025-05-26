'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import Input from '@/components/dashboard/Input';
import Select from '@/components/dashboard/Select';
import DashButton from '@/components/dashboard/Button';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';

import { userSchema, UserFormValues } from '@/lib/validators/user.validator';

interface UserFormProps {
    mode: 'add' | 'edit';
    defaultValues?: Partial<UserFormValues>;
    onSubmit: (data: UserFormValues) => Promise<void>;
}

export default function UserForm({ mode, defaultValues, onSubmit }: UserFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: defaultValues || {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: '',
        },
    });

    const submitHandler: SubmitHandler<UserFormValues> = async (data) => {
        try {
            await onSubmit(data);
            router.push('/dashboard/users');
        } catch (err) {
            console.error('Error submitting form', err);
        }
    };

    return (
        <DashContainer>
            <DashHeader category="Page" title={mode === 'add' ? 'إضافة مستخدم' : 'تعديل مستخدم'} />

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6 max-w-xl mx-auto">
                <Input
                    label="الاسم الأول"
                    placeholder="الاسم الأول"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                />

                <Input
                    label="الاسم الأخير"
                    placeholder="الاسم الأخير"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                />

                <Input
                    label="البريد الإلكتروني"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    {...register('email')}
                    error={errors.email?.message}
                />

                <Input
                    label="كلمة المرور"
                    type="password"
                    placeholder="كلمة المرور"
                    {...register('password')}
                    error={errors.password?.message}
                />

                <Select
                    label="الدور"
                    options={[
                        { value: 'admin', label: 'مدير' },
                        { value: 'user', label: 'مستخدم عادي' },
                        { value: 'writer', label: 'كاتب' },
                        { value: 'product_manager', label: 'مدير المنتجات' },
                    ]}
                    {...register('role')}
                    error={errors.role?.message}
                />

                <DashButton
                    type="submit"
                    size="md"
                    className="font-bold w-full mt-4"
                    text={mode === 'add' ? 'إضافة مستخدم' : 'حفظ التغييرات'}
                />
            </form>
        </DashContainer>
    );
}
