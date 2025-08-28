"use client";

import { useState } from "react";
import DashTable from "@/components/dashboard/DashTable";
import {
  useCommentsQuery,
  useDeleteComments,
  useUpdateComment,
} from "@/hooks/react-query/comments/useCommentsQuery";

import {
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
  GridRowId,
} from "@mui/x-data-grid";

import DashButton from "@/components/ui/Button";
import { LuEye } from "react-icons/lu";

import { Comment } from "@/types/comment";
import { useTranslations } from "next-intl";

export default function CommentsPage() {
  const t = useTranslations("Dashboard.comments");

  const deleteMutation = useDeleteComments();
  const updateMutation = useUpdateComment();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, refetch } = useCommentsQuery(page, limit, searchText);

  const TextEditCell = (params: GridRenderEditCellParams) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      params.api.setEditCellValue({
        id: params.id,
        field: "text",
        value: e.target.value,
      });
    };

    return (
      <input
        type="text"
        defaultValue={params.value as string}
        onChange={handleChange}
        className="w-full p-1 border rounded"
      />
    );
  };

  const columns: GridColDef<Comment>[] = [
    { field: "id", headerName: t("id"), width: 30 },
    {
      field: "userName",
      headerName: t("userName"),
      minWidth: 160,
      flex: 1,
      renderCell: (params: GridRenderCellParams<Comment>) =>
        `${params.row.user?.first_name ?? ""} ${params.row.user?.last_name ?? ""}`.trim() || "-",
    },
    {
      field: "userEmail",
      headerName: t("userEmail"),
      minWidth: 180,
      flex: 1,
      renderCell: (params: GridRenderCellParams<Comment>) =>
        params.row.user?.email ?? "-",
    },
    {
      field: "bookTitle",
      headerName: t("bookTitle"),
      minWidth: 180,
      flex: 1,
      renderCell: (params: GridRenderCellParams<Comment>) =>
        params.row.book?.title ?? "-",
    },
    {
      field: "text",
      headerName: t("text"),
      editable: true,
      minWidth: 250,
      flex: 2,
      renderEditCell: TextEditCell,
    },
    {
      field: "likesCount",
      headerName: t("likesCount"),
      width: 100,
      renderCell: (params: GridRenderCellParams<Comment>) =>
        typeof params.row.likesCount === "number" ? params.row.likesCount : 0,
    },
    {
      field: "repliesCount",
      headerName: t("repliesCount"),
      width: 100,
      renderCell: (params: GridRenderCellParams<Comment>) =>
        typeof params.row.repliesCount === "number" ? params.row.repliesCount : 0,
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams<Comment>) => {
        const date = new Date(params.row.created_at);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      },
    },
    {
      field: "updated_at",
      headerName: t("updated_at"),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams<Comment>) => {
        const date = new Date(params.row.updated_at);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
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
      renderCell: (params: GridRenderCellParams<Comment>) => {
        const id = params.row.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/dashboard/comments/${id}`}
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
    <div className="space-y-4">
      <DashTable
        ITEM="Comment"
        ITEMS={t("viewComments")}
        ADD=""
        columns={columns}
        isEditable={true}
        query={{
          data: data?.data || [],
          isLoading,
          refetch,
          total: data?.meta.total || 0,
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
        updateMutation={async (row: Comment) => {
          const { id, text } = row;
          return await updateMutation.mutateAsync({
            id,
            data: { text },
          });
        }}
      />
    </div>
  );
}
