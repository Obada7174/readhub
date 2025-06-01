// components/dashboard/dashfaqcolumns.ts

import { GridColDef } from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';
import React from 'react';

const StatusEditCell = (props: any) => {
  const t = useTranslations('Dashboard.faq_columns');
  const { id, value, field } = props;
  const [valueState, setValueState] = React.useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValueState(newValue);
    props.api.setEditCellValue({ id, field, value: newValue }, e);
  };
  return (
    <select
      value={valueState || ''}
      onChange={handleChange}
      className="w-full h-full bg-transparent outline-none"
    >
      <option value="active">{t('active')}</option>
      <option value="inactive">{t('inactive')}</option>
    </select>
  );
};

export const useFaqColumns = (lang: string) => {
  const t = useTranslations('Dashboard.faq_columns');

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('id'),
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'question',
      headerName: t('question'),
      editable: true,
      minWidth: 150,
      flex: 1.2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'answer',
      headerName: t('answer'),
      editable: true,
      minWidth: 300,
      flex: 2,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: t('status'),
      editable: true,
      minWidth: 120,
      flex: 0.5,
      align: 'center',
      headerAlign: 'center',
      renderEditCell: StatusEditCell,
      renderCell: (params) => params.value ?? '',
    },
    {
      field: 'actions',
      headerName: t('actions'),
      sortable: false,
      filterable: false,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
      headerClassName: 'sticky-right-column',
      cellClassName: 'sticky-right-column',
      renderCell: (params: any) => {
        const id = params.row.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <button
              onClick={() => window.location.href = `/dashboard/faqs/${id}/update`}
              className="text-blue-600 hover:text-blue-800 rounded-full shadow p-3"
              title={t('edit')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => window.location.href = `/dashboard/faqs/${id}`}
              className="text-green-600 hover:text-green-800 rounded-full shadow p-3"
              title={t('view')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        );
      },
    },
  ];

  return columns;
};