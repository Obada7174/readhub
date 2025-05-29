import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupons,
  getCoupon,
  
} from "@/services/coupons.service";
import { Coupon } from "@/types/coupons";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

export const useCouponsQuery = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["coupons", page, limit, search],
    queryFn: () => getCoupons(page, limit, search),
  });
};

export const useCouponQuery = (id: number) => {
  return useQuery({
    queryKey: ["coupon", id],
    queryFn: () => getCoupon(id),
    enabled: !!id,
  });
};


export const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      showSuccessToast(t("coupon_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_coupon"));
    },
  });
};


export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, coupon }: { id: number; coupon: Partial<Coupon> }) => {
      const updatedCoupon: Coupon = {
        id,
        code: coupon.code ?? "",
        discount_value: coupon.discount_value ?? 0,
        updated_at: new Date().toISOString(),
      };
      return updateCoupon(updatedCoupon);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
};
export const useDeleteCoupons = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteCoupons,
    onSuccess: () => {
      showSuccessToast(t("coupon_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_coupon"));
    },
  });
};