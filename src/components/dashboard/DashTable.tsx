"use client";

import { useState, useMemo } from "react";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Input from "@/components/dashboard/Input";
import DashButton from "@/components/ui/Button";
import DashContainer from "@/components/dashboard/DashContainer";
import DashHeader from "@/components/dashboard/Header";
import { useTranslations } from "next-intl";

interface DashTableProps<T extends { id: number | string }> {
  ITEMS: string;
  ITEM: string;
  ADD: string;
  columns: GridColDef[];
  isEditable?: boolean;

  query: {
    data: T[] | undefined;
    isLoading: boolean;
    refetch: () => void;
    total?: number;
    page: number;
    setPage: (page: number) => void;
    limit: number;
    setLimit: (limit: number) => void;
    setSearch: (value: string) => void;
  };

  deleteMutation?: {
    mutateAsync: (ids: GridRowId[]) => Promise<void>;
  };

  updateMutation?: (row: T) => Promise<T>;
}

export default function DashTable<T extends { id: number | string }>({
  ITEMS,
  ITEM,
  ADD,
  columns,
  isEditable = false,
  query,
  deleteMutation,
  updateMutation,
}: DashTableProps<T>) {
  const t = useTranslations("Dashboard.dashtable");
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

  const displayedRows = useMemo(() => {
    return query.data ?? [];
  }, [query.data]);

  const handleSearch = (value: string) => {
    query.setSearch(value);
    query.setPage(1);
  };

  const handleDelete = async () => {
    if (deleteMutation && selectedRows.length > 0) {
      try {
        await deleteMutation.mutateAsync(selectedRows);
        query.refetch();
        setSelectedRows([]);
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleRowUpdate = async (updatedRow: T) => {
    if (updateMutation) {
      try {
        const result = await updateMutation(updatedRow);
        query.refetch();
        return result;
      } catch (err) {
        console.error("Update error:", err);
        throw err;
      }
    }
    return updatedRow;
  };

  return (
    <DashContainer>
      <DashHeader category="Page" title={ITEMS} />
      <Box
        sx={{
          width: "100%",
          mb: "30px",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: "10px",
            gap: "20px",
          }}
        >
          <Input
            className="max-w-md dark:border-b-blue-900 border-b-blue-900 h-full"
            placeholder={t(`search_for`, { item: ITEM.toLowerCase() })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
          />
          <div className="gap-4 flex">
            <DashButton
              size="lg"
              className="max-w-44"
              href={`/dashboard/${ADD}`}
            >
              {t("add")}
            </DashButton>
            <DashButton
              size="lg"
              variant="destructive"
              className="max-w-44"
              onClick={handleDelete}
            >
              {t("delete")}
            </DashButton>
          </div>
        </Box>

        <Box sx={{ flexGrow: 1, overflowX: "auto", maxWidth: "100%" }}>
          <DataGrid
            rows={displayedRows}
            columns={columns.map((col) => ({
              ...col,
              align: "center",
              headerAlign: "center",
            }))}
            rowCount={query.total}
            pageSizeOptions={[10, 20, 50, 100]}
            pagination
            paginationMode="server"
            paginationModel={{
              page: query.page - 1,
              pageSize: query.limit,
            }}
            onPaginationModelChange={(model) => {
              query.setPage(model.page + 1);
              query.setLimit(model.pageSize);
            }}
            checkboxSelection
            disableRowSelectionOnClick
            sortingOrder={["asc", "desc"]}
            getRowHeight={() => "auto"}
            loading={query.isLoading}
            editMode={isEditable ? "row" : undefined}
            processRowUpdate={(newRow) => isEditable && handleRowUpdate(newRow)}
            onRowSelectionModelChange={(
              newSelectionModel: GridRowSelectionModel
            ) => {
              if (Array.isArray(newSelectionModel)) {
                setSelectedRows(newSelectionModel);
              } else if ("ids" in newSelectionModel) {
                setSelectedRows(Array.from(newSelectionModel.ids));
              }
            }}
            sx={{
              maxWidth: "100%",
              height: "100%",

              '[class~="dark"] &': {
                color: "#e5e7eb",
                backgroundColor: "#1f2937",

                "& .MuiDataGrid-root": {
                  backgroundColor: "#1f2937",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#374151",
                  color: "#f9fafb",
                  fontSize: 16,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& .MuiDataGrid-cell": {
                  color: "#f9fafb",
                  borderColor: "#374151",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "normal",
                  lineHeight: 1.5,
                  maxHeight: "none",
                  minHeight: 52,
                  paddingTop: "8px",
                  paddingBottom: "8px",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#374151",
                  color: "#f9fafb",
                  borderColor: "#374151",
                },
                "& .MuiTablePagination-root": {
                  color: "#f9fafb",
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: "#1f2937",
                  "&:hover": {
                    backgroundColor: "#374151",
                  },
                },
                "& .MuiDataGrid-skeletonRow": {
                  backgroundColor: "#374151",
                },
                "& .MuiDataGrid-checkboxInput": {
                  color: "#f9fafb",
                },
              },

              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#d1d5db",
                color: "#111827",
                fontSize: 16,
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              "& .MuiDataGrid-cell": {
                color: "#111827",
                whiteSpace: "normal",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "none",
                minHeight: 52,
                paddingTop: "8px",
                paddingBottom: "8px",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f3f4f6",
                color: "#111827",
              },
              "& .MuiTablePagination-root": {
                color: "#111827",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: "#ffffff",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
              },
            }}
          />
        </Box>
      </Box>
    </DashContainer>
  );
}
