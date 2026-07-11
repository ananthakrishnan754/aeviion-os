"use client"

import { useState } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { BookOpen, Search, Plus, Clock, Users, CheckCircle2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Module { id: string; title: string; description: string; lessons: number; duration: string; students: number; status: "published" | "draft" | "locked" }

const modules: Module[] = [
  { id: "1", title: "React Fundamentals", description: "Master React hooks, components, and state management", lessons: 12, duration: "8 hours", students: 234, status: "published" },
  { id: "2", title: "Node.js Backend", description: "Build scalable APIs with Express and TypeScript", lessons: 10, duration: "6 hours", students: 189, status: "published" },
  { id: "3", title: "System Design", description: "Architecture patterns for distributed systems", lessons: 8, duration: "5 hours", students: 156, status: "published" },
  { id: "4", title: "Machine Learning", description: "Introduction to ML with Python and scikit-learn", lessons: 15, duration: "10 hours", students: 0, status: "draft" },
  { id: "5", title: "Cloud Computing", description: "AWS fundamentals and deployment strategies", lessons: 0, duration: "0 hours", students: 0, status: "locked" },
]

const getStatusStyle = (s: string) => { switch (s) { case "published": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"; case "draft": return "bg-[#B8860B]/15 text-[#B8860B]"; case "locked": return "bg-[#999]/15 text-[#888]"; default: return "bg-[#999]/15 text-[#888]" } }

export default function ModulesPage() {
  const [search, setSearch] = useState("")
  const filtered = modules.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Modules</h1><p className="mt-1 text-[#6B6B6B]">Structured learning content and curriculum</p></div>
          <Link href="/learning/modules" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Plus className="h-4 w-4" />Create Module</Link>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" /><input type="text" placeholder="Search modules..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" /></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <div key={m.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-white"><BookOpen className="h-5 w-5" /></div>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(m.status))}>{m.status}</span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-[#2D2D2D]">{m.title}</h3>
              <p className="mb-4 text-sm text-[#6B6B6B]">{m.description}</p>
              <div className="flex items-center gap-4 text-xs text-[#999]">
                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{m.lessons} lessons</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{m.duration}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{m.students}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
