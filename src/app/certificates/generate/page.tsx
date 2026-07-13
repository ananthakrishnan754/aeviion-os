"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/AppLayout"
import { Award, ArrowLeft, Send, User, Mail, BookOpen, Calendar, GraduationCap } from "lucide-react"

export default function GenerateCertificatePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "",
    recipient_name: "",
    recipient_email: "",
    recipient_college: "",
    type: "course",
    course_name: "",
    event_name: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.recipient_name) return
    setSaving(true)
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push("/certificates")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="rounded-xl border border-[var(--border)] p-2 hover:bg-[var(--muted)] transition-all">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Issue Certificate</h1>
            <p className="text-[var(--muted-foreground)]">Create a new certificate for a student</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
              <Award className="h-5 w-5 text-[var(--primary)]" /> Certificate Details
            </h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Certificate Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Web Development Bootcamp Completion"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              >
                <option value="course">Course</option>
                <option value="event">Event</option>
                <option value="project">Project</option>
                <option value="fellowship">Fellowship</option>
              </select>
            </div>
            {form.type === "course" && (
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <BookOpen className="inline h-4 w-4 mr-1" /> Course Name
                </label>
                <input
                  type="text"
                  value={form.course_name}
                  onChange={(e) => setForm({ ...form, course_name: e.target.value })}
                  placeholder="e.g. Full Stack Web Development"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                />
              </div>
            )}
            {form.type === "event" && (
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <Calendar className="inline h-4 w-4 mr-1" /> Event Name
                </label>
                <input
                  type="text"
                  value={form.event_name}
                  onChange={(e) => setForm({ ...form, event_name: e.target.value })}
                  placeholder="e.g. AI Workshop 2025"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                />
              </div>
            )}
          </div>

          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2">
              <User className="h-5 w-5 text-[var(--primary)]" /> Recipient
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={form.recipient_name}
                  onChange={(e) => setForm({ ...form, recipient_name: e.target.value })}
                  placeholder="Student name"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <Mail className="inline h-4 w-4 mr-1" /> Email
                </label>
                <input
                  type="email"
                  value={form.recipient_email}
                  onChange={(e) => setForm({ ...form, recipient_email: e.target.value })}
                  placeholder="student@email.com"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                <GraduationCap className="inline h-4 w-4 mr-1" /> College / University
              </label>
              <input
                type="text"
                value={form.recipient_college}
                onChange={(e) => setForm({ ...form, recipient_college: e.target.value })}
                placeholder="e.g. MIT, Stanford, IIT Delhi"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              />
            </div>
          </div>

          <div className="flex justify-end pb-8">
            <button
              type="submit"
              disabled={saving || !form.title || !form.recipient_name}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all disabled:opacity-50"
            >
              <Send className="h-4 w-4" /> {saving ? "Issuing..." : "Issue Certificate"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
