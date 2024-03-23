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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TauthCredentialValidator>({
    resolver: zodResolver(authCredentialValidator),
  });

  const router = useRouter();

  const { user } = useUser();

  if (user.email) {
    router.push("/");
    router.refresh();
  }

  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("This email is already in use. Sign in instead?");
        return;
      }

      if (err instanceof ZodError) {
        console.log(err);
        toast.error(err.issues[0].message);
        return;
      }

      toast.error("Something went wrong. Please try again");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}`);
      router.push(`/verify-email?to=${sentToEmail}`);
      // setTimeout(() => {
      //   router.push(`/verify-email?to=${sentToEmail}`);
      // }, 1);
    },
  });

  const handleFormSubmit = ({ email, password }: TauthCredentialValidator) => {
    mutate({ email, password });
  };

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
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default Page;
