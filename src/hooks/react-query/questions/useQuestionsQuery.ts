import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestions,
  getQuestion,
  createQuestionAnswer,
  deleteQuestionsAnswers,
  getQuestionAnswer,
  getQuestionsAnswers,
  updateQuestionAnswer,
} from "@/services/questions.service";
import {
  Question,
  QuestionAnswer,
  QuestionAnswerResponse,
  QuestionIndexResponse,
} from "@/types/competitions";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";
import { QuestionAnswerFormValues } from "@/lib/validators/question-answer.validator";

export const useQuestionsQuery = (page = 1, limit = 10, lang = "en") => {
  return useQuery<QuestionIndexResponse>({
    queryKey: ["book-questions", page, limit, lang],
    queryFn: () => getQuestions(page, limit, lang),
  });
};
export const useQuestionQuery = (id: number) => {
  return useQuery({
    queryKey: ["book-question", id],
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

export const useQuestionsAnswersQuery = (page = 1, limit = 10, search = "") => {
  return useQuery<QuestionAnswerResponse>({
    queryKey: ["questions-answers", page, limit, search],
    queryFn: () => getQuestionsAnswers(page, limit, search),
  });
};
export const useQuestionAnswerQuery = (id: string) => {
  return useQuery<QuestionAnswer>({
    queryKey: ["question-answer", id],
    queryFn: () => getQuestionAnswer(id),
    enabled: !!id,
  });
};

export const useCreateQuestionAnswer = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createQuestionAnswer,
    onSuccess: () => {
      showSuccessToast(t("question_answer_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["questions-answers"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_question_answer"));
    },
  });
};

export const useUpdateQuestionAnswer = (id: string) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (data: QuestionAnswerFormValues) =>
      updateQuestionAnswer({ id, ...data }),
    onSuccess: () => {
      showSuccessToast(t("question_answer_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["questions-answers"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_question_answer"));
    },
  });
};

export const useDeleteQuestionAnswer = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteQuestionsAnswers,
    onSuccess: () => {
      showSuccessToast(t("question_answer_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["questions-answers"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_question_answer"));
    },
  });
};
