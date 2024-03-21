"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Check, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem } = useCart();

  const router = useRouter();

  // const { user } = useUser();

  // if (!user.email) {
  //   router.push("/sign-in?origin=cart");
  // }

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) {
          router.push(url);
        } else {
          console.log("no url");
        }
      },
    });

  const productIds = items.map(({ product }) => product.id);

  useEffect(() => setIsMounted(true), []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const fee = 1;

  return (
    <div>
      <MaxWidthWrapper className="md:px-4">
        <div className="max-w-2xl lg:max-w-7xl mx-auto mt-16 space-y-12 px-6">
          <h2 className="font-bold text-4xl tracking-tight">Shopping Cart</h2>
          <div className="w-full flex flex-col lg:flex-row lg:items-start gap-14 lg:justify-between">
            {items.length !== 0 && isMounted ? (
              <div className="min-w-[57%]">
                {items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    ({ value }) => value === product.category
                  )?.label;

                  const { image } = product.images[0];

                  return (
                    <div
                      key={product.id + Math.random()}
                      className="flex items-center gap-6 border-y border-gray-200 py-10"
                    >
                      <div className="relative h-24 w-24 aspect-square rounded-lg overflow-hidden">
                        {typeof image !== "string" && isMounted && image.url ? (
                          <Image
                            fill
                            src={image.url}
                            alt="product image"
                            className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        ) : null}
                      </div>
                      <div className="relative text-sm flex-grow">
                        <h3 className="font-medium text-gray-700 hover:text-gray-800">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          Category: {label}
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {formatPrice(product.price)}
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
                          <Button
                            aria-label="remove product"
                            variant="ghost"
                            onClick={() => removeItem(product.id)}
                          >
                            <X className="h-5 w-5" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                <p>{formatPrice(cartTotal)}</p>
              </div>
              <div className="border-y border-gray-200 flex justify-between py-4 text-sm">
                <p className="text-muted-foreground ">Flat Transaction Fee</p>
                <p>{items.length === 0 ? formatPrice(0) : formatPrice(fee)} </p>
              </div>
              <div className="flex justify-between py-4 font-semibold">
                <p>Order Total</p>
                <p>
                  {items.length === 0
                    ? formatPrice(0)
                    : formatPrice(cartTotal + fee)}
                </p>
              </div>
              <Button
                onClick={() => {
                  createCheckoutSession({ productIds });
                }}
                disabled={items.length === 0 || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Checkout"
                )}
              </Button>
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
