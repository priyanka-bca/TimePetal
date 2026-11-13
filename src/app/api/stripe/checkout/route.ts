import { NextResponse } from "next/server";
import { auth } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";
import { stripe, STRIPE_PLANS } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const session = await auth();
    let userEmail = session?.user?.email;
    let userId = session?.user?.id;

    const body = await req.json().catch(() => ({}));
    const plan = (body.plan === "yearly" ? "yearly" : "monthly") as "monthly" | "yearly";

    if (!userId || !userEmail) {
      if (body.email) {
        userEmail = body.email;
        const dbUser = await prisma.user.findUnique({ where: { email: body.email } });
        userId = dbUser?.id;
      }
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in to upgrade to Premium." },
        { status: 401 }
      );
    }

    const host = req.headers.get("origin") || req.headers.get("host") || "https://time-petal.vercel.app";
    const origin = host.startsWith("http") ? host : `https://${host}`;

    const successUrl = `${origin}/dashboard/settings?payment=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/dashboard/settings?payment=cancelled`;

    // If Stripe is configured with a valid secret key
    if (stripe && process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("sample")) {
      const selectedPlan = STRIPE_PLANS[plan];

      const checkoutSession = await stripe.checkout.sessions.create({
        customer_email: userEmail,
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price_data: {
              currency: selectedPlan.currency,
              product_data: {
                name: selectedPlan.name,
                description: "Unlimited AI Companion, Voice Notes, Future Letters, and Aesthetic Themes.",
              },
              unit_amount: selectedPlan.price,
              recurring: {
                interval: selectedPlan.interval,
              },
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId: userId || "",
          plan,
        },
      });

      return NextResponse.json({ url: checkoutSession.url });
    }

    // Development / Demo Fallback: Grant premium status directly so testing works out-of-the-box!
    if (userId) {
      await prisma.user.update({
        where: { id: userId },
        data: { isPremium: true },
      });
    }

    return NextResponse.json({
      url: `${origin}/dashboard/settings?payment=success&demo=true`,
      message: "TimePetal Premium activated successfully (Development Sandbox Mode).",
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to initialize payment checkout session." },
      { status: 500 }
    );
  }
}
