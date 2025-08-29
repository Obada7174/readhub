import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  //   getReply,
  //   getBookReplies,
  createReply,
  //   updateReply,
  //   deleteReply,
} from "@/services/replies.service";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

// export const useRepliesQuery = (id: string) => {
//   return useQuery({
// queryKey: ["replies", id],
// queryFn: () => getBookReplies(id),
//   });
// };

export const useCreateReply = (id: string) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (replyData: {
      text: string;
      userId: number;
      comment: number;
    }) =>
      createReply({
        text: replyData.text,
        userId: replyData.userId,
        commentId: replyData.comment,
      }),
    onSuccess: () => {
      showSuccessToast(t("reply_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_reply"));
    },
  });
};

// export const useUpdateReply = () => {
//   const queryClient = useQueryClient();
//   const t = useTranslations("toastMessages");

//   return useMutation({
//     mutationFn: updateReply,
//     onSuccess: () => {
//       showSuccessToast(t("reply_updated_successfully"));
//       queryClient.invalidateQueries({ queryKey: ["replies"] });
//     },
//     onError: () => {
//       showErrorToast(t("failed_to_update_reply"));
//     },
//   });
// };

// export const useDeleteReply = () => {
//   const queryClient = useQueryClient();
//   const t = useTranslations("toastMessages");

//   return useMutation({
//     mutationFn: deleteReply,
//     onSuccess: () => {
//       showSuccessToast(t("reply_deleted_successfully"));
//       queryClient.invalidateQueries({ queryKey: ["replies"] });
//     },
//     onError: () => {
//       showErrorToast(t("failed_to_delete_reply"));
//     },
//   });
// };
