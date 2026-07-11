"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Megaphone,
  Users,
  Eye,
  MousePointerClick,
  TrendingUp,
  ArrowUpRight,
  Search,
  Plus,
  Mail,
  BarChart3,
  Calendar,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Campaign {
  id: string
  name: string
  type: "email" | "social" | "ads" | "content"
  status: "active" | "scheduled" | "completed" | "draft"
  sent: number
  opens: number
  clicks: number
  conversion: number
  scheduledAt?: string
}

const campaigns: Campaign[] = [
  { id: "1", name: "Welcome Series — New Students", type: "email", status: "active", sent: 1240, opens: 890, clicks: 342, conversion: 12.5 },
  { id: "2", name: "Fellowship Opening Announce", type: "social", status: "completed", sent: 5600, opens: 3200, clicks: 890, conversion: 8.2 },
  { id: "3", name: "Summer Bootcamp Promo", type: "ads", status: "active", sent: 8900, opens: 4500, clicks: 1200, conversion: 15.3 },
  { id: "4", name: "Monthly Newsletter — Jan", type: "email", status: "scheduled", sent: 0, opens: 0, clicks: 0, conversion: 0, scheduledAt: "Jan 25, 2025" },
  { id: "5", name: "Alumni Re-engagement", type: "email", status: "draft", sent: 0, opens: 0, clicks: 0, conversion: 0 },
  { id: "6", name: "Webinar Promo — AI Workshop", type: "content", status: "completed", sent: 3400, opens: 2100, clicks: 670, conversion: 11.8 },
]

const stats = [
  { label: "Active Campaigns", value: "8", icon: Megaphone, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Total Reach", value: "45.2K", icon: Users, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Avg. Open Rate", value: "52%", icon: Eye, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Conversion Rate", value: "11.8%", icon: MousePointerClick, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

const getStatusStyle = (status: string) => {
  switch (status) {
    case "active": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"
    case "scheduled": return "bg-[#4A7DC9]/15 text-[#3A6DB9]"
    case "completed": return "bg-[#999]/15 text-[#888]"
    case "draft": return "bg-[#B8860B]/15 text-[#B8860B]"
    default: return "bg-[#999]/15 text-[#888]"
  }
}

const getTypeStyle = (type: string) => {
  switch (type) {
    case "email": return "bg-[#D4764E]/10 text-[#C06540]"
    case "social": return "bg-[#4A7DC9]/10 text-[#3A6DB9]"
    case "ads": return "bg-[#6B8E6B]/10 text-[#5A7A5A]"
    case "content": return "bg-[#8B6F47]/10 text-[#8B6F47]"
    default: return "bg-[#999]/10 text-[#888]"
  }
}

export default function MarketingPage() {
  const [search, setSearch] = useState("")

  const filtered = campaigns.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">Marketing</h1>
            <p className="mt-1 text-[#6B6B6B]">Manage campaigns and track engagement</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-5 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-3">
                <div className={cn("rounded-xl bg-gradient-to-br p-2.5 text-white shadow-md", s.gradient)}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D2D2D]">{s.value}</p>
                  <p className="text-xs font-medium text-[#6B6B6B]">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input type="text" placeholder="Search campaigns..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((c, i) => (
            <div key={c.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-[#2D2D2D]">{c.name}</h3>
                  <p className="mt-0.5 text-xs text-[#999]">{c.scheduledAt ? `Scheduled: ${c.scheduledAt}` : `${c.sent} sent`}</p>
                </div>
                <div className="flex gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getTypeStyle(c.type))}>{c.type}</span>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(c.status))}>{c.status}</span>
                </div>
              </div>
              {c.sent > 0 && (
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl bg-[#FAF8F5] p-3">
                    <p className="text-lg font-bold text-[#2D2D2D]">{c.opens.toLocaleString()}</p>
                    <p className="text-xs text-[#999]">Opens</p>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F5] p-3">
                    <p className="text-lg font-bold text-[#2D2D2D]">{c.clicks.toLocaleString()}</p>
                    <p className="text-xs text-[#999]">Clicks</p>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F5] p-3">
                    <p className="text-lg font-bold text-[#2D2D2D]">{c.conversion}%</p>
                    <p className="text-xs text-[#999]">Conv.</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
