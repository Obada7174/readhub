export interface Coupon {
  id: number;
  code: string;
  discount_value: number;
  updated_at: string;
}

export interface UpdateCouponPayload {
  code?: string;
  discount_value?: number;
}