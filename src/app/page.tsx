"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { BadgeCheck, Download, Leaf } from "lucide-react";
import Link from "next/link";
import ProductReel from "@/components/ProductReel";

const perks = [
  {
    name: "Instant Download",
    icon: Download,
    desc: "PixelBuddy lets you download your asset as soon as the payment is confirmed, no delay!",
  },
  {
    name: "Quality Check",
    icon: BadgeCheck,
    desc: "All our assets go through a thorough quality check to ensure you get the best product",
  },
  {
    name: "For The Planet",
    icon: Leaf,
    desc: "1% of our business revenue goes towards environmental causes to help facilitate a greener earth",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 text-center max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">
            Your marketplace for high-quality{" "}
            <span className="text-theme">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to PixelBuddy. Every asset on our platform is verified by
            our team to ensure our highest quality standard.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link className={buttonVariants()} href="/products">
              Browse Trending
            </Link>
            <Button className="capitalize " variant="ghost">
              Our quality promise &rarr;
            </Button>
          </div>
        </div>

        {/* TODO: List Products */}

        <ProductReel
          title="Brand New"
          href="/products"
          query={{
            limit: 4,
            sort: "desc",
          }}
        />
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50 py-10">
        <MaxWidthWrapper>
          <h2 className="text-3xl sm:text-5xl mb-8 font-semibold max-w-max mx-auto">
            Why PixelBuddy?
          </h2>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-6 ">
            {perks.map((perk) => {
              return (
                <div
                  key={perk.name}
                  className="text-center max-w-max mx-auto flex flex-col items-center group"
                >
                  <div className="h-16 w-16 rounded-full bg-blue-100 grid place-content-center">
                    {
                      <perk.icon className="text-gray-900 group-hover:scale-110 duration-100" />
                    }
                  </div>
                  <h3 className="mt-6 text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground  max-w-sm">
                    {perk.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
