import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBookComments,
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  deleteMultipleComments,
} from "@/services/comments.service";
import { Comment } from "@/types/comment";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

// جلب كل التعليقات (مثل صفحة admin)
export const useAllCommentsQuery = () => {
  return useQuery<Comment[]>({
    queryKey: ["all-comments"],
    queryFn: getAllComments,
  });
};

// جلب تعليقات كتاب معين
export const useCommentsQuery = (bookId: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", bookId],
    queryFn: () => getBookComments(bookId),
  });
};

// إنشاء تعليق جديد
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      showSuccessToast(t("comment_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["all-comments"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] }); // لجلب تعليقات كتاب معين
    },
    onError: () => {
      showErrorToast(t("failed_to_create_comment"));
    },
  });
};

// تعديل تعليق
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      showSuccessToast(t("comment_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["all-comments"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_comment"));
    },
  });
};

// حذف تعليق
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      showSuccessToast(t("comment_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["all-comments"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_comment"));
    },
  });
};

// حذف تعليقات متعددة
export const useDeleteMultipleComments = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteMultipleComments,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      if (data.warning) showErrorToast(data.warning);
      queryClient.invalidateQueries({ queryKey: ["all-comments"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_comments"));
    },
  });
};
