"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Receipt,
  DollarSign,
  ArrowUpRight,
  Download,
  ChevronRight,
} from "lucide-react";
import { transactions, membershipPlans } from "@/lib/mock-data";

export default function BillingPage() {
  const [role, setRole] = useState("member");

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "member");
  }, []);

  const isManager =
    role === "division_manager" || role === "executive_manager";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isManager ? "Billing & Financial Overview" : "Billing & Payments"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isManager
            ? "Revenue tracking, transactions, and commission management"
            : "Manage your membership, view invoices, and payment history"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {isManager ? (
          <>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    $94,200
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-700" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                8.5% vs last month
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Coach Commissions (MTD)
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    $2,340
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-yellow-700" />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                15% TPARA commission rate
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Payment Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    99.2%
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                3 failed transactions this month
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Plan</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    ParaPro Membership
                  </p>
                </div>
                <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Billed on the 5th · Renews monthly
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Amount</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    $199.00
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-700" />
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    •••• 4242
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-2">Visa · Expires 08/27</p>
            </div>
          </>
        )}
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
          <button className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-800 font-medium">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Description
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Division
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Amount
                </th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {txn.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {txn.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                      {txn.division.replace("_", " ")}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-right text-sm font-medium ${
                      txn.amount < 0 ? "text-red-600" : "text-green-700"
                    }`}
                  >
                    {txn.amount < 0 ? "-" : "+"}$
                    {Math.abs(txn.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        txn.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : txn.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Membership Plans (for members) */}
      {!isManager && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Upgrade Your Plan
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-green-300 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-400">
                    /{plan.interval === "monthly" ? "mo" : plan.interval === "annual" ? "yr" : "term"}
                  </span>
                </p>
                <ul className="space-y-1.5 mb-4">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <ChevronRight className="w-3 h-3 text-green-600 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="w-full border border-green-600 text-green-700 hover:bg-green-50 py-2 rounded-lg text-sm font-medium transition-colors">
                  Switch Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
