import { Cart } from "./carts";

export type SignupData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role?: string;
  img?: string;
};

export type SignupResponse = {
  access_token: string;
  user: User;
};


export type OTPVerifyResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
};

export type OTPVerifyPayload = {
  email: string;
  otp: string;
};


export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
  cart: Cart;
};