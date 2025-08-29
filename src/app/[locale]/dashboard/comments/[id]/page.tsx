"use client";

import { useEffect, useState } from "react";
import DashTable from "@/components/dashboard/DashTable";
import { useCommentQuery } from "@/hooks/react-query/comments/useCommentsQuery";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function CommentDetailsTable() {
  const params = useParams<{ id: string }>();
  const id = String(params.id);

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = useCommentQuery(id);
  const t = useTranslations("Dashboard.comments");

  useEffect(() => {
    console.log(searchText)
  }, [])
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    {
      field: "text",
      headerName: t("text"),
      minWidth: 300,
      flex: 2,
    },
    {
      field: "user",
      headerName: t("user"),
      minWidth: 200,
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        `${params.row.user?.first_name ?? "-"} ${params.row.user?.last_name ?? "-"}`,
    },
    {
      field: "book",
      headerName: t("book"),
      minWidth: 200,
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        `${params.row.book?.title ?? "-"} / ${params.row.book?.ar_title ?? "-"}`,
    },
    {
      field: "likes",
      headerName: t("likes"),
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) =>
        params.row.likes?.length ?? 0,
    },
    {
      field: "replies",
      headerName: t("replies"),
      minWidth: 200,
      flex: 2,
      renderCell: (params: GridRenderCellParams) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params.row.replies?.map((reply: any) => reply.text).join(", ") || "-",
    },
  ];

  return (
    <DashTable
      ITEM="Comment"
      ITEMS={t("viewComment")}
      ADD=""
      columns={columns}
      isEditable={false}
      query={{
        data: data ? [data] : [],
        isLoading,
        refetch,
        total: data ? 1 : 0,
        page,
        setPage,
        limit,
        setLimit,
        setSearch: setSearchText,
      }}
    />
  );
}
