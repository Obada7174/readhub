// useResendOTPMutation.ts

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ResendOTPVariables {
  email: string;
}

export const useResendOTPMutation = () => {
  return useMutation({
    mutationFn: ({ email }: ResendOTPVariables) => {
      return axios.post("http://127.0.0.1:5000/auth/resend-otp", {
        email, 
      });
    },
  });
};