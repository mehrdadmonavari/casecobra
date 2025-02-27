"use server";

import { db } from "@/db";
import { Order } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BASE_PRICE } from "@/constants/base-price";
import { PRODUCT_PRICES } from "@/constants/product-prices";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession({ configId }: { configId: string }) {
   const configuration = await db.configuration.findUnique({ where: { id: configId } });
   if (!configuration) throw new Error("no such configuration found");

   const { getUser } = getKindeServerSession();
   const user = await getUser();
   if (!user) throw new Error("You need to be loged in!");

   const { finish, material } = configuration;
   let price = BASE_PRICE;
   if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
   if (material === "polycarbonate") price += PRODUCT_PRICES.material.polycarbonate;

   let order: Order | undefined = undefined;
   const existingOrder = await db.order.findFirst({
      where: {
         userId: user.id,
         configurationId: configuration.id,
      },
   });

   if (existingOrder) {
      order = existingOrder;
   } else {
      order = await db.order.create({
         data: {
            amount: price / 100,
            userId: user.id,
            configurationId: configuration.id,
         },
      });
   }

   const product = await stripe.products.create({
      name: "Custom iPhone case",
      images: [configuration.croppedImageUrl!],
      default_price_data: {
         currency: "USD",
         unit_amount: price,
      },
   });

   const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?order-id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
      payment_method_types: ["card", "paypal"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["US", "DE", "RU", "EE"] },
      metadata: {
         userId: user.id,
         orderId: order.id,
      },
      line_items: [{ price: product.default_price as string, quantity: 1 }],
   });

   return { url: stripeSession.url };
}
