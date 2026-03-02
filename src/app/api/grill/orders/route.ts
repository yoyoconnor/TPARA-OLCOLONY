import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe-server";
import { sendOrderToGrillSoftware } from "@/lib/grill-integration";

export type CreateOrderBody = {
  userId?: string | null;
  items: { id: string; name: string; price: number; quantity: number }[];
  totalCents: number;
  fulfillment: "pickup" | "deliver_to_cart";
  stripePaymentIntentId: string;
  stripeCustomerId?: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateOrderBody;
    const {
      userId,
      items,
      totalCents,
      fulfillment,
      stripePaymentIntentId,
      stripeCustomerId,
    } = body;

    if (!items?.length || totalCents < 0 || !stripePaymentIntentId) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const stripe = getStripe();
    const pi = await stripe.paymentIntents.retrieve(stripePaymentIntentId);
    if (pi.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    if (userId && stripeCustomerId) {
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      });
    }

    const order = await prisma.grillOrder.create({
      data: {
        userId: userId ?? null,
        items: JSON.stringify(items),
        totalCents,
        fulfillment,
        stripePaymentIntentId,
        stripeCustomerId: stripeCustomerId ?? null,
        status: "paid",
      },
    });

    // Grill software integration: forward order to POS/kitchen system when configured
    sendOrderToGrillSoftware({
      orderId: order.id,
      fulfillment,
      items,
      totalCents,
      createdAt: order.createdAt.toISOString(),
      userId: userId ?? null,
    }).catch((err) => console.warn("[grill/orders] integration error:", err));

    return NextResponse.json({ orderId: order.id, status: "paid" });
  } catch (err) {
    console.error("orders create error:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
