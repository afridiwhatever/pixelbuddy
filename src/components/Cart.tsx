"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import CartItem from "./CartItem";

const Cart = () => {
  const { items } = useCart();
  console.log(items);
  const [isMounted, setIsMounted] = useState(true);
  const itemCount = items.length;
  const fee = 1;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 p-2 flex items-center text-gray-500 hover:text-gray-700">
        <ShoppingCart className="h-6 w-6 flex-shrink-0 " />
        <span className="ml-2 text-sm font-medium">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex flex-col sm:max-w-lg w-full">
        <SheetHeader>
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="h-[500px] w-full p-2">
              {items.map(({ product }) => {
                return <CartItem key={product.id} product={product} />;
              })}
            </ScrollArea>

            <div className="space-y-6">
              <Separator />
              <div className="space-y-4 p-3  text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full  bg-green-500 hover:bg-green-400",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/hippo-empty-cart.png"
                fill
                alt="empty shopping cart hippo"
              />
            </div>

            <div className="text-xl font-semibold">Your cart is empty</div>

            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
