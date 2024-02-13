"use client";
import React from "react";
import { NavItemProps } from "@/types";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavItem = ({ category, isAnyOpen, isOpen, handleOpen }: NavItemProps) => {
  console.log(isOpen);
  return (
    <div className="relative flex items-center">
      <Button
        onClick={handleOpen}
        variant={isOpen ? "secondary" : "ghost"}
        className="gap-1.5"
      >
        {category.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-all text-muted-foreground", {
            "-rotate-180": isOpen,
          })}
        />
      </Button>
    </div>
  );
};

export default NavItem;
