import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "@/services/books.service";
import { Book } from "@/types/book";

export const useBookQuery = (id: string) => {
  return useQuery<Book>({
    queryKey: ["book", id],
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
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["books"] }),
  });
};
