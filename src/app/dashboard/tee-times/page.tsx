"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Settings,
  CalendarPlus,
  Trash2,
} from "lucide-react";

type TeeTimeSlot = {
  id: string;
  date: string;
  time: string;
  players: number;
  maxPlayers: number;
  status: string;
  bookedBy: string | null;
  eventTitle?: string | null;
};

type Schedule = { firstTeeTime: string; lastTeeTime: string } | null;
type PrivateEvent = { id: string; date: string; startTime: string; endTime: string; title: string; notes?: string | null };

function getDates(): { label: string; date: string }[] {
  const out: { label: string; date: string }[] = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const dateStr = `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : `${weekday} ${m}/${day}`;
    out.push({ label, date: dateStr });
  }
  return out;
}

/** "7:00 AM" -> "7 AM", "12:00 PM" -> "12 PM" */
function hourLabel(time: string): string {
  const [part, ampm] = time.split(" ");
  const h = part.split(":")[0];
  const hour = parseInt(h, 10);
  if (ampm?.toUpperCase() === "PM" && hour !== 12) return `${hour} PM`;
  if (ampm?.toUpperCase() === "AM" && hour === 12) return "12 AM";
  return `${hour} ${ampm ?? ""}`;
}

function getHourGroups(slots: TeeTimeSlot[]): { hour: string; slots: TeeTimeSlot[] }[] {
  const byHour = new Map<string, TeeTimeSlot[]>();
  for (const s of slots) {
    const label = hourLabel(s.time);
    if (!byHour.has(label)) byHour.set(label, []);
    byHour.get(label)!.push(s);
  }
  const order = [
    "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
  ];
  return order.filter((h) => byHour.has(h)).map((hour) => ({ hour, slots: byHour.get(hour)! }));
}

const dates = getDates();

export default function TeeTimesPage() {
  const [role, setRole] = useState<string>("member");
  const [selectedDate, setSelectedDate] = useState(dates[0]?.date ?? "");
  const [playersFilter, setPlayersFilter] = useState(0);
  const [slots, setSlots] = useState<TeeTimeSlot[]>([]);
  const [schedule, setSchedule] = useState<Schedule>(null);
  const [privateEvents, setPrivateEvents] = useState<PrivateEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingSlot, setBookingSlot] = useState<TeeTimeSlot | null>(null);
  const [playerCount, setPlayerCount] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [hoursOpen, setHoursOpen] = useState(false);
  const [firstTee, setFirstTee] = useState("7:00 AM");
  const [lastTee, setLastTee] = useState("5:00 PM");
  const [savingHours, setSavingHours] = useState(false);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStart, setEventStart] = useState("8:00 AM");
  const [eventEnd, setEventEnd] = useState("12:00 PM");
  const [eventNotes, setEventNotes] = useState("");
  const [savingEvent, setSavingEvent] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "member");
  }, []);

  const isAdmin = role === "staff" || role === "division_manager" || role === "executive_manager";

  const fetchSettings = useCallback(async () => {
    const res = await fetch("/api/tee-times/settings");
    const data = await res.json();
    if (res.ok) {
      setSchedule({ firstTeeTime: data.firstTeeTime, lastTeeTime: data.lastTeeTime });
      setFirstTee(data.firstTeeTime);
      setLastTee(data.lastTeeTime);
    }
  }, []);

  const fetchTeeTimes = useCallback(async (date: string) => {
    if (!date) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tee-times?date=${encodeURIComponent(date)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load tee times");
      setSlots(data.teeTimes ?? []);
      if (data.schedule) setSchedule(data.schedule);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load tee times");
      setSlots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPrivateEvents = useCallback(async (date: string) => {
    if (!date || !isAdmin) return;
    const res = await fetch(`/api/tee-times/private-events?date=${encodeURIComponent(date)}`);
    const data = await res.json();
    if (res.ok) setPrivateEvents(data.events ?? []);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin && !schedule) fetchSettings();
  }, [isAdmin, schedule, fetchSettings]);

  useEffect(() => {
    if (selectedDate) {
      fetchTeeTimes(selectedDate);
      if (isAdmin) fetchPrivateEvents(selectedDate);
    }
  }, [selectedDate, fetchTeeTimes, isAdmin, fetchPrivateEvents]);

  const filtered = slots.filter(
    (tt) => playersFilter === 0 || tt.maxPlayers - tt.players >= playersFilter
  );
  const hourGroups = getHourGroups(filtered);

  async function handleBook() {
    if (!bookingSlot) return;
    setBookingError(null);
    setBookingLoading(true);
    try {
      const userRes = await fetch("/api/auth/demo-user");
      const userData = await userRes.json();
      const userId = userData.userId;
      const bookerName =
        typeof window !== "undefined"
          ? localStorage.getItem("userName") || "Member"
          : "Member";

      if (!userId) {
        setBookingError("Please sign in to book a tee time.");
        setBookingLoading(false);
        return;
      }

      const res = await fetch("/api/tee-times/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teeTimeId: bookingSlot.id,
          userId,
          bookerName,
          playerCount,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");

      setSuccessMessage(data.message ?? "Tee time booked!");
      setBookingSlot(null);
      fetchTeeTimes(selectedDate);
    } catch (e) {
      setBookingError(e instanceof Error ? e.message : "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  }

  async function handleSaveHours() {
    setSavingHours(true);
    try {
      const res = await fetch("/api/tee-times/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstTeeTime: firstTee, lastTeeTime: lastTee }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Failed to save");
      setSchedule({ firstTeeTime: firstTee, lastTeeTime: lastTee });
      setHoursOpen(false);
      fetchTeeTimes(selectedDate);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save hours");
    } finally {
      setSavingHours(false);
    }
  }

  async function handleAddEvent() {
    setSavingEvent(true);
    try {
      const res = await fetch("/api/tee-times/private-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          startTime: eventStart,
          endTime: eventEnd,
          title: eventTitle,
          notes: eventNotes || undefined,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Failed to add event");
      setEventModalOpen(false);
      setEventTitle("");
      setEventStart("8:00 AM");
      setEventEnd("12:00 PM");
      setEventNotes("");
      fetchPrivateEvents(selectedDate);
      fetchTeeTimes(selectedDate);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add event");
    } finally {
      setSavingEvent(false);
    }
  }

  async function handleDeleteEvent(id: string) {
    try {
      await fetch(`/api/tee-times/private-events/${id}`, { method: "DELETE" });
      fetchPrivateEvents(selectedDate);
      fetchTeeTimes(selectedDate);
    } catch {
      setError("Failed to delete event");
    }
  }

  const timeOptions = [
    "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM",
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tee Times</h1>
          <p className="text-gray-500 mt-1">
            {isAdmin ? "Hour-by-hour schedule · Set hours and private events" : "Book your tee time at Ol' Colony Golf Course"}
          </p>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHoursOpen((o) => !o)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              Set hours
            </button>
            <button
              type="button"
              onClick={() => setEventModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
            >
              <CalendarPlus className="w-4 h-4" />
              Private event
            </button>
          </div>
        )}
      </div>

      {successMessage && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 text-green-800 px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-green-600 hover:text-green-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin: Set hours panel */}
      {isAdmin && hoursOpen && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Operating hours</h3>
          <p className="text-sm text-gray-500 mb-4">First and last tee time. Slots are generated every 12 minutes between these times.</p>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First tee time</label>
              <select
                value={firstTee}
                onChange={(e) => setFirstTee(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last tee time</label>
              <select
                value={lastTee}
                onChange={(e) => setLastTee(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleSaveHours}
              disabled={savingHours}
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              {savingHours ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Save hours
            </button>
          </div>
        </div>
      )}

      {/* Admin: Private events for this date */}
      {isAdmin && privateEvents.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Private events — {selectedDate}</h3>
          <ul className="space-y-2">
            {privateEvents.map((ev) => (
              <li key={ev.id} className="flex items-center justify-between py-2 border-b border-amber-100 last:border-0">
                <div>
                  <span className="font-medium text-gray-900">{ev.title}</span>
                  <span className="text-sm text-gray-500 ml-2">{ev.startTime} – {ev.endTime}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(ev.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Remove event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Course info bar */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Course status: Open</h2>
            <p className="text-green-200/80 text-sm mt-1">
              {schedule
                ? `Tee times ${schedule.firstTeeTime} – ${schedule.lastTeeTime} (every 12 min)`
                : "18 holes · Par 72"}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div>
              <p className="text-green-300/60">First tee</p>
              <p className="font-semibold">{schedule?.firstTeeTime ?? "7:00 AM"}</p>
            </div>
            <div>
              <p className="text-green-300/60">Last tee</p>
              <p className="font-semibold">{schedule?.lastTeeTime ?? "5:00 PM"}</p>
            </div>
            <div>
              <p className="text-green-300/60">Available</p>
              <p className="font-semibold">
                {loading ? "…" : filtered.filter((t) => t.status === "available").length} slots
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Date selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {dates.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDate(d.date)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedDate === d.date ? "bg-green-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Players filter */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-600">Show slots with at least:</span>
        {[0, 1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => setPlayersFilter(n)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
              playersFilter === n ? "bg-green-700 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
            }`}
          >
            {n === 0 ? "All" : n}
          </button>
        ))}
        <span className="text-xs text-gray-400">spots open</span>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
        </div>
      ) : (
        <>
          {/* Hour-by-hour schedule */}
          <div className="space-y-8">
            {hourGroups.map(({ hour, slots: hourSlots }) => (
              <div key={hour}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  {hour}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {hourSlots.map((tt) => (
                    <div
                      key={tt.id}
                      className={`border rounded-xl p-4 transition-all ${
                        tt.status === "available"
                          ? "bg-white border-gray-200 hover:border-green-300 hover:shadow-md"
                          : tt.status === "booked"
                          ? "bg-gray-50 border-gray-200 opacity-90"
                          : "bg-amber-50/80 border-amber-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{tt.time}</span>
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            tt.status === "available"
                              ? "bg-green-50 text-green-700"
                              : tt.status === "booked"
                              ? "bg-gray-100 text-gray-500"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tt.status === "available"
                            ? "Available"
                            : tt.status === "booked"
                            ? "Booked"
                            : tt.eventTitle
                            ? "Private"
                            : "Blocked"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Users className="w-3.5 h-3.5" />
                        <span>{tt.players}/{tt.maxPlayers} players</span>
                      </div>
                      {tt.eventTitle && (
                        <p className="text-xs text-amber-700 mb-2 truncate" title={tt.eventTitle}>
                          {tt.eventTitle}
                        </p>
                      )}
                      {tt.bookedBy && (
                        <p className="text-xs text-gray-400 mb-2 truncate" title={tt.bookedBy}>
                          {tt.bookedBy}
                        </p>
                      )}
                      {tt.status === "available" && (
                        <button
                          onClick={() => {
                            setBookingSlot(tt);
                            setPlayerCount(1);
                            setBookingError(null);
                          }}
                          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Book
                        </button>
                      )}
                      {tt.status === "booked" && tt.players < tt.maxPlayers && (
                        <button
                          onClick={() => {
                            setBookingSlot(tt);
                            setPlayerCount(1);
                            setBookingError(null);
                          }}
                          className="w-full bg-white border border-green-600 text-green-700 hover:bg-green-50 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Join ({tt.maxPlayers - tt.players} left)
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No tee times for this date</p>
              <p className="text-sm mt-1">Adjust operating hours or try another day.</p>
            </div>
          )}
        </>
      )}

      {/* Book modal */}
      {bookingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Confirm booking</h3>
            <p className="text-sm text-gray-500 mb-4">
              {bookingSlot.time} on {bookingSlot.date}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of players</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPlayerCount(n)}
                    disabled={bookingSlot.maxPlayers - bookingSlot.players < n}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      playerCount === n ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {bookingSlot.maxPlayers - bookingSlot.players} spot(s) left
              </p>
            </div>
            {bookingError && <p className="text-sm text-red-600 mb-3">{bookingError}</p>}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setBookingSlot(null); setBookingError(null); }}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBook}
                disabled={bookingLoading}
                className="flex-1 py-2.5 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {bookingLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</> : "Book"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add private event modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule private event</h3>
            <p className="text-sm text-gray-500 mb-4">Block tee times for tournaments, outings, or private groups. Date: {selectedDate}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event name</label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Member-Guest Tournament"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
                  <select
                    value={eventStart}
                    onChange={(e) => setEventStart(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
                  <select
                    value={eventEnd}
                    onChange={(e) => setEventEnd(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                <input
                  type="text"
                  value={eventNotes}
                  onChange={(e) => setEventNotes(e.target.value)}
                  placeholder="Internal note"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setEventModalOpen(false)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddEvent}
                disabled={savingEvent || !eventTitle.trim()}
                className="flex-1 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingEvent ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Add event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
