import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../payload/get-payload";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";
import { TRPCError } from "@trpc/server";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("req reached here");
      const { user } = ctx;
      const { productIds } = input;
      console.log("ids", productIds);
      const payload = await getPayloadClient();
      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      console.log("products", products);
      const filteredProducts = products.filter((prod) => Boolean(prod.id));
      console.log("Filtered", filteredProducts);
      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: filteredProducts.map((prod) => prod.id),
          user: user.id,
        },
      });

      console.log("order", order);

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      filteredProducts.forEach((prod) => {
        line_items.push({
          price: prod.priceId!,
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 3,
          },
        });
      });

      line_items.push({
        price: "price_1Ov8NnIy8n9hKOHimvqB8oiZ",
        quantity: 1,
        adjustable_quantity: {
          enabled: false,
        },
      });

      try {
        console.log("start stripe session req");
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          mode: "payment",
          payment_method_types: ["card"],
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        });

        console.log(stripeSession.url);
        return { url: stripeSession.url };
      } catch (error) {
        console.log(error);
        return {
          url: "null",
        };
      }
    }),

  pollOrderStatus: privateProcedure
    .input(
      z.object({
        orderId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { orderId } = input;

      const payload = await getPayloadClient();

      const { docs: orders } = await payload.find({
        collection: "orders",
        where: {
          id: {
            equals: orderId,
          },
        },
      });

      if (!orders.length) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [order] = orders;

      return { isPaid: order._isPaid };
    }),
});
