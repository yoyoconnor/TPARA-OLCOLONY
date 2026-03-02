"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-green-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
              <span className="text-white font-bold">OC</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white">Ol&apos; Colony Golf Course</h1>
          <p className="text-green-200/70 text-sm mt-1">Operations Platform</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
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
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm bg-white"
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
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg font-medium transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-green-700 hover:text-green-800 font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-green-200/70 hover:text-white text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

