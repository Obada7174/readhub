import { GridColDef } from '@mui/x-data-grid';

export const couponColumns: GridColDef[] = [
    {
      field: 'code',
      headerName: 'coupon code' ,
      width: 200,
      editable: false,
      align: 'center',
      headerAlign: 'center',
      flex:1,
      renderCell: (params) => (
        <span className="font-medium">{params.value}</span>
      )
    },
    {
      field: 'discount_value',
      headerName:'discount value',
      type: 'number',
      flex:1,
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
      )
    },
  ];