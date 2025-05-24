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
import { UpdateUserPayload, User } from "@/types/user";
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
        <MenuItem value="admin">admin</MenuItem>
        <MenuItem value="user">user</MenuItem>
        <MenuItem value="author">author</MenuItem>
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
        { value: "admin", label: "admin" },
        { value: "author", label: "author" },
        { value: "user", label: "user" },
      ],
      renderEditCell: RoleEditCell, 
      renderCell: (params: GridRenderCellParams) => {
        const value = params.value;
        return value ;
      },
      maxWidth: 120,
      minWidth: 70,
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      editable: true,
      minWidth: 90,
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
      ADD="users/adduser"
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
        const { id, first_name, last_name, email, role , location } = row;

        const updateData: UpdateUserPayload = {
          first_name,
          last_name,
          email,
          role,
          location
        };

        return await updateMutation.mutateAsync({ id, data: updateData });
      }}
    />
  );
}