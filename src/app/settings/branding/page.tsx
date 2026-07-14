"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Palette, Save, Check } from "lucide-react"

export default function BrandingPage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    primaryColor: "#D4764E",
    accentColor: "#B85C3A",
    logoUrl: "",
    favicon: "",
    companyName: "Aeviion",
  })

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Branding</h1>
            <p className="text-[var(--muted-foreground)]">Customize your platform appearance</p>
          </div>
          <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all">
            {saved ? <><Check className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save</>}
          </button>
        </div>
        <div className="card-premium p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2"><Palette className="h-5 w-5 text-[var(--primary)]" /> Colors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Primary Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })} className="h-10 w-10 rounded-lg border border-[var(--border)] cursor-pointer" />
                <input type="text" value={form.primaryColor} onChange={(e) => setForm({ ...form, primaryColor: e.target.value })}
                  className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Accent Color</label>
              <div className="flex items-center gap-3">
                <input type="color" value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })} className="h-10 w-10 rounded-lg border border-[var(--border)] cursor-pointer" />
                <input type="text" value={form.accentColor} onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                  className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Company Name</label>
            <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">Logo URL</label>
            <input type="url" value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>
        <div className="card-premium p-6">
          <h3 className="font-semibold text-[var(--foreground)] mb-3">Preview</h3>
          <div className="rounded-xl border border-[var(--border)] p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: form.primaryColor }}>
              {form.companyName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[var(--foreground)]">{form.companyName}</p>
              <p className="text-sm text-[var(--muted-foreground)]">EdTech Platform</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
