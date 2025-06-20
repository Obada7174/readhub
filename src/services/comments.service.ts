import axios from "@/services/axios";
import { Comment, CommentBody, CommentsResponse } from "@/types/comment";

// 1. جلب كل التعليقات مع دعم الباجيناشن والبحث
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

// 2. جلب تعليق واحد بالتفصيل
export const getComment = async (id: number): Promise<Comment> => {
  const res = await axios.get(`http://127.0.0.1:5000/comments/${id}`);
  return res.data;
};

// 3. إنشاء تعليق جديد
export const createComment = async (comment: CommentBody): Promise<Comment> => {
  const res = await axios.post("http://127.0.0.1:5000/comments", comment);
  return res.data;
};

// 4. تعديل تعليق موجود (نستخدم id وpayload)
export const updateComment = async (
  id: number,
  payload: Partial<CommentBody>
): Promise<Comment> => {
  const res = await axios.patch(`http://127.0.0.1:5000/comments/${id}`, payload);
  return res.data;
};

// 5. حذف عدة تعليقات دفعة واحدة
export const deleteComments = async (ids: number[]): Promise<void> => {
  await axios.delete("http://127.0.0.1:5000/comments", {
    data: { ids },
  });
};
