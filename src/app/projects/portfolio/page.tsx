"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { FolderOpen, Search, Star } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  status: string
  progress: number
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects).finally(() => setLoading(false))
  }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Student Portfolios</h1>
          <p className="text-[var(--muted-foreground)]">Student project portfolios and progress</p>
        </div>

        {loading ? (
          <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-24" />)}</div>
        ) : projects.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <FolderOpen className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No portfolios yet</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Projects will appear here once students submit them</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="card-premium p-5 flex items-center gap-5 hover:shadow-md transition-all group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-white shrink-0">
                  <FolderOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--foreground)] truncate group-hover:text-[var(--primary)] transition-colors">{p.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] truncate">{p.description || "No description"}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mt-1">
                    <span className="capitalize">{p.status}</span>
                    {p.progress > 0 && <span>{p.progress}% complete</span>}
                  </div>
                </div>
                {p.progress > 0 && (
                  <div className="w-24 shrink-0">
                    <div className="w-full h-1.5 rounded-full bg-[var(--muted)]"><div className="h-full rounded-full bg-[var(--primary)]" style={{ width: `${p.progress}%` }} /></div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
