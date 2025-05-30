import axios from "@/services/axios"; 
import { LoginCredentials, LoginResponse, OTPVerifyPayload, OTPVerifyResponse, SignupData, SignupResponse } from "@/types/auth";

const API_URL = "http://127.0.0.1:5000";

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



export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};