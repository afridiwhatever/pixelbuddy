import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const { token, to } = searchParams;

  return (
    <div className="mx-auto max-w-max mt-20">
      {token && typeof token === "string" ? (
        <VerifyEmail token={token} />
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <div className="relative h-60 w-60 ">
            <Image src="/hippo-email-sent.png" fill alt="email-sent" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold">Check Your Email</h2>
            <p className="text-muted-foreground pt-2 text-base">
              We&apos;ve sent a verification link to {""}
              {to ? (
                <span className="font-semibold text-slate-800 block">{to}</span>
              ) : (
                "your email"
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
