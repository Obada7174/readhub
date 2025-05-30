import { GridColDef } from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';

export const useCouponColumns = () => {
  const t = useTranslations('Dashboard.coupon_columns');

  const couponColumns: GridColDef[] = [
    {
      field: 'code',
      headerName: t('code'),
      width: 200,
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <span className="font-medium">{params.value}</span>
      ),
    },
    {
      field: 'discount_value',
      headerName: t('discount_value'),
      type: 'number',
      flex: 1,
      width: 150,
      editable: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <span>{params.value}%</span>
      ),
      renderEditCell: (params) => (
        <input
          type="number"
          defaultValue={params.value}
          className="w-full h-full text-center border-none outline-none"
        />
      ),
    },
  ];

  return couponColumns;
};