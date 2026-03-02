"use client";

import { useState } from "react";
import {
  UserCog,
  Clock,
  Search,
  Filter,
  Plus,
  ChevronDown,
} from "lucide-react";
import { staffMembers } from "@/lib/mock-data";

const divisionLabels: Record<string, string> = {
  all: "All Divisions",
  pro_shop: "Pro Shop",
  driving_range: "Driving Range",
  grill: "Grill",
  greens: "Greens",
  operations: "Operations",
};

export default function StaffPage() {
  const [divisionFilter, setDivisionFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = staffMembers.filter(
    (s) =>
      (divisionFilter === "all" || s.division === divisionFilter) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const byDivision = staffMembers.reduce<Record<string, number>>((acc, s) => {
    acc[s.division] = (acc[s.division] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Staff Management
          </h1>
          <p className="text-gray-500 mt-1">
            Schedule, assign tasks, and manage team across divisions
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Staff
        </button>
      </div>

      {/* Division Overview */}
      <div className="grid sm:grid-cols-5 gap-3 mb-8">
        {Object.entries(divisionLabels)
          .filter(([key]) => key !== "all")
          .map(([key, label]) => (
            <div
              key={key}
              className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-green-300 transition-colors"
              onClick={() =>
                setDivisionFilter(divisionFilter === key ? "all" : key)
              }
            >
              <p className="text-2xl font-bold text-gray-900">
                {byDivision[key] || 0}
              </p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
          />
        </div>
        <select
          value={divisionFilter}
          onChange={(e) => setDivisionFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-green-500"
        >
          {Object.entries(divisionLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Staff Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((staff) => (
          <div
            key={staff.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold text-sm">
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {staff.name}
                  </h3>
                  <p className="text-xs text-gray-500">{staff.role}</p>
                </div>
              </div>
              <span
                className={`w-2.5 h-2.5 rounded-full mt-1 ${
                  staff.status === "active"
                    ? "bg-green-500"
                    : staff.status === "off-duty"
                    ? "bg-gray-300"
                    : "bg-yellow-400"
                }`}
              />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Division</span>
                <span className="font-medium text-gray-700 capitalize">
                  {staff.division.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Shift</span>
                <span className="flex items-center gap-1 font-medium text-gray-700">
                  <Clock className="w-3 h-3 text-gray-400" />
                  {staff.shift}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                    staff.status === "active"
                      ? "bg-green-50 text-green-700"
                      : staff.status === "off-duty"
                      ? "bg-gray-100 text-gray-500"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {staff.status.replace("-", " ")}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-xs font-medium transition-colors">
                View Schedule
              </button>
              <button className="flex-1 border border-gray-200 hover:border-green-300 text-gray-700 py-2 rounded-lg text-xs font-medium transition-colors">
                Assign Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
