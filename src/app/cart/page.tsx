"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem } = useCart();

  console.log(items);

  useEffect(() => setIsMounted(true), []);

  return (
    <div>
      <MaxWidthWrapper className="md:px-4">
        <div className="max-w-2xl lg:max-w-7xl mx-auto mt-16 space-y-12 px-6">
          <h2 className="font-bold text-4xl tracking-tight">Shopping Cart</h2>
          <div className="w-full flex flex-col lg:flex-row lg:items-start gap-14 lg:justify-between">
            {items.length !== 0 && isMounted ? (
              <div className="min-w-[57%]">
                <div className="flex items-center gap-6 border-y border-gray-200 py-10">
                  <div className="relative h-24 w-24 aspect-square rounded-lg overflow-hidden">
                    <Image
                      src="/ass.jpg"
                      fill
                      alt="product-image"
                      className=""
                    />
                  </div>
                  <div className="relative text-sm flex-grow">
                    <h3 className="font-medium text-gray-700 hover:text-gray-800">
                      Organic Celery
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Category: Icons
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      $3.00
                    </p>

                    <div className="flex items-center pt-2">
                      <Check
                        aria-hidden="true"
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                      />
                      <p className="ml-2 text-sm text-muted-foreground">
                        Eligible for instant delivery
                      </p>
                    </div>

                    <div className="absolute right-0 top-0 ">
                      <Button aria-label="remove product" variant="ghost">
                        <X className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 border-y border-gray-200 py-10">
                  <div className="relative h-24 w-24 aspect-square rounded-lg overflow-hidden">
                    <Image
                      src="/ass.jpg"
                      fill
                      alt="product-image"
                      className=""
                    />
                  </div>
                  <div className="relative text-sm flex-grow">
                    <h3 className="font-medium text-gray-700 hover:text-gray-800">
                      Organic Celery
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Category: Icons
                    </p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      $3.00
                    </p>

                    <div className="flex items-center pt-2">
                      <Check
                        aria-hidden="true"
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                      />
                      <p className="ml-2 text-sm text-muted-foreground">
                        Eligible for instant delivery
                      </p>
                    </div>

                    <div className="absolute right-0 top-0 ">
                      <Button aria-label="remove product" variant="ghost">
                        <X className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed min-w-[57%] border-zinc-200 rounded-lg flex justify-center items-center flex-col py-14">
                <Image
                  src="/hippo-empty-cart.png"
                  alt="empty shopping cart hippo"
                  height={160}
                  width={160}
                />
                <h2 className="text-2xl font-bold mt-4 mb-1">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            )}
            <div className="bg-gray-50 min-w-[38%] rounded-lg p-6 space-y-1 ">
              <h3 className="text-lg font-semibold">Order summary</h3>
              <div className="flex justify-between py-4 text-sm">
                <p className="text-muted-foreground">Subtotal</p>
                <p>$0.00</p>
              </div>
              <div className="border-y border-gray-200 flex justify-between py-4 text-sm">
                <p className="text-muted-foreground ">Flat Transaction Fee</p>
                <p>$1.00</p>
              </div>
              <div className="flex justify-between py-4 font-semibold">
                <p>Order Total</p>
                <p>$1.00</p>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <div aria-hidden className="border-b border-zinc-200 mt-20 mb-48"></div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;