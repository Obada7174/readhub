"use client";

import { LuMinus, LuPlus, LuTrash2 } from "react-icons/lu";
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
// import Cookies from "js-cookie";
import { useCartQuery } from "@/hooks/react-query/carts/useCartsQuery";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function CartPage() {
    //   const userCookie = Cookies.get("user");


    //   if (!userCookie) {
    //     return (
    //       <div className="flex h-screen items-center justify-center">
    //         <p className="text-lg">
    //           You must <Link href="/login">login</Link> to view your cart.
    //         </p>
    //       </div>
    //     );
    //   }
    //   const userData = JSON.parse(userCookie);
    //   const userId = userData.id;
    const userId = '1';

    // اجلب بيانات الكارت من الـ API
    const { data: cart, isLoading } = useCartQuery(userId);

    if (isLoading) {
        return <div className="p-10 text-center">Loading your cart...</div>;
    }
    console.log(cart)
    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="container mx-auto px-4 pb-10 pt-14 text-center">
                <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
                <Button>
                    <Link href="/books">Continue Shopping</Link>
                </Button>
            </div>
        );
    }

    // حساب المجموع
    const subtotal = cart.items.reduce(
        (sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity,
        0
    );
    const shipping = 5.99;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 pb-10 pt-14">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* جدول المنتجات */}
                <div className="lg:col-span-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Format</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.items.map((item: { id: Key | null | undefined; book: { coverImage: string | StaticImport; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; format: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; quantity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | Iterable<ReactNode> | null | undefined; }) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Image
                                                src={item.book.coverImage}
                                                alt={item.book.title}
                                                width={50}
                                                height={70}
                                                className="rounded object-cover"
                                            />
                                            <span className="font-medium">{item.book.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="capitalize">{item.format}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="outline" size="icon">
                                                <LuMinus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button variant="outline" size="icon">
                                                <LuPlus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    {/* <TableCell>${item.price.toFixed(2)}</TableCell> */}
                                    {/* <TableCell>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </TableCell> */}
                                    <TableCell>
                                        <Button variant="default" size="icon">
                                            <LuTrash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* ملخص الطلب */}
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                {/* <span>${subtotal.toFixed(2)}</span> */}
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                {/* <span>${shipping.toFixed(2)}</span> */}
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    {/* <span>${total.toFixed(2)}</span> */}
                                </div>
                            </div>
                            <Button className="w-full">Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
