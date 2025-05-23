import axios from "@/services/axios"; 
import { Coupon } from "@/types/coupons"; 

export const getCoupons = async () => {
  const res = await axios.get("/coupons");
  return res.data;
};

export const createCoupon = async (coupon: Omit<Coupon, "id">): Promise<Coupon> => {
  const res = await axios.post("/coupons", coupon);
  return res.data;
};


export const updateCoupon = async (coupon: Coupon): Promise<Coupon> => {
  const res = await axios.patch(`/coupons/${coupon.id}`, coupon);
  return res.data;
};


export const deleteCoupon = async (id: number): Promise<void> => {
  await axios.delete(`/coupons/${id}`);
};