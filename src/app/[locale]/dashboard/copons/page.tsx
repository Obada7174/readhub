'use client';

import DashTable from '@/components/dashboard/DashTable';
import { useCouponColumns } from '@/components/dashboard/dashcouponsculmn';
import {
  useCouponsQuery,
  useDeleteCoupons,
  useUpdateCoupon,
} from '@/hooks/react-query/coupons/usequerycoupons';
import React from 'react';
import { Coupon } from '@/types/coupons';

export default function CouponsPage() {
  const [searchText, setSearchText] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);

  const couponsQuery = useCouponsQuery(page, limit, searchText);
  const deleteMutation = useDeleteCoupons();
  const updateMutation = useUpdateCoupon();

  const columns = useCouponColumns();

  return (
    <DashTable<Coupon>
      ITEMS="Coupons"
      ITEM="Coupon"
      ADD="copons/new"
      columns={columns}
      isEditable={true}
      query={{
        data: couponsQuery.data?.data || [],
        isLoading: couponsQuery.isLoading,
        refetch: couponsQuery.refetch,
        total: couponsQuery.data?.total || 0,
        page,
        setPage,
        limit,
        setLimit,
        setSearch: setSearchText, 
      }}
      deleteMutation={{
        mutateAsync: (ids: React.Key[]) =>
          deleteMutation.mutateAsync(ids.map((id) => Number(id))),
      }}
      updateMutation={async (row: Coupon) => {
        const { id, code, discount_value, updated_at } = row;
        const updatedCoupon = await updateMutation.mutateAsync({
          id,
          coupon: {
            id,
            code,
            discount_value,
            updated_at,
          },
        });
        return updatedCoupon;
      }}
    />
  );
}