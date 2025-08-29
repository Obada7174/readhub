"use client";

import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import DashTable from "@/components/dashboard/DashTable";
import {
  usePagesQuery,
  useDeletePage,
  useUpdatePage,
} from "@/hooks/react-query/static-pages/usePagesQuery";

import { GridRowId } from "@mui/x-data-grid";
import { UpdatePagePayload, Page } from "@/types/static-page";
import { SelectChangeEvent } from "@mui/material/Select";
import DashButton from "@/components/ui/Button";
import {
  GridRenderEditCellParams,
  GridRenderCellParams,
  GridColDef,
} from "@mui/x-data-grid";

import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Pages() {
  const t = useTranslations("Dashboard.static-pages");

  const deleteMutation = useDeletePage();
  const updateMutation = useUpdatePage();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = usePagesQuery(page, limit, searchText);

  // --- عمود تعديل حالة النشر ---
  const PublishedEditCell = (params: GridRenderEditCellParams) => {
    const handleChange = async (event: SelectChangeEvent) => {
      const value = event.target.value === "true";
      await params.api.setEditCellValue({
        id: params.id,
        field: "is_published",
        value,
      });
      params.api.stopCellEditMode({ id: params.id, field: "is_published" });

      const row = params.row as Page;
      const updateData: UpdatePagePayload = {
        ...row,
        is_published: value,
      };

      await updateMutation.mutateAsync({ id: row.id, data: updateData });
    };

    return (
      <Select
        value={params.value?.toString() || ""}
        onChange={handleChange}
        sx={{ width: "100%" }}
        size="small"
      >
        <MenuItem value="true">Published</MenuItem>
        <MenuItem value="false">Unpublished</MenuItem>
      </Select>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "en_title",
      headerName: t("en_title"),
      editable: false,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "ar_title",
      headerName: t("ar_title"),
      editable: false,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "url",
      headerName: t("url"),
      editable: false,
      minWidth: 120,
      flex: 1,
    },
    {
      field: "is_published",
      headerName: t("is_published"),
      editable: true,
      renderEditCell: PublishedEditCell,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? t("published") : t("unpublished"),
      minWidth: 130,
      flex: 1,
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
              href={`/dashboard/static-pages/${id}/update`}
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
    <div className="space-y-4">
      <DashTable
        ITEM="Page"
        ITEMS={t("pages")}
        ADD="static-pages/addpage"
        columns={columns}
        isEditable={false}
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
        updateMutation={async (row: Page) => {
          const { id, ...rest } = row;
          const updateData: UpdatePagePayload = {
            ...rest,
            is_published: Boolean(row.is_published),
          };
          return await updateMutation.mutateAsync({ id, data: updateData });
        }}
      />
    </div>
  );
}