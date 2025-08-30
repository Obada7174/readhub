"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuizzes,
  getQuiz,
  getQuizzesWinners,
  deleteQuizWinner,
  updateQuizWinner,
  deleteQuizResult,
  getQuizzesResults,
  updateQuizResult,
  createQuizResult,
  getQuizResult,
  getQuizWinner,
  getQuizzesOptions,
  createQuizWinner,
} from "@/services/quizzes.service";

import { CreateQuiz, QuizIndexResponse, QuizOption } from "@/types/competitions";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";
import { QuizResult, QuizWinner } from "@/types/quiz";

export const useQuizzesQuery = (page = 1, limit = 10, lang = "en") => {
  return useQuery<QuizIndexResponse>({
    queryKey: ["book-quizzes", page, limit, lang],
    queryFn: () => getQuizzes(page, limit, lang),
  });
};

export const useQuizzesOptions = () => {
  return useQuery<QuizOption[]>({
    queryKey: ["books-quizzes"],
    queryFn: async() => getQuizzesOptions(),
  });
};

export const useQuizQuery = (id: number) => {
  return useQuery({
    queryKey: ["book-quiz", id],
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
    mutationFn: ({ id, data }: { id: number; data: CreateQuiz }) =>
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

export const useQuizzesWinnersQuery = ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  return useQuery<QuizIndexResponse>({
    queryKey: ["book-quizzes", page, limit, search],
    queryFn: () => getQuizzesWinners(page, limit, search),
  });
};

export const useQuizWinnerQuery = (id: string) => {
  return useQuery<QuizWinner>({
    queryKey: ["book-quizzes", id],
    queryFn: () => getQuizWinner(id),
  });
};

export const useUpdateQuizWinner = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({
      id,
      userId,
      coupon,
    }: {
      id: number;
      userId: number;
      coupon: number;
    }) => updateQuizWinner(id, userId, coupon),
    onSuccess: () => {
      showSuccessToast(t("quiz_winner_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_updated_quiz_winner"));
    },
  });
};

export const useCreateQuizWinner = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({
      id,
      userId,
      coupon,
    }: {
      id: number;
      userId: number;
      coupon: number;
    }) => createQuizWinner(id, userId, coupon),
    onSuccess: () => {
      showSuccessToast(t("quiz_winner_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_updated_quiz_winner"));
    },
  });
};

export const useDeleteQuizWinner = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteQuizWinner,
    onSuccess: () => {
      showSuccessToast(t("quiz_winner_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_quiz_winner"));
    },
  });
};

export const useQuizzesResultsQuery = ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  return useQuery<QuizIndexResponse>({
    queryKey: ["book-quizzes", page, limit, search],
    queryFn: () => getQuizzesResults(page, limit, search),
  });
};

export const useQuizResultQuery = (id: string) => {
  return useQuery<QuizResult>({
    queryKey: ["book-quizzes", id],
    queryFn: () => getQuizResult(id),
  });
};

export const useCreateQuizResult = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({
      quizId,
      userId,
      total_questions,
      total_correct,
    }: {
      quizId: string;
      userId: string;
      total_questions: string;
      total_correct: string;
    }) => createQuizResult(quizId, userId, total_questions, total_correct),
    onSuccess: () => {
      showSuccessToast(t("quiz_result_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_created_quiz_result"));
    },
  });
};

export const useUpdateQuizResult = (id: string) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({
      quizId,
      userId,
      total_questions,
      total_correct,
    }: {
      total_correct: string;
      total_questions: string;
      quizId: string;
      userId: string;
    }) => updateQuizResult(id, quizId, userId, total_questions, total_correct),
    onSuccess: () => {
      showSuccessToast(t("quiz_result_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_updated_quiz_result"));
    },
  });
};

export const useDeleteQuizResult = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteQuizResult,
    onSuccess: () => {
      showSuccessToast(t("quiz_result_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["book-quizzes"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_quiz_result"));
    },
  });
};
