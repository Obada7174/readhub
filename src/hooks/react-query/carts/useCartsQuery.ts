import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
} from "@/services/carts.service";
import { Cart } from "@/types/carts";

export const useCartsQuery = () => {
  return useQuery<Cart[]>({
    queryKey: ["carts"],
    queryFn: getCarts,
  });
};

export const useCartQuery = (id: number) => {
  return useQuery({
    queryKey: ['cart', id],
    queryFn: () => getCartById(id),
  });
};

export const useCreateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => createCart(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }: { id: number; userId: number }) => updateCart(id, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({ queryKey: ["cart", variables.id] });
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => deleteCart(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts'] }); 
    },
  });
};