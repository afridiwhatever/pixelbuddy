"use client";

import React from "react";
import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const page = () => {
  return (
    <>
      <div className="w-full sm:max-w-sm mx-auto flex flex-col items-center pt-20 space-y-2 px-8 sm:px-4">
        <Icons.logo className="h-20 w-20" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>

        <Link
          className={cn(
            buttonVariants({
              variant: "link",
              className: "gap-1.5 text-blue-500",
            })
          )}
          href="/sign-in"
        >
          Already have an account? Sign-in
          <ArrowRight className="h-4 w-4" />
        </Link>
        <form action="" className=" self-stretch flex flex-col gap-3.5 pt-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              className={cn({
                "focus-visible:ring-red-500": true,
              })}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              className={cn({
                "focus-visible:ring-red-500": true,
              })}
              placeholder="Password"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-500">Sign Up</Button>
        </form>
      </div>
    </>
  );
};

export default page;
