"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-green-900 z-50 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-green-800">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <span className="text-white font-bold text-sm">
                Ol&apos; Colony
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-green-300 hover:text-white"
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
                          ? "bg-white/15 text-white"
                          : "text-green-200/70 hover:bg-white/10 hover:text-white"
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
          <div className="p-4 border-t border-green-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-green-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
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
                <p className="text-green-300/60 text-xs truncate">
                  {roleLabels[role] || role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-green-300/60 hover:text-white text-sm transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <a
              href="https://thecontech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 pt-3 border-t border-green-800 text-green-400/60 hover:text-green-300 text-xs transition-colors w-full"
            >
              Built by Contech
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
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
                className="relative text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </Link>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold text-xs">
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
