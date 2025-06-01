import axios from "@/services/axios";
import { Book, BooksResponse } from "@/types/book";

export const getBook = async (id: string): Promise<Book> => {
  const res = await axios.get("http://localhost:5000/books/" + id);
  return res.data;
};

export const getBooks = async (
  page: number,
  limit: number,
  search: string
): Promise<BooksResponse> => {
  const res = await axios.get("http://127.0.0.1:5000/books", {
    params: { page, limit, search },
  });
  return res.data;
};

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const res = await axios.post("http://localhost:5000/books", book);
  await axios.patch(`http://localhost:5000/books/${res.data.id}/categories`, {
    categoryIds: book.categories,
  });

  return res.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const res = await axios.patch(`http://localhost:5000/books/${book.id}`, book);
  await axios.patch(`http://localhost:5000/books/${book.id}/categories`, {
    categoryIds: book.categories,
  });

  return res.data;
};

export const deleteBooks = async (ids: number[]): Promise<void> => {
  await axios.delete("http://127.0.0.1:5000/books", {
    data: { ids },
  });
};
