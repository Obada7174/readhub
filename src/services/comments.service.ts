import axios from "@/services/axios";
import { Comment, CommentBody } from "@/types/comment";

// 1. جلب كل التعليقات (مع بيانات كاملة كما في get all)
export const getAllComments = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<{ data: Comment[]; total: number }> => {
  const res = await axios.get("http://127.0.0.1:5000/comments", {
    params: { page, limit, search },
  });
  return {
    data: res.data.data,
    total: res.data.total,
  };
};


// 2. جلب تعليق واحد بالتفصيل
export const getCommentById = async (id: number): Promise<Comment> => {
  const res = await axios.get(`http://127.0.0.1:5000/comments/${id}`);
  return res.data;
};

// 3. جلب تعليقات كتاب معين
export const getBookComments = async (bookId: string): Promise<Comment[]> => {
  const res = await axios.get(`http://127.0.0.1:5000/books/comment/${bookId}`);
  return res.data.comments;
};

// 4. إنشاء تعليق جديد
export const createComment = async (comment: CommentBody): Promise<Comment> => {
  const res = await axios.post("http://127.0.0.1:5000/comments", comment);
  return res.data;
};

// 5. تعديل تعليق موجود
export const updateComment = async (comment: Comment): Promise<Comment> => {
  const res = await axios.patch(`http://127.0.0.1:5000/comments/${comment.id}`, comment);
  return res.data;
};

// 6. حذف تعليق واحد
export const deleteComment = async (id: number): Promise<void> => {
  await axios.delete(`http://127.0.0.1:5000/comments/${id}`);
};

// 7. حذف عدة تعليقات دفعة واحدة
export const deleteMultipleComments = async (ids: number[]): Promise<{ message: string; warning?: string }> => {
  const res = await axios.post("http://127.0.0.1:5000/comments", { ids });
  return res.data;
};
