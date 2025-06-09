/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";

interface DateObject {
  getFullYear: number;
  getMonth: number;
  getDay: number;
}
import {
  GridRenderCellParams,
  GridColDef,
  GridRowId,
  // GridValueFormatterParams,
} from "@mui/x-data-grid";
import DashButton from "@/components/ui/Button";
import { FaEdit } from "react-icons/fa";
import {
  useCartsQuery,
  useDeleteCart,
  useUpdateCart,
} from "@/hooks/react-query/carts/useCartsQuery";
import { useState } from "react";
import { Cart } from "@/types/carts";
import { LuEye } from "react-icons/lu";
import router from "next/router";
import { useTranslations } from "next-intl";

export default function Carts() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = useCartsQuery();
  const deleteMutation = useDeleteCart();
  const updateMutation = useUpdateCart();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      minWidth: 50,
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      minWidth: 70,
      renderCell: (params) => params.row.user?.id || "N/A",
    },
    {
      field: "userEmail",
      headerName: "User Email",
      minWidth: 180,
      flex: 2,
      renderCell: (params) => params.row.user?.email || "N/A",
    },
    {
      field: "created_at",
      headerName: "Added Date",
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
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
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      minWidth: 140,
      headerClassName: "sticky-right-column",
      cellClassName: "sticky-right-column",
      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.id;
        const userId = params.row.user.id;
        const status = params.row.status;
        const newStatus = status === "paid" ? "unpaid" : "paid";

        const handleUpdate = async () => {
          await updateMutation.mutateAsync({ id, userId, status: newStatus });
        };

        const updateHandler = async () => {
          try {
            await handleUpdate();
            router.push("/dashboard/books");
          } catch (err) {
            console.error("Error submitting form", err);
          }
        };

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              onClick={updateHandler}
              className="text-blue-600 hover:text-blue-800 rounded-full shadow p-3"
              size="icon"
            >
              <FaEdit className="translate-x-0.5" />
            </DashButton>
            <DashButton
              href={`/dashboard/carts/${id}`}
              className="text-green-600 hover:text-green-800 rounded-full shadow p-3"
              size="icon"
            >
              <LuEye />
            </DashButton>
          </div>
        );
      },
    },
  ];

  return (
    <DashTable<Cart>
      ITEM="Cart"
      ITEMS="Carts"
      ADD="carts/addcart"
      columns={columns}
      isEditable={true}
      query={{
        data: data,
        isLoading,
        refetch,
        total: data?.length,
        page,
        setPage,
        limit,
        setLimit,
        setSearch: setSearchText,
      }}
      deleteMutation={{
        mutateAsync: async (ids: GridRowId[]) =>
          await deleteMutation.mutateAsync(ids.map(Number)),
      }}
    />
  );
}
