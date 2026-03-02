"use client";

import { Target, Clock, Users, Zap, CreditCard } from "lucide-react";

const rangeOptions = [
  { name: "Small Bucket", balls: 30, price: 5, icon: "🪣" },
  { name: "Medium Bucket", balls: 60, price: 9, icon: "🪣" },
  { name: "Large Bucket", balls: 100, price: 14, icon: "🪣" },
  { name: "Jumbo Bucket", balls: 150, price: 18, icon: "🪣" },
];

const bays = [
  { id: 1, status: "available", type: "Standard" },
  { id: 2, status: "occupied", type: "Standard" },
  { id: 3, status: "available", type: "Standard" },
  { id: 4, status: "occupied", type: "Standard" },
  { id: 5, status: "available", type: "Standard" },
  { id: 6, status: "available", type: "Standard" },
  { id: 7, status: "occupied", type: "Covered" },
  { id: 8, status: "available", type: "Covered" },
  { id: 9, status: "occupied", type: "Covered" },
  { id: 10, status: "available", type: "Covered" },
  { id: 11, status: "occupied", type: "Trackman" },
  { id: 12, status: "available", type: "Trackman" },
];

const schedule = [
  { time: "6:00 AM", event: "Range Opens", capacity: "Low" },
  { time: "8:00 AM", event: "Morning Rush", capacity: "High" },
  { time: "10:00 AM", event: "Lesson Block - Coach Marcus", capacity: "Medium" },
  { time: "12:00 PM", event: "Midday", capacity: "Medium" },
  { time: "2:00 PM", event: "Junior Academy Practice", capacity: "High" },
  { time: "4:00 PM", event: "After-work Rush", capacity: "High" },
  { time: "6:00 PM", event: "Range Closes", capacity: "—" },
];

export default function DrivingRangePage() {
  const available = bays.filter((b) => b.status === "available").length;
  const occupied = bays.filter((b) => b.status === "occupied").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Driving Range</h1>
        <p className="text-gray-500 mt-1">
          Practice facilities, bay reservations, and range tokens
        </p>
      </div>

      {/* Range Status */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Range Status: Open
            </h2>
            <p className="text-green-200/80 text-sm mt-1">
              12 bays total · Covered &amp; standard options · Trackman
              technology available
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <p className="text-green-300/60">Available</p>
              <p className="text-xl font-bold text-green-300">{available}</p>
            </div>
            <div>
              <p className="text-green-300/60">Occupied</p>
              <p className="text-xl font-bold">{occupied}</p>
            </div>
            <div>
              <p className="text-green-300/60">Hours</p>
              <p className="font-semibold">6AM - 6PM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bay Map */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">Bay Availability</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
            {bays.map((bay) => (
              <div
                key={bay.id}
                className={`relative p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  bay.status === "available"
                    ? "bg-green-50 border-green-200 hover:border-green-400 hover:shadow-md"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <p className="text-lg font-bold text-gray-900">#{bay.id}</p>
                <p className="text-xs text-gray-500">{bay.type}</p>
                {bay.type === "Trackman" && (
                  <Zap className="absolute top-1.5 right-1.5 w-3 h-3 text-yellow-500" />
                )}
                <div
                  className={`w-2 h-2 rounded-full mx-auto mt-1.5 ${
                    bay.status === "available" ? "bg-green-500" : "bg-red-400"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Available
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              Occupied
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-yellow-500" />
              Trackman Bay
            </div>
          </div>

          {/* Daily Schedule */}
          <h2 className="font-semibold text-gray-900 mt-8 mb-4">
            Today&apos;s Schedule
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {schedule.map((slot, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 w-20">
                    {slot.time}
                  </span>
                  <span className="text-sm text-gray-600">{slot.event}</span>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    slot.capacity === "High"
                      ? "bg-red-50 text-red-600"
                      : slot.capacity === "Medium"
                      ? "bg-yellow-50 text-yellow-600"
                      : slot.capacity === "Low"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-50 text-gray-400"
                  }`}
                >
                  {slot.capacity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Range Tokens Purchase */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">
            Purchase Range Balls
          </h2>
          <div className="space-y-3">
            {rangeOptions.map((opt) => (
              <div
                key={opt.name}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{opt.name}</h3>
                  <span className="text-lg font-bold text-green-700">
                    ${opt.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {opt.balls} range balls
                </p>
                <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                  <CreditCard className="w-4 h-4" />
                  Purchase
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Member Benefit
            </h3>
            <p className="text-sm text-green-700">
              Members get unlimited range access included with their
              membership. Range balls available at the counter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
