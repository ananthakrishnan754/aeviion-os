"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Contact,
  Users,
  Mail,
  Phone,
  Building2,
  ArrowUpRight,
  Search,
  Plus,
  Star,
  Clock,
  Filter,
  MoreVertical,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company: string
  role: string
  type: "partner" | "mentor" | "sponsor" | "vendor"
  score: number
  lastContact: string
  status: "active" | "cold" | "lead"
}

const contacts: Contact[] = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@techcorp.in", phone: "+91 98765 43210", company: "TechCorp India", role: "CTO", type: "partner", score: 92, lastContact: "2 days ago", status: "active" },
  { id: "2", name: "Priya Sharma", email: "priya@designstudio.com", company: "DesignStudio", role: "Head of Design", type: "mentor", score: 88, lastContact: "1 week ago", status: "active" },
  { id: "3", name: "Amit Patel", email: "amit@startuphub.io", phone: "+91 87654 32109", company: "StartupHub", role: "Founder", type: "sponsor", score: 85, lastContact: "3 days ago", status: "active" },
  { id: "4", name: "Sneha Reddy", email: "sneha@dataflow.ai", company: "DataFlow Analytics", role: "VP Engineering", type: "partner", score: 78, lastContact: "2 weeks ago", status: "cold" },
  { id: "5", name: "Vikram Singh", email: "vikram@cloudnative.dev", phone: "+91 76543 21098", company: "CloudNative Labs", role: "DevOps Lead", type: "mentor", score: 82, lastContact: "5 days ago", status: "active" },
  { id: "6", name: "Ananya Nair", email: "ananya@edutech.co", company: "EduTech Solutions", role: "Product Manager", type: "vendor", score: 70, lastContact: "1 month ago", status: "cold" },
  { id: "7", name: "Karthik Menon", email: "karthik@innovate.tech", phone: "+91 65432 10987", company: "Innovate Tech", role: "CEO", type: "sponsor", score: 95, lastContact: "1 day ago", status: "lead" },
  { id: "8", name: "Deepa Iyer", email: "deepa@greenenergy.in", company: "Green Energy Corp", role: "HR Director", type: "partner", score: 73, lastContact: "10 days ago", status: "cold" },
]

const stats = [
  { label: "Total Contacts", value: "156", icon: Contact, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Active Partners", value: "42", icon: Building2, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Hot Leads", value: "18", icon: Star, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Response Rate", value: "89%", icon: Mail, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

const getTypeStyle = (type: string) => {
  switch (type) {
    case "partner": return "bg-[#4A7DC9]/10 text-[#3A6DB9]"
    case "mentor": return "bg-[#6B8E6B]/10 text-[#5A7A5A]"
    case "sponsor": return "bg-[#D4764E]/10 text-[#C06540]"
    case "vendor": return "bg-[#8B6F47]/10 text-[#8B6F47]"
    default: return "bg-[#999]/10 text-[#888]"
  }
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "active": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"
    case "cold": return "bg-[#999]/15 text-[#888]"
    case "lead": return "bg-[#B8860B]/15 text-[#B8860B]"
    default: return "bg-[#999]/15 text-[#888]"
  }
}

export default function CRMPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const filtered = contacts.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || c.type === filter
    return matchSearch && matchFilter
  })

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">CRM</h1>
            <p className="mt-1 text-[#6B6B6B]">Manage your contacts and partnerships</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">
            <Plus className="h-4 w-4" />
            Add Contact
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
            <input type="text" placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none">
            <option value="all">All Types</option>
            <option value="partner">Partners</option>
            <option value="mentor">Mentors</option>
            <option value="sponsor">Sponsors</option>
            <option value="vendor">Vendors</option>
          </select>
        </div>

        <div className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
          <table className="w-full">
            <thead className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Contact</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Company</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Type</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Score</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Status</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Last Contact</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D4]">
              {filtered.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-[#FAF8F5]/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-[#2D2D2D]">{c.name}</p>
                        <p className="text-xs text-[#999]">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B6B6B]">{c.company}</td>
                  <td className="px-6 py-4"><span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getTypeStyle(c.type))}>{c.type}</span></td>
                  <td className="px-6 py-4"><div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[#B8860B] text-[#B8860B]" /><span className="text-sm font-semibold text-[#2D2D2D]">{c.score}</span></div></td>
                  <td className="px-6 py-4"><span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getStatusStyle(c.status))}>{c.status}</span></td>
                  <td className="px-6 py-4 text-sm text-[#999]">{c.lastContact}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#D4764E]"><MessageSquare className="h-4 w-4" /></button>
                      <button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]"><MoreVertical className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
