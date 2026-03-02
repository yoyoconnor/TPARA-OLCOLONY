"use client";

import { useState } from "react";
import {
  UtensilsCrossed,
  Search,
  Star,
  Clock,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";
import { menuItems } from "@/lib/mock-data";
import CheckoutModal from "./CheckoutModal";

type CartItem = { id: string; name: string; price: number; quantity: number };

const categoryLabels: Record<string, string> = {
  all: "All Items",
  appetizer: "Appetizers",
  entree: "Entrees",
  sandwich: "Sandwiches",
  beverage: "Beverages",
  dessert: "Desserts",
};

export default function GrillPage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filtered = menuItems.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  function addToCart(item: { id: string; name: string; price: number }) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map((c) =>
          c.id === id ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
      return prev.filter((c) => c.id !== id);
    });
  }

  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const totalCents = Math.round(cartTotal * 100);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  function handleCheckoutSuccess() {
    setCart([]);
    setCheckoutOpen(false);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">The Grill</h1>
        <p className="text-gray-500 mt-1">
          Order food and beverages for pickup or delivery to course
        </p>
      </div>

      {/* Grill Banner */}
      <div className="bg-gradient-to-r from-yellow-700 to-yellow-800 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Now Open</h2>
            <p className="text-yellow-200/80 text-sm mt-1">
              Kitchen open 10:00 AM – 6:00 PM · Member pricing active
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-200" />
            <span className="text-sm">Est. wait: 12 min</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Menu */}
        <div className="flex-1">
          {/* Search & Categories */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  category === key
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-200 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      {item.popular && (
                        <span className="flex items-center gap-0.5 text-xs bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.available ? (
                    <button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                        })
                      }
                      className="flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400">Unavailable</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-5 h-5 text-green-700" />
              <h2 className="font-semibold text-gray-900">Your Order</h2>
              {cartCount > 0 && (
                <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <UtensilsCrossed className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                            })
                          }
                          className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Member discount applied
                  </p>
                </div>
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg font-medium transition-colors"
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        totalCents={totalCents}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
}
