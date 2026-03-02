"use client";

import { useState } from "react";
import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Check,
  Trash2,
} from "lucide-react";
import { notifications } from "@/lib/mock-data";

const typeIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  billing: CreditCard,
};

const typeColors = {
  info: "bg-blue-50 text-blue-600",
  warning: "bg-yellow-50 text-yellow-600",
  success: "bg-green-50 text-green-600",
  billing: "bg-purple-50 text-purple-600",
};

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered =
    filter === "unread" ? items.filter((n) => !n.read) : items;
  const unreadCount = items.filter((n) => !n.read).length;

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function deleteNotif(id: string) {
    setItems((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="text-sm text-green-700 hover:text-green-800 font-medium flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          Mark all read
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f
                ? "bg-green-700 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
            }`}
          >
            {f}
            {f === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filtered.map((notif) => {
          const Icon = typeIcons[notif.type];
          return (
            <div
              key={notif.id}
              className={`bg-white border rounded-xl p-4 flex items-start gap-4 transition-colors ${
                notif.read
                  ? "border-gray-200"
                  : "border-green-200 bg-green-50/30"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  typeColors[notif.type]
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={`text-sm font-semibold ${
                      notif.read ? "text-gray-700" : "text-gray-900"
                    }`}
                  >
                    {notif.title}
                    {!notif.read && (
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 align-middle" />
                    )}
                  </h3>
                  <span className="text-xs text-gray-400 shrink-0">
                    {new Date(notif.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {notif.message}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  {!notif.read && (
                    <button
                      onClick={() => markRead(notif.id)}
                      className="text-xs text-green-700 hover:text-green-800 font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotif(notif.id)}
                    className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No notifications</p>
          <p className="text-sm mt-1">You&apos;re all caught up!</p>
        </div>
      )}
    </div>
  );
}
