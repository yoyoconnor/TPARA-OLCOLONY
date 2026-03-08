"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandMark from "@/components/brand-mark";

const ROLE_OPTIONS = [
  { label: "Member", value: "member" },
  { label: "Coach / Instructor", value: "coach" },
  { label: "Operational Staff", value: "staff" },
  { label: "Division Manager", value: "division_manager" },
  { label: "Executive Manager", value: "executive_manager" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let finalRole = role;
    let finalName =
      ROLE_OPTIONS.find((r) => r.value === role)?.label ?? "User";

    if (email.trim().toLowerCase() === "crbarbaccia@crimson.ua.edu") {
      finalRole = "division_manager";
      finalName = "Connor Barbaccia (Admin)";
    }

    localStorage.setItem("userRole", finalRole);
    localStorage.setItem("userName", finalName);
    router.push("/dashboard");
  }

  return (
    <div className="brand-shell flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <BrandMark
              light
              align="center"
              subtitle="Operations Platform"
            />
          </Link>
        </div>

        <div className="brand-card rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="brand-input w-full rounded-lg px-4 py-2.5 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="brand-input w-full rounded-lg px-4 py-2.5 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sign in as
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="brand-input w-full rounded-lg bg-white px-4 py-2.5 text-sm"
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Demo mode — select a role to explore
              </p>
            </div>

            <button
              type="submit"
              className="brand-button-primary mt-2 w-full rounded-lg py-2.5 font-medium transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[var(--brand-green)] hover:text-[var(--brand-brown)]"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

