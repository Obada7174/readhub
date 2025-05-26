import { GridColDef } from '@mui/x-data-grid';
import { Cart } from '@/types/carts';
import { useTranslations } from 'next-intl';

export const useCartColumns = () => {
  const t = useTranslations('Dashboard.cart_columns');

  const cartColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('id'),
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'userId',
      headerName: t('userId'),
      width: 80,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (_, row: Cart) => row.user.id,
    },
    {
      field: 'userEmail',
      headerName: t('userEmail'),
      width: 200,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (_, row: Cart) => row.user.email,
    },
    {
      field: 'status',
      headerName: t('status'),
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'created_at',
      headerName: t('created_at'),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'updated_at',
      headerName: t('updated_at'),
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return cartColumns;
};