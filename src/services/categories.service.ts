import axios from "@/services/axios";
import { Category } from "@/types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get("http://127.0.0.1:5000/categories?limit=1000");
  return res.data.data;
};

export const getCategory = async (id: string): Promise<Category> => {
  const res = await axios.get(`http://localhost:5000/categories/${id}`);
  return res.data;
};

export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const res = await axios.post("http://localhost:5000/categories", category);
  return res.data;
};

export const updateCategory = async (category: Category): Promise<Category> => {
  const res = await axios.patch(
    `http://localhost:5000/categories/${category.id}`,
    {
      title: category.title,
      ar_title: category.ar_title,
    }
  );
  return res.data;
};

export const deleteCategory = async (ids: number[]): Promise<void> => {
  await axios.delete("http://127.0.0.1:5000/categories", {
    data: { ids },
  });
};
