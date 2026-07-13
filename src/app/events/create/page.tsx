"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Users,
  ArrowLeft,
  Save,
  Send,
} from "lucide-react"

export default function CreateEventPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    is_online: true,
    meeting_url: "",
    max_participants: "",
    type: "workshop",
  })

  const handleSubmit = async (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault()
    if (!form.title || !form.date) return
    setSaving(true)
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          max_participants: form.max_participants ? parseInt(form.max_participants) : null,
          status,
        }),
      })
      if (res.ok) {
        router.push("/events")
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-xl border border-[var(--border)] p-2 hover:bg-[var(--muted)] transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Create Event</h1>
            <p className="text-[var(--muted-foreground)]">Set up a new workshop, meetup, or community event</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* Basic Info */}
          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Event Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. AI & Machine Learning Workshop"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what attendees will learn and gain..."
                rows={4}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Event Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              >
                <option value="workshop">Workshop</option>
                <option value="bootcamp">Bootcamp</option>
                <option value="seminar">Seminar</option>
                <option value="meetup">Meetup</option>
                <option value="hackathon">Hackathon</option>
              </select>
            </div>
          </div>

          {/* Schedule */}
          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Schedule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <Calendar className="inline h-4 w-4 mr-1" /> Date *
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <Clock className="inline h-4 w-4 mr-1" /> Time
                </label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="e.g. 10:00 AM - 4:00 PM"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Location</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, is_online: true })}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${form.is_online ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"}`}
              >
                <Globe className="h-4 w-4" /> Online
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, is_online: false })}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition-all ${!form.is_online ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]" : "border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"}`}
              >
                <MapPin className="h-4 w-4" /> In-Person
              </button>
            </div>
            {form.is_online ? (
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Meeting URL</label>
                <input
                  type="url"
                  value={form.meeting_url}
                  onChange={(e) => setForm({ ...form, meeting_url: e.target.value })}
                  placeholder="https://zoom.us/j/..."
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Venue</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Tech Hub, Bangalore"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                />
              </div>
            )}
          </div>

          {/* Capacity */}
          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Capacity</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                <Users className="inline h-4 w-4 mr-1" /> Max Participants
              </label>
              <input
                type="number"
                value={form.max_participants}
                onChange={(e) => setForm({ ...form, max_participants: e.target.value })}
                placeholder="Leave empty for unlimited"
                min="1"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pb-8">
            <button
              type="button"
              onClick={(e) => handleSubmit(e as React.FormEvent, "draft")}
              disabled={saving || !form.title || !form.date}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> Save Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e as React.FormEvent, "published")}
              disabled={saving || !form.title || !form.date}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> Publish
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
