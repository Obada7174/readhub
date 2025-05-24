import axios from "@/services/axios";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get("http://localhost:5000/categories");
  return res.data.data;
};

export const getCategory = async (id: number): Promise<Category> => {
  const res = await axios.get(`/categories/${id}`);
  return res.data;
};

export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const res = await axios.post("/categories", category);
  return res.data;
};

export const updateCategory = async (category: Category): Promise<Category> => {
  const res = await axios.patch(`/categories/${category.id}`, category);
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`/categories/${id}`);
};
