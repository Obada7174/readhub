'use client';

import { useState, useMemo } from 'react';
import {
    DataGrid,
    GridColDef,
    GridRowId, GridRowSelectionModel
} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Input from '@/components/dashboard/Input';
import DashButton from '@/components/ui/Button';
import DashContainer from '@/components/dashboard/DashContainer';
import DashHeader from '@/components/dashboard/Header';

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
        console.log("click delete");
        console.log(selectedRows);
        if (deleteMutation && selectedRows.length > 0) {
            try {
                await deleteMutation.mutateAsync(selectedRows);
                
                query.refetch();
                setSelectedRows([]); 
            } catch (err) {
                console.error('Delete error:', err);
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
                        className="max-w-md dark:border-b-blue-900 border-b-blue-900 h-full"
                        placeholder={`Search for ${ITEM}`}
                        value={search}
                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch(e.target.value)
                        }
                    />
                    <div className="gap-4 flex">
                        <DashButton
                            size="lg"
                            className="max-w-44"
                            href={`/dashboard/${ADD}`}
                        >Add</DashButton>
                        <DashButton
                            size="lg"
                            variant='destructive'
                            className="max-w-44"
                            onClick={handleDelete}
                        >Delete</DashButton>
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
                        columns={columns.map((col) => ({
                            ...col,
                            align: 'center',
                            headerAlign: 'center',
                        }))}
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
                        processRowUpdate={(newRow) => isEditable && handleRowUpdate(newRow)}
                        onRowSelectionModelChange={(newSelectionModel: GridRowSelectionModel) => {
                            if (Array.isArray(newSelectionModel)) {
                                setSelectedRows(newSelectionModel);
                            } else if ('ids' in newSelectionModel) {
                                setSelectedRows(Array.from(newSelectionModel.ids));
                            }
                        }}
                        
                        sx={{
                            maxWidth: '100%',
                            height: '100%',

                            '[class~="dark"] &': {
                                color: '#e5e7eb',
                                backgroundColor: '#1f2937',

                                '& .MuiDataGrid-root': {
                                    backgroundColor: '#1f2937',
                                },
                                '& .MuiDataGrid-columnHeader': {
                                    backgroundColor: '#374151',
                                    color: '#f9fafb',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                },
                                '& .MuiDataGrid-cell': {
                                    color: '#f9fafb',
                                    borderColor: '#374151',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    whiteSpace: 'normal',
                                    lineHeight: 1.5,
                                    maxHeight: 'none',
                                    minHeight: 52,
                                    paddingTop: '8px',
                                    paddingBottom: '8px',
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
                                    },
                                },
                                '& .MuiDataGrid-skeletonRow': {
                                    backgroundColor: '#374151',
                                },
                                '& .MuiDataGrid-checkboxInput': {
                                    color: '#f9fafb',
                                },
                            },

                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#d1d5db',
                                color: '#111827',
                                fontSize: 16,
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            '& .MuiDataGrid-cell': {
                                color: '#111827',
                                whiteSpace: 'normal',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                maxHeight: 'none',
                                minHeight: 52,
                                paddingTop: '8px',
                                paddingBottom: '8px',
                            },
                            '& .MuiDataGrid-footerContainer': {
                                backgroundColor: '#f3f4f6',
                                color: '#111827',
                            },
                            '& .MuiTablePagination-root': {
                                color: '#111827',
                            },
                            '& .MuiDataGrid-row': {
                                backgroundColor: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#f9fafb',
                                },
                            },
                        }}
                    />

                </Box>
            </Box>
        </DashContainer>
    );
}