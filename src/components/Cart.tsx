"use client";
import React, { useEffect, useState } from "react";
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
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = items.length;
  const fee = 1;
  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  useEffect(() => setIsMounted(true), []);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 p-2 flex items-center text-gray-500 hover:text-gray-700">
        <ShoppingCart className="h-6 w-6 flex-shrink-0 " />
        <span className="ml-2 text-sm font-medium">{itemCount}</span>
      </SheetTrigger>
      <SheetContent className="flex flex-col sm:max-w-lg w-full">
        <SheetHeader>
          <SheetTitle>Cart ({isMounted ? itemCount : 0})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="h-[600px] max-h-[700px] w-full p-2">
              {items.map(({ product }) => {
                return (
                  <CartItem
                    key={product.id + Math.random()}
                    product={product}
                  />
                );
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

    // <Sheet>
    //   <SheetTrigger className="group -m-2 flex items-center p-2">
    //     <ShoppingCart
    //       aria-hidden="true"
    //       className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
    //     />
    //     <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
    //       {isMounted ? itemCount : 0}
    //     </span>
    //   </SheetTrigger>
    //   <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
    //     <SheetHeader className="space-y-2.5 pr-6">
    //       <SheetTitle>Cart ({itemCount})</SheetTitle>
    //     </SheetHeader>
    //     {itemCount > 0 ? (
    //       <>
    //         <div className="flex w-full flex-col pr-6">
    //           <ScrollArea className=" max-h-[700px]">
    //             {items.map(({ product }) => (
    //               <CartItem product={product} key={product.id} />
    //             ))}
    //           </ScrollArea>
    //         </div>
    //         <div className="space-y-4 pr-6">
    //           <Separator />
    //           <div className="space-y-1.5 text-sm">
    //             <div className="flex">
    //               <span className="flex-1">Shipping</span>
    //               <span>Free</span>
    //             </div>
    //             <div className="flex">
    //               <span className="flex-1">Transaction Fee</span>
    //               <span>{formatPrice(fee)}</span>
    //             </div>
    //             <div className="flex">
    //               <span className="flex-1">Total</span>
    //               <span>{formatPrice(cartTotal + fee)}</span>
    //             </div>
    //           </div>

    //           <SheetFooter>
    //             <SheetTrigger asChild>
    //               <Link
    //                 href="/cart"
    //                 className={buttonVariants({
    //                   className: "w-full",
    //                 })}
    //               >
    //                 Continue to Checkout
    //               </Link>
    //             </SheetTrigger>
    //           </SheetFooter>
    //         </div>
    //       </>
    //     ) : (
    //       <div className="flex h-full flex-col items-center justify-center space-y-1">
    //         <div
    //           aria-hidden="true"
    //           className="relative mb-4 h-60 w-60 text-muted-foreground"
    //         >
    //           <Image
    //             src="/hippo-empty-cart.png"
    //             fill
    //             alt="empty shopping cart hippo"
    //           />
    //         </div>
    //         <div className="text-xl font-semibold">Your cart is empty</div>
    //         <SheetTrigger asChild>
    //           <Link
    //             href="/products"
    //             className={buttonVariants({
    //               variant: "link",
    //               size: "sm",
    //               className: "text-sm text-muted-foreground",
    //             })}
    //           >
    //             Add items to your cart to checkout
    //           </Link>
    //         </SheetTrigger>
    //       </div>
    //     )}
    //   </SheetContent>
    // </Sheet>
  );
};

export default Cart;
