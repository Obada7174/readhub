'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCouponQuery, useUpdateCoupon } from '@/hooks/react-query/coupons/usequerycoupons';
import CouponForm from '@/components/dashboard/coupons/couponForm';
import { UpdateCouponPayload } from '@/types/coupons';
import { useTranslations } from 'next-intl';
import { showErrorToast, showSuccessToast } from '@/helpers/Toast';

export default function EditCoupon() {
  const t = useTranslations("toastMessages");
  const params = useParams<{ id: string }>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const couponId = parseInt(params.id);
  if (isNaN(couponId)) return <div>{t("invalid_coupon_id")}</div>;

  const { data: coupon, isLoading } = useCouponQuery(couponId);
  const updateCouponMutation = useUpdateCoupon();

  if (isLoading || !coupon) return <div>{t("loading")}</div>;

  const handleUpdate = async (data: UpdateCouponPayload) => {
    try {
      await updateCouponMutation.mutateAsync({ id: couponId, coupon: data });
      showSuccessToast(t("coupon_updated_successfully"));
    } catch (error) {
      showErrorToast(t("failed_to_update_coupon"));
    }
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
