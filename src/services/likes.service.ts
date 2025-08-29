import axios from "@/services/axios";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLike = async (data: any): Promise<any> => {
  const response = await axios.post("http://localhost:5000/likes", data);
  return response.data;
};

export const deleteReply = async (id: number): Promise<void> => {
  await axios.delete(`/replies/${id}`);
};
