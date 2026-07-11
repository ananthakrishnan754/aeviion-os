"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
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
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Settings</h1>
            <p className="mt-1 text-sm text-[var(--foreground-subtle)]">Configure your Aeviion OS platform</p>
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
                      "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-[var(--primary-light)] text-[var(--primary)]"
                        : "text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)]"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 card-premium p-6">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">General Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Organization Name</label>
                      <input type="text" defaultValue="Aeviion" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Organization Email</label>
                      <input type="email" defaultValue="admin@aeviion.com" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Website URL</label>
                      <input type="url" defaultValue="https://aeviion.com" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Timezone</label>
                      <select className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
                        <option>Asia/Kolkata (IST)</option>
                        <option>America/New_York (EST)</option>
                        <option>America/Los_Angeles (PST)</option>
                        <option>Europe/London (GMT)</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all">
                        {saved ? <><Check className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Changes</>}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "roles" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">Roles & Permissions</h2>
                  <div className="space-y-3">
                    {[
                      { name: "CEO", permissions: ["Full access", "All modules", "User management"] },
                      { name: "CTO", permissions: ["Technical modules", "API access", "System settings"] },
                      { name: "Admin", permissions: ["All modules", "User management", "Reports"] },
                      { name: "Mentor", permissions: ["View students", "Grade assignments", "View reports"] },
                      { name: "Student", permissions: ["View courses", "Submit projects", "View certificates"] },
                    ].map((role) => (
                      <div key={role.name} className="rounded-xl border border-[var(--border)] p-4 hover:bg-[var(--background-subtle)] transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-[var(--foreground)]">{role.name}</h3>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {role.permissions.map((perm) => (
                                <span key={perm} className="rounded-full bg-[var(--primary-light)] px-2.5 py-1 text-xs font-medium text-[var(--primary)]">{perm}</span>
                              ))}
                            </div>
                          </div>
                          <button className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Edit</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">Notification Settings</h2>
                  <div className="space-y-3">
                    {[
                      { label: "Email notifications", description: "Receive email for important updates", enabled: true },
                      { label: "New student registrations", description: "Get notified when new students join", enabled: true },
                      { label: "Form submissions", description: "Get notified when forms are submitted", enabled: true },
                      { label: "Event reminders", description: "Receive reminders before events", enabled: false },
                      { label: "Weekly digest", description: "Get a weekly summary of activity", enabled: true },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-xl border border-[var(--border)] p-4 hover:bg-[var(--background-subtle)] transition-colors">
                        <div>
                          <h3 className="font-medium text-[var(--foreground)]">{item.label}</h3>
                          <p className="text-sm text-[var(--muted-foreground)]">{item.description}</p>
                        </div>
                        <button className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                          item.enabled ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                        )}>
                          <span className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                            item.enabled ? "translate-x-6" : "translate-x-1"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "branding" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">Branding Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Primary Color</label>
                      <div className="flex items-center gap-3">
                        <input type="color" defaultValue="#D4764E" className="h-10 w-10 rounded-xl border border-[var(--border)] cursor-pointer" />
                        <input type="text" defaultValue="#D4764E" className="w-32 rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)]/40 transition-colors cursor-pointer">
                          <span className="text-sm text-[var(--muted-foreground)]">Upload</span>
                        </div>
                        <div>
                          <p className="text-sm text-[var(--foreground-subtle)]">Recommended size: 200x200px</p>
                          <p className="text-sm text-[var(--muted-foreground)]">PNG, JPG, or SVG</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Custom CSS</label>
                      <textarea rows={6} placeholder="/* Add custom CSS here */" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-3 text-sm font-mono focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "api" && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">API Keys</h2>
                  <div className="space-y-3">
                    {[
                      { name: "Production Key", created: "Jan 1, 2025", key: "aev_prod_••••••••••••" },
                      { name: "Development Key", created: "Jan 10, 2025", key: "aev_dev_••••••••••••" },
                    ].map((apiKey) => (
                      <div key={apiKey.name} className="rounded-xl border border-[var(--border)] p-4 hover:bg-[var(--background-subtle)] transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-[var(--foreground)]">{apiKey.name}</h3>
                            <p className="text-sm text-[var(--muted-foreground)]">Created: {apiKey.created}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="rounded-lg bg-[var(--background-subtle)] px-3 py-1.5 text-sm font-mono text-[var(--foreground-subtle)]">{apiKey.key}</code>
                            <button className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Copy</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--foreground-subtle)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all w-full justify-center">
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
