'use client';

import { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";
import {
  useQuestionsQuery,
  useDeleteQuestion,
  useUpdateQuestion,
} from "@/hooks/react-query/questions/useQuestionsQuery";

import { GridRowId } from "@mui/x-data-grid";
import { Question } from "@/types/competitions";
import { SelectChangeEvent } from '@mui/material/Select';
import DashButton from '@/components/ui/Button';
import {
  GridRenderEditCellParams,
  GridRenderCellParams,
  GridColDef,
} from '@mui/x-data-grid';

import { DateObject } from "@/types";
import { LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

export default function Questions() {
  const deleteMutation = useDeleteQuestion();
  const updateMutation = useUpdateQuestion();
  const locale = useLocale();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState('');
  const { data, isLoading, refetch } = useQuestionsQuery(page, limit, locale);
  const t = useTranslations('columns');
  const CorrectAnswerEditCell = (params: GridRenderEditCellParams) => {
    const handleChange = async (event: SelectChangeEvent) => {
      const value = event.target.value;
      await params.api.setEditCellValue({ id: params.id, field: "correct_option", value });
      params.api.stopCellEditMode({ id: params.id, field: "correct_option" });
    };
    return (
      <Select
      value={params.value || ''}
        onChange={handleChange}
        sx={{ width: "100%" }}
        >
        <MenuItem value="a">a</MenuItem>
        <MenuItem value="b">b</MenuItem>
        <MenuItem value="c">c</MenuItem>
        <MenuItem value="d">d</MenuItem>
      </Select>
    );
  };
  useEffect(()=>{
    console.log(searchText)
  },[])

  const columns: GridColDef[] = [
    { field: "id", headerName: t("id"), width: 50 },
    {
      field: "question_text",
      headerName: t("question_text"),
      editable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: "option_a",
      headerName: t("option_a"),
      editable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "option_b",
      headerName: t("option_b"),
      editable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "option_c",
      headerName: t("option_c"),
      editable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "option_d",
      headerName: t("option_d"),
      editable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "correct_option",
      headerName: t("correct_option"),
      editable: true,
      minWidth: 120,
      flex: 1,
      renderEditCell: CorrectAnswerEditCell,
      renderCell: (params: GridRenderCellParams) => params.value ?? '',
    },
    {
      field: "quiz",
      headerName: t("quiz_title"),
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => locale === 'en' ? params.row.quiz?.title : params.row.quiz?.ar_title,
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
      minWidth: 140,
      headerClassName: "sticky-right-column",
      cellClassName: "sticky-right-column",
      renderCell: (params: GridRenderCellParams) => {
        const id = params.row.id;

        return (
          <div className="flex gap-2 items-center text-lg">
            <DashButton
              href={`/dashboard/book-questions/${id}/update`}
              className="text-blue-600 hover:text-blue-800 rounded-full shadow p-3"
              size="icon"
            >
              <FaEdit className="translate-x-0.5" />
            </DashButton>
            <DashButton
              href={`/dashboard/questions/${id}`}
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
        ITEM="Question"
        ITEMS="Questions"
        ADD="/dashboard/competitions/book-questions/addquestion"
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
        updateMutation={async (row: Question) => {
          return await updateMutation.mutateAsync({ id:row.id, data: row });
        }}
      />
    </div>
  );
}