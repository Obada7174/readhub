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
  // GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useCategoriesQuery } from "@/hooks/react-query/categories/useCategoriesQuery";
import { Category } from "@/types/category";

export default function Users() {
  const { data, isLoading, refetch } = useCategoriesQuery();

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
      headerName: "Added Date",
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
  ];

  return (
    <DashTable<Category>
      ITEM="Category"
      ITEMS="Categorys"
      ADD="categorys/addcategory"
      columns={columns}
      isEditable={true}
      query={{
        data: data,
        isLoading: isLoading,
        refetch: refetch,
        total: data?.length,
      }}
    />
  );
}
