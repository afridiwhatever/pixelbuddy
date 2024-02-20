"use client";
// why do I have to use this here? Without this, getting errors

import { trpc } from "@/trpc/client";
import { VerifyEmailProps } from "@/types";
import { XCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  return (
    <div>
      {isLoading && (
        <div className="text-center ">
          <Loader2 className="text-zinc-300 h-8 w-8 animate-spin mx-auto mb-2" />
          <h2 className="text-xl font-bold">Verifying...</h2>
          {/* todo: implement email resend feature here  */}
          <p className="text-muted-foreground text-sm">
            This won&apos;t take long.
          </p>
        </div>
      )}
      {data?.success && (
        <div className="flex flex-col gap-4 items-center">
          <div className="relative h-60 w-60 ">
            <Image src="/hippo-email-sent.png" fill alt="email-sent" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">You&apos;re all set</h2>
            {/* todo: set up redirection feature here. */}
            <p className="text-muted-foreground pt-2 text-base">
              Thank you for verifying your email!
            </p>
            <div>
              <Link
                className={buttonVariants({ className: "mt-4 w-36" })}
                href="/sign-in"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
      {isError && (
        <div className="text-center ">
          <XCircle className="text-red-500 h-8 w-8 mx-auto mb-2" />
          <h2 className="text-xl font-bold">There was a problem</h2>
          {/* implement email resend feature here  */}
          <p className="text-muted-foreground text-sm">
            This token is not valid or might be expired. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
