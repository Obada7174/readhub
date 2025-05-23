'use client';

import { useState, useMemo } from 'react';
import {
    DataGrid,
    GridColDef,
    GridRowId,GridRowSelectionModel
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Input from '@/components/dashboard/Input';
import DashButton from '@/components/dashboard/Button';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';
import { useRouter } from 'next/navigation';

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
    };

    searchQuery?: {
        searchFn: (query: string) => Promise<T[]>;
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
    searchQuery,
    deleteMutation,
    updateMutation,
}: DashTableProps<T>) {
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<T[]>([]);
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);

    const displayedRows = useMemo(() => {
        return search.length === 0 ? query.data ?? [] : searchResults;
    }, [query.data, searchResults, search]);

    const handleSearch = async (value: string) => {
        setSearch(value);
        if (searchQuery && value.trim() !== '') {
            try {
                const result = await searchQuery.searchFn(value);
                setSearchResults(result);
            } catch (err) {
                console.error('Search error:', err);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleDelete = async () => {
        if (deleteMutation && selectedRows.length > 0) {
            try {
                await deleteMutation.mutateAsync(selectedRows);
                
                query.refetch();
                setSelectedRows([]); // إعادة تعيين التحديد بعد الحذف
            } catch (err) {
                console.error('Delete error:', err);
            }
        }
    };

    const handleRowUpdate = async (updatedRow: T) => {
        if (updateMutation) {
            try {
                const result = await updateMutation(updatedRow);
                query.refetch(); // تحديث البيانات بعد التعديل
                return result;
            } catch (err) {
                console.error('Update error:', err);
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
                    width: '100%',
                    mb: '30px',
                    height: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: '10px',
                        gap: '20px',
                    }}
                >
                    <Input
                        className="max-w-md dark:border-b-[var(--current-color)] border-b-[var(--currentColor)] h-full"
                        placeholder={`Search for ${ITEM}`}
                        value={search}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch(e.target.value)
                        }
                    />
                    <div className="gap-4 flex">
                        <DashButton
                            text="Add"
                            size="md"
                            className="max-w-44"
                            onClick={() => router.push(`/dashboard/${ADD}`)}
                        />
                        <DashButton
                            text="Delete"
                            size="md"
                            className="max-w-44"
                            onClick={handleDelete}
                        />
                    </div>
                </Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowX: 'auto',
                        maxWidth: '100%',
                    }}
                >
                    <DataGrid
                        rows={displayedRows}
                        columns={columns}
                        pagination
                        paginationMode="client"
                        rowCount={query.total ?? displayedRows.length}
                        pageSizeOptions={[10, 20, 50, 100]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        sortingOrder={['asc', 'desc']}
                        getRowHeight={() => 'auto'}
                        loading={query.isLoading}
                        editMode={isEditable ? 'row' : undefined}
                        // processRowUpdate={isEditable ? handleRowUpdate : undefined}
                        // editMode={isEditable && "row"}

                        // experimentalFeatures={isEditable && { newEditingApi: true }}
                        processRowUpdate={(newRow) => isEditable && handleRowUpdate(newRow)}
                        onRowSelectionModelChange={(newSelectionModel: GridRowSelectionModel) => {
                            setSelectedRows(Array.isArray(newSelectionModel) ? newSelectionModel : []);
                        }}
                        sx={{
                            maxWidth: '100%',
                            height: '100%',

                            // Dark Mode Styles
                            '[class~="dark"] &': {
                                color: '#e5e7eb', // text-gray-200
                                backgroundColor: '#1f2937', // bg-gray-800

                                '& .MuiDataGrid-root': {
                                    backgroundColor: '#1f2937',
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: '#374151', // bg-gray-700
                                    color: '#f9fafb', // text-white
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                },
                                '& .MuiDataGrid-cell': {
                                    color: '#f9fafb',
                                    borderColor: '#374151',
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    backgroundColor: '#374151',
                                    color: '#f9fafb',
                                    borderColor: '#374151',
                                },
                                '& .MuiTablePagination-root': {
                                    color: '#f9fafb',
                                },
                                '& .MuiDataGrid-row': {
                                    backgroundColor: '#1f2937',
                                    '&:hover': {
                                        backgroundColor: '#374151',
                                    }
                                },
                                '& .MuiDataGrid-skeletonRow': {
                                    backgroundColor: '#374151',
                                },
                                '& .MuiDataGrid-checkboxInput': {
                                    color: '#f9fafb',
                                },
                            },

                            // Light Mode Styles (Default)
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#d1d5db', // gray-300
                                color: '#111827', // text-gray-900
                                fontSize: 16,
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-cell': {
                                color: '#111827',
                                whiteSpace: 'normal',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#f3f4f6', // gray-100
                                color: '#111827',
                            },
                            '& .MuiTablePagination-root': {
                                color: '#111827',
                            },
                            '& .MuiDataGrid-row': {
                                backgroundColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#f9fafb',
                                }
                            },
                        }}
                    />

                </Box>
            </Box>
        </DashContainer>
    );
}