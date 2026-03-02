"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  X,
  MapPin,
  ShoppingBag,
  CreditCard,
  Loader2,
  CheckCircle,
} from "lucide-react";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

/** Card/electronic processing fee per golf.tcpara.org rate sheet */
const PROCESSING_FEE_PCT = 0.0255;
const PROCESSING_FEE_FIXED_CENTS = 25;

type CartItem = { id: string; name: string; price: number; quantity: number };

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalCents: number;
  onSuccess: () => void;
};

function CheckoutForm({
  clientSecret,
  fulfillment,
  items,
  totalCents,
  onSuccess,
  onCancel,
}: {
  clientSecret: string;
  fulfillment: "pickup" | "deliver_to_cart";
  items: CartItem[];
  totalCents: number;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: typeof window !== "undefined" ? window.location.href : "",
        receipt_email: undefined,
      },
    });
    if (confirmError) {
      setError(confirmError.message ?? "Payment failed");
      setLoading(false);
      return;
    }
    const paymentIntentClientSecret = clientSecret;
    const piId = paymentIntentClientSecret.split("_secret_")[0];
    const res = await fetch("/api/grill/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items,
        totalCents,
        fulfillment,
        stripePaymentIntentId: piId,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Order failed");
      setLoading(false);
      return;
    }
    onSuccess();
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 text-red-700 text-sm p-3">
          {error}
        </div>
      )}
      <div className="rounded-lg border border-gray-200 p-4">
        <PaymentElement
          options={{
            layout: "tabs",
            wallets: { applePay: "auto", googlePay: "auto" },
          }}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || loading}
          className="flex-1 py-2.5 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing…
            </>
          ) : (
            <>Pay ${(totalCents / 100).toFixed(2)} & place order</>
          )}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutModal({
  open,
  onClose,
  cart,
  totalCents,
  onSuccess,
}: Props) {
  const [fulfillment, setFulfillment] = useState<"pickup" | "deliver_to_cart">(
    "pickup"
  );
  const [paymentChoice, setPaymentChoice] = useState<"saved" | "new">("new");
  const [savedMethods, setSavedMethods] = useState<
    { id: string; brand: string; last4: string }[]
  >([]);
  const [selectedSavedId, setSelectedSavedId] = useState<string>("");
  const [saveCardForFuture, setSaveCardForFuture] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "new_card" | "processing" | "done">(
    "form"
  );
  const [error, setError] = useState<string | null>(null);

  const processingFeeCents = Math.round(totalCents * PROCESSING_FEE_PCT + PROCESSING_FEE_FIXED_CENTS);
  const totalWithFeeCents = totalCents + processingFeeCents;

  useEffect(() => {
    if (!open) return;
    (async () => {
      const r = await fetch("/api/auth/demo-user");
      const d = await r.json();
      const uid = d.userId ?? null;
      setUserId(uid);
      if (uid) {
        const pmRes = await fetch(
          `/api/grill/payment-methods?userId=${encodeURIComponent(uid)}`
        );
        const pmData = await pmRes.json();
        const list = pmData.paymentMethods ?? [];
        setSavedMethods(list);
        if (list.length) {
          setSelectedSavedId(list[0].id);
          setPaymentChoice("saved");
        } else {
          setPaymentChoice("new");
        }
      } else {
        setPaymentChoice("new");
      }
      setClientSecret(null);
      setStep("form");
      setError(null);
    })();
  }, [open]);

  async function handlePlaceOrder() {
    setError(null);
    if (cart.length === 0) return;

    try {
      const body: {
        amountCents: number;
        fulfillment: "pickup" | "deliver_to_cart";
        items: CartItem[];
        userId?: string | null;
        useSavedPaymentMethodId?: string | null;
        saveCard?: boolean;
      } = {
        amountCents: totalWithFeeCents,
        fulfillment,
        items: cart,
        userId: userId ?? undefined,
        saveCard: paymentChoice === "new" ? saveCardForFuture : undefined,
      };

      if (paymentChoice === "saved" && selectedSavedId) {
        body.useSavedPaymentMethodId = selectedSavedId;
      }

      const res = await fetch("/api/grill/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Could not start payment");
        return;
      }

      if (data.status === "succeeded" && data.paymentIntentId) {
        setStep("processing");
        const orderRes = await fetch("/api/grill/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId ?? null,
            items: cart,
            totalCents: totalWithFeeCents,
            fulfillment,
            stripePaymentIntentId: data.paymentIntentId,
            stripeCustomerId: data.stripeCustomerId ?? undefined,
          }),
        });
        if (!orderRes.ok) {
          const orderData = await orderRes.json().catch(() => ({}));
          setError(orderData.error ?? "Order failed");
          setStep("form");
          return;
        }
        setStep("done");
        onSuccess();
        return;
      }

      if (data.clientSecret && paymentChoice === "new") {
        setClientSecret(data.clientSecret);
        setStep("new_card");
        return;
      }

      setError("Unexpected response from server");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (!open) return null;

  const hasStripe = !!stripePromise && !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Checkout</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Order total with processing fee (card/electronic) */}
          {(step === "form" || step === "new_card") && cart.length > 0 && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${(totalCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mt-1">
                <span>Processing fee (2.55% + $0.25)</span>
                <span>${(processingFeeCents / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 mt-2 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${(totalWithFeeCents / 100).toFixed(2)}</span>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-6">
              <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900">
                Order placed!
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {fulfillment === "pickup"
                  ? "Pick up at the Bounce Back Grille counter."
                  : "We’ll deliver to your cart on the course."}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 w-full py-2.5 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800"
              >
                Done
              </button>
            </div>
          )}

          {(step === "form" || step === "new_card") && (
            <>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  How do you want your order?
                </p>
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center gap-2 p-3 rounded-xl border cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillment === "pickup"}
                      onChange={() => setFulfillment("pickup")}
                      className="text-green-600"
                    />
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Pickup at grill counter</span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 p-3 rounded-xl border cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                    <input
                      type="radio"
                      name="fulfillment"
                      checked={fulfillment === "deliver_to_cart"}
                      onChange={() => setFulfillment("deliver_to_cart")}
                      className="text-green-600"
                    />
                    <ShoppingBag className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Deliver to my cart</span>
                  </label>
                </div>
              </div>

              {step === "form" && (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Payment
                    </p>
                    {!hasStripe && (
                      <p className="text-sm text-amber-600 bg-amber-50 p-2 rounded-lg mb-2">
                        Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY to .env to enable payments.
                      </p>
                    )}
                    {savedMethods.length > 0 && (
                      <div className="space-y-2 mb-3">
                        <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentChoice === "saved"}
                            onChange={() => setPaymentChoice("saved")}
                            className="text-green-600"
                          />
                          <CreditCard className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium">
                            Charge card on file
                          </span>
                        </label>
                        {paymentChoice === "saved" && (
                          <select
                            value={selectedSavedId}
                            onChange={(e) => setSelectedSavedId(e.target.value)}
                            className="ml-6 w-full max-w-xs py-2 px-3 rounded-lg border border-gray-300 text-sm"
                          >
                            {savedMethods.map((pm) => (
                              <option key={pm.id} value={pm.id}>
                                {pm.brand} •••• {pm.last4}
                              </option>
                            ))}
                          </select>
                        )}
                        <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentChoice === "new"}
                            onChange={() => setPaymentChoice("new")}
                            className="text-green-600"
                          />
                          <span className="text-sm font-medium">
                            Use a different card
                          </span>
                        </label>
                        {paymentChoice === "new" && (
                          <label className="flex items-center gap-2 ml-6 mt-1 text-sm text-gray-600">
                            <input
                              type="checkbox"
                              checked={saveCardForFuture}
                              onChange={(e) =>
                                setSaveCardForFuture(e.target.checked)
                              }
                            />
                            Save this card for future orders
                          </label>
                        )}
                      </div>
                    )}
                    {savedMethods.length === 0 && (
                      <p className="text-sm text-gray-500 mb-2">
                        No saved cards. Use the form below to pay and optionally save your card.
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-50 text-red-700 text-sm p-3">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={!hasStripe}
                      className="flex-1 py-2.5 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 disabled:opacity-50"
                    >
                      Continue to payment
                    </button>
                  </div>
                </>
              )}

              {step === "new_card" && clientSecret && stripePromise && (
                <StripeWrapper
                  clientSecret={clientSecret}
                  fulfillment={fulfillment}
                  items={cart}
                  totalCents={totalWithFeeCents}
                  onSuccess={() => {
                    setStep("done");
                    onSuccess();
                  }}
                  onCancel={() => {
                    setClientSecret(null);
                    setStep("form");
                  }}
                />
              )}
            </>
          )}

          {step === "processing" && (
            <div className="py-8 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Completing your order…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StripeWrapper({
  clientSecret,
  fulfillment,
  items,
  totalCents,
  onSuccess,
  onCancel,
}: {
  clientSecret: string;
  fulfillment: "pickup" | "deliver_to_cart";
  items: CartItem[];
  totalCents: number;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: { colorPrimary: "#16a34a" },
    },
  };

  return (
    <div className="stripe-form">
      {stripePromise && (
        <StripeElementsWrapper
          stripePromise={stripePromise}
          options={options}
          clientSecret={clientSecret}
          fulfillment={fulfillment}
          items={items}
          totalCents={totalCents}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

function StripeElementsWrapper({
  stripePromise,
  options,
  clientSecret,
  fulfillment,
  items,
  totalCents,
  onSuccess,
  onCancel,
}: {
  stripePromise: Promise<import("@stripe/stripe-js").Stripe | null>;
  options: StripeElementsOptions;
  clientSecret: string;
  fulfillment: "pickup" | "deliver_to_cart";
  items: CartItem[];
  totalCents: number;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        clientSecret={clientSecret}
        fulfillment={fulfillment}
        items={items}
        totalCents={totalCents}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
}
