"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Rocket, Users, Clock, CheckCircle2, Search, Plus, MapPin, Briefcase, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Fellowship { id: string; title: string; company: string; duration: string; stipend: string; location: string; applicants: number; maxSlots: number; status: "open" | "closing-soon" | "closed"; skills: string[] }

const fellowships: Fellowship[] = [
  { id: "1", title: "Software Engineering Fellow", company: "TechCorp India", duration: "6 months", stipend: "₹25K/mo", location: "Bangalore", applicants: 45, maxSlots: 5, status: "open", skills: ["React", "Node.js"] },
  { id: "2", title: "Data Science Intern", company: "DataFlow Analytics", duration: "3 months", stipend: "₹20K/mo", location: "Remote", applicants: 78, maxSlots: 8, status: "open", skills: ["Python", "ML"] },
  { id: "3", title: "UI/UX Design Fellow", company: "DesignStudio", duration: "4 months", stipend: "₹18K/mo", location: "Mumbai", applicants: 32, maxSlots: 3, status: "closing-soon", skills: ["Figma", "UI Design"] },
]

const getStatusStyle = (s: string) => { switch (s) { case "open": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"; case "closing-soon": return "bg-[#B8860B]/15 text-[#B8860B]"; default: return "bg-[#999]/15 text-[#888]" } }

export default function LearningFellowshipsPage() {
  const [search, setSearch] = useState("")
  const filtered = fellowships.filter((f) => f.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Fellowships</h1><p className="mt-1 text-[#6B6B6B]">Career-launching opportunities for students</p></div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Plus className="h-4 w-4" />Post Fellowship</button>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" /><input type="text" placeholder="Search fellowships..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" /></div>
        </div>
        <div className="space-y-4">
          {filtered.map((f, i) => (
            <div key={f.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3"><h3 className="text-lg font-semibold text-[#2D2D2D]">{f.title}</h3><span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(f.status))}>{f.status}</span></div>
                  <p className="mt-1 text-sm text-[#6B6B6B]">{f.company}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#999]">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{f.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{f.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{f.stipend}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{f.applicants}/{f.maxSlots}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">{f.skills.map((s) => (<span key={s} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{s}</span>))}</div>
                </div>
                <button className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-2 text-sm font-medium text-[#2D2D2D] transition-all hover:border-[#D4764E]/30 hover:bg-[#D4764E]/10 hover:text-[#D4764E]">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
