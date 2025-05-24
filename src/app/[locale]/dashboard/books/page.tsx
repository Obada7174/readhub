"use client";
import { Select, MenuItem } from "@mui/material";
import DashTable from "@/components/dashboard/DashTable";
import TransformDate from "@/helpers/TransformDate";
import { SelectChangeEvent } from "@mui/material/Select";
import StarIcon from "@mui/icons-material/Star";

interface DateObject {
  getFullYear: number;
  getMonth: number;
  getDay: number;
}
import {
  GridRenderEditCellParams,
  GridRenderCellParams,
  GridColDef,
  // GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useCategoriesQuery } from "@/hooks/react-query/categories/useCategoriesQuery";
import { useBooksQuery } from "@/hooks/react-query/books/useBooksQuery";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { useLocale } from "next-intl";

export default function Users() {
  const local = useLocale();
  const ar = local === "ar";
  const { data, isLoading, refetch } = useBooksQuery();
  const { data: categories } = useCategoriesQuery();

  const genresOption = categories
    ? categories.map((category) => {
        const title = ar
          ? category.ar_title
            ? category.ar_title
            : category.title
          : category.title;

        return { value: title, label: title.toLocaleUpperCase() };
      })
    : [];

  const GenreEditCell = (params: GridRenderEditCellParams) => {
    const handleChange = (event: SelectChangeEvent) => {
      params.api.setEditCellValue({
        id: params.id,
        field: "category",
        value: event.target.value,
      });
    };

    return (
      <Select
        value={params.value}
        onChange={handleChange}
        sx={{ width: "100%" }}
        autoFocus
      >
        {categories?.map((category) => {
          const title = ar
            ? category.ar_title
              ? category.ar_title
              : category.title
            : category.title;
          return (
            <MenuItem key={category.id + title} value="fiction">
              {title.toLocaleUpperCase()}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

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
      minWidth: 120,
      flex: 2,
    },
    {
      field: "author",
      headerName: "Author",
      editable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      editable: true,
      minWidth: 80,
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "discount",
      headerName: "Discounted",
      type: "number",
      minWidth: 100,
      valueFormatter: (value) => `${value * 100}%`,
    },
    {
      field: "categories",
      headerName: "Category",
      editable: true,
      type: "singleSelect",
      valueOptions: genresOption,
      renderEditCell: GenreEditCell,
      renderCell: (params) => {
        const arr = params.value || [];

        if (!arr.length) return "-";

        return (
          <div className="flex flex-wrap gap-1 justify-center">
            {arr.map((category: Category) => {
              const title = ar ? category.ar_title : category.title;
              return <span key={category.id || title}>{title}</span>;
            })}
          </div>
        );
      },
      minWidth: 100,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 80,
      renderCell: (params) => (
        <div className="flex gap-0.5">
          <StarIcon fontSize="small" color="primary" />
          {params.value}
        </div>
      ),
    },
    {
      field: "total_pages",
      headerName: "Pages",
      type: "number",
      minWidth: 70,
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
    <DashTable<Book>
      ITEM="Book"
      ITEMS="Books"
      ADD="books/addbook"
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
