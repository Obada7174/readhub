'use client';

import DashTable from '@/components/dashboard/DashTable';
import { cartColumns } from '@/components/dashboard/cartcolumn';
import { useCartsQuery } from '@/hooks/react-query/carts/useCartsQuery';
import { useDeleteCart, useUpdateCart } from '@/hooks/react-query/carts/useCartsQuery';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function CartsPage() {
  const router = useRouter();
  const cartsQuery = useCartsQuery();
  const deleteMutation = useDeleteCart();
  const updateMutation = useUpdateCart();

  return (
    <DashTable
      ITEMS="Carts"
      ITEM="Cart"
      ADD="carts/new"
      columns={cartColumns}
      isEditable={false}
      query={{
        data: cartsQuery.data || [],
        isLoading: cartsQuery.isLoading,
        refetch: cartsQuery.refetch,
      }}
      searchQuery={{
        searchFn: async (queryStr: string) => {
          if (!cartsQuery.data) return [];
          return cartsQuery.data.filter((cart) =>
            cart.id.toString().includes(queryStr) ||
            cart.user?.id.toString().includes(queryStr)
          );
        },
      }}
      deleteMutation={{
        mutateAsync: (ids: React.Key[]) => deleteMutation.mutateAsync(ids as number[]),
      }}
      updateMutation={(row: any) => updateMutation.mutateAsync({ id: row.id, userId: row.user.id })}
    />
  );
}