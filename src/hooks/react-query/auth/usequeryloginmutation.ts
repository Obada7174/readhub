import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.services";

export const useLoginMutation = () => {
  const router = useRouter();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("cart", JSON.stringify(data.cart));
      showSuccessToast(t("login_successful"));
      router.push("/en/panel");
    },
    onError: (error: Error) => {
      showErrorToast(error.message || t("login_failed"));
    },
  });
};