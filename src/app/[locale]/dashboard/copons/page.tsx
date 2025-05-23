'use client';

import DashTable from '@/components/dashboard/DashTable';
import { couponColumns } from '@/components/dashboard/dashcouponsculmn'; // أعمدة الجدول
import { useCouponsQuery } from '@/hooks/react-query/coupons/usequerycoupons'; // جلب البيانات
import { useDeleteCoupon, useUpdateCoupon } from '@/hooks/react-query/coupons/usequerycoupons'; // حذف وتعديل
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CouponsPage() {
  const router = useRouter();


  const couponsQuery = useCouponsQuery();

  const deleteMutation = useDeleteCoupon();

  const updateMutation = useUpdateCoupon();

  return (
    <DashTable
      ITEMS="Coupons"
      ITEM="Copon"
      ADD="coupons/new" 
      columns={couponColumns} 
      isEditable={true} 


      query={{
        data: couponsQuery.data || [],
        isLoading: couponsQuery.isLoading,
        refetch: couponsQuery.refetch,
      }}


      searchQuery={{
        searchFn: async (queryStr: string) => {
          if (!couponsQuery.data) return [];
          return couponsQuery.data.filter(coupon =>
            coupon.code.toLowerCase().includes(queryStr.toLowerCase())
          );
        },
      }}

      
      deleteMutation={{
        mutateAsync: (ids: React.Key[]) =>
          deleteMutation.mutateAsync(ids as number[]),
      }}

    updateMutation={(row: any) => updateMutation.mutateAsync(row)}
    />
  );
}