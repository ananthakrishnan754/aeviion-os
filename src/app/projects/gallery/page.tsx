"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { FolderOpen, Search, Plus, Star, Eye, Github, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project { id: string; title: string; description: string; student: string; tags: string[]; stars: number; views: number; image?: string }

const projects: Project[] = [
  { id: "1", title: "AI Resume Analyzer", description: "ML-powered resume scoring and improvement suggestions", student: "Alex Kumar", tags: ["Python", "NLP", "ML"], stars: 45, views: 230 },
  { id: "2", title: "E-Commerce Platform", description: "Full-stack marketplace with payments and admin", student: "Sarah Johnson", tags: ["React", "Node.js", "Stripe"], stars: 38, views: 189 },
  { id: "3", title: "Real-time Chat App", description: "WebSocket-based messaging with rooms and media", student: "Mike Chen", tags: ["Socket.io", "React", "MongoDB"], stars: 32, views: 156 },
  { id: "4", title: "Weather Dashboard", description: "Interactive weather maps with 7-day forecasts", student: "Emily Davis", tags: ["React", "API", "Charts"], stars: 28, views: 134 },
  { id: "5", title: "Task Management CLI", description: "Developer-friendly CLI for project task tracking", student: "Rahul Sharma", tags: ["Go", "CLI", "SQLite"], stars: 24, views: 98 },
  { id: "6", title: "Blockchain Voting", description: "Transparent voting system on Ethereum testnet", student: "Lisa Wang", tags: ["Solidity", "Web3", "React"], stars: 41, views: 210 },
]

export default function ProjectGalleryPage() {
  const [search, setSearch] = useState("")
  const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Project Gallery</h1><p className="mt-1 text-[#6B6B6B]">Showcase of student projects</p></div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Plus className="h-4 w-4" />Submit Project</button>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" /><input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" /></div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <div key={p.id} className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="h-40 bg-gradient-to-br from-[#D4764E]/20 to-[#E8956A]/20 flex items-center justify-center"><FolderOpen className="h-12 w-12 text-[#D4764E]/40" /></div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-semibold text-[#2D2D2D]">{p.title}</h3>
                <p className="mb-3 text-sm text-[#6B6B6B] line-clamp-2">{p.description}</p>
                <p className="mb-3 text-xs text-[#999]">by {p.student}</p>
                <div className="mb-4 flex flex-wrap gap-2">{p.tags.map((t) => (<span key={t} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{t}</span>))}</div>
                <div className="flex items-center gap-4 text-xs text-[#999]">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[#B8860B] text-[#B8860B]" />{p.stars}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{p.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
