import { Media, Product } from "@/payload/payload-types";
import React from "react";
import Image from "next/image";

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];
  return (
    <div className="relative aspect-square h-16 w-16 rounded-lg overflow-hidden mb-2">
      {typeof image !== "string" && image.url ? (
        <Image
          src={image.url}
          alt={product.name}
          fill
          className="absolute object-cover"
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CartItem;
