"use client";

import { useState } from "react";
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
import { SelectChangeEvent } from "@mui/material/Select";
import DashButton from "@/components/ui/Button";
import {
  GridRenderEditCellParams,
  GridRenderCellParams,
  GridColDef,
} from "@mui/x-data-grid";

import { DateObject } from "@/types";
import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Users() {
  const t = useTranslations("Dashboard.users");

  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = useUsersQuery(page, limit, searchText);

  const RoleEditCell = (params: GridRenderEditCellParams) => {
    const handleChange = async (event: SelectChangeEvent) => {
      const value = event.target.value;
      await params.api.setEditCellValue({
        id: params.id,
        field: "role",
        value,
      });
      params.api.stopCellEditMode({ id: params.id, field: "role" });
    };

    return (
      <Select
        value={params.value || ""}
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
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "first_name",
      headerName: t("firstName"),
      editable: true,
      minWidth: 90,
      flex: 1,
    },
    {
      field: "last_name",
      headerName: t("lastName"),
      editable: true,
      minWidth: 90,
      flex: 1,
    },
    {
      field: "email",
      headerName: t("email"),
      editable: true,
      minWidth: 180,
      flex: 1,
    },
    {
      field: "role",
      headerName: t("role"),
      editable: true,
      renderEditCell: RoleEditCell,
      renderCell: (params: GridRenderCellParams) => params.value ?? "",
      maxWidth: 120,
      minWidth: 70,
      flex: 1,
    },
    {
      field: "location",
      headerName: t("location"),
      editable: true,
      minWidth: 90,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: t("createdAt"),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
    {
      field: "updated_at",
      headerName: t("updatedAt"),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
      {
      field: "actions",
      headerName: t("actions"),
      sortable: false,
      filterable: false,
      minWidth: 100,
      headerClassName:"sticky-right-column",
      cellClassName: "sticky-right-column",

      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/dashboard/users/${id}/update`}
              className="text-blue-600 hover:text-blue-800 rounded-full shadow"
              size="icon"
            >
              <FaEdit className="translate-x-0.5" />
            </DashButton>
            
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <DashTable
        ITEM="User"
        ITEMS={t("Users")}
        ADD="users/adduser"
        columns={columns}
        isEditable={true}
        query={{
          data: data?.data,
          isLoading,
          refetch,
          total: data?.total,
          page,
          setPage,
          limit,
          setLimit,
          setSearch: setSearchText,
        }}
        deleteMutation={{
          mutateAsync: async (ids: GridRowId[]) => {
            await deleteMutation.mutateAsync(ids.map(Number));
          },
        }}
        updateMutation={async (row: User) => {
          const { id, first_name, last_name, email, role, location } = row;

          const updateData: UpdateUserPayload = {
            first_name,
            last_name,
            email,
            role,
            location,
          };

          return await updateMutation.mutateAsync({ id, data: updateData });
        }}
      />
    </div>
  );
}
