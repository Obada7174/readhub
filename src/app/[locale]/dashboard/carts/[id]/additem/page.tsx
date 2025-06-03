"use client";

import UseCartItemForm from "@/components/dashboard/carts/addCartItem";

interface Props {
  params: { id: number };
}

export default function AddCartItem({ params: { id } }: Props) {
  return <UseCartItemForm id={id} />;
}
