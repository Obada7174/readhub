import axios from "@/services/axios";
import { Comment, CommentBody } from "@/types/comment";

export const getBookComments = async (id: string): Promise<Comment[]> => {
  const res = await axios.get("http://127.0.0.1:5000/books/comment/" + id);
  return res.data.comments;
};

// export const getComments = async (): Promise<Comment[]> => {
//   const res = await axios.get("http://localhost:5000/comments");
//   return res.data.data;
// };

export const createComment = async (comment: CommentBody): Promise<Comment> => {
  const response = await axios.post("http://127.0.0.1:5000/comments", comment);
  return response.data;
};

export const updateComment = async (comment: Comment): Promise<Comment> => {
  const res = await axios.patch(`/comments/${comment.id}`, comment);
  return res.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  await axios.delete(`/comments/${id}`);
};
