import axios from "@/services/axios";
import { BookCommentsResponse, Comment, CommentBody, CommentsResponse } from "@/types/comment";

export const getAllComments = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<CommentsResponse> => {
  const res = await axios.get("http://127.0.0.1:5000/comments", {
    params: { page, limit, search },
  });
  return res.data;
};

export const getComment = async (id: number): Promise<Comment> => {
  const res = await axios.get(`http://127.0.0.1:5000/comments/${id}`);
  return res.data;
};

export const createComment = async (comment: CommentBody): Promise<Comment> => {
  const res = await axios.post("http://127.0.0.1:5000/comments", comment);
  return res.data;
};

export const updateComment = async (
  id: number,
  payload: Partial<CommentBody>
): Promise<Comment> => {
  const res = await axios.patch(`http://127.0.0.1:5000/comments/${id}`, payload);
  return res.data;
};

export const deleteComments = async (ids: number[]): Promise<void> => {
  await axios.delete("http://127.0.0.1:5000/comments", {
    data: { ids },
  });
};


export const getBookComments = async (bookId: string | number): Promise<BookCommentsResponse> => {
  const response = await axios.get(`http://127.0.0.1:5000/books/comment/${bookId}`);
  return response.data;
};