import { forgotPassword } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
};