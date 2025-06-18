"use client";

import { useState } from "react";
import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DashTable from "@/components/dashboard/DashTable";
import { getAllComments } from "@/services/comments.service";

type CommentUser = {
  email: string;
};

type CommentBook = {
  title: string;
};

type CommentReply = {
  id: number;
};

type CommentLike = {
  id: number;
};

type Comment = {
  id: number;
  title: string;
  user: CommentUser;
  book: CommentBook;
  replies: CommentReply[];
  likes: CommentLike[];
};


export default function CommentsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["comments", page, limit, searchText],
    queryFn: () => getAllComments(page, limit, searchText),
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "email",
      headerName: "User Email",
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => params.row.user?.email || "-",
    },
    {
      field: "bookTitle",
      headerName: "Book Title",
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => params.row.book?.title || "-",
    },
    {
      field: "title",
      headerName: "Comment Title",
      minWidth: 250,
      flex: 1,
    },
    {
      field: "repliesCount",
      headerName: "Replies",
      width: 100,
      valueGetter: (params) => params.row.replies?.length || 0,
    },
    {
      field: "likesCount",
      headerName: "Likes",
      width: 100,
      valueGetter: (params) => params.row.likes?.length || 0,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <DashTable
        ITEM="Comment"
        ITEMS="Comments"
        ADD=""
        columns={columns}
        isEditable={false}
        rowHeight={60}
        query={{
          data: data?.data,
          isLoading,
          refetch,
          total: data?.total,
          page,
          setPage,
          limit,
          setLimit,
          setSearch: setSearchText,
        }}
        deleteMutation={{
          mutateAsync: async (ids: GridRowId[]) => {
            // مثال على حذف مجموعة تعليقات:
            // await axios.post("http://localhost:8000/api/comments/delete", { ids });
          },
        }}
        updateMutation={undefined}
      />
    </div>
  );
}
