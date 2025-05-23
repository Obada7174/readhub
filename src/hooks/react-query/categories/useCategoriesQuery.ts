import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory
} from "@/services/categories.service";
import { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";

export const useCategoriesQuery = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCategoryQuery = (id: number) => {

  return useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(id),
    enabled: !!id,
    
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

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      showSuccessToast(t("category_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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