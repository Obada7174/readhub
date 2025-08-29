'use client';

import { useState } from "react";
// import { Select, MenuItem } from "@mui/material";
import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";
import {
  useQuizzesQuery,
  useDeleteQuiz,
  useUpdateQuiz,
} from "@/hooks/react-query/quizzes/useQuizzesQuery";

import { GridRowId } from "@mui/x-data-grid";
import { Quiz } from "@/types/competitions";
// import { SelectChangeEvent } from '@mui/material/Select';
import DashButton from '@/components/ui/Button';
import {
  GridRenderCellParams,
  GridColDef,
} from '@mui/x-data-grid';

import { DateObject } from "@/types";
import { LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

export default function Quizzes() {
  const deleteMutation = useDeleteQuiz();
  const updateMutation = useUpdateQuiz();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const locale = useLocale();
  const [searchText, setSearchText] = useState('');
  const { data, isLoading, refetch } = useQuizzesQuery(page, limit, locale);
  const t = useTranslations('columns');
  console.log(searchText);
  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 50 },
    {
      field: "title",
      headerName: t("quiz_title"),
      editable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: "bookTitle",
      headerName: t("book-title"),
      minWidth: 200,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const value = locale === 'en' ? params.row.book?.title : params.row.book?.ar_title;
        return value || '-';
      }
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
      minWidth: 140,
      headerClassName: "sticky-right-column",
      cellClassName: "sticky-right-column",
      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/dashboard/competitions/quizzes/${id}/update`}
              className="text-blue-600 hover:text-blue-800 rounded-full shadow p-3"
              size="icon"
            >
              <FaEdit className="translate-x-0.5" />
            </DashButton>
            <DashButton
              href={`/dashboard/competitions/quizzes/${id}`}
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
        ITEM="Quiz"
        ITEMS={t("quizzes")}
        ADD="competitions/quizzes/addquiz"
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