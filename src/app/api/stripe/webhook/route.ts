import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: true, note: "Webhook secret not configured" });
  }

  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const customerEmail = session.customer_email || session.customer_details?.email;
        const userId = session.metadata?.userId;

        if (userId || customerEmail) {
          const user = userId
            ? await prisma.user.findUnique({ where: { id: userId } })
            : await prisma.user.findUnique({ where: { email: customerEmail || "" } });

          if (user) {
            await prisma.user.update({
              where: { id: user.id },
              data: { isPremium: true },
            });

            await prisma.subscription.create({
              data: {
                userId: user.id,
                stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
                stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
                status: "ACTIVE",
              },
            });
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const dbSub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (dbSub) {
          await prisma.subscription.update({
            where: { id: dbSub.id },
            data: { status: "CANCELED" },
          });

          await prisma.user.update({
            where: { id: dbSub.userId },
            data: { isPremium: false },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
