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
import {
  useCategoriesQuery,
  useDeleteCategory,
} from "@/hooks/react-query/categories/useCategoriesQuery";
import { Category } from "@/types/category";
import { useState } from "react";
import DashButton from "@/components/ui/Button";
import { FaEdit } from "react-icons/fa";

export default function Categories() {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = useCategoriesQuery({
    page,
    limit,
    search: searchText,
  });
  const deleteMutation = useDeleteCategory();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
    },
    {
      field: "title",
      headerName: "Title",
      editable: true,
      minWidth: 100,
      flex: 2,
    },
    {
      field: "ar_title",
      headerName: "AR Title",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created Date",
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

      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/dashboard/categories/${id}/update`}
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

  return (
    <DashTable<Category>
      ITEM="Category"
      ITEMS="Categories"
      ADD="categories/addcategory"
      columns={columns}
      isEditable={true}
      query={{
        data: data?.data,
        isLoading,
        refetch,
        total: data?.meta.total,
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
      // deleteMutation={{
      //   mutateAsync: async (ids: GridRowId[]) =>
      //     await deleteMutation.mutateAsync(ids.map(Number)),
      // }}
    />
  );
}
