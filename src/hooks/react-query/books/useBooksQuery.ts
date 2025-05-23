import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "@/services/books.service";
import { Book } from "@/types/book";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

export const useBookQuery = (id: string) => {
  return useQuery<Book>({
    queryKey: ["books", { id }],
    queryFn: () => getBook(id),
  });
};

export const useBooksQuery = () => {
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      showSuccessToast(t("book_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_book"));
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      showSuccessToast(t("book_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_book"));
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      showSuccessToast(t("book_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_book"));
    },
  });
};