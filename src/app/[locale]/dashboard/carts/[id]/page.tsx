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
  useCartQuery,
  useCartsQuery,
  useDeleteCart,
  useDeleteCartItem,
} from "@/hooks/react-query/carts/useCartsQuery";
import { useState } from "react";
import { Cart } from "@/types/carts";
import { LuEye } from "react-icons/lu";

interface Props {
  params: { id: string };
}

export default function CartItems({ params: { id } }: Props) {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = useCartQuery(id);
  const deleteMutation = useDeleteCartItem();

  console.log(data);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Item ID",
      width: 70,
      flex: 1,
    },
    {
      field: "BookId",
      headerName: "Book ID",
      minWidth: 70,
      flex: 1,
      renderCell: (params) => params.row.book?.id || "N/A",
    },
    {
      field: "BookTitle",
      headerName: "Book Title",
      minWidth: 180,
      flex: 2,
      renderCell: (params) => params.row.book?.title || "N/A",
    },
    {
      field: "BookPrice",
      headerName: "Book Price",
      minWidth: 70,
      flex: 1,
      renderCell: (params) => "$" + params.row.book?.price || "N/A",
    },
    {
      field: "created_at",
      headerName: "Added Date",
      minWidth: 130,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated Date",
      minWidth: 130,
      flex: 1,
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
      minWidth: 70,

      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.book.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/book/${id}`}
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
      ITEMS={`Cart ${id}`}
      ADD={`carts/${id}/additem`}
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
