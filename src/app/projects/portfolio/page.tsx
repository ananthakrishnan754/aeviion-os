"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Award, Search, Star, Briefcase, GraduationCap, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Portfolio { id: string; name: string; college: string; skills: string[]; projects: number; score: number; status: "active" | "incomplete" }

const portfolios: Portfolio[] = [
  { id: "1", name: "Alex Kumar", college: "MIT", skills: ["React", "Node.js", "Python"], projects: 8, score: 98, status: "active" },
  { id: "2", name: "Sarah Johnson", college: "Stanford", skills: ["TypeScript", "AWS", "React"], projects: 6, score: 96, status: "active" },
  { id: "3", name: "Mike Chen", college: "Berkeley", skills: ["Python", "ML", "TensorFlow"], projects: 5, score: 94, status: "active" },
  { id: "4", name: "Emily Davis", college: "Harvard", skills: ["JavaScript", "Vue.js", "Firebase"], projects: 7, score: 92, status: "incomplete" },
  { id: "5", name: "Rahul Sharma", college: "IIT Delhi", skills: ["Java", "Spring Boot", "K8s"], projects: 4, score: 90, status: "active" },
]

export default function PortfolioPage() {
  const [search, setSearch] = useState("")
  const filtered = portfolios.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Student Portfolios</h1><p className="mt-1 text-[#6B6B6B]">Showcase of student work and achievements</p></div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" /><input type="text" placeholder="Search portfolios..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" /></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <div key={p.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">{p.name.split(" ").map((n) => n[0]).join("")}</div>
                <div><h3 className="font-semibold text-[#2D2D2D]">{p.name}</h3><p className="text-xs text-[#6B6B6B]">{p.college}</p></div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">{p.skills.map((s) => (<span key={s} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{s}</span>))}</div>
              <div className="flex items-center justify-between text-xs text-[#999]">
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{p.projects} projects</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[#B8860B] text-[#B8860B]" />{p.score} score</span>
              </div>
              <button className="mt-4 w-full rounded-xl bg-[#FAF8F5] py-2.5 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]">View Portfolio</button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
