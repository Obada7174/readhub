import axios from "@/services/axios";

export const getCarts = async () => {
  const res = await axios.get("/carts");
  return res.data;
};

export const getCartById = async (id: number) => {
  const res = await axios.get(`/carts/${id}`);
  return res.data;
};

export const createCart = async (userId: number) => {
  const res = await axios.post("/carts", { userId });
  return res.data;
};

export const updateCart = async (id: number, userId: number) => {
  const res = await axios.patch(`/carts/${id}`, { userId });
  return res.data;
};

export const deleteCart = async (id: number): Promise<void> => {
  await axios.delete(`/carts/${id}`);
};