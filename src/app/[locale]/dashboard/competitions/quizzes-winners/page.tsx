"use client";

import { useState } from "react";
// import { Select, MenuItem } from "@mui/material";
import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";
import {
  useUpdateQuiz,
  useQuizzesWinnersQuery,
  useDeleteQuizWinner,
} from "@/hooks/react-query/quizzes/useQuizzesQuery";

import { GridRowId } from "@mui/x-data-grid";
import { Quiz } from "@/types/competitions";
// import { SelectChangeEvent } from '@mui/material/Select';
import DashButton from "@/components/ui/Button";
import { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";

import { DateObject } from "@/types";
import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function QuizzesWinners() {
  const deleteMutation = useDeleteQuizWinner();
  const updateMutation = useUpdateQuiz();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, refetch } = useQuizzesWinnersQuery({
    page,
    limit,
    search: searchText,
  });
  const t = useTranslations("columns");
  console.log(data);

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 50, flex: 1 },
    {
      field: "quizId",
      headerName: t("quiz_id"),
      minWidth: 50,
      flex: 1,
      renderCell: (params) => params.row.quiz?.id || "N/A",
    },
    {
      field: "userId",
      headerName: t("user_id"),
      minWidth: 50,
      flex: 1,
      renderCell: (params) => params.row.user?.id || "N/A",
    },
    {
      field: "userName",
      headerName: t("user_name"),
      minWidth: 50,
      flex: 1,
      renderCell: (params) =>
        params.row.user?.first_name + " " + params.row.user?.last_name || "N/A",
    },
    {
      field: "couponId",
      headerName: t("coupon_id"),
      minWidth: 50,
      flex: 1,
      renderCell: (params) => params.row.coupon?.id || "N/A",
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      minWidth: 130,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getDay}/${date.getMonth}/${date.getFullYear}`;
      },
    },
    {
      field: "actions",
      headerName: t("actions"),
      sortable: false,
      filterable: false,
      minWidth: 100,
      headerClassName: "sticky-right-column",
      cellClassName: "sticky-right-column",
      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/dashboard/competitions/quizzes-winners/${id}/update`}
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
        ITEM={t("quiz_winner")}
        ITEMS={t("quizzes-winners")}
        ADD="competitions/quizzes-winners/addquizwinner"
        columns={columns}
        isEditable={true}
        query={{
          data: data?.data,
          total: data?.meta.total,
          isLoading,
          refetch,
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
        updateMutation={async (row: Quiz) => {
          return await updateMutation.mutateAsync({ id: row.id, data: { ...row, bookId: row.book.id } });
        }}
      />
    </div>
  );
}
