"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { FolderOpen, Search, Eye, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  status: string
  created_at: string
}

export default function SubmissionsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects).finally(() => setLoading(false))
  }, [])

  const filtered = projects.filter((p) => p.title?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Submissions</h1>
          <p className="text-[var(--muted-foreground)]">Review and manage project submissions</p>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search submissions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-20" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <FolderOpen className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No submissions</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Project submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="card-premium p-4 flex items-center gap-4 hover:shadow-md transition-all group">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                  p.status === "completed" ? "bg-green-100 text-green-600" : p.status === "review" ? "bg-yellow-100 text-yellow-600" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                  {p.status === "completed" ? <CheckCircle className="h-5 w-5" /> : p.status === "review" ? <Clock className="h-5 w-5" /> : <FolderOpen className="h-5 w-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[var(--foreground)] truncate group-hover:text-[var(--primary)] transition-colors">{p.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">Submitted {new Date(p.created_at).toLocaleDateString()}</p>
                </div>
                <span className={cn("rounded-lg px-2.5 py-1 text-xs font-medium",
                  p.status === "completed" ? "bg-green-100 text-green-700" : p.status === "review" ? "bg-yellow-100 text-yellow-700" : p.status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>
                  {p.status}
                </span>
                <Eye className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
