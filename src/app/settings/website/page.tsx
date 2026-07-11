"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Globe, ExternalLink } from "lucide-react"
import { useState } from "react"

export default function WebsitePage() {
  const [siteName, setSiteName] = useState("Aeviion OS")
  const [siteUrl, setSiteUrl] = useState("https://aeviion.com")
  const [description, setDescription] = useState("Empowering students through technology, community, and real-world experience.")

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Website Settings</h1><p className="mt-1 text-[#6B6B6B]">Configure your public-facing website</p></div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2D2D2D]">Site Name</label>
              <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2D2D2D]">Site URL</label>
              <input type="url" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2D2D2D]">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
            </div>
            <div className="flex justify-end"><button className="rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">Save Changes</button></div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
