"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Heart,
  Users,
  Building2,
  GraduationCap,
  ArrowUpRight,
  Search,
  Plus,
  Star,
  MapPin,
  Briefcase,
  Github,
  Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Alumni {
  id: string
  name: string
  email: string
  college: string
  batch: string
  currentCompany: string
  role: string
  location: string
  skills: string[]
  communityScore: number
  github?: string
  linkedin?: string
  mentoring: boolean
}

const alumniList: Alumni[] = [
  { id: "1", name: "Arjun Mehta", email: "arjun@techcorp.in", college: "IIT Bombay", batch: "2023", currentCompany: "Google", role: "SDE II", location: "Bangalore", skills: ["React", "Go", "System Design"], communityScore: 98, github: "#", linkedin: "#", mentoring: true },
  { id: "2", name: "Priyanka Das", email: "priyanka@microsoft.com", college: "NIT Trichy", batch: "2022", currentCompany: "Microsoft", role: "Senior SDE", location: "Hyderabad", skills: ["Azure", "TypeScript", "React"], communityScore: 96, github: "#", linkedin: "#", mentoring: true },
  { id: "3", name: "Rohan Gupta", email: "rohan@amazon.in", college: "BITS Pilani", batch: "2023", currentCompany: "Amazon", role: "SDE I", location: "Chennai", skills: ["Java", "AWS", "Microservices"], communityScore: 94, github: "#", linkedin: "#", mentoring: false },
  { id: "4", name: "Neha Sharma", email: "neha@startup.io", college: "DTU", batch: "2021", currentCompany: "Founder — BuildX", role: "CEO", location: "Delhi", skills: ["Product", "Strategy", "React"], communityScore: 92, github: "#", linkedin: "#", mentoring: true },
  { id: "5", name: "Karthik Iyer", email: "karthik@dataflow.ai", college: "IIIT Hyderabad", batch: "2022", currentCompany: "DataFlow", role: "ML Engineer", location: "Hyderabad", skills: ["Python", "ML", "MLOps"], communityScore: 90, github: "#", linkedin: "#", mentoring: false },
]

const stats = [
  { label: "Total Alumni", value: "892", icon: Heart, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Active Mentors", value: "124", icon: GraduationCap, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Top Companies", value: "56", icon: Building2, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Avg. Score", value: "91", icon: Star, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

export default function AlumniPage() {
  const [search, setSearch] = useState("")

  const filtered = alumniList.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.currentCompany.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">Alumni Network</h1>
            <p className="mt-1 text-[#6B6B6B]">Connect with graduates working at top companies</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">
            <Plus className="h-4 w-4" />
            Invite Alumni
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
            <input type="text" placeholder="Search alumni..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <div key={a.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">
                    {a.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2D2D2D]">{a.name}</h3>
                    <p className="text-xs text-[#6B6B6B]">{a.role} at {a.currentCompany}</p>
                  </div>
                </div>
                {a.mentoring && (
                  <span className="rounded-full bg-[#6B8E6B]/15 px-2.5 py-0.5 text-xs font-medium text-[#5A7A5A]">Mentor</span>
                )}
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {a.skills.map((s) => (
                  <span key={s} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#999]">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{a.location}</span>
                <span className="flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{a.college} '{a.batch}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#E8E0D4] pt-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#B8860B] text-[#B8860B]" />
                  <span className="text-sm font-semibold text-[#2D2D2D]">{a.communityScore}</span>
                </div>
                <div className="flex gap-1">
                  {a.github && <a href={a.github} className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]"><Github className="h-4 w-4" /></a>}
                  {a.linkedin && <a href={a.linkedin} className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]"><Linkedin className="h-4 w-4" /></a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
