'use client';

import { useCreatePage } from '@/hooks/react-query/static-pages/usePagesQuery';
import PageForm from '@/components/dashboard/static-pages/PageForm';
import { AddPageFormValues } from '@/lib/validators/static-page.validator';
import { Page } from '@/types/static-page';

export default function AddUser() {
    const createPageMutation = useCreatePage();

    const handleAdd = async (data: AddPageFormValues) => {
        await createPageMutation.mutateAsync(data as Page);
    };

    return <PageForm mode="add" onSubmit={handleAdd} />;
}