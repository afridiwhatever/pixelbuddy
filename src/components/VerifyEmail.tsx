"use client";

import { trpc } from "@/trpc/client";
import { VerifyEmailProps } from "@/types";

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  return <div>Verification in progress</div>;
};

export default VerifyEmail;
