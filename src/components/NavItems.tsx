"use client";

import { useState, useRef, useEffect } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  const close = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useOnClickOutside(navRef, close);

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };
        const isOpen = activeIndex === index;
        return (
          <NavItem
            category={category}
            isAnyOpen={isAnyOpen}
            isOpen={isOpen}
            handleOpen={handleOpen}
            key={category.value}
            close={close}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
