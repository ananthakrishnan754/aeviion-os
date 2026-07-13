"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { BookOpen, Plus, Search, ArrowUpRight, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface CourseModule {
  id: string
  title: string
  course_title: string
  course_id: string
  description: string
  order: number
  created_at: string
}

export default function ModulesPage() {
  const [modules, setModules] = useState<CourseModule[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchModules()
  }, [])

  const fetchModules = async () => {
    setLoading(true)
    try {
      const coursesRes = await fetch("/api/courses")
      const courses = await coursesRes.json()
      const allModules: CourseModule[] = []
      for (const course of courses || []) {
        // Modules would come from a modules API - for now show courses as modules
        allModules.push({
          id: course.id,
          title: course.title,
          course_title: course.title,
          course_id: course.id,
          description: course.description || course.short_description || "",
          order: 0,
          created_at: course.created_at,
        })
      }
      setModules(allModules)
    } finally {
      setLoading(false)
    }
  }

  const filtered = modules.filter((m) => m.title?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Learning Modules</h1>
            <p className="text-[var(--muted-foreground)]">Course modules and lesson content</p>
          </div>
          <Link href="/learning/courses/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-all">
            <Plus className="h-4 w-4" /> Create Module
          </Link>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search modules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-20" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No modules yet</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Modules are created within courses</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((m) => (
              <Link key={m.id} href={`/learning/courses/${m.course_id}`} className="card-premium p-4 flex items-center gap-4 hover:shadow-md transition-all group">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[var(--foreground)] truncate">{m.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">Course: {m.course_title}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
