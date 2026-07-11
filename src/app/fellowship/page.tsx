"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Rocket,
  Users,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Search,
  Plus,
  Star,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Fellowship {
  id: string
  title: string
  description: string
  company: string
  duration: string
  stipend: string
  location: string
  type: "full-time" | "part-time" | "remote"
  status: "open" | "closing-soon" | "closed"
  applicants: number
  maxSlots: number
  skills: string[]
  postedAt: string
}

const fellowships: Fellowship[] = [
  {
    id: "1",
    title: "Software Engineering Fellow",
    description: "Work on production-grade features with our engineering team. Build real products that impact thousands of users.",
    company: "TechCorp India",
    duration: "6 months",
    stipend: "₹25,000/mo",
    location: "Bangalore",
    type: "full-time",
    status: "open",
    applicants: 45,
    maxSlots: 5,
    skills: ["React", "Node.js", "TypeScript"],
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "Data Science Intern",
    description: "Analyze real datasets and build ML models for business intelligence and predictive analytics.",
    company: "DataFlow Analytics",
    duration: "3 months",
    stipend: "₹20,000/mo",
    location: "Remote",
    type: "remote",
    status: "open",
    applicants: 78,
    maxSlots: 8,
    skills: ["Python", "ML", "SQL"],
    postedAt: "5 days ago",
  },
  {
    id: "3",
    title: "UI/UX Design Fellow",
    description: "Design user interfaces for mobile and web applications. Work directly with product teams.",
    company: "DesignStudio",
    duration: "4 months",
    stipend: "₹18,000/mo",
    location: "Mumbai",
    type: "part-time",
    status: "closing-soon",
    applicants: 32,
    maxSlots: 3,
    skills: ["Figma", "UI Design", "Prototyping"],
    postedAt: "1 week ago",
  },
  {
    id: "4",
    title: "DevOps Engineering Fellow",
    description: "Help build and maintain CI/CD pipelines, cloud infrastructure, and monitoring systems.",
    company: "CloudNative Labs",
    duration: "6 months",
    stipend: "₹22,000/mo",
    location: "Hyderabad",
    type: "full-time",
    status: "open",
    applicants: 21,
    maxSlots: 4,
    skills: ["AWS", "Docker", "Kubernetes"],
    postedAt: "3 days ago",
  },
  {
    id: "5",
    title: "Product Management Intern",
    description: "Shadow product managers, conduct user research, and help define product roadmaps.",
    company: "StartupHub",
    duration: "3 months",
    stipend: "₹15,000/mo",
    location: "Pune",
    type: "full-time",
    status: "closed",
    applicants: 56,
    maxSlots: 2,
    skills: ["Analytics", "Research", "Strategy"],
    postedAt: "2 weeks ago",
  },
]

const stats = [
  { label: "Active Fellowships", value: "12", icon: Rocket, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Total Applicants", value: "234", icon: Users, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Slots Filled", value: "18/25", icon: CheckCircle2, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Avg. Duration", value: "4.5 mo", icon: Clock, gradient: "from-[#8B6F47] to-[#A0845C]" },
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
    case "remote": return "bg-[#6B8E6B]/10 text-[#5A7A5A]"
    default: return "bg-[#999]/10 text-[#888]"
  }
}

export default function FellowshipPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = fellowships.filter((f) => {
    const matchSearch = f.title.toLowerCase().includes(search.toLowerCase()) || f.company.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || f.status === filter
    return matchSearch && matchFilter
  })

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">Fellowships</h1>
            <p className="mt-1 text-[#6B6B6B]">Discover opportunities to grow your career</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">
            <Plus className="h-4 w-4" />
            Post Fellowship
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
            <input
              type="text"
              placeholder="Search fellowships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closing-soon">Closing Soon</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((f, i) => (
            <div key={f.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#2D2D2D]">{f.title}</h3>
                  <p className="mt-0.5 text-sm text-[#6B6B6B]">{f.company}</p>
                </div>
                <div className="flex gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(f.status))}>{f.status}</span>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getTypeStyle(f.type))}>{f.type}</span>
                </div>
              </div>
              <p className="mb-4 text-sm text-[#6B6B6B] line-clamp-2">{f.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {f.skills.map((s) => (
                  <span key={s} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{s}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-[#999]">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{f.duration}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{f.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{f.stipend}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{f.applicants}/{f.maxSlots}</span>
              </div>
              <div className="mt-4 border-t border-[#E8E0D4] pt-4">
                <button className="w-full rounded-xl bg-[#FAF8F5] py-2.5 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
