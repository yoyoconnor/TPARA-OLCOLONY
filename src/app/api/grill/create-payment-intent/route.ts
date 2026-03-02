import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe-server";
import { prisma } from "@/lib/db";

export type CreatePaymentIntentBody = {
  amountCents: number;
  fulfillment: "pickup" | "deliver_to_cart";
  items: { id: string; name: string; price: number; quantity: number }[];
  userId?: string | null;
  useSavedPaymentMethodId?: string | null; // pm_xxx for "card on file"
  saveCard?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreatePaymentIntentBody;
    const { amountCents, fulfillment, items, userId, useSavedPaymentMethodId, saveCard } = body;

    if (!amountCents || amountCents < 50) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    let customerId: string | null = null;
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { stripeCustomerId: true, email: true, name: true },
      });
      customerId = user?.stripeCustomerId ?? null;
      // Create customer if we need one (saved card or saving new card) but don't have one
      if (!customerId && (useSavedPaymentMethodId || saveCard) && user) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name ?? undefined,
        });
        customerId = customer.id;
        await prisma.user.update({
          where: { id: userId },
          data: { stripeCustomerId: customer.id },
        });
      }
    }

    // Create PaymentIntent
    const params: {
      amount: number;
      currency: string;
      automatic_payment_methods?: { enabled: boolean };
      customer?: string;
      payment_method?: string;
      confirm?: boolean;
      setup_future_usage?: "off_session";
    } = {
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: !useSavedPaymentMethodId },
    };

    if (customerId) {
      params.customer = customerId;
      if (saveCard && !useSavedPaymentMethodId) {
        params.setup_future_usage = "off_session";
      }
    }

    if (useSavedPaymentMethodId) {
      params.payment_method = useSavedPaymentMethodId;
      params.confirm = true;
    }

    const paymentIntent = await stripe.paymentIntents.create(params);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      stripeCustomerId: customerId ?? paymentIntent.customer ?? undefined,
    });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    const message = err instanceof Error ? err.message : "Payment setup failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
