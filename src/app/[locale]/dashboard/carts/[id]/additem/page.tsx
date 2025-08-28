"use client";

import UseCartItemForm from "@/components/dashboard/carts/addCartItem";
import { useParams } from "next/navigation";

export default function AddCartItem() {
  const params = useParams<{ id: string }>();
  const itemId = parseInt(params.id);

  return <UseCartItemForm id={itemId} />;
}
