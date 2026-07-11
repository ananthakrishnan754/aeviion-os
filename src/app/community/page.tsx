"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Users,
  UserPlus,
  Search,
  GraduationCap,
  Award,
  FolderOpen,
  ExternalLink,
  Star,
  Briefcase,
  Mail,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import type { MockStudent } from "@/lib/db/mock-data"
import { studentsDB } from "@/lib/db/mock-data"

export default function CommunityPage() {
  const [students, setStudents] = useState<MockStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [collegeFilter, setCollegeFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"score" | "name" | "courses">("score")

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    setLoading(true)
    const data = await studentsDB.getAll()
    setStudents(data)
    setLoading(false)
  }

  const colleges = Array.from(new Set(students.map((s) => s.college)))

  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCollege = collegeFilter === "all" || student.college === collegeFilter
      return matchesSearch && matchesCollege
    })
    .sort((a, b) => {
      if (sortBy === "score") return b.communityScore - a.communityScore
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return b.coursesCompleted - a.coursesCompleted
    })

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    totalCourses: students.reduce((sum, s) => sum + s.coursesCompleted, 0),
    totalProjects: students.reduce((sum, s) => sum + s.projectsCount, 0),
    avgScore: Math.round(students.reduce((sum, s) => sum + s.communityScore, 0) / students.length),
  }

  const statCards = [
    { label: "Total Members", value: stats.total, icon: Users, color: "from-[var(--primary)] to-[#C06840]" },
    { label: "Active", value: stats.active, icon: TrendingUp, color: "from-[var(--success)] to-[#2D7A4A]" },
    { label: "Courses Done", value: stats.totalCourses, icon: GraduationCap, color: "from-[var(--info)] to-[#3A6BB0]" },
    { label: "Projects", value: stats.totalProjects, icon: FolderOpen, color: "from-[var(--warning)] to-[#B88030]" },
    { label: "Avg. Score", value: stats.avgScore, icon: Star, color: "from-[#9B6DD7] to-[#7B4FB7]" },
  ]

  return (
    <AppLayout>
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between animate-slide-up">
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Community</h1>
              <p className="mt-1 text-sm text-[var(--foreground-subtle)]">Manage your student community and track engagement</p>
            </div>
            <Link
              href="/community/students"
              className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all"
            >
              <UserPlus className="h-4 w-4" />
              View All Students
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-5 gap-4 stagger-children">
            {statCards.map((stat) => (
              <div key={stat.label} className="card-premium p-4 group">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                    <p className="text-xs text-[var(--muted-foreground)] font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
              />
            </div>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
            >
              <option value="all">All Colleges</option>
              {colleges.map((college) => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
            >
              <option value="score">Top Score</option>
              <option value="name">Name</option>
              <option value="courses">Most Courses</option>
            </select>
          </div>

          {/* Members Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-[var(--border)] py-16 text-center">
              <Users className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
              <h3 className="mt-4 text-lg font-medium text-[var(--foreground)]">No members found</h3>
              <p className="mt-2 text-[var(--foreground-subtle)]">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 stagger-children">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="card-premium p-6 group cursor-default"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-lg font-bold text-white shadow-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                        {student.name}
                      </h3>
                      <p className="text-sm text-[var(--foreground-subtle)] truncate">{student.email}</p>
                      <p className="text-sm text-[var(--muted-foreground)] truncate">{student.college}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        student.status === "active"
                          ? "bg-[var(--success-light)] text-[var(--success)]"
                          : student.status === "alumni"
                          ? "bg-[#F3EEFA] text-[#7B4FB7]"
                          : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                      )}
                    >
                      {student.status}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-[var(--muted-foreground)] font-medium">Community Score</span>
                      <span className="font-bold text-[var(--foreground)]">{student.communityScore}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--background-subtle)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A]"
                        style={{ width: `${student.communityScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-[var(--background-subtle)] p-2.5">
                      <p className="text-lg font-bold text-[var(--foreground)]">{student.coursesCompleted}</p>
                      <p className="text-xs text-[var(--muted-foreground)] font-medium">Courses</p>
                    </div>
                    <div className="rounded-xl bg-[var(--background-subtle)] p-2.5">
                      <p className="text-lg font-bold text-[var(--foreground)]">{student.projectsCount}</p>
                      <p className="text-xs text-[var(--muted-foreground)] font-medium">Projects</p>
                    </div>
                    <div className="rounded-xl bg-[var(--background-subtle)] p-2.5">
                      <p className="text-lg font-bold text-[var(--foreground)]">{student.certificatesCount}</p>
                      <p className="text-xs text-[var(--muted-foreground)] font-medium">Certs</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {student.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-[var(--primary-light)] px-2.5 py-1 text-xs font-medium text-[var(--primary)]"
                        >
                          {skill}
                        </span>
                      ))}
                      {student.skills.length > 4 && (
                        <span className="rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                          +{student.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                    {student.github && (
                      <a
                        href={student.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    {student.linkedin && (
                      <a
                        href={student.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors"
                      >
                        <Briefcase className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    <button className="rounded-xl border border-[var(--border)] p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                      <Mail className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
