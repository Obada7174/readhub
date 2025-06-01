import axios from "@/services/axios";
import { Reply, ReplyBody } from "@/types/comment";

// export const getBookReplies = async (id: string): Promise<Reply[]> => {
//   const res = await axios.get("http://127.0.0.1:5000/books/reply/" + id);
//   return res.data.replies;
// };

// export const getReplies = async (): Promise<Reply[]> => {
//   const res = await axios.get("http://localhost:5000/replies");
//   return res.data.data;
// };

export const createReply = async (reply: ReplyBody): Promise<Reply> => {
  const response = await axios.post("http://localhost:5000/replies", reply);
  return response.data;
};

// export const updateReply = async (reply: Reply): Promise<Reply> => {
//   const res = await axios.patch(`/replies/${reply.id}`, reply);
//   return res.data;
// };

export const deleteReply = async (id: number): Promise<void> => {
  await axios.delete(`/replies/${id}`);
};
