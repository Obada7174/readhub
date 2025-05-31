import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  //   getComment,
  getBookComments,
  createComment,
  //   updateComment,
  //   deleteComment,
} from "@/services/comments.service";
import { Comment } from "@/types/comment";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

export const useCommentsQuery = (id: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", id],
    queryFn: () => getBookComments(id),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (commentData: {
      text: string;
      bookId: number;
      userId: number;
      title?: string;
    }) =>
      createComment({
        title: commentData.title || "",
        text: commentData.text,
        bookId: commentData.bookId,
        userId: commentData.userId,
      }),
    onSuccess: () => {
      showSuccessToast(t("comment_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_comment"));
    },
  });
};

// export const useUpdateComment = () => {
//   const queryClient = useQueryClient();
//   const t = useTranslations("toastMessages");

//   return useMutation({
//     mutationFn: updateComment,
//     onSuccess: () => {
//       showSuccessToast(t("comment_updated_successfully"));
//       queryClient.invalidateQueries({ queryKey: ["comments"] });
//     },
//     onError: () => {
//       showErrorToast(t("failed_to_update_comment"));
//     },
//   });
// };

// export const useDeleteComment = () => {
//   const queryClient = useQueryClient();
//   const t = useTranslations("toastMessages");

//   return useMutation({
//     mutationFn: deleteComment,
//     onSuccess: () => {
//       showSuccessToast(t("comment_deleted_successfully"));
//       queryClient.invalidateQueries({ queryKey: ["comments"] });
//     },
//     onError: () => {
//       showErrorToast(t("failed_to_delete_comment"));
//     },
//   });
// };
