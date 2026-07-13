"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Plus, Search, Calendar, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Fellowship {
  id: string
  title: string
  description: string
  duration: string
  max_participants: number
  registrations: number
  status: string
  start_date: string
}

export default function FellowshipsPage() {
  const [fellowships, setFellowships] = useState<Fellowship[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Use courses as fellowships source (filtered by category or use a separate table)
    // For now, show published courses with fellowship-like metadata
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => setFellowships((data || []).map((c: Record<string, unknown>) => ({
        id: c.id as string,
        title: c.title as string,
        description: (c.description || c.short_description || "") as string,
        duration: (c.duration || "") as string,
        max_participants: 0,
        registrations: (c.enrolled_students as number) || 0,
        status: (c.status as string) || "draft",
        start_date: c.created_at as string,
      }))))
      .finally(() => setLoading(false))
  }, [])

  const filtered = fellowships.filter((f) => f.title?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Fellowships</h1>
            <p className="text-[var(--muted-foreground)]">Structured cohort-based learning programs</p>
          </div>
          <Link href="/learning/courses/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-all">
            <Plus className="h-4 w-4" /> Post Fellowship
          </Link>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search fellowships..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">{[1, 2].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-24" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No fellowships yet</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Create a course to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((f) => (
              <Link key={f.id} href={`/learning/courses/${f.id}`} className="card-premium p-5 flex items-center gap-5 hover:shadow-md transition-all group">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[var(--foreground)] truncate">{f.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] truncate">{f.description || "No description"}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] mt-1">
                    {f.duration && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {f.duration}</span>}
                    <span>{f.registrations} enrolled</span>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
