"use client";

import { Clock, MapPin, Users, Calendar } from "lucide-react";

const weekSchedule = [
  {
    day: "Monday",
    date: "Mar 2",
    events: [
      { time: "10:00 AM", title: "Junior Fundamentals", location: "Teaching Facility", type: "class", students: 8 },
      { time: "2:00 PM", title: "Private Lesson - A. Thompson", location: "Driving Range", type: "lesson", students: 1 },
      { time: "4:00 PM", title: "Competitive Prep", location: "Main Course", type: "class", students: 7 },
    ],
  },
  {
    day: "Tuesday",
    date: "Mar 3",
    events: [
      { time: "9:00 AM", title: "Private Lesson - J. Williams", location: "Teaching Facility", type: "lesson", students: 1 },
      { time: "11:00 AM", title: "Group Lesson (3)", location: "Driving Range", type: "lesson", students: 3 },
      { time: "4:00 PM", title: "Junior Fundamentals", location: "Teaching Facility", type: "class", students: 8 },
    ],
  },
  {
    day: "Wednesday",
    date: "Mar 4",
    events: [
      { time: "9:00 AM", title: "Little Links", location: "Practice Green", type: "class", students: 9 },
      { time: "1:00 PM", title: "Private Lesson - M. Chen", location: "Trackman Bay", type: "lesson", students: 1 },
      { time: "5:00 PM", title: "Short Game Mastery", location: "Short Game Area", type: "class", students: 5 },
    ],
  },
  {
    day: "Thursday",
    date: "Mar 5",
    events: [
      { time: "10:00 AM", title: "Adult Group Lesson", location: "Driving Range", type: "lesson", students: 4 },
      { time: "4:00 PM", title: "Junior Fundamentals", location: "Teaching Facility", type: "class", students: 8 },
    ],
  },
  {
    day: "Friday",
    date: "Mar 6",
    events: [
      { time: "3:30 PM", title: "Competitive Prep", location: "Main Course", type: "class", students: 7 },
      { time: "4:00 PM", title: "Trackman Junior Lab", location: "Teaching Facility", type: "class", students: 6 },
    ],
  },
  {
    day: "Saturday",
    date: "Mar 7",
    events: [
      { time: "8:00 AM", title: "Tournament Practice Round", location: "Main Course", type: "class", students: 12 },
      { time: "9:00 AM", title: "Little Links", location: "Practice Green", type: "class", students: 9 },
    ],
  },
];

export default function SchedulePage() {
  const thisWeekLessons = weekSchedule.reduce(
    (sum, d) => sum + d.events.length,
    0
  );
  const thisWeekStudents = weekSchedule.reduce(
    (sum, d) => sum + d.events.reduce((s, e) => s + e.students, 0),
    0
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-500 mt-1">
          Your upcoming classes, lessons, and events
        </p>
      </div>

      {/* Week Overview */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <Calendar className="w-5 h-5 text-green-700 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {thisWeekLessons}
          </p>
          <p className="text-sm text-gray-500">Sessions This Week</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <Users className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {thisWeekStudents}
          </p>
          <p className="text-sm text-gray-500">Students This Week</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <Clock className="w-5 h-5 text-yellow-600 mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {thisWeekLessons * 1.5}h
          </p>
          <p className="text-sm text-gray-500">Hours Scheduled</p>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-4">
        {weekSchedule.map((day) => (
          <div
            key={day.day}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {day.day}{" "}
                <span className="text-gray-400 font-normal">{day.date}</span>
              </h3>
              <span className="text-xs text-gray-500">
                {day.events.length} session{day.events.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {day.events.map((evt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-20 text-sm font-medium text-gray-500">
                    {evt.time}
                  </div>
                  <div
                    className={`w-1 h-8 rounded-full ${
                      evt.type === "class" ? "bg-green-400" : "bg-blue-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {evt.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {evt.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {evt.students} student{evt.students !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      evt.type === "class"
                        ? "bg-green-50 text-green-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {evt.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
