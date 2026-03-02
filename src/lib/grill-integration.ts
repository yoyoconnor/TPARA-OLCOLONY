/**
 * GRILL SOFTWARE INTEGRATION POINT
 * ---------------------------------
 * When a grill order is placed and paid, this module is called so you can
 * forward the order to your existing grill/POS software (e.g. kitchen display,
 * POS, or third-party food service system).
 *
 * To integrate:
 * 1. Set env var GRILL_SOFTWARE_WEBHOOK_URL to your endpoint; we will POST
 *    the order payload there when an order is placed, or
 * 2. Implement custom logic below in sendOrderToGrillSoftware() (API client,
 *    database sync, etc.).
 */

export type GrillOrderPayload = {
  orderId: string;
  fulfillment: "pickup" | "deliver_to_cart";
  items: { id: string; name: string; price: number; quantity: number }[];
  totalCents: number;
  createdAt: string; // ISO
  userId?: string | null;
};

/**
 * Called after a grill order is created and payment has succeeded.
 * Integrate with your grill software here: webhook POST, API call, or custom logic.
 */
export async function sendOrderToGrillSoftware(
  payload: GrillOrderPayload
): Promise<void> {
  const webhookUrl = process.env.GRILL_SOFTWARE_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.warn(
          "[grill-integration] Webhook returned",
          res.status,
          await res.text()
        );
      }
    } catch (err) {
      console.warn("[grill-integration] Webhook request failed:", err);
    }
    return;
  }

  // No webhook configured: add your custom grill software integration here.
  // Examples: call your POS API, push to a queue, write to a shared DB, etc.
  if (process.env.NODE_ENV === "development") {
    console.log("[grill-integration] Order ready for grill software:", payload.orderId);
  }
}
