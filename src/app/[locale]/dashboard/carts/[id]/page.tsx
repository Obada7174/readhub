"use client";
import DashTable from "@/components/dashboard/DashTable";
import {
  GridRenderCellParams,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import DashButton from "@/components/ui/Button";
import {
  useCartQuery,
  useDeleteCartItem,
} from "@/hooks/react-query/carts/useCartsQuery";
import { useState } from "react";
import { Cart } from "@/types/carts";
import { LuEye } from "react-icons/lu";
import { useParams } from "next/navigation";

export default function CartItems() {
  const params = useParams<{ id: string }>();
  const id = String(params.id);

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = useCartQuery(id);
  const deleteMutation = useDeleteCartItem();

  const filteredItems =
    data?.items?.filter((item: { book: { title: string; }; }) =>
      item.book?.title?.toLowerCase().includes(searchText.toLowerCase())
    ) ?? [];

  const columns: GridColDef[] = [
    { field: "id", headerName: "Item ID", width: 70, flex: 1 },
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
      renderCell: (params) =>
        params.row.book?.price ? `$${params.row.book.price}` : "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      minWidth: 70,
      headerClassName: "sticky-right-column",
      cellClassName: "sticky-right-column",
      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.book.id;
        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/books/${id}`}
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
        data: filteredItems,        // ✅ فلترة
        isLoading,
        refetch,
        total: filteredItems.length, // ✅ عداد بعد الفلترة
        page,
        setPage,
        limit,
        setLimit,
        setSearch: setSearchText,   // ✅ مربوط بالـ DashTable
      }}
      deleteMutation={{
        mutateAsync: async (ids: GridRowId[]) =>
          await deleteMutation.mutateAsync(ids.map(Number)),
      }}
    />
  );
}
