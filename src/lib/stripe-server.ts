import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;

export const stripe = secret
  ? new Stripe(secret, { apiVersion: "2026-02-25.clover" as const })
  : null;

export function getStripe(): Stripe {
  if (!stripe) {
    throw new Error(
      "Stripe is not configured. Add STRIPE_SECRET_KEY to .env for real payments."
    );
  }
  return stripe;
}
