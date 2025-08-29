import axios from "@/services/axios";

export const getCarts = async () => {
  const res = await axios.get("http://localhost:5000/carts");
  return res.data;
};

export const getCartById = async (id: string) => {
  const res = await axios.get(`http://localhost:5000/carts/${id}`);
  return res.data;
};



export const createCart = async (userId: number) => {
  const res = await axios.post("http://localhost:5000/carts", { userId });
  return res.data;
};

export const payStripeCart = async (amount: number) => {
  const res = await axios.post("http://localhost:5000/payment/checkout", { amount });
  return res.data;
};

export const createCartItem = async ({
  id,
  bookId,
}: {
  id: number;      // cart id
  bookId: number;  // book id
}) => {
  const res = await axios.post("http://localhost:5000/cart-item", {
    cart: id,
    book: bookId,
  });
  return res.data;
};

export const updateCart = async (
  id: number,
  userId: number,
  status: string
) => {
  const res = await axios.patch(`http://localhost:5000/carts/${id}`, {
    userId,
    status,
  });
  return res.data;
};

export const deleteCart = async (ids: number[]): Promise<void> => {
  await axios.delete("http://localhost:5000/carts", {
    data: { ids },
  });
};

export const deleteCartItem = async (ids: number[]): Promise<void> => {
  await axios.delete("http://127.0.0.1:5000/cart-item", {
    data: { ids },
  });
};
