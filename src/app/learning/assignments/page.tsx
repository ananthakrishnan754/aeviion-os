"use client"

import { useState } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { FileText, Search, Plus, Clock, CheckCircle2, Users, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Assignment { id: string; title: string; course: string; dueDate: string; submissions: number; totalStudents: number; status: "active" | "closed" | "draft" }

const assignments: Assignment[] = [
  { id: "1", title: "Build a REST API", course: "Node.js Backend", dueDate: "Jan 30, 2025", submissions: 28, totalStudents: 35, status: "active" },
  { id: "2", title: "React Portfolio Site", course: "React Fundamentals", dueDate: "Feb 5, 2025", submissions: 15, totalStudents: 42, status: "active" },
  { id: "3", title: "System Design Document", course: "System Design", dueDate: "Jan 20, 2025", submissions: 32, totalStudents: 32, status: "closed" },
  { id: "4", title: "ML Model Training", course: "Machine Learning", dueDate: "TBD", submissions: 0, totalStudents: 0, status: "draft" },
]

const getStatusStyle = (s: string) => { switch (s) { case "active": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"; case "closed": return "bg-[#999]/15 text-[#888]"; case "draft": return "bg-[#B8860B]/15 text-[#B8860B]"; default: return "bg-[#999]/15 text-[#888]" } }

export default function AssignmentsPage() {
  const [search, setSearch] = useState("")
  const filtered = assignments.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Assignments</h1><p className="mt-1 text-[#6B6B6B]">Manage student assignments and submissions</p></div>
          <Link href="/learning/assignments" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Plus className="h-4 w-4" />Create Assignment</Link>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" /><input type="text" placeholder="Search assignments..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" /></div>
        </div>
        <div className="space-y-4">
          {filtered.map((a, i) => (
            <div key={a.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3"><h3 className="text-lg font-semibold text-[#2D2D2D]">{a.title}</h3><span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(a.status))}>{a.status}</span></div>
                  <p className="mt-1 text-sm text-[#6B6B6B]">{a.course}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-[#999]">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Due: {a.dueDate}</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" />{a.submissions}/{a.totalStudents} submitted</span>
                  </div>
                  {a.totalStudents > 0 && (
                    <div className="mt-3 max-w-xs">
                      <div className="h-2 overflow-hidden rounded-full bg-[#F0EBE3]"><div className="h-full rounded-full bg-gradient-to-r from-[#6B8E6B] to-[#8CB88C]" style={{ width: `${(a.submissions / a.totalStudents) * 100}%` }} /></div>
                    </div>
                  )}
                </div>
                <button className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-2 text-sm font-medium text-[#2D2D2D] transition-all hover:border-[#D4764E]/30 hover:bg-[#D4764E]/10 hover:text-[#D4764E]">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
