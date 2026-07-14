"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Globe, Save, Check } from "lucide-react"

export default function WebsitePage() {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    siteUrl: "https://aeviion.com",
    metaTitle: "Aeviion - EdTech Platform",
    metaDescription: "Empowering the next generation of builders",
    footerText: "2025 Aeviion. All rights reserved.",
    customDomain: "",
  })

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Website Settings</h1>
            <p className="text-[var(--muted-foreground)]">Public website configuration</p>
          </div>
          <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all">
            {saved ? <><Check className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save</>}
          </button>
        </div>
        <div className="card-premium p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-2"><Globe className="h-5 w-5 text-[var(--primary)]" /> Website</h2>
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: "Site URL", key: "siteUrl", type: "url" },
              { label: "Custom Domain", key: "customDomain", type: "text", placeholder: "learn.yourdomain.com" },
              { label: "Meta Title", key: "metaTitle", type: "text" },
              { label: "Meta Description", key: "metaDescription", type: "text" },
              { label: "Footer Text", key: "footerText", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{field.label}</label>
                <input type={field.type} value={(form as Record<string, string>)[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
