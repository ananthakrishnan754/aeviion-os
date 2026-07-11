"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Key,
  Save,
  Check,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

type SettingsTab = "general" | "roles" | "notifications" | "branding" | "api"

const tabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: "general", label: "General", icon: <Settings className="h-4 w-4" /> },
  { id: "roles", label: "Roles & Permissions", icon: <Shield className="h-4 w-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { id: "branding", label: "Branding", icon: <Palette className="h-4 w-4" /> },
  { id: "api", label: "API Keys", icon: <Key className="h-4 w-4" /> },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-600">Configure your Aeviion OS platform</p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 rounded-xl border bg-white p-6">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Aeviion"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Email
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@aeviion.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website URL
                      </label>
                      <input
                        type="url"
                        defaultValue="https://aeviion.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>Asia/Kolkata (IST)</option>
                        <option>America/New_York (EST)</option>
                        <option>America/Los_Angeles (PST)</option>
                        <option>Europe/London (GMT)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        {saved ? (
                          <>
                            <Check className="h-4 w-4" />
                            Saved!
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "roles" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Roles & Permissions</h2>

                  <div className="space-y-4">
                    {[
                      { name: "CEO", permissions: ["Full access", "All modules", "User management"] },
                      { name: "CTO", permissions: ["Technical modules", "API access", "System settings"] },
                      { name: "Admin", permissions: ["All modules", "User management", "Reports"] },
                      { name: "Mentor", permissions: ["View students", "Grade assignments", "View reports"] },
                      { name: "Student", permissions: ["View courses", "Submit projects", "View certificates"] },
                    ].map((role) => (
                      <div
                        key={role.name}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{role.name}</h3>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {role.permissions.map((perm) => (
                                <span
                                  key={perm}
                                  className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                                >
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>

                  <div className="space-y-4">
                    {[
                      { label: "Email notifications", description: "Receive email for important updates", enabled: true },
                      { label: "New student registrations", description: "Get notified when new students join", enabled: true },
                      { label: "Form submissions", description: "Get notified when forms are submitted", enabled: true },
                      { label: "Event reminders", description: "Receive reminders before events", enabled: false },
                      { label: "Weekly digest", description: "Get a weekly summary of activity", enabled: true },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <button
                          className={cn(
                            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                            item.enabled ? "bg-blue-600" : "bg-gray-200"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                              item.enabled ? "translate-x-6" : "translate-x-1"
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "branding" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">Branding Settings</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primary Color
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          defaultValue="#2563eb"
                          className="h-10 w-10 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          defaultValue="#2563eb"
                          className="w-32 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logo
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                          <span className="text-sm text-gray-500">Upload</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Recommended size: 200x200px</p>
                          <p className="text-sm text-gray-500">PNG, JPG, or SVG</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Custom CSS
                      </label>
                      <textarea
                        rows={6}
                        placeholder="/* Add custom CSS here */"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "api" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>

                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Production Key</h3>
                          <p className="text-sm text-gray-500">Created: Jan 1, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="rounded bg-gray-100 px-3 py-1 text-sm font-mono">
                            aev_prod_••••••••••••
                          </code>
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Development Key</h3>
                          <p className="text-sm text-gray-500">Created: Jan 10, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="rounded bg-gray-100 px-3 py-1 text-sm font-mono">
                            aev_dev_••••••••••••
                          </code>
                          <button className="text-sm text-blue-600 hover:text-blue-700">
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 w-full justify-center">
                      <Key className="h-4 w-4" />
                      Generate New Key
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
