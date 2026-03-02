"use client";

import { useEffect, useState } from "react";
import { User, Bell, Shield, CreditCard, Mail, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const [role, setRole] = useState("member");
  const [name, setName] = useState("User");

  useEffect(() => {
    setRole(localStorage.getItem("userRole") || "member");
    setName(localStorage.getItem("userName") || "User");
  }, []);

  const sections = [
    {
      title: "Profile",
      icon: User,
      fields: [
        { label: "Full Name", value: name, type: "text" },
        { label: "Email", value: "user@example.com", type: "email" },
        { label: "Phone", value: "(205) 555-0142", type: "tel" },
        { label: "Golf Experience", value: "Intermediate", type: "select" },
      ],
    },
    {
      title: "Notification Preferences",
      icon: Bell,
      toggles: [
        { label: "Session Reminders", description: "Notifications for upcoming lessons and classes", enabled: true },
        { label: "Schedule Updates", description: "Alerts when offerings or tee times change", enabled: true },
        { label: "Billing Notifications", description: "Payment confirmations and renewal reminders", enabled: true },
        { label: "Promotional Messages", description: "Special offers and event announcements", enabled: false },
        { label: "Academy Updates", description: "Progress reports and program announcements", enabled: true },
      ],
    },
    {
      title: "Communication Channels",
      icon: Mail,
      toggles: [
        { label: "Email Notifications", description: "Receive notifications via email", enabled: true },
        { label: "SMS Notifications", description: "Receive text message alerts", enabled: false },
        { label: "In-App Notifications", description: "Push notifications within the platform", enabled: true },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your profile, notification preferences, and account settings
        </p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Profile</h2>
              <p className="text-sm text-gray-500">
                Your personal information and preferences
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {sections[0].fields!.map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                />
              </div>
            ))}
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        {sections.slice(1).map((section) => (
          <div
            key={section.title}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <section.icon className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Control how and when you receive notifications
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {section.toggles!.map((toggle) => (
                <div
                  key={toggle.label}
                  className="flex items-center justify-between py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {toggle.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {toggle.description}
                    </p>
                  </div>
                  <button
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      toggle.enabled ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        toggle.enabled ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Security */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-gray-500">
                Password and account security settings
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>
            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Update Password
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-xl p-6">
          <h2 className="font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-500 mb-4">
            Permanently delete your account and all associated data. This action
            cannot be undone.
          </p>
          <button className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
