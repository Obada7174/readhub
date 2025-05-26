import { GridColDef } from '@mui/x-data-grid';
import { Cart } from '@/types/carts';

export const cartColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Cart ID',
    width: 70,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'userId',
    headerName: 'User ID',
    width: 80,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: Cart) => row.user.id,
  },
  {
    field: 'userEmail',
    headerName: 'User Email',
    width: 200,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (_, row: Cart) => row.user.email,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'updated_at',
    headerName: 'Updated At',
    width: 200,
    align: 'center',
    headerAlign: 'center',
  },
];