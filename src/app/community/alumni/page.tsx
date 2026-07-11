"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Heart, Search, Star, MapPin, Building2, GraduationCap, Github, Linkedin, Mail, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface Alumni {
  id: string
  name: string
  company: string
  role: string
  college: string
  batch: string
  location: string
  skills: string[]
  score: number
  mentoring: boolean
}

const alumniList: Alumni[] = [
  { id: "1", name: "Arjun Mehta", company: "Google", role: "Staff Engineer", college: "IIT Bombay", batch: "2022", location: "Bangalore", skills: ["React", "Go"], score: 98, mentoring: true },
  { id: "2", name: "Priyanka Das", company: "Microsoft", role: "Senior PM", college: "NIT Trichy", batch: "2021", location: "Hyderabad", skills: ["Azure", "Product"], score: 96, mentoring: true },
  { id: "3", name: "Rohan Gupta", company: "Amazon", role: "SDE II", college: "BITS Pilani", batch: "2022", location: "Chennai", skills: ["Java", "AWS"], score: 94, mentoring: false },
  { id: "4", name: "Neha Sharma", company: "BuildX", role: "CEO", college: "DTU", batch: "2020", location: "Delhi", skills: ["Startups", "React"], score: 92, mentoring: true },
  { id: "5", name: "Karthik Iyer", company: "DataFlow", role: "ML Engineer", college: "IIIT Hyderabad", batch: "2021", location: "Hyderabad", skills: ["Python", "ML"], score: 90, mentoring: false },
  { id: "6", name: "Deepa Iyer", company: "Flipkart", role: "SDE I", college: "NIT Warangal", batch: "2023", location: "Bangalore", skills: ["React", "Node.js"], score: 88, mentoring: false },
]

export default function CommunityAlumniPage() {
  const [search, setSearch] = useState("")
  const filtered = alumniList.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Alumni Directory</h1>
          <p className="mt-1 text-[#6B6B6B]">Browse graduates and their career paths</p>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input type="text" placeholder="Search alumni..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <div key={a.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">{a.name.split(" ").map((n) => n[0]).join("")}</div>
                  <div>
                    <h3 className="font-semibold text-[#2D2D2D]">{a.name}</h3>
                    <p className="text-xs text-[#6B6B6B]">{a.role} at {a.company}</p>
                  </div>
                </div>
                {a.mentoring && <span className="rounded-full bg-[#6B8E6B]/15 px-2.5 py-0.5 text-xs font-medium text-[#5A7A5A]">Mentor</span>}
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {a.skills.map((s) => (<span key={s} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{s}</span>))}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#999]">
                <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{a.college} '{a.batch}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{a.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
