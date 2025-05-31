'use client';

import { useCouponQuery, useCouponsQuery } from '@/hooks/react-query/coupons/usequerycoupons';
import { useUpdateCoupon } from '@/hooks/react-query/coupons/usequerycoupons';
import CouponForm from '@/components/dashboard/coupons/couponForm';
import { useParams } from 'next/navigation';
import { Coupon, UpdateCouponPayload } from '@/types/coupons';

export default function EditCoupon() {
  const params = useParams<{ id: string }>();
  const couponId = parseInt(params.id);
  const { data: coupon, isLoading } = useCouponQuery(couponId);
  const updateCouponMutation = useUpdateCoupon();

  if (isLoading || !coupon) return <div>loading</div>;

  const handleUpdate = async (data: UpdateCouponPayload) => {
    await updateCouponMutation.mutateAsync({ id: couponId, coupon: data });
  };

  return (
    <CouponForm
      mode="edit"
      defaultValues={{
        code: coupon.code,
        discount_value: coupon.discount_value,
      }}
      onSubmit={handleUpdate}
    />
  );
}