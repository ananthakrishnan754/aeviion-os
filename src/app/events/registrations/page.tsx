"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Calendar, Users, CheckCircle2, Clock, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const registrations = [
  { id: "1", event: "AI Workshop: Building with LLMs", student: "Alex Kumar", email: "alex@email.com", registeredAt: "Jan 20, 2025", status: "confirmed" },
  { id: "2", event: "AI Workshop: Building with LLMs", student: "Sarah Johnson", email: "sarah@email.com", registeredAt: "Jan 21, 2025", status: "confirmed" },
  { id: "3", event: "Web Dev Bootcamp 2025", student: "Mike Chen", email: "mike@email.com", registeredAt: "Jan 18, 2025", status: "pending" },
  { id: "4", event: "Cybersecurity Seminar", student: "Emily Davis", email: "emily@email.com", registeredAt: "Jan 22, 2025", status: "confirmed" },
  { id: "5", event: "React Advanced Patterns", student: "Rahul Sharma", email: "rahul@email.com", registeredAt: "Jan 19, 2025", status: "waitlisted" },
]

const getStatusStyle = (s: string) => {
  switch (s) {
    case "confirmed": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"
    case "pending": return "bg-[#B8860B]/15 text-[#B8860B]"
    case "waitlisted": return "bg-[#999]/15 text-[#888]"
    default: return "bg-[#999]/15 text-[#888]"
  }
}

export default function RegistrationsPage() {
  const [search, setSearch] = useState("")
  const filtered = registrations.filter((r) => r.student.toLowerCase().includes(search.toLowerCase()) || r.event.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Registrations</h1>
          <p className="mt-1 text-[#6B6B6B]">Track event registrations and attendance</p>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input type="text" placeholder="Search registrations..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
        </div>
        <div className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
          <table className="w-full">
            <thead className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Student</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Event</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Registered</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D4]">
              {filtered.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-[#FAF8F5]/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">{r.student.charAt(0)}</div>
                      <div><p className="font-medium text-[#2D2D2D]">{r.student}</p><p className="text-xs text-[#999]">{r.email}</p></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B6B6B]">{r.event}</td>
                  <td className="px-6 py-4 text-sm text-[#999]">{r.registeredAt}</td>
                  <td className="px-6 py-4"><span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(r.status))}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
