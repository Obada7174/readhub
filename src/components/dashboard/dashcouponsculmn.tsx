import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';
import { FaEdit } from 'react-icons/fa';
import DashButton from '@/components/ui/Button'
import { LuEye } from 'react-icons/lu';
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
  {
    field: 'updated_at',
    headerName: 'Updated At',
    editable: false,
    flex: 1,
    valueFormatter: (value) => new Date(value as string).toLocaleDateString(),
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    minWidth: 140,

    renderCell: (params: GridRenderCellParams) => {
      const id = params.row.id;

      return (
        <div className="flex gap-2 items-center text-lg">
          <DashButton
            href={`/dashboard/copons/${id}/update`}
            className="text-blue-600 hover:text-blue-800 rounded-full shadow p-3"
            size="icon"
          >
            <FaEdit className="translate-x-0.5" />
          </DashButton>
        </div>
      );
    },
  },
  ];
  return couponColumns;
};