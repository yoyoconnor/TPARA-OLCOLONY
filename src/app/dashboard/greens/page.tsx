"use client";

import {
  Leaf,
  CheckCircle,
  Clock,
  AlertTriangle,
  CloudRain,
  Sun,
  Thermometer,
  Droplets,
} from "lucide-react";

const maintenanceTasks = [
  { id: 1, task: "Mow Fairways (Holes 1-9)", assignee: "Chris Martinez", status: "completed", priority: "high" },
  { id: 2, task: "Mow Fairways (Holes 10-18)", assignee: "Tom Harris", status: "in_progress", priority: "high" },
  { id: 3, task: "Aerate Greens (Front 9)", assignee: "Chris Martinez", status: "scheduled", priority: "medium" },
  { id: 4, task: "Bunker Raking - All Bunkers", assignee: "Team", status: "completed", priority: "high" },
  { id: 5, task: "Irrigation System Check - Zone B", assignee: "Tom Harris", status: "scheduled", priority: "medium" },
  { id: 6, task: "Divot Repair - Tee Boxes", assignee: "Chris Martinez", status: "in_progress", priority: "low" },
  { id: 7, task: "Tree Trimming - Hole 7 & 14", assignee: "Contractor", status: "scheduled", priority: "low" },
  { id: 8, task: "Chemical Application - Fungicide", assignee: "Tom Harris", status: "completed", priority: "high" },
];

const courseConditions = [
  { area: "Greens", condition: "Excellent", speed: "10.5 Stimp", details: "Cut at 0.125 inches" },
  { area: "Fairways", condition: "Good", speed: "—", details: "Cut at 0.5 inches, front 9 complete" },
  { area: "Tee Boxes", condition: "Good", speed: "—", details: "Divot repair in progress" },
  { area: "Bunkers", condition: "Excellent", speed: "—", details: "All raked and edged" },
  { area: "Rough", condition: "Good", speed: "—", details: "Cut at 1.5 inches" },
];

export default function GreensPage() {
  const completed = maintenanceTasks.filter(
    (t) => t.status === "completed"
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Course &amp; Greens Maintenance
        </h1>
        <p className="text-gray-500 mt-1">
          Course conditions, maintenance schedules, and task tracking
        </p>
      </div>

      {/* Weather & Conditions Banner */}
      <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Leaf className="w-5 h-5" />
              Course Condition: Good to Excellent
            </h2>
            <p className="text-green-200/80 text-sm mt-1">
              Last updated today at 6:00 AM by Superintendent Tom Harris
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-yellow-300" />
              <span>72°F</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-300" />
              <span>45% humidity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-gray-300" />
              <span>No rain expected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Course Conditions */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">
            Course Conditions
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">
                    Area
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase px-5 py-3">
                    Condition
                  </th>
                  <th className="text-center text-xs font-medium text-gray-500 uppercase px-5 py-3">
                    Speed
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courseConditions.map((c) => (
                  <tr key={c.area} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-sm font-medium text-gray-900">
                      {c.area}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          c.condition === "Excellent"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {c.condition}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center text-sm text-gray-500">
                      {c.speed}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500">
                      {c.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task Progress */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">
            Today&apos;s Progress
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-green-700">
                {completed}/{maintenanceTasks.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Tasks Completed</p>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{
                  width: `${(completed / maintenanceTasks.length) * 100}%`,
                }}
              />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Completed</span>
                <span className="font-medium text-green-600">{completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">In Progress</span>
                <span className="font-medium text-blue-600">
                  {maintenanceTasks.filter((t) => t.status === "in_progress").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Scheduled</span>
                <span className="font-medium text-gray-600">
                  {maintenanceTasks.filter((t) => t.status === "scheduled").length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <h2 className="font-semibold text-gray-900 mb-4">Maintenance Tasks</h2>
      <div className="space-y-2">
        {maintenanceTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                task.status === "completed"
                  ? "bg-green-100"
                  : task.status === "in_progress"
                  ? "bg-blue-100"
                  : "bg-gray-100"
              }`}
            >
              {task.status === "completed" ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : task.status === "in_progress" ? (
                <Clock className="w-4 h-4 text-blue-600" />
              ) : (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  task.status === "completed"
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {task.task}
              </p>
              <p className="text-xs text-gray-400">{task.assignee}</p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                task.priority === "high"
                  ? "bg-red-50 text-red-600"
                  : task.priority === "medium"
                  ? "bg-yellow-50 text-yellow-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {task.priority}
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                task.status === "completed"
                  ? "bg-green-50 text-green-700"
                  : task.status === "in_progress"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {task.status.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
