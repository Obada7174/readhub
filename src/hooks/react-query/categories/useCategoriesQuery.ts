import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} from "@/services/categories.service";
import { CategoriesResponse } from "@/types/category";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

export const useCategoriesQuery = (page = 1, limit = 10, search = "") => {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories", page, limit, search],
    queryFn: () => getCategories(page, limit, search),
  });
};

export const useCategoryQuery = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      showSuccessToast(t("category_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_category"));
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      showSuccessToast(t("category_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", id] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_category"));
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      showSuccessToast(t("category_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_category"));
    },
  });
};
