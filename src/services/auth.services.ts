import {User} from "@/types/user"
const API_URL = "http://127.0.0.1:5000";

import axios from "@/services/axios"; 
import { OTPVerifyPayload, OTPVerifyResponse, SignupData, SignupResponse } from "@/types/auth";

export const signupUser = async (data: SignupData): Promise<SignupResponse> => {
  const res = await axios.post("/auth/signup", data);
  return res.data;
};

export const handleGoogleCallback = async (
  url: string
): Promise<SignupResponse> => {
  const res = await axios.get(url);
  return res.data;
};

export const verifyOTP = async ({
  email,
  otp
}: OTPVerifyPayload): Promise<OTPVerifyResponse> => {
  const response = await fetch(`${API_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify OTP");
  }

  return response.json();
};