"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { BookOpen, ArrowLeft, Clock, Users, Star, DollarSign, Trash2, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

interface Course {
  id: string
  title: string
  description: string
  short_description: string
  category: string
  level: string
  duration: string
  price: number
  enrolled_students: number
  rating: number
  status: string
  created_at: string
}

const levelColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-600",
}

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/courses/${id}`).then((r) => r.json()).then(setCourse).finally(() => setLoading(false))
  }, [id])

  const updateStatus = async (status: string) => {
    setActionLoading(true)
    try {
      await fetch(`/api/courses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      setCourse((prev) => prev ? { ...prev, status } : prev)
    } finally { setActionLoading(false) }
  }

  const deleteCourse = async () => {
    if (!confirm("Delete this course?")) return
    setActionLoading(true)
    try {
      await fetch(`/api/courses/${id}`, { method: "DELETE" })
      window.location.href = "/learning/courses"
    } finally { setActionLoading(false) }
  }

  if (loading) {
    return <AppLayout><div className="max-w-3xl mx-auto animate-pulse space-y-6"><div className="h-8 bg-[var(--muted)] rounded w-1/3" /><div className="card-premium h-64" /></div></AppLayout>
  }

  if (!course) {
    return <AppLayout><div className="max-w-3xl mx-auto text-center py-20"><h2 className="text-xl font-semibold">Course not found</h2><Link href="/learning/courses" className="text-[var(--primary)] mt-2 inline-block">Back to courses</Link></div></AppLayout>
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/learning/courses" className="rounded-xl border border-[var(--border)] p-2 hover:bg-[var(--muted)] transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{course.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", levelColors[course.level])}>{course.level}</span>
              <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", course.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{course.status}</span>
            </div>
          </div>
        </div>

        <div className="card-premium p-6 space-y-4">
          {course.description && <p className="text-[var(--muted-foreground)]">{course.description}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-[var(--muted-foreground)]" /><span className="text-[var(--muted-foreground)]">{course.duration || "—"}</span></div>
            <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-[var(--muted-foreground)]" /><span className="text-[var(--muted-foreground)]">{course.enrolled_students || 0} enrolled</span></div>
            <div className="flex items-center gap-2 text-sm"><Star className="h-4 w-4 text-[var(--muted-foreground)]" /><span className="text-[var(--muted-foreground)]">{course.rating || 0}</span></div>
            <div className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-[var(--muted-foreground)]" /><span className="text-[var(--muted-foreground)]">{course.price > 0 ? `$${course.price}` : "Free"}</span></div>
          </div>
        </div>

        <div className="flex gap-3 pb-8">
          {course.status === "draft" && (
            <button onClick={() => updateStatus("published")} disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-all disabled:opacity-50">
              Publish
            </button>
          )}
          {course.status === "published" && (
            <button onClick={() => updateStatus("archived")} disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all disabled:opacity-50">
              Archive
            </button>
          )}
          <button onClick={deleteCourse} disabled={actionLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all disabled:opacity-50">
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </AppLayout>
  )
}
