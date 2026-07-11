"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Send, Search, CheckCircle2, Clock, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Submission { id: string; student: string; project: string; submittedAt: string; status: "approved" | "pending" | "rejected" }

const submissions: Submission[] = [
  { id: "1", student: "Alex Kumar", project: "AI Resume Analyzer", submittedAt: "Jan 22, 2025", status: "approved" },
  { id: "2", student: "Sarah Johnson", project: "E-Commerce Platform", submittedAt: "Jan 21, 2025", status: "pending" },
  { id: "3", student: "Mike Chen", project: "Real-time Chat App", submittedAt: "Jan 20, 2025", status: "approved" },
  { id: "4", student: "Emily Davis", project: "Weather Dashboard", submittedAt: "Jan 19, 2025", status: "rejected" },
  { id: "5", student: "Rahul Sharma", project: "Task Management CLI", submittedAt: "Jan 18, 2025", status: "pending" },
]

const getStatusStyle = (s: string) => { switch (s) { case "approved": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"; case "pending": return "bg-[#B8860B]/15 text-[#B8860B]"; case "rejected": return "bg-[#D4764E]/15 text-[#C06540]"; default: return "bg-[#999]/15 text-[#888]" } }
const getStatusIcon = (s: string) => { switch (s) { case "approved": return CheckCircle2; case "pending": return Clock; case "rejected": return XCircle; default: return Clock } }

export default function SubmissionsPage() {
  const [search, setSearch] = useState("")
  const filtered = submissions.filter((s) => s.student.toLowerCase().includes(search.toLowerCase()) || s.project.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Submissions</h1><p className="mt-1 text-[#6B6B6B]">Review and manage project submissions</p></div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" /><input type="text" placeholder="Search submissions..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" /></div>
        </div>
        <div className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
          <table className="w-full">
            <thead className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Student</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Project</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Submitted</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D4]">
              {filtered.map((s) => {
                const StatusIcon = getStatusIcon(s.status)
                return (
                  <tr key={s.id} className="transition-colors hover:bg-[#FAF8F5]/50">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">{s.student.charAt(0)}</div><span className="font-medium text-[#2D2D2D]">{s.student}</span></div></td>
                    <td className="px-6 py-4 text-sm text-[#6B6B6B]">{s.project}</td>
                    <td className="px-6 py-4 text-sm text-[#999]">{s.submittedAt}</td>
                    <td className="px-6 py-4"><span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(s.status))}><StatusIcon className="h-3 w-3" />{s.status}</span></td>
                    <td className="px-6 py-4 text-right"><button className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-3 py-1.5 text-xs font-medium text-[#2D2D2D] transition-all hover:border-[#D4764E]/30 hover:bg-[#D4764E]/10 hover:text-[#D4764E]">Review</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
