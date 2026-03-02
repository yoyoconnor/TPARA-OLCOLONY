"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { analyticsData } from "@/lib/mock-data";
import {
  TrendingUp,
  Users,
  DollarSign,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const COLORS = ["#16a34a", "#15803d", "#c9a84c", "#166534", "#86efac"];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">
          Cross-division performance metrics and operational insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Revenue (MTD)",
            value: "$102,000",
            change: "+8.5%",
            icon: DollarSign,
            color: "bg-green-50 text-green-700",
          },
          {
            label: "Active Members",
            value: "323",
            change: "+12%",
            icon: Users,
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "Academy Students",
            value: "68",
            change: "+15%",
            icon: GraduationCap,
            color: "bg-yellow-50 text-yellow-700",
          },
          {
            label: "Growth Rate",
            value: "11.2%",
            change: "+2.3%",
            icon: TrendingUp,
            color: "bg-emerald-50 text-emerald-700",
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border border-gray-200 rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.color}`}
              >
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-green-600">
                <ArrowUpRight className="w-3 h-3" />
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-sm text-gray-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Revenue vs Expenses
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={analyticsData.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#16a34a"
                fill="#dcfce7"
                strokeWidth={2}
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#dc2626"
                fill="#fee2e2"
                strokeWidth={2}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Division */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Revenue by Division
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={analyticsData.revenueByDivision}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={2}
                dataKey="value"
              >
                {analyticsData.revenueByDivision.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Enrollment Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Academy Enrollment Trend
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={analyticsData.enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 4, fill: "#16a34a" }}
                name="Students"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Class Attendance */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Class Attendance Rate (%)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analyticsData.classAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, ""]} />
              <Bar dataKey="attendance" fill="#16a34a" radius={[4, 4, 0, 0]} name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Peak Hours */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Course Bookings by Hour
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analyticsData.peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#c9a84c" radius={[4, 4, 0, 0]} name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Membership Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            Membership Distribution
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={analyticsData.membershipBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="count"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {analyticsData.membershipBreakdown.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
