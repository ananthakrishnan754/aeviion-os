"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Building2, Search, Star, MapPin, Users, Mail, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Partner {
  id: string
  name: string
  industry: string
  location: string
  type: "hiring" | "sponsoring" | "mentoring" | "all"
  activeStudents: number
  rating: number
  website: string
}

const partners: Partner[] = [
  { id: "1", name: "TechCorp India", industry: "Technology", location: "Bangalore", type: "hiring", activeStudents: 12, rating: 4.8, website: "#" },
  { id: "2", name: "DataFlow Analytics", industry: "AI/ML", location: "Hyderabad", type: "mentoring", activeStudents: 8, rating: 4.7, website: "#" },
  { id: "3", name: "DesignStudio", industry: "Design", location: "Mumbai", type: "sponsoring", activeStudents: 6, rating: 4.9, website: "#" },
  { id: "4", name: "CloudNative Labs", industry: "Cloud/DevOps", location: "Pune", type: "hiring", activeStudents: 10, rating: 4.6, website: "#" },
  { id: "5", name: "StartupHub", industry: "Startup Ecosystem", location: "Delhi", type: "all", activeStudents: 15, rating: 4.8, website: "#" },
  { id: "6", name: "Green Energy Corp", industry: "CleanTech", location: "Chennai", type: "sponsoring", activeStudents: 5, rating: 4.5, website: "#" },
]

const getTypeStyle = (t: string) => {
  switch (t) {
    case "hiring": return "bg-[#D4764E]/10 text-[#C06540]"
    case "sponsoring": return "bg-[#4A7DC9]/10 text-[#3A6DB9]"
    case "mentoring": return "bg-[#6B8E6B]/10 text-[#5A7A5A]"
    case "all": return "bg-[#8B6F47]/10 text-[#8B6F47]"
    default: return "bg-[#999]/10 text-[#888]"
  }
}

export default function PartnersPage() {
  const [search, setSearch] = useState("")
  const filtered = partners.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Partners</h1>
          <p className="mt-1 text-[#6B6B6B]">Industry partners powering student opportunities</p>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input type="text" placeholder="Search partners..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <div key={p.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-white shadow-md"><Building2 className="h-6 w-6" /></div>
                  <div>
                    <h3 className="font-semibold text-[#2D2D2D]">{p.name}</h3>
                    <p className="text-xs text-[#6B6B6B]">{p.industry}</p>
                  </div>
                </div>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getTypeStyle(p.type))}>{p.type}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#999]">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{p.location}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{p.activeStudents} students</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[#B8860B] text-[#B8860B]" />{p.rating}</span>
              </div>
              <div className="mt-4 border-t border-[#E8E0D4] pt-4 flex gap-2">
                <a href={p.website} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FAF8F5] py-2.5 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]"><ExternalLink className="h-3.5 w-3.5" />Visit</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
