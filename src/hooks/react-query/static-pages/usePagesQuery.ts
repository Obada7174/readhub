import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPages,
  createPage,
  updatePage,
  deletePages,
  getPage,
} from "@/services/static-pages.service";
import { UpdatePagePayload, PageResponse } from "@/types/static-page";
import { useTranslations } from "next-intl";
import { showErrorToast,showSuccessToast } from "@/helpers/Toast";

export const usePagesQuery = (page = 1, limit = 10, search = '') => {
  return useQuery<PageResponse>({
    queryKey: ['static-pages', page, limit, search],
    queryFn: () => getPages(page, limit, search),
  });
};
export const usePageQuery = (id: number) => {

  return useQuery({
    queryKey: ['static-page', id],
    queryFn: () => getPage(id),
    enabled: !!id,
    
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createPage,
    onSuccess: () => {
      showSuccessToast(t("page_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["static-pages"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_page"));
    },
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePagePayload }) =>
      updatePage(id, data),
    onSuccess: () => {
      showSuccessToast(t("page_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["static-pages"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_page"));
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deletePages,
    onSuccess: () => {
      showSuccessToast(t("page_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["static-pages"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_page"));
    },
  });
};