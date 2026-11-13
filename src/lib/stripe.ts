import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-03-25.acacia" as unknown as undefined,
      typescript: true,
    })
  : null;

export const STRIPE_PLANS = {
  monthly: {
    name: "TimePetal Premium Monthly",
    price: 499, // $4.99 in cents
    currency: "usd",
    interval: "month" as const,
    priceId: process.env.STRIPE_PRICE_ID_MONTHLY || "price_monthly_default",
  },
  yearly: {
    name: "TimePetal Premium Yearly",
    price: 3999, // $39.99 in cents (saves 33%)
    currency: "usd",
    interval: "year" as const,
    priceId: process.env.STRIPE_PRICE_ID_YEARLY || "price_yearly_default",
  },
};
