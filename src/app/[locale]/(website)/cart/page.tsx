/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { LuTrash2 } from "react-icons/lu";
import Button from "@/components/ui/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
    useCartQuery,
    useDeleteCartItem,
    usePayStripeCart,
} from "@/hooks/react-query/carts/useCartsQuery";
import { Book } from "@/types/book";
import { CartItem } from "@/types/carts";

export default function CartPage() {
    const cartJson = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    const cartData = cartJson ? JSON.parse(cartJson) : null;

    const { data: cart, isLoading } = useCartQuery(cartData?.id);
    const { mutate } = useDeleteCartItem();
    const { mutate: payStripe } = usePayStripeCart();
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (cart?.items) {
            setItems(cart.items);
        }
    }, [cart]);

    if (isLoading) {
        return <div className="p-10 text-center">Loading your cart...</div>;
    }

    if (!items || items.length === 0) {
        return (
            <div className="container mx-auto px-4 pb-10 pt-14 text-center">
                <p className="text-xl text-muted-foreground mb-4">
                    Your cart is empty
                </p>
                <Button>
                    <Link href="/books">Continue Shopping</Link>
                </Button>
            </div>
        );
    }
    const subtotal = items.reduce((sum: number, item: CartItem) => {
        const price = Number((item.book as any)?.price ?? 0);
        return sum + (isNaN(price) ? 0 : price);
    }, 0);
    const handleDelete = (id: number) => {
        mutate([id], {
            onSuccess: () => {
                setItems((prev) => prev.filter((i) => i.id !== id));
            },
        });
    };

    return (
        <div className="container mx-auto px-4 pb-10 pt-14">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item: { id: number; book: Book }) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                src={item.book.img}
                                                width={50}
                                                alt=""
                                                height={70}
                                                className="rounded object-cover"
                                            />
                                            <span className="font-medium text-lg">
                                                {item.book.title}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>${item.book.price}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleDelete(item.id)}
                                            variant="default"
                                            size="icon"
                                        >
                                            <LuTrash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-card rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-4">
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${subtotal}</span>
                                </div>
                            </div>
                            <Button onClick={() =>
                                payStripe(subtotal, {
                                    onSuccess: (data: { url: string }) => {
                                        if (data?.url) {
                                            window.open(data.url, "_blank");
                                        }
                                    },
                                })
                            } className="w-full">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
