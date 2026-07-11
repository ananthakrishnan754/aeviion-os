"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Briefcase,
  Users,
  Building2,
  Clock,
  ArrowUpRight,
  Search,
  Plus,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "full-time" | "part-time" | "internship" | "contract"
  salary: string
  postedAt: string
  applicants: number
  status: "open" | "closing-soon" | "closed"
  skills: string[]
}

const jobs: Job[] = [
  { id: "1", title: "Frontend Developer", company: "TechCorp India", location: "Bangalore", type: "full-time", salary: "₹8-12 LPA", postedAt: "1 day ago", applicants: 23, status: "open", skills: ["React", "TypeScript", "CSS"] },
  { id: "2", title: "ML Engineering Intern", company: "DataFlow Analytics", location: "Remote", type: "internship", salary: "₹20K/mo", postedAt: "3 days ago", applicants: 45, status: "open", skills: ["Python", "TensorFlow", "ML"] },
  { id: "3", title: "DevOps Engineer", company: "CloudNative Labs", location: "Hyderabad", type: "full-time", salary: "₹10-15 LPA", postedAt: "5 days ago", applicants: 18, status: "closing-soon", skills: ["AWS", "Docker", "K8s"] },
  { id: "4", title: "Product Design Intern", company: "DesignStudio", location: "Mumbai", type: "internship", salary: "₹15K/mo", postedAt: "1 week ago", applicants: 34, status: "open", skills: ["Figma", "UI/UX"] },
  { id: "5", title: "Backend Developer", company: "StartupHub", location: "Pune", type: "full-time", salary: "₹7-10 LPA", postedAt: "2 days ago", applicants: 29, status: "open", skills: ["Node.js", "PostgreSQL", "Redis"] },
  { id: "6", title: "Data Analyst", company: "Green Energy Corp", location: "Delhi", type: "contract", salary: "₹6-9 LPA", postedAt: "4 days ago", applicants: 12, status: "closed", skills: ["SQL", "Python", "Tableau"] },
]

const stats = [
  { label: "Open Positions", value: "24", icon: Briefcase, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Total Applicants", value: "312", icon: Users, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Partner Companies", value: "18", icon: Building2, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Avg. Response Time", value: "3 days", icon: Clock, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

const getStatusStyle = (status: string) => {
  switch (status) {
    case "open": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"
    case "closing-soon": return "bg-[#B8860B]/15 text-[#B8860B]"
    case "closed": return "bg-[#999]/15 text-[#888]"
    default: return "bg-[#999]/15 text-[#888]"
  }
}

const getTypeStyle = (type: string) => {
  switch (type) {
    case "full-time": return "bg-[#D4764E]/10 text-[#C06540]"
    case "part-time": return "bg-[#4A7DC9]/10 text-[#3A6DB9]"
    case "internship": return "bg-[#6B8E6B]/10 text-[#5A7A5A]"
    case "contract": return "bg-[#8B6F47]/10 text-[#8B6F47]"
    default: return "bg-[#999]/10 text-[#888]"
  }
}

export default function CareersPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = jobs.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || j.status === filter
    return matchSearch && matchFilter
  })

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">Careers</h1>
            <p className="mt-1 text-[#6B6B6B]">Job opportunities for students and alumni</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">
            <Plus className="h-4 w-4" />
            Post Job
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

        <div className="glass-card flex flex-wrap items-center gap-4 rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input type="text" placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none">
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closing-soon">Closing Soon</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="space-y-4">
          {filtered.map((j, i) => (
            <div key={j.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-[#2D2D2D]">{j.title}</h3>
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(j.status))}>{j.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#6B6B6B]">{j.company}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#999]">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{j.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{j.salary}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{j.postedAt}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{j.applicants} applicants</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {j.skills.map((s) => (
                      <span key={s} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{s}</span>
                    ))}
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getTypeStyle(j.type))}>{j.type}</span>
                  </div>
                </div>
                <button className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-2 text-sm font-medium text-[#2D2D2D] transition-all hover:border-[#D4764E]/30 hover:bg-[#D4764E]/10 hover:text-[#D4764E]">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
