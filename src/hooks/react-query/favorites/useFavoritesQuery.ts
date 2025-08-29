import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toggleFavorite,
} from "@/services/favorites.service";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";



export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      showErrorToast(t("failed_to_create_favorite"));
    },
  });
};
