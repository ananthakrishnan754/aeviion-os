"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FolderOpen, Plus, Search, Github, Eye, Trash2, Star, ExternalLink } from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  category: string
  github: string
  demo_url: string
  status: string
  progress: number
  rating: number
  featured: boolean
  team_members: string[]
  created_at: string
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  review: "bg-yellow-100 text-yellow-700",
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/projects")
      if (res.ok) setProjects(await res.json())
    } finally { setLoading(false) }
  }

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" })
      if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id))
    } finally { setDeleting(null) }
  }

  const filtered = projects.filter((p) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch = p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const completed = projects.filter((p) => p.status === "completed").length
  const featured = projects.filter((p) => p.featured).length

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Projects</h1>
            <p className="text-[var(--muted-foreground)]">Student projects, portfolios, and submissions</p>
          </div>
          <Link href="/projects/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all">
            <Plus className="h-4 w-4" /> Submit Project
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Projects", value: projects.length, icon: FolderOpen, color: "from-blue-500 to-blue-600" },
            { label: "Completed", value: completed, icon: Star, color: "from-green-500 to-green-600" },
            { label: "Featured", value: featured, icon: Eye, color: "from-purple-500 to-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="card-premium p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                </div>
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-premium p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input type="text" placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30">
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-48" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <FolderOpen className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              {searchQuery || statusFilter !== "all" ? "Try adjusting filters" : "Submit your first project"}
            </p>
            <Link href="/projects/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary)]/90">
              <Plus className="h-4 w-4" /> Submit Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project) => (
              <div key={project.id} className="card-premium p-5 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2">
                    <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", statusColors[project.status] || "bg-gray-100 text-gray-600")}>
                      {project.status}
                    </span>
                    {project.featured && <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">Featured</span>}
                  </div>
                  <button onClick={() => deleteProject(project.id)} disabled={deleting === project.id}
                    className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">{project.description || "No description"}</p>
                {project.tech_stack && project.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech_stack.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-md bg-[var(--muted)] px-2 py-0.5 text-xs text-[var(--muted-foreground)]">{t}</span>
                    ))}
                    {project.tech_stack.length > 4 && <span className="text-xs text-[var(--muted-foreground)]">+{project.tech_stack.length - 4}</span>}
                  </div>
                )}
                {project.progress > 0 && (
                  <div className="w-full h-1.5 rounded-full bg-[var(--muted)] mb-4">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A]" style={{ width: `${project.progress}%` }} />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Link href={`/projects/${project.id}`} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all">
                    <Eye className="h-4 w-4" /> View
                  </Link>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[var(--border)] p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[var(--border)] p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
