import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../payload/get-payload";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(
      z.object({
        productIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { productIds } = input;

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      const filteredProducts = products.filter((prod) => Boolean(prod.id));

      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: filteredProducts,
          user: user.id,
        },
      });

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
        const stripeSession = await stripe.checkout.sessions.create({
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          mode: "payment",
          payment_method_types: ["card", "paypal"],
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        });

        return { url: stripeSession.url };
      } catch (error) {
        console.log(error);
        return {
          url: null,
        };
      }
    }),
});
