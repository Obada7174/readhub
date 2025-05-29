import axios from "@/services/axios";
import { Coupon } from "@/types/coupons";

// جلب الكوبونات مع دعم البحث والصفحات
export const getCoupons = async (
  page = 1,
  limit = 10,
  search = ""
): Promise<{ data: Coupon[]; total: number }> => {
  const res = await axios.get("http://localhost:5000/coupons", {
    params: { page, limit, search },
  });

  // إذا لم يُرجع السيرفر total، يمكنك حسابه مؤقتًا
  return {
    data: res.data,
    total: res.data.length,
  };
};

// إنشاء كوبون جديد
export const createCoupon = async (coupon: Omit<Coupon, "id">): Promise<Coupon> => {
  const res = await axios.post("/coupons", coupon);
  return res.data;
};

// تحديث كوبون
export const updateCoupon = async (coupon: Coupon): Promise<Coupon> => {
  const res = await axios.patch(`/coupons/${coupon.id}`, coupon);
  return res.data;
};

export const getCoupon = async (id: number): Promise<Coupon> => {
  const res = await axios.get(`/coupons/${id}`);
  return res.data;
};

// حذف كوبونات باستخدام IDs
export const deleteCoupons = async (ids: number[]): Promise<void> => {
  await axios.delete("http://localhost:5000/coupons", {
    data: { ids },
  });
};