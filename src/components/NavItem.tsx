"use client";
import React, { useState } from "react";
import { NavItemProps } from "@/types";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NavItem = ({ category, isAnyOpen, isOpen, handleOpen }: NavItemProps) => {
  return (
    <div>
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

        {isOpen ? (
          //   <div
          //     className={cn(
          //       "bg-red-300 absolute top-full h-72 w-[700px] rounded-md text-sm text-muted-foreground",
          //       {
          //         "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
          //       }
          //     )}
          //   ></div>

          <div
            className={`bg-red-300 absolute top-full h-72 w-[700px] rounded-md text-sm text-muted-foreground ${
              isAnyOpen !== false
                ? "animate-in fade-in-10 slide-in-from-top-5"
                : ""
            }`}
          ></div>
        ) : //   <div
        //     className={`bg-red-300 absolute top-full h-72 w-[700px] rounded-md text-sm text-muted-foreground animate-in fade-in-10 slide-in-from-top-5`}
        //   ></div>

        null}
      </div>
    </div>
  );
};

export default NavItem;
