import axios from "@/services/axios";
import { Book } from "@/types/book";

export const getBook = async (id: string): Promise<Book> => {
  const res = await axios.get("http://localhost:5000/books/" + id);
  return res.data;
};

export const getBooks = async (): Promise<Book[]> => {
  const res = await axios.get("/books");
  return res.data.data;
};

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const res = await axios.post("/books", book);
  return res.data;
};

export const updateBook = async (book: Book): Promise<Book> => {
  const res = await axios.put(`/books/${book.id}`, book);
  return res.data;
};

export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`/books/${id}`);
};
