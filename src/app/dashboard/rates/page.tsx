"use client";

import { AlertCircle, Info } from "lucide-react";

const PROCESSING_FEE_PCT = 2.55;
const PROCESSING_FEE_FIXED = 0.25;

export default function RatesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Rates</h1>
        <p className="text-gray-500 mt-1">
          Ol&apos; Colony Golf rates — effective as of golf.tcpara.org
        </p>
      </div>

      {/* Transaction fee notice - matches rate sheet */}
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">Please note</p>
          <ul className="space-y-0.5 list-disc list-inside">
            <li>Cash rates listed below.</li>
            <li>
              Transaction Processing Fee for cards and electronic transfers is not
              included in the prices below.
            </li>
            <li>
              Transaction Processing Fee for cards and electronic transfers:{" "}
              <strong>{PROCESSING_FEE_PCT}% + ${PROCESSING_FEE_FIXED.toFixed(2)}</strong>
              .
            </li>
            <li>
              Tuscaloosa County residents receive a discount on 18 holes w/cart.
              (Discounted rates are listed below.)
            </li>
            <li>
              Must be 16 or older with a valid driver&apos;s license to drive a cart.
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-10">
        {/* Regular rates */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
            <h2 className="font-bold text-gray-900 uppercase tracking-wide">
              Regular rates
            </h2>
          </div>
          <div className="p-5 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Monday–Thursday
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>18 holes with cart</span>
                  <span className="font-semibold text-green-700">$63</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>18 holes walking</span>
                  <span className="font-semibold text-green-700">$47</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>9 holes with cart</span>
                  <span className="font-semibold text-green-700">$47</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>9 holes walking</span>
                  <span className="font-semibold text-green-700">$37</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Weekends & holidays
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Walking on weekends & holidays begins at 1pm.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>18 holes with cart</span>
                  <span className="font-semibold text-green-700">$74</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>18 holes walking (after 1:00)</span>
                  <span className="font-semibold text-green-700">$57</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>9 holes with cart</span>
                  <span className="font-semibold text-green-700">$57</span>
                </li>
                <li className="flex justify-between py-1 border-b border-gray-100">
                  <span>9 holes walking (after 1:00)</span>
                  <span className="font-semibold text-green-700">$47</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Junior rates */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
            <h2 className="font-bold text-gray-900 uppercase tracking-wide">
              Junior rates (17 & under)
            </h2>
          </div>
          <div className="p-5">
            <p className="text-xs text-gray-500 mb-3">
              Must be 16 or older with a valid driver&apos;s license to drive a cart.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>18 holes with cart</span>
                <span className="font-semibold text-green-700">$45</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>18 holes walking</span>
                <span className="font-semibold text-green-700">$30</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>9 holes with cart</span>
                <span className="font-semibold text-green-700">$30</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>9 holes walking</span>
                <span className="font-semibold text-green-700">$20</span>
              </li>
            </ul>
          </div>
        </section>

        {/* TJGA / TJGT rates */}
        <section className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-green-800 text-white px-5 py-3 border-b border-green-700">
            <h2 className="font-bold uppercase tracking-wide">
              Tuscaloosa Junior Golf Academy / Tuscaloosa Junior Golf Team
            </h2>
          </div>
          <div className="p-5">
            <p className="text-xs text-gray-500 mb-2">
              Must present key fob to receive these rates.
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Must be 16 or older with a valid driver&apos;s license to drive a cart.
            </p>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Monday–Sunday
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm">
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>18 holes with cart</span>
                <span className="font-semibold text-green-700">$25</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>18 holes walking</span>
                <span className="font-semibold text-green-700">$10</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>9 holes with cart</span>
                <span className="font-semibold text-green-700">$20</span>
              </li>
              <li className="flex justify-between py-1 border-b border-gray-100">
                <span>9 holes walking</span>
                <span className="font-semibold text-green-700">$10</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Fee reminder */}
        <div className="flex gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" />
          <p>
            Card and electronic transfer payments include a processing fee of{" "}
            <strong>{PROCESSING_FEE_PCT}% + ${PROCESSING_FEE_FIXED.toFixed(2)}</strong>.
            Cash rates are as listed above.
          </p>
        </div>
      </div>
    </div>
  );
}
