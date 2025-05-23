'use client';
import { Select, MenuItem } from "@mui/material";
import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";
import {
  useUsersQuery,
  useDeleteUser,
  useUpdateUser,
} from "@/hooks/react-query/users/useUsersQuery";
import { GridRowId } from "@mui/x-data-grid";
import { User } from "@/types/user";
import { SelectChangeEvent } from '@mui/material/Select';
interface DateObject {
  getFullYear: number;
  getMonth: number;
  getDay: number;
}
import {
  GridRenderEditCellParams,
  GridRenderCellParams,
  GridColDef,
  // GridValueFormatterParams,
} from '@mui/x-data-grid';



export default function Users() {
  const { data, isLoading, refetch } = useUsersQuery();
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const RoleEditCell = (params: GridRenderEditCellParams) => {
    const handleChange = (event: SelectChangeEvent) => {
      const value = event.target.value;
      params.api.setEditCellValue({ id: params.id, field: "role", value });
    };
    

    return (
      <Select
        value={params.value}
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        <MenuItem value="1995">admin</MenuItem>
        <MenuItem value="2001">user</MenuItem>
        <MenuItem value="1996">writer</MenuItem>
        <MenuItem value="1999">Products Manager</MenuItem>
      </Select>
    );
  };


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
    },
    {
      field: "first_name",
      headerName: "First Name",
      editable: true,
      minWidth: 90,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      editable: true,
      minWidth: 90,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      editable: true,
      flex: 1,
      minWidth: 180,
    },
    {
      field: "role",
      headerName: "Role",
      editable: true,
      type: "singleSelect",
      valueOptions: [
        { value: "1995", label: "admin" },
        { value: "1996", label: "writer" },
        { value: "1999", label: "product manager" },
        { value: "2001", label: "user" },
      ],
      renderEditCell: RoleEditCell, 
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value;
        return value === "1995"
          ? "admin"
          : value === "1996"
            ? "writer"
            : value === "1999"
              ? "product manager"
              : value === "2001"
                ? "user"
                : "";
      },
      maxWidth: 120,
      minWidth: 70,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created Date",
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth }/${date.getDay}`;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated Date",
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
  ];

  return (
    <DashTable
      ITEM="User"
      ITEMS="Users"
      ADD="adduser"
      columns={columns}
      isEditable={true}
      query={{
        data: data,
        isLoading: isLoading,
        refetch: refetch,
        total: data?.length,
      }}
      deleteMutation={{
        mutateAsync: async (ids: GridRowId[]) => {
          await Promise.all(
            ids.map((id) => deleteMutation.mutateAsync(Number(id)))
          );
          
        },
      }}
      updateMutation={async (row: User) => {
        return await updateMutation.mutateAsync(row);
      }}
    />
  );
}