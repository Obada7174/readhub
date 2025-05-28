import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUsers,
  getUser,
} from "@/services/users.service";
import { UpdateUserPayload, UsersResponse } from "@/types/user";
import { useTranslations } from "next-intl";
import { showErrorToast,showSuccessToast } from "@/helpers/Toast";


export const useUsersQuery = (page = 1, limit = 10, search = '') => {
  return useQuery<UsersResponse>({
    queryKey: ['users', page, limit, search],
    queryFn: () => getUsers(page, limit, search),
  });
};
export const useUserQuery = (id: number) => {

  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
    
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      showSuccessToast(t("user_created_successfully"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_user"));
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserPayload }) =>
      updateUser(id, data),
    onSuccess: () => {
      showSuccessToast(t("user_updated_successfully"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_update_user"));
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      showSuccessToast(t("user_deleted_successfully"));
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_delete_user"));
    },
  });
};