"use client";

import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";

import { useTranslations } from "next-intl";  // إضافة
import {
  GridRenderCellParams,
  GridColDef,
  GridRowId,
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
  const t = useTranslations("Dashboard.Categories"); // تهيئة الترجمة

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
      headerName: t("id"),
      width: 30,
    },
    {
      field: "title",
      headerName: t("title"),
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "ar_title",
      headerName: t("arTitle"),
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: t("createdAt"),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
    {
      field: "updated_at",
      headerName: t("updatedAt"),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date = TransformDate(params.value as string);
        return `${date.getFullYear}/${date.getMonth}/${date.getDay}`;
      },
    },
    {
      field: "actions",
      headerName: t("actions"),
      sortable: false,
      filterable: false,
      minWidth: 140,
      headerClassName: "sticky-right-column",
      cellClassName: "sticky-right-column",
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
      ITEM={t("category")}
      ITEMS={t("categories")}
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
    />
  );
}
