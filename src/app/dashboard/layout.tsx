"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BrandMark from "@/components/brand-mark";
import Logo from "@/components/logo";
import {
  LayoutDashboard,
  GraduationCap,
  ShoppingBag,
  UtensilsCrossed,
  Target,
  Users,
  Calendar,
  CreditCard,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Leaf,
  UserCog,
  ClipboardList,
  Receipt,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["member", "coach", "staff", "division_manager", "executive_manager"] },
  { label: "Academy", href: "/dashboard/academy", icon: GraduationCap, roles: ["member", "coach", "division_manager", "executive_manager"] },
  { label: "Tee Times", href: "/dashboard/tee-times", icon: Calendar, roles: ["member", "staff", "division_manager", "executive_manager"] },
  { label: "Pro Shop", href: "/dashboard/pro-shop", icon: ShoppingBag, roles: ["member", "staff", "division_manager", "executive_manager"] },
  { label: "The Grill", href: "/dashboard/grill", icon: UtensilsCrossed, roles: ["member", "staff", "division_manager", "executive_manager"] },
  { label: "Driving Range", href: "/dashboard/driving-range", icon: Target, roles: ["member", "staff", "division_manager", "executive_manager"] },
  { label: "Coaches", href: "/dashboard/coaches", icon: Users, roles: ["member", "coach", "division_manager", "executive_manager"] },
  { label: "My Schedule", href: "/dashboard/schedule", icon: ClipboardList, roles: ["coach", "staff"] },
  { label: "Course & Greens", href: "/dashboard/greens", icon: Leaf, roles: ["staff", "division_manager", "executive_manager"] },
  { label: "Staff", href: "/dashboard/staff", icon: UserCog, roles: ["division_manager", "executive_manager"] },
  { label: "Members", href: "/dashboard/members", icon: Users, roles: ["division_manager", "executive_manager"] },
  { label: "Rates", href: "/dashboard/rates", icon: Receipt, roles: ["member", "staff", "division_manager", "executive_manager"] },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard, roles: ["member", "coach", "division_manager", "executive_manager"] },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["division_manager", "executive_manager"] },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell, roles: ["member", "coach", "staff", "division_manager", "executive_manager"] },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["member", "coach", "staff", "division_manager", "executive_manager"] },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<string>("member");
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedName = localStorage.getItem("userName");
    if (!storedRole) {
      router.push("/login");
      return;
    }
    setRole(storedRole);
    if (storedName) setUserName(storedName);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    router.push("/");
  }

  const filteredNav = navItems.filter((item) => item.roles.includes(role));

  const roleLabels: Record<string, string> = {
    member: "Member",
    coach: "Coach / Instructor",
    staff: "Operational Staff",
    division_manager: "Division Manager",
    executive_manager: "Executive Manager",
  };

  return (
    <div className="min-h-screen bg-[rgba(247,241,231,0.45)]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } brand-shell`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex h-22 items-start justify-between border-b border-white/10 px-4 py-4">
            <Link href="/dashboard">
              <BrandMark light compact subtitle="" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white/70 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {filteredNav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-white/16 text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <item.icon className="w-4.5 h-4.5 shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User section */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/14 text-sm font-semibold text-white">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {userName}
                </p>
                <p className="truncate text-xs text-white/56">
                  {roleLabels[role] || role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 text-sm text-white/62 transition-colors hover:text-white"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <a
              href="https://thecontech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full border-t border-white/10 pt-3 text-xs text-white/70 transition-colors hover:text-[var(--brand-green)]"
            >
              Built by Contech
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-[rgba(78,50,39,0.1)] bg-white/92 backdrop-blur">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[rgba(78,50,39,0.7)] hover:text-[var(--brand-brown)] lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-gray-900">
                {filteredNav.find(
                  (item) =>
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(item.href))
                )?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/notifications"
                className="relative text-[rgba(78,50,39,0.5)] transition-colors hover:text-[var(--brand-brown)]"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-md bg-[var(--brand-green)] text-[10px] font-bold text-white">
                  3
                </span>
              </Link>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--brand-cream)] text-[var(--brand-brown)] font-semibold text-xs">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
