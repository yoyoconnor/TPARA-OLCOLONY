"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  MapPin,
  Users,
  Star,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";
import { academyClasses, coaches } from "@/lib/mock-data";

export default function AcademyPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredClasses = academyClasses.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.coach.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "beginner" && c.skillLevel.toLowerCase().includes("beginner")) ||
      (filter === "intermediate" && c.skillLevel.toLowerCase().includes("intermediate")) ||
      (filter === "advanced" && c.skillLevel.toLowerCase().includes("advanced"));
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Tuscaloosa Junior Golf Academy
        </h1>
        <p className="text-gray-500 mt-1">
          Comprehensive youth golf programs from ages 5-16 with PGA-certified
          instruction
        </p>
      </div>

      {/* Academy Info Banner */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">
              Brion Hardin Teaching Facility
            </h2>
            <p className="text-green-200/80 text-sm">
              State-of-the-art instruction with Trackman, V1 Pro, and Explainer
              Plane System
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <p className="text-green-300/60">Active Students</p>
              <p className="text-xl font-bold">68</p>
            </div>
            <div>
              <p className="text-green-300/60">Classes Running</p>
              <p className="text-xl font-bold">5</p>
            </div>
            <div>
              <p className="text-green-300/60">Avg. Retention</p>
              <p className="text-xl font-bold">91%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search classes or coaches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {["all", "beginner", "intermediate", "advanced"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-green-700 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
              }`}
            >
              {f === "all" ? "All Levels" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
        {filteredClasses.map((cls) => {
          const spotsLeft = cls.spotsTotal - cls.spotsFilled;
          const fillPct = (cls.spotsFilled / cls.spotsTotal) * 100;
          return (
            <div
              key={cls.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-green-200 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-700" />
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {cls.skillLevel}
                  </span>
                </div>
                <span className="text-xs text-gray-400">Ages {cls.ageGroup}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{cls.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {cls.description}
              </p>
              <div className="space-y-1.5 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  {cls.coach}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {cls.schedule}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {cls.location}
                </div>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">
                    {cls.spotsFilled}/{cls.spotsTotal} spots filled
                  </span>
                  <span
                    className={
                      spotsLeft <= 2
                        ? "text-red-500 font-medium"
                        : "text-gray-400"
                    }
                  >
                    {spotsLeft === 0
                      ? "FULL"
                      : `${spotsLeft} left`}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      fillPct >= 90
                        ? "bg-red-400"
                        : fillPct >= 70
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${cls.price}
                  <span className="text-sm font-normal text-gray-400">
                    /session
                  </span>
                </span>
                <button
                  disabled={spotsLeft === 0}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    spotsLeft === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-700 text-white hover:bg-green-800"
                  }`}
                >
                  {spotsLeft === 0 ? "Waitlist" : "Register"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coaches Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Our Coaches</h2>
          <Link
            href="/dashboard/coaches"
            className="text-sm text-green-700 hover:text-green-800 font-medium inline-flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {coaches.slice(0, 4).map((coach) => (
            <div
              key={coach.id}
              className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-lg shrink-0">
                {coach.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">{coach.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-600">{coach.rating}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-sm text-gray-500">
                    {coach.lessonsGiven} lessons
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {coach.specialties.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
