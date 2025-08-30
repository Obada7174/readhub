import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/services/auth.services";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";
import { useQueryClient } from "@tanstack/react-query";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      showSuccessToast(t("signup_success"));
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error: Error) => {
      showErrorToast(error.message || t("signup_failed"));
    },
  });
};