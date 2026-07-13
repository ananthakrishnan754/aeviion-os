"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/AppLayout"
import { FolderOpen, ArrowLeft, Save, Send, Plus, X } from "lucide-react"

export default function CreateProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [techInput, setTechInput] = useState("")
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    github: "",
    demo_url: "",
    tech_stack: [] as string[],
  })

  const addTech = () => {
    if (techInput.trim() && !form.tech_stack.includes(techInput.trim())) {
      setForm({ ...form, tech_stack: [...form.tech_stack, techInput.trim()] })
      setTechInput("")
    }
  }

  const removeTech = (t: string) => setForm({ ...form, tech_stack: form.tech_stack.filter((x) => x !== t) })

  const handleSubmit = async (e: React.FormEvent, status: "draft" | "in-progress") => {
    e.preventDefault()
    if (!form.title) return
    setSaving(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      })
      if (res.ok) router.push("/projects")
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
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Submit Project</h1>
            <p className="text-[var(--muted-foreground)]">Share your project with the community</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Project Details</h2>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. AI-Powered Study Assistant" required
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your project, what it does, and what you learned..." rows={4}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Category</label>
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g. Web Dev, AI/ML, Mobile"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>
          </div>

          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Tech Stack</h2>
            <div className="flex gap-2">
              <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                placeholder="Add a technology..."
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              <button type="button" onClick={addTech} className="rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--muted)] transition-all">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {form.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tech_stack.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)]/10 px-3 py-1.5 text-sm text-[var(--primary)]">
                    {t}
                    <button type="button" onClick={() => removeTech(t)} className="hover:text-red-500"><X className="h-3.5 w-3.5" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="card-premium p-6 space-y-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">GitHub URL</label>
                <input type="url" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Demo URL</label>
                <input type="url" value={form.demo_url} onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pb-8">
            <button type="button" onClick={(e) => handleSubmit(e as React.FormEvent, "draft")} disabled={saving || !form.title}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all disabled:opacity-50">
              <Save className="h-4 w-4" /> Save Draft
            </button>
            <button type="button" onClick={(e) => handleSubmit(e as React.FormEvent, "in-progress")} disabled={saving || !form.title}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all disabled:opacity-50">
              <Send className="h-4 w-4" /> Submit
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  )
}
