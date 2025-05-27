// src/hooks/react-query/auth/useOtpVerifyMutation.ts

import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "@/services/auth.services";
import { useTranslations } from "next-intl";
import { showErrorToast, showSuccessToast } from "@/helpers/Toast";
import { useRouter } from "next/navigation";

export const useVerifyOTPMutation = () => {
  const router = useRouter();
  const t = useTranslations("toastMessages");

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyOTP({ email, otp }),
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      showSuccessToast(t("verification_successful"));
      router.push("/"); 
    },
    onError: (error: Error) => {
      showErrorToast(error.message || t("verification_failed"));
    },
  });
};