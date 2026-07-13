"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Plus,
  Eye,
  Trash2,
  GraduationCap,
  TrendingUp,
} from "lucide-react"
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
  thumbnail?: string
  created_at: string
}

const levelColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-600",
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  published: "bg-green-100 text-green-700",
  archived: "bg-orange-100 text-orange-700",
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => { fetchCourses() }, [])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/courses")
      if (res.ok) setCourses(await res.json())
    } finally { setLoading(false) }
  }

  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" })
      if (res.ok) setCourses((prev) => prev.filter((c) => c.id !== id))
    } finally { setDeleting(null) }
  }

  const filtered = courses.filter((c) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch = c.title?.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q)
    const matchesLevel = levelFilter === "all" || c.level === levelFilter
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    return matchesSearch && matchesLevel && matchesStatus
  })

  const totalEnrolled = courses.reduce((sum, c) => sum + (c.enrolled_students || 0), 0)
  const published = courses.filter((c) => c.status === "published").length

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Courses</h1>
            <p className="text-[var(--muted-foreground)]">Manage learning content and courses</p>
          </div>
          <Link href="/learning/courses/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all">
            <Plus className="h-4 w-4" /> Create Course
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Courses", value: courses.length, icon: BookOpen, color: "from-blue-500 to-blue-600" },
            { label: "Published", value: published, icon: GraduationCap, color: "from-green-500 to-green-600" },
            { label: "Total Enrolled", value: totalEnrolled, icon: Users, color: "from-purple-500 to-purple-600" },
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
              <input type="text" placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
            </div>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30">
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30">
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-48" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              {searchQuery || levelFilter !== "all" || statusFilter !== "all" ? "Try adjusting filters" : "Create your first course"}
            </p>
            <Link href="/learning/courses/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary)]/90">
              <Plus className="h-4 w-4" /> Create Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course) => (
              <div key={course.id} className="card-premium p-5 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2">
                    <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", levelColors[course.level] || "bg-gray-100 text-gray-600")}>
                      {course.level}
                    </span>
                    <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", statusColors[course.status] || "bg-gray-100 text-gray-600")}>
                      {course.status}
                    </span>
                  </div>
                  <button onClick={() => deleteCourse(course.id)} disabled={deleting === course.id}
                    className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{course.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">{course.description || course.short_description || "No description"}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] mb-4">
                  {course.category && <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> {course.category}</span>}
                  {course.duration && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>}
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {course.enrolled_students || 0}</span>
                  {course.rating > 0 && <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {course.rating}</span>}
                </div>
                <Link href={`/learning/courses/${course.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all">
                  <Eye className="h-4 w-4" /> View Course
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
