"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  TauthCredentialValidator,
  authCredentialValidator,
} from "@/lib/validator/account-credential-validator";
import { trpc } from "@/trpc/client";
import { PageProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

const Page = ({ searchParams }: PageProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TauthCredentialValidator>({
    resolver: zodResolver(authCredentialValidator),
  });

  const isSeller = searchParams.as === "seller";
  const { origin } = searchParams;

  const router = useRouter();

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (err) => {
      if (err.message === "UNAUTHORIZED") {
        toast.error("Email or Password Incorrect. Try again!");
        return;
      }

      if (err instanceof ZodError) {
        console.log(err);
        toast.error(err.issues[0].message);
        return;
      }
      toast.error("Something went wrong. Please try again");
      return;
    },
    onSuccess: () => {
      toast.success("Login successful");

      if (isSeller) {
        router.push("/sell");
        return;
      }

      if (origin) {
        router.push(`${origin}`);
        return;
      }

      router.push("/");
    },
  });

  const handleFormSubmit = ({ email, password }: TauthCredentialValidator) => {
    signIn({ email, password });
  };

  const toggleMode = () => {
    if (!isSeller) {
      router.push("?as=seller");
    } else {
      router.replace("/sign-in", undefined);
    }
  };

  return (
    <>
      <div className="w-full sm:max-w-sm px-8 sm:px-4 pt-20 space-y-2 mx-auto flex flex-col items-center  ">
        <Icons.logo className="h-20 w-20" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in to your {isSeller ? "seller" : ""} account
        </h1>

        <Link
          className={cn(
            buttonVariants({
              variant: "link",
              className: "gap-1.5 text-blue-500",
            })
          )}
          href="/sign-up"
        >
          Don&apos;t have an account?
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
              id="email"
            />
            {errors?.email && (
              <div className="text-red-500 text-xs">{errors.email.message}</div>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              className={cn({
                "focus-visible:ring-red-500": errors.password,
              })}
              placeholder="Password"
              type="password"
              id="password"
              {...register("password")}
            />
            {errors?.password && (
              <div className="text-red-500 text-xs">
                {errors.password.message}
              </div>
            )}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-500">
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>

          <div className="flex items-center gap-2">
            <div aria-hidden className="w-full h-[1px] bg-gray-300"></div>
            <div className="text-xs text-muted-foreground">or</div>
            <div aria-hidden className="w-full h-[1px] bg-gray-300"></div>
          </div>

          {isSeller ? (
            <Button variant={"secondary"} type="button" onClick={toggleMode}>
              Continue as buyer instead
            </Button>
          ) : (
            <Button variant={"secondary"} type="button" onClick={toggleMode}>
              Continue as Seller
            </Button>
          )}
        </form>
      </div>
    </>
  );
};

export default Page;
