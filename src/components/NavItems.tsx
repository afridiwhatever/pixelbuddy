"use client";

import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/config";
import NavItem from "./NavItem";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  return (
    <div className=" flex gap-4">
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
          />
        );
      })}
    </div>
  );
};

export default NavItems;
