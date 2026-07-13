"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { FolderOpen, Search, Star, Github, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  category: string
  github: string
  demo_url: string
  status: string
  featured: boolean
}

export default function GalleryPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then((data) => {
      setProjects((data || []).filter((p: Project) => p.status === "completed"))
    }).finally(() => setLoading(false))
  }, [])

  const filtered = projects.filter((p) => p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Project Gallery</h1>
          <p className="text-[var(--muted-foreground)]">Showcase of completed student projects</p>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search gallery..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-56" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <FolderOpen className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects in gallery</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Completed projects will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="card-premium p-5 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] flex items-center justify-center text-white">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  {p.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">{p.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">{p.description || "No description"}</p>
                {p.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tech_stack.slice(0, 3).map((t) => <span key={t} className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">{t}</span>)}
                  </div>
                )}
                <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                  {p.github && <span className="flex items-center gap-1"><Github className="h-3.5 w-3.5" /> Code</span>}
                  {p.demo_url && <span className="flex items-center gap-1"><ExternalLink className="h-3.5 w-3.5" /> Live</span>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
