import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Cart } from '@/types/carts';
import { useTranslations } from 'next-intl';
import { DateObject } from "@/types";
import TransformDate from "@/helpers/TransformDate";

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
      flex: 1,
      valueGetter: (_, row: Cart) => row.user.email,
    },
    {
      field: 'status',
      headerName: t('status'),
      width: 100,
      align: 'center',
      flex: 0.5,
      headerAlign: 'center',
    },
    {
      field: 'created_at',
      headerName: t('created_at'),
      width: 200,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
    {
      field: 'updated_at',
      headerName: t('updated_at'),
      width: 200,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
  ];

  return cartColumns;
};