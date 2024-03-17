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
import { useRouter } from "next/navigation";

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { items, removeItem } = useCart();

  const router = useRouter();

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

// "use client";

// import { Button } from "@/components/ui/button";
// import { PRODUCT_CATEGORIES } from "@/config";
// import { useCart } from "@/hooks/use-cart";
// import { cn, formatPrice } from "@/lib/utils";
// import { trpc } from "@/trpc/client";
// import { Check, Loader2, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const Page = () => {
//   const { items, removeItem } = useCart();

//   const router = useRouter();

//   const { mutate: createCheckoutSession, isLoading } =
//     trpc.payment.createSession.useMutation({
//       onSuccess: ({ url }) => {
//         if (url) router.push(url);
//       },
//     });

//   const productIds = items.map(({ product }) => product.id);

//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const cartTotal = items.reduce(
//     (total, { product }) => total + product.price,
//     0
//   );

//   const fee = 1;

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Shopping Cart
//         </h1>

//         <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//           <div
//             className={cn("lg:col-span-7", {
//               "rounded-lg border-2 border-dashed border-zinc-200 p-12":
//                 isMounted && items.length === 0,
//             })}
//           >
//             <h2 className="sr-only">Items in your shopping cart</h2>

//             {isMounted && items.length === 0 ? (
//               <div className="flex h-full flex-col items-center justify-center space-y-1">
//                 <div
//                   aria-hidden="true"
//                   className="relative mb-4 h-40 w-40 text-muted-foreground"
//                 >
//                   <Image
//                     src="/hippo-empty-cart.png"
//                     fill
//                     loading="eager"
//                     alt="empty shopping cart hippo"
//                   />
//                 </div>
//                 <h3 className="font-semibold text-2xl">Your cart is empty</h3>
//                 <p className="text-muted-foreground text-center">
//                   Whoops! Nothing to show here yet.
//                 </p>
//               </div>
//             ) : null}

//             <ul
//               className={cn({
//                 "divide-y divide-gray-200 border-b border-t border-gray-200":
//                   isMounted && items.length > 0,
//               })}
//             >
//               {isMounted &&
//                 items.map(({ product }) => {
//                   const label = PRODUCT_CATEGORIES.find(
//                     (c) => c.value === product.category
//                   )?.label;

//                   const { image } = product.images[0];

//                   return (
//                     <li key={product.id} className="flex py-6 sm:py-10">
//                       <div className="flex-shrink-0">
//                         <div className="relative h-24 w-24">
//                           {typeof image !== "string" && image.url ? (
//                             <Image
//                               fill
//                               src={image.url}
//                               alt="product image"
//                               className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
//                             />
//                           ) : null}
//                         </div>
//                       </div>

//                       <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                         <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                           <div>
//                             <div className="flex justify-between">
//                               <h3 className="text-sm">
//                                 <Link
//                                   href={`/product/${product.id}`}
//                                   className="font-medium text-gray-700 hover:text-gray-800"
//                                 >
//                                   {product.name}
//                                 </Link>
//                               </h3>
//                             </div>

//                             <div className="mt-1 flex text-sm">
//                               <p className="text-muted-foreground">
//                                 Category: {label}
//                               </p>
//                             </div>

//                             <p className="mt-1 text-sm font-medium text-gray-900">
//                               {formatPrice(product.price)}
//                             </p>
//                           </div>

//                           <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
//                             <div className="absolute right-0 top-0">
//                               <Button
//                                 aria-label="remove product"
//                                 onClick={() => removeItem(product.id)}
//                                 variant="ghost"
//                               >
//                                 <X className="h-5 w-5" aria-hidden="true" />
//                               </Button>
//                             </div>
//                           </div>
//                         </div>

//                         <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                           <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

//                           <span>Eligible for instant delivery</span>
//                         </p>
//                       </div>
//                     </li>
//                   );
//                 })}
//             </ul>
//           </div>

//           <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
//             <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

//             <div className="mt-6 space-y-4">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-gray-600">Subtotal</p>
//                 <p className="text-sm font-medium text-gray-900">
//                   {isMounted ? (
//                     formatPrice(cartTotal)
//                   ) : (
//                     <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
//                   )}
//                 </p>
//               </div>

//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <div className="flex items-center text-sm text-muted-foreground">
//                   <span>Flat Transaction Fee</span>
//                 </div>
//                 <div className="text-sm font-medium text-gray-900">
//                   {isMounted ? (
//                     formatPrice(fee)
//                   ) : (
//                     <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <div className="text-base font-medium text-gray-900">
//                   Order Total
//                 </div>
//                 <div className="text-base font-medium text-gray-900">
//                   {isMounted ? (
//                     formatPrice(cartTotal + fee)
//                   ) : (
//                     <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6">
//               <Button
//                 disabled={items.length === 0 || isLoading}
//                 onClick={() => createCheckoutSession({ productIds })}
//                 className="w-full"
//                 size="lg"
//               >
//                 {isLoading ? (
//                   <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
//                 ) : null}
//                 Checkout
//               </Button>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
