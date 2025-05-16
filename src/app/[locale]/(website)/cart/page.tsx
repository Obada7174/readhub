"use client";

import { useState } from 'react';
import { LuMinus, LuPlus, LuTrash2 } from 'react-icons/lu';
import Button  from '@/components/ui/Button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Link } from '@/i18n/navigation';

// Temporary mock data
const initialCart = [
    {
        id: '1',
        title: 'The Midnight Library',
        format: 'paperback',
        price: 24.99,
        quantity: 1,
        coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    },
    {
        id: '4',
        title: 'The Psychology of Money',
        format: 'ebook',
        price: 14.99,
        quantity: 1,
        coverImage: 'https://images.unsplash.com/photo-1554774853-b415df9eeb92?auto=format&fit=crop&q=80&w=400',
    },
];

export default function CartPage() {
    const [cart, setCart] = useState(initialCart);

    const updateQuantity = (id: string, change: number) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;

    return (
        <div className="container mx-auto px-4 pb-10 pt-14">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
                    <Button >
                        <Link href="/books">Continue Shopping</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                                {cart.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item.coverImage}
                                                    alt={item.title}
                                                    className="h-16 w-12 object-cover rounded"
                                                />
                                                <span className="font-medium">{item.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="capitalize">{item.format}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                >
                                                    <LuMinus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                >
                                                    <LuPlus className="h-4 w-4"/>
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="default"
                                                size="icon"
                                                onClick={() => removeItem(item.id)}
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
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button className="w-full">Proceed to Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}