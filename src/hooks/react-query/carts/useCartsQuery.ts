import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  createCartItem,
  deleteCartItem,
} from "@/services/carts.service";
import { Cart } from "@/types/carts";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";
import { useTranslations } from "next-intl";

export const useCartsQuery = () => {
  return useQuery<Cart[]>({
    queryKey: ["carts"],
    queryFn: getCarts,
  });
};

export const useCartQuery = (id: string) => {
  return useQuery({
    queryKey: ["cart", id],
    queryFn: () => getCartById(id),
  });
};

export const useCreateCart = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (userId: number) => createCart(userId),
    onSuccess: () => {
      showSuccessToast(t("cart_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_cart"));
    },
  });
};

export const useCreateCartItem = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({
      id,
      bookId,
    }: {
      id: number;
      bookId: number;
    }) => createCartItem({ id, bookId }),

    onSuccess: (_, variables) => {
      showSuccessToast(t("cartitem_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["carts", variables.id] });
    },

    onError: () => {
      showErrorToast(t("failed_to_create_cartitem"));
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({
      id,
      userId,
      status,
    }: {
      id: number;
      userId: number;
      status: "paid" | "unpaid";
    }) => updateCart(id, userId, status),
    onSuccess: (_, variables) => {
      showSuccessToast(t("cart_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["cart", variables.id] });
    },
    onError: () => {
      showErrorToast(t("failed_to_updated_cart"));
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (ids: number[]) => deleteCart(ids),
    onSuccess: () => {
      showSuccessToast(t("cart_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_cart"));
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: (ids: number[]) => deleteCartItem(ids),
    onSuccess: () => {
      showSuccessToast(t("cartitem_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_cartitem"));
    },
  });
};
