// app/dashboard/faqs/page.tsx

'use client';

import React from 'react';
import DashTable from '@/components/dashboard/DashTable';
import { useTranslations } from 'next-intl'; 
import { useFaqColumns } from '@/components/dashboard/faqcolumn';
import { useFaqsQuery } from '@/hooks/react-query/faqs/usefaqsquery';

export default function FaqsPage() {
  const t = useTranslations('Dashboard.faq_columns'); 
  const [searchText, setSearchText] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [lang, setLang] = React.useState('ar');
  const [status, setStatus] = React.useState<'active' | 'inactive' | ''>('');

  const {
    faqs,
    total,
    isLoading,
    refetchFaqs,
    deleteFaqs,
    updateFaq,
    isDeleting,
    isUpdating,
  } = useFaqsQuery(page, limit, lang, status, searchText);

  const columns = useFaqColumns(lang);

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div>
          <label className="font-medium">{t('choose_lang')}: </label>
          <select
            value={lang}
            onChange={(e) => {
              setLang(e.target.value);
              refetchFaqs();
            }}
            className="border rounded p-2"
          >
            <option value="ar">{t('arabic')}</option>
            <option value="en">{t('english')}</option>
          </select>
        </div>
        <button
          onClick={() => {
            const newLang = lang === 'ar' ? 'en' : 'ar';
            setLang(newLang);
            refetchFaqs();
          }}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {lang === 'ar' ? t('switch_to_english') : t('switch_to_arabic')}
        </button>
        <div>
          <label className="font-medium">{t('filter_by_status')}: </label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as any);
              refetchFaqs();
            }}
            className="border rounded p-2"
          >
            <option value="">{t('all')}</option>
            <option value="active">{t('active')}</option>
            <option value="inactive">{t('inactive')}</option>
          </select>
        </div>
      </div>
      <DashTable<any>
        ITEMS={t('faqs')}
        ITEM={t('faq')}
        ADD="/faqs/new"
        columns={columns}
        isEditable={true}
        query={{
          data: faqs,
          isLoading,
          refetch: refetchFaqs,
          total,
          page,
          setPage,
          limit,
          setLimit,
          setSearch: setSearchText,
        }}
        deleteMutation={{
          mutateAsync: (ids: React.Key[]) =>
            deleteFaqs(ids.map((id) => Number(id))),
        }}
        updateMutation={async (row: any) => {
          const updatedRow = await updateFaq({
            id: row.id,
            question: row.question,
            answer: row.answer,
            status: row.status,
          });
          return updatedRow;
        }}
      />
    </div>
  );
}