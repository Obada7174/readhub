"use client";

import { useState } from "react";
// import { Select, MenuItem } from "@mui/material";
import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";
import {
  useUpdateQuiz,
  useQuizzesResultsQuery,
  useDeleteQuizResult,
} from "@/hooks/react-query/quizzes/useQuizzesQuery";

import { GridRowId } from "@mui/x-data-grid";
import { Quiz } from "@/types/competitions";
// import { SelectChangeEvent } from '@mui/material/Select';
import DashButton from "@/components/ui/Button";
import { GridRenderCellParams, GridColDef } from "@mui/x-data-grid";

import { DateObject } from "@/types";
import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function QuizzesResults() {
  const deleteMutation = useDeleteQuizResult();
  const updateMutation = useUpdateQuiz();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading, refetch } = useQuizzesResultsQuery({
    page,
    limit,
    search: searchText,
  });
  const t = useTranslations("columns");
  console.log(data);

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 50 },
    {
      field: "quizId",
      headerName: t("quiz_id"),
      minWidth: 50,
      renderCell: (params) => params.row.quiz?.id || "N/A",
    },
    {
      field: "userId",
      headerName: t("user_id"),
      minWidth: 50,
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
      field: "total_questions",
      headerName: t("total_questions"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "total_correct",
      headerName: t("total_correct"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: t("created_at"),
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date: DateObject = TransformDate(params.value as string);
        return `${date.getDay}/${date.getMonth}/${date.getFullYear}`;
      },
    },
    {
      field: "updated_at",
      headerName: t("updated_at"),
      minWidth: 130,
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
              href={`/dashboard/competitions/quizzes-results/${id}/update`}
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
        ITEM={t("quiz_result")}
        ITEMS={t("quizzes-results")}
        ADD="competitions/quizzes-results/addquizresult"
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
