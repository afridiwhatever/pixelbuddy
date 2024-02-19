import { z } from "zod";

export const authCredentialValidator = z.object({
  email: z.string().email({
    message: "Invalid Email Address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export type TauthCredentialValidator = z.infer<typeof authCredentialValidator>;
