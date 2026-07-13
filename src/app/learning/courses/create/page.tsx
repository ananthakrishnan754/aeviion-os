"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/AppLayout"
import { BookOpen, ArrowLeft, Save, Send, Clock, DollarSign, Tag } from "lucide-react"

export default function CreateCoursePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: "",
    description: "",
    short_description: "",
    category: "",
    level: "beginner",
    duration: "",
    price: "",
  })

  const handleSubmit = async (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault()
    if (!form.title) return
    setSaving(true)
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: form.price ? parseFloat(form.price) : 0, status }),
      })
      if (res.ok) router.push("/learning/courses")
    } finally { setSaving(false) }
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="rounded-xl border border-[var(--border)] p-2 hover:bg-[var(--muted)] transition-all">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Create Course</h1>
            <p className="text-[var(--muted-foreground)]">Set up a new learning course</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Course Details</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Full Stack Web Development" required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Short Description</label>
              <input type="text" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                placeholder="One-line description (shown in cards)"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Full Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Detailed course description, prerequisites, learning outcomes..." rows={4}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
            </div>
          </div>

          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Configuration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <Tag className="inline h-4 w-4 mr-1" /> Category
                </label>
                <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Web Development, AI/ML"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Level</label>
                <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <Clock className="inline h-4 w-4 mr-1" /> Duration
                </label>
                <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 8 weeks, 24 hours"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  <DollarSign className="inline h-4 w-4 mr-1" /> Price (0 = Free)
                </label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0" min="0" step="0.01"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pb-8">
            <button type="button" onClick={(e) => handleSubmit(e as React.FormEvent, "draft")} disabled={saving || !form.title}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all disabled:opacity-50">
              <Save className="h-4 w-4" /> Save Draft
            </button>
            <button type="button" onClick={(e) => handleSubmit(e as React.FormEvent, "published")} disabled={saving || !form.title}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all disabled:opacity-50">
              <Send className="h-4 w-4" /> Publish
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
