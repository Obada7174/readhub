'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuizzes,
  getQuiz,
} from "@/services/quizzes.service";

import { Quiz, QuizIndexResponse } from "@/types/competitions";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

export const useQuizzesQuery = (page = 1, limit = 10, lang = 'en') => {
  return useQuery<QuizIndexResponse>({
    queryKey: ['book-quizzes', page, limit, lang],
    queryFn: () => getQuizzes(page, limit, lang),
  });
};

export const useQuizQuery = (id: number) => {
  return useQuery({
    queryKey: ['book-quiz', id],
    queryFn: () => getQuiz(id),
    enabled: !!id,
  });
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      showSuccessToast(t("quiz_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_quiz"));
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Quiz }) =>
      updateQuiz(id, data),
    onSuccess: () => {
      showSuccessToast(t("quiz_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_quiz"));
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteQuizzes,
    onSuccess: () => {
      showSuccessToast(t("quiz_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_quiz"));
    },
  });
};