"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { FolderOpen, ArrowLeft, Github, ExternalLink, Trash2, Star, CheckCircle } from "lucide-react"
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
  progress: number
  rating: number
  feedback: string
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

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => { fetch(`/api/projects/${id}`).then((r) => r.json()).then(setProject).finally(() => setLoading(false)) }, [id])

  const updateStatus = async (status: string) => {
    setActionLoading(true)
    try {
      await fetch(`/api/projects/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) })
      setProject((prev) => prev ? { ...prev, status } : prev)
    } finally { setActionLoading(false) }
  }

  const toggleFeatured = async () => {
    setActionLoading(true)
    try {
      await fetch(`/api/projects/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ featured: !project?.featured }) })
      setProject((prev) => prev ? { ...prev, featured: !prev.featured } : prev)
    } finally { setActionLoading(false) }
  }

  const deleteProject = async () => {
    if (!confirm("Delete this project?")) return
    setActionLoading(true)
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      window.location.href = "/projects"
    } finally { setActionLoading(false) }
  }

  if (loading) return <AppLayout><div className="max-w-3xl mx-auto animate-pulse space-y-6"><div className="h-8 bg-[var(--muted)] rounded w-1/3" /><div className="card-premium h-64" /></div></AppLayout>
  if (!project) return <AppLayout><div className="max-w-3xl mx-auto text-center py-20"><h2 className="text-xl font-semibold">Not found</h2><Link href="/projects" className="text-[var(--primary)] mt-2 inline-block">Back</Link></div></AppLayout>

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/projects" className="rounded-xl border border-[var(--border)] p-2 hover:bg-[var(--muted)] transition-all"><ArrowLeft className="h-5 w-5" /></Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{project.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", statusColors[project.status])}>{project.status}</span>
              {project.featured && <span className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">Featured</span>}
            </div>
          </div>
        </div>

        <div className="card-premium p-6 space-y-4">
          {project.description && <p className="text-[var(--muted-foreground)]">{project.description}</p>}
          {project.tech_stack?.length > 0 && (
            <div className="flex flex-wrap gap-2">{project.tech_stack.map((t) => <span key={t} className="rounded-lg bg-[var(--muted)] px-3 py-1 text-sm text-[var(--muted-foreground)]">{t}</span>)}</div>
          )}
          {project.progress > 0 && (
            <div>
              <div className="flex items-center justify-between text-sm mb-1"><span className="text-[var(--muted-foreground)]">Progress</span><span className="font-medium text-[var(--foreground)]">{project.progress}%</span></div>
              <div className="w-full h-2 rounded-full bg-[var(--muted)]"><div className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A]" style={{ width: `${project.progress}%` }} /></div>
            </div>
          )}
          {project.feedback && (
            <div className="pt-3 border-t border-[var(--border)]"><p className="text-sm text-[var(--muted-foreground)]"><strong>Feedback:</strong> {project.feedback}</p></div>
          )}
          <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--foreground)]"><Github className="h-4 w-4" /> GitHub</a>}
            {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--foreground)]"><ExternalLink className="h-4 w-4" /> Demo</a>}
          </div>
        </div>

        <div className="flex gap-3 pb-8">
          <button onClick={toggleFeatured} disabled={actionLoading}
            className={cn("inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all disabled:opacity-50",
              project.featured ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)]")}>
            <Star className="h-4 w-4" /> {project.featured ? "Unfeature" : "Feature"}
          </button>
          {project.status !== "completed" && (
            <button onClick={() => updateStatus("completed")} disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-all disabled:opacity-50">
              <CheckCircle className="h-4 w-4" /> Mark Complete
            </button>
          )}
          <button onClick={deleteProject} disabled={actionLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all disabled:opacity-50">
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
