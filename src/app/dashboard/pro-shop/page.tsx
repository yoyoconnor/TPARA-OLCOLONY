"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { inventory } from "@/lib/mock-data";

const categories = ["All", "Golf Balls", "Clubs", "Apparel", "Accessories", "Range Supplies"];

export default function ProShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const proShopItems = inventory.filter((i) => i.division === "pro_shop");
  const filtered = proShopItems.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = proShopItems.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );
  const lowStock = proShopItems.filter((i) => i.quantity <= i.reorderLevel);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pro Shop</h1>
        <p className="text-gray-500 mt-1">
          Equipment, apparel, merchandise, and inventory management
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {proShopItems.length}
              </p>
              <p className="text-sm text-gray-500">Products</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ${totalValue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Inventory Value</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">$18,200</p>
              <p className="text-sm text-gray-500">Monthly Sales</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                lowStock.length > 0 ? "bg-red-50" : "bg-green-50"
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${
                  lowStock.length > 0 ? "text-red-600" : "text-green-700"
                }`}
              />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {lowStock.length}
              </p>
              <p className="text-sm text-gray-500">Low Stock Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                category === c
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Category
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Stock
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Price
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => {
                const isLow = item.quantity <= item.reorderLevel;
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`text-sm font-medium ${
                          isLow ? "text-red-600" : "text-gray-900"
                        }`}
                      >
                        {item.quantity}
                      </span>
                      <span className="text-xs text-gray-400 block">
                        min: {item.reorderLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${
                          isLow
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {isLow ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-sm text-green-700 hover:text-green-800 font-medium">
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
