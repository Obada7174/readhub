import axios from "@/services/axios";

export const toggleFavorite = async (data: { userId: number, bookId: number }): Promise<{ message: string, action: string }> => {
  const response = await axios.post("http://localhost:5000/favorite", data);
  return response.data;
};
