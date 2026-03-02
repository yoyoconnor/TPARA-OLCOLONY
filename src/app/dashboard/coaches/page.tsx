"use client";

import { useState } from "react";
import { Star, Clock, Award, Users, DollarSign, X, Loader2 } from "lucide-react";
import { coaches } from "@/lib/mock-data";

const LESSON_TIMES = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
];

function getNextDays(count: number): { label: string; date: string }[] {
  const out: { label: string; date: string }[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
    out.push({ label, date: dateStr });
  }
  return out;
}

export default function CoachesPage() {
  const [lessonModal, setLessonModal] = useState<{ coach: (typeof coaches)[0] } | null>(null);
  const [requestDate, setRequestDate] = useState("");
  const [requestTime, setRequestTime] = useState(LESSON_TIMES[0]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const dateOptions = getNextDays(14);

  async function handleSubmitLesson() {
    if (!lessonModal) return;
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const userRes = await fetch("/api/auth/demo-user");
      const { userId } = await userRes.json();
      if (!userId) {
        setError("Please sign in to book a lesson.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/bookings/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          coachId: lessonModal.coach.id,
          coachName: lessonModal.coach.name,
          requestedDate: requestDate || dateOptions[0]?.date,
          requestedTime: requestTime,
          note: note.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setSuccess(data.message ?? "Lesson request submitted.");
      setRequestDate("");
      setRequestTime(LESSON_TIMES[0]);
      setNote("");
      setTimeout(() => {
        setLessonModal(null);
        setSuccess(null);
      }, 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Coaches &amp; Instructors
        </h1>
        <p className="text-gray-500 mt-1">
          PGA-certified professionals ready to elevate your game
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Coach Header */}
            <div className="bg-gradient-to-r from-green-800 to-green-900 p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {coach.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {coach.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-green-100 text-sm">
                      {coach.rating} rating
                    </span>
                    <span className="text-green-300/50">·</span>
                    <span className="text-green-200/70 text-sm">
                      {coach.lessonsGiven.toLocaleString()} lessons
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {coach.bio}
              </p>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {coach.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {coach.certifications.map((c) => (
                    <span
                      key={c}
                      className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-full font-medium"
                    >
                      <Award className="w-3 h-3" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-t border-b border-gray-100">
                <div className="text-center">
                  <DollarSign className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900">
                    ${coach.hourlyRate}
                  </p>
                  <p className="text-xs text-gray-400">per hour</p>
                </div>
                <div className="text-center">
                  <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900">
                    {coach.lessonsGiven}
                  </p>
                  <p className="text-xs text-gray-400">lessons</p>
                </div>
                <div className="text-center">
                  <Star className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900">
                    {coach.rating}
                  </p>
                  <p className="text-xs text-gray-400">rating</p>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Availability
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {coach.availability.map((a) => (
                    <span
                      key={a}
                      className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      <Clock className="w-3 h-3" />
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLessonModal({ coach });
                  const opts = getNextDays(14);
                  setRequestDate(opts[0]?.date ?? "");
                }}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg font-medium text-sm transition-colors"
              >
                Book a Lesson
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson booking modal */}
      {lessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Request lesson with {lessonModal.coach.name}
              </h3>
              <button
                type="button"
                onClick={() => { setLessonModal(null); setError(null); setSuccess(null); }}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {success ? (
              <p className="text-green-700 text-sm py-4">{success}</p>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <select
                      value={requestDate}
                      onChange={(e) => setRequestDate(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg border border-gray-300 text-sm"
                    >
                      {dateOptions.map((opt) => (
                        <option key={opt.date} value={opt.date}>{opt.label} ({opt.date})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select
                      value={requestTime}
                      onChange={(e) => setRequestTime(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg border border-gray-300 text-sm"
                    >
                      {LESSON_TIMES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Note (optional)</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Any preferences or questions"
                      rows={2}
                      className="w-full py-2 px-3 rounded-lg border border-gray-300 text-sm resize-none"
                    />
                  </div>
                </div>
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => { setLessonModal(null); setError(null); }}
                    className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitLesson}
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      "Submit request"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
