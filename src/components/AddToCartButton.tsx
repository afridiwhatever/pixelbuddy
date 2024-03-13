"use client";
import { Button } from "./ui/button";
import { Product } from "@/payload/payload-types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Check, Loader } from "lucide-react";

const AddToCartButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = () => {
    setIsSubmitting(true);
  };

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;

    if (isSubmitting) {
      timeout1 = setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 500);
    }
    if (isSuccess) {
      timeout2 = setTimeout(() => {
        setIsSuccess(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isSubmitting, isSuccess]);

  let buttonContent;

  if (isSubmitting) {
    buttonContent = <Loader className="animate-spin" />;
  } else if (isSuccess) {
    buttonContent = (
      <span className="flex items-center gap-1">
        Added! <Check className="h-4 w-4" />
      </span>
    );
  } else {
    buttonContent = "Add to cart";
  }

  return (
    <Button onClick={handleClick} className={cn(className)}>
      {buttonContent}
    </Button>
  );
};

export default AddToCartButton;
