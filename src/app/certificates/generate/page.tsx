"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Award, Search, Plus, Download, Eye, Send, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Cert { id: string; student: string; course: string; issuedAt: string; status: "issued" | "pending" | "revoked"; certId: string }

const certs: Cert[] = [
  { id: "1", student: "Alex Kumar", course: "React Fundamentals", issuedAt: "Jan 20, 2025", status: "issued", certId: "AEV-2025-001" },
  { id: "2", student: "Sarah Johnson", course: "Node.js Backend", issuedAt: "Jan 18, 2025", status: "issued", certId: "AEV-2025-002" },
  { id: "3", student: "Mike Chen", course: "System Design", issuedAt: "Jan 15, 2025", status: "issued", certId: "AEV-2025-003" },
  { id: "4", student: "Emily Davis", course: "React Fundamentals", issuedAt: "Pending", status: "pending", certId: "—" },
  { id: "5", student: "Rahul Sharma", course: "Node.js Backend", issuedAt: "Jan 10, 2025", status: "revoked", certId: "AEV-2025-005" },
]

const getStatusStyle = (s: string) => { switch (s) { case "issued": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"; case "pending": return "bg-[#B8860B]/15 text-[#B8860B]"; case "revoked": return "bg-[#D4764E]/15 text-[#C06540]"; default: return "bg-[#999]/15 text-[#888]" } }

export default function GenerateCertsPage() {
  const [search, setSearch] = useState("")
  const filtered = certs.filter((c) => c.student.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Generate Certificates</h1><p className="mt-1 text-[#6B6B6B]">Create and issue certificates to students</p></div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Plus className="h-4 w-4" />Generate New</button>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" /><input type="text" placeholder="Search certificates..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" /></div>
        </div>
        <div className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
          <table className="w-full">
            <thead className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Student</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Course</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Cert ID</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Issued</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D4]">
              {filtered.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-[#FAF8F5]/50">
                  <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">{c.student.charAt(0)}</div><span className="font-medium text-[#2D2D2D]">{c.student}</span></div></td>
                  <td className="px-6 py-4 text-sm text-[#6B6B6B]">{c.course}</td>
                  <td className="px-6 py-4 text-sm font-mono text-[#2D2D2D]">{c.certId}</td>
                  <td className="px-6 py-4 text-sm text-[#999]">{c.issuedAt}</td>
                  <td className="px-6 py-4"><span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(c.status))}>{c.status}</span></td>
                  <td className="px-6 py-4 text-right"><div className="flex justify-end gap-1"><button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]"><Download className="h-4 w-4" /></button><button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#D4764E]"><Send className="h-4 w-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
