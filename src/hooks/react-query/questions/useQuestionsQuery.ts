import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestions,
  getQuestion,
} from "@/services/questions.service";
import {Question ,QuestionIndexResponse} from "@/types/competitions";
import { useTranslations } from "next-intl";
import { showErrorToast,showSuccessToast } from "@/helpers/Toast";


export const useQuestionsQuery = (page = 1, limit = 10, lang = 'en') => {
  return useQuery<QuestionIndexResponse>({
    queryKey: ['book-questions', page, limit, lang],
    queryFn: () => getQuestions(page, limit, lang),
  });
};
export const useQuestionQuery = (id: number) => {

  return useQuery({
    queryKey: ['book-question', id],
    queryFn: () => getQuestion(id),
    enabled: !!id,
    
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: () => {
      showSuccessToast(t("question_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-questions"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_question"));
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Question }) =>
      updateQuestion(id, data),
    onSuccess: () => {
      showSuccessToast(t("question_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-questions"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_question"));
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteQuestions,
    onSuccess: () => {
      showSuccessToast(t("question_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-questions"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_question"));
    },
  });
};