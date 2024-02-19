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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TauthCredentialValidator,
  authCredentialValidator,
} from "@/lib/validator/account-credential-validator";
import { trpc } from "@/trpc/client";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TauthCredentialValidator>({
    resolver: zodResolver(authCredentialValidator),
  });

  const handleFormSubmit = ({
    email,
    password,
  }: TauthCredentialValidator) => {};

  return (
    <>
      <div className="w-full sm:max-w-sm px-8 sm:px-4 pt-20 space-y-2 mx-auto flex flex-col items-center  ">
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
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="self-stretch flex flex-col gap-3.5 pt-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              className={cn({
                "focus-visible:ring-red-500": errors.email,
              })}
              placeholder="you@example.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              className={cn({
                "focus-visible:ring-red-500": errors.password,
              })}
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-500">Sign Up</Button>
        </form>
      </div>
    </>
  );
};

export default Page;
