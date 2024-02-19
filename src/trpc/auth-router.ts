import { authCredentialValidator } from "../lib/validator/account-credential-validator";
import { getPayloadClient } from "../payload/get-payload";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./trpc";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(authCredentialValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      //   check is user exists
      const payload = await getPayloadClient();

      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (users.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });

      return {
        success: true,
        sentToEmail: email,
      };
    }),
});
