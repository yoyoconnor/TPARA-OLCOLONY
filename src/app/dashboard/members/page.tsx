"use client";

import { useState } from "react";
import { Search, Users, UserPlus, Mail, Phone, Filter } from "lucide-react";

const members = [
  { id: "m-1", name: "Alex Thompson", email: "alex@example.com", phone: "(205) 555-0142", plan: "Individual Monthly", status: "active", since: "Jun 2025", division: "general" },
  { id: "m-2", name: "Johnson Family", email: "johnson@example.com", phone: "(205) 555-0189", plan: "Family Monthly", status: "active", since: "Mar 2025", division: "general" },
  { id: "m-3", name: "Maria Chen", email: "maria@example.com", phone: "(205) 555-0201", plan: "Individual Annual", status: "active", since: "Jan 2025", division: "general" },
  { id: "m-4", name: "Tyler Williams", email: "tyler@example.com", phone: "(205) 555-0167", plan: "Junior Academy", status: "active", since: "Sep 2025", division: "academy" },
  { id: "m-5", name: "Sophia Davis", email: "sophia@example.com", phone: "(205) 555-0234", plan: "Individual Monthly", status: "active", since: "Nov 2025", division: "general" },
  { id: "m-6", name: "Robert Park", email: "robert@example.com", phone: "(205) 555-0298", plan: "Individual Annual", status: "expiring", since: "Mar 2024", division: "general" },
  { id: "m-7", name: "Emma Wilson", email: "emma@example.com", phone: "(205) 555-0312", plan: "Junior Academy", status: "active", since: "Aug 2025", division: "academy" },
  { id: "m-8", name: "James Lee", email: "james.l@example.com", phone: "(205) 555-0345", plan: "Family Monthly", status: "past_due", since: "Feb 2025", division: "general" },
];

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = members.filter(
    (m) =>
      (m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "all" || m.status === statusFilter)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-500 mt-1">
            Manage member accounts, plans, and communications
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Members", value: "323", color: "text-green-700" },
          { label: "Active", value: "298", color: "text-green-600" },
          { label: "Expiring Soon", value: "18", color: "text-yellow-600" },
          { label: "Past Due", value: "7", color: "text-red-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {["all", "active", "expiring", "past_due"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === s
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
              }`}
            >
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Member</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Contact</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Plan</th>
                <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Since</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold text-xs">
                        {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      {m.email}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3 h-3" />
                      {m.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{m.plan}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      m.status === "active" ? "bg-green-50 text-green-700" :
                      m.status === "expiring" ? "bg-yellow-50 text-yellow-700" :
                      "bg-red-50 text-red-600"
                    }`}>
                      {m.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{m.since}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-green-700 hover:text-green-800 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
