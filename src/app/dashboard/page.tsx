"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  Target,
  Clock,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const positive = change >= 0;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-medium ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{changeLabel}</p>
    </div>
  );
}

function QuickAction({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-colors group"
    >
      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
        <Icon className="w-4 h-4 text-green-700" />
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-green-800">
        {label}
      </span>
      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-green-600" />
    </Link>
  );
}

type BookingEvent = { time: string; event: string; type: "tee" | "lesson" | "class"; date: string };

const recentActivity = [
  { text: "New member registration: Williams Family", time: "2 hours ago", type: "member" },
  { text: "Payment received: $149.00 - Family Monthly", time: "3 hours ago", type: "payment" },
  { text: "Class full: Trackman Junior Lab (Friday)", time: "5 hours ago", type: "class" },
  { text: "Pro Shop sale: Titleist Pro V1 (2 dz)", time: "6 hours ago", type: "sale" },
  { text: "Grill order completed: #1247", time: "7 hours ago", type: "grill" },
];

export default function DashboardPage() {
  const [role, setRole] = useState("member");
  const [bookingCount, setBookingCount] = useState<number | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<BookingEvent[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "member");
  }, []);

  useEffect(() => {
    if (role !== "member" && role !== "coach") return;
    (async () => {
      setScheduleLoading(true);
      try {
        const userRes = await fetch("/api/auth/demo-user");
        const { userId } = await userRes.json();
        if (!userId) {
          setBookingCount(0);
          setUpcomingEvents([]);
          return;
        }
        const bookRes = await fetch(`/api/bookings?userId=${encodeURIComponent(userId)}`);
        const { bookings } = await bookRes.json();
        const list: BookingEvent[] = (bookings ?? []).map((b: { type: string; date: string; time: string; details: { bookerName?: string; playerCount?: number; coachName?: string } | null }) => {
          if (b.type === "tee_time") {
            const name = b.details?.bookerName ?? "Tee time";
            const count = b.details?.playerCount ?? 1;
            return { date: b.date, time: b.time, event: `Tee Time - ${name}${count > 1 ? ` (${count})` : ""}`, type: "tee" as const };
          }
          if (b.type === "lesson") {
            const coach = b.details?.coachName ?? "Coach";
            return { date: b.date, time: b.time, event: `Lesson with ${coach}`, type: "lesson" as const };
          }
          return { date: b.date, time: b.time, event: "Booking", type: "class" as const };
        });
        const today = new Date().toISOString().slice(0, 10);
        const upcoming = list.filter((e) => e.date >= today).sort((a, b) => {
          if (a.date !== b.date) return a.date.localeCompare(b.date);
          return a.time.localeCompare(b.time);
        }).slice(0, 10);
        setBookingCount(list.filter((e) => e.date >= today).length);
        setUpcomingEvents(upcoming.length ? upcoming : [
          { time: "—", event: "No upcoming bookings", type: "class", date: today },
        ]);
      } catch {
        setBookingCount(0);
        setUpcomingEvents([{ time: "—", event: "Could not load bookings", type: "class", date: "" }]);
      } finally {
        setScheduleLoading(false);
      }
    })();
  }, [role]);

  const isManager =
    role === "division_manager" || role === "executive_manager";
  const isCoach = role === "coach";
  const isStaff = role === "staff";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isManager
            ? "Operations Overview"
            : isCoach
            ? "Coaching Dashboard"
            : isStaff
            ? "Staff Dashboard"
            : "Welcome Back"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isManager
            ? "Cross-division performance and operations at a glance"
            : "Here's what's happening at Ol' Colony today"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isManager ? (
          <>
            <StatCard
              label="Active Members"
              value="323"
              change={12}
              changeLabel="vs last month"
              icon={Users}
              color="bg-green-50 text-green-700"
            />
            <StatCard
              label="Monthly Revenue"
              value="$94,200"
              change={8.5}
              changeLabel="vs last month"
              icon={DollarSign}
              color="bg-emerald-50 text-emerald-700"
            />
            <StatCard
              label="Academy Students"
              value="68"
              change={15}
              changeLabel="vs last month"
              icon={GraduationCap}
              color="bg-yellow-50 text-yellow-700"
            />
            <StatCard
              label="Today's Tee Times"
              value="42"
              change={5}
              changeLabel="vs last week avg"
              icon={Calendar}
              color="bg-blue-50 text-blue-700"
            />
          </>
        ) : isCoach ? (
          <>
            <StatCard
              label="Active Students"
              value="24"
              change={4}
              changeLabel="vs last month"
              icon={Users}
              color="bg-green-50 text-green-700"
            />
            <StatCard
              label="Lessons This Month"
              value="38"
              change={12}
              changeLabel="vs last month"
              icon={Calendar}
              color="bg-blue-50 text-blue-700"
            />
            <StatCard
              label="Monthly Earnings"
              value="$3,420"
              change={8}
              changeLabel="vs last month"
              icon={DollarSign}
              color="bg-emerald-50 text-emerald-700"
            />
            <StatCard
              label="Student Retention"
              value="94%"
              change={2}
              changeLabel="vs last quarter"
              icon={TrendingUp}
              color="bg-yellow-50 text-yellow-700"
            />
          </>
        ) : (
          <>
            <StatCard
              label="Upcoming Bookings"
              value={bookingCount !== null ? String(bookingCount) : "—"}
              change={0}
              changeLabel="upcoming"
              icon={Calendar}
              color="bg-green-50 text-green-700"
            />
            <StatCard
              label="Lessons Completed"
              value="12"
              change={20}
              changeLabel="this month"
              icon={GraduationCap}
              color="bg-blue-50 text-blue-700"
            />
            <StatCard
              label="Member Since"
              value="Jun 2025"
              change={0}
              changeLabel=""
              icon={Users}
              color="bg-emerald-50 text-emerald-700"
            />
            <StatCard
              label="Rewards Points"
              value="1,240"
              change={15}
              changeLabel="this month"
              icon={TrendingUp}
              color="bg-yellow-50 text-yellow-700"
            />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">
              Today&apos;s Schedule
            </h2>
            <Link
              href="/dashboard/tee-times"
              className="text-sm text-green-700 hover:text-green-800 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {scheduleLoading ? (
              <p className="text-sm text-gray-500 py-4">Loading bookings…</p>
            ) : (
              upcomingEvents.map((evt, i) => (
                <div
                  key={evt.date + evt.time + i}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 text-sm font-medium text-gray-500">
                    {evt.time}
                  </div>
                  <div
                    className={`w-1 h-8 rounded-full ${
                      evt.type === "tee"
                        ? "bg-blue-400"
                        : evt.type === "lesson"
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {evt.event}
                    </p>
                    <p className="text-xs text-gray-400">
                      {evt.type === "tee" ? "Tee time" : evt.type === "lesson" ? "Lesson" : "Booking"}
                      {evt.date ? ` · ${evt.date}` : ""}
                    </p>
                  </div>
                  <Clock className="w-4 h-4 text-gray-300" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <QuickAction
              label="Book a Tee Time"
              href="/dashboard/tee-times"
              icon={Calendar}
            />
            <QuickAction
              label="Browse Academy"
              href="/dashboard/academy"
              icon={GraduationCap}
            />
            <QuickAction
              label="Order from Grill"
              href="/dashboard/grill"
              icon={UtensilsCrossed}
            />
            <QuickAction
              label="Pro Shop"
              href="/dashboard/pro-shop"
              icon={ShoppingBag}
            />
            <QuickAction
              label="Driving Range"
              href="/dashboard/driving-range"
              icon={Target}
            />
            {isManager && (
              <QuickAction
                label="View Analytics"
                href="/dashboard/analytics"
                icon={TrendingUp}
              />
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity (Managers) */}
      {(isManager || isStaff) && (
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.type === "member"
                        ? "bg-green-500"
                        : item.type === "payment"
                        ? "bg-blue-500"
                        : item.type === "class"
                        ? "bg-yellow-500"
                        : item.type === "sale"
                        ? "bg-purple-500"
                        : "bg-orange-500"
                    }`}
                  />
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-4">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
