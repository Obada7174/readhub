import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComments,
  getBookComments,
} from "@/services/comments.service";
import { CommentBody, CommentsResponse, Comment, BookCommentsResponse } from "@/types/comment";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

export const useCommentsQuery = (
  page = 1,
  limit = 10,
  search = ""
) => {
  return useQuery<CommentsResponse>({
    queryKey: ["comments", page, limit, search],
    queryFn: () => getAllComments(page, limit, search),
  });
};
export const useCommentQuery = (id: string | number) => {
  return useQuery<Comment>({
    queryKey: ["comment", id],
    queryFn: () => getComment(Number(id)), // مهم
    enabled: !!id,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (comment: CommentBody) => createComment(comment),
    onSuccess: () => {
      showSuccessToast(t("comment_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_comment"));
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CommentBody>;
    }) => updateComment(id, data),
    onSuccess: () => {
      showSuccessToast(t("comment_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_comment"));
    },
  });
};

export const useDeleteComments = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (ids: number[]) => deleteComments(ids),
    onSuccess: () => {
      showSuccessToast(t("comment_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_comment"));
    },
  });
};
export const useBookCommentsQuery = (bookId: string | number) => {
  return useQuery<BookCommentsResponse>({
    queryKey: ["book-comments", bookId],
    queryFn: () => getBookComments(bookId),
    enabled: !!bookId,
  });
};