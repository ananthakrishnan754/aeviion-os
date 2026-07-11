"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  GraduationCap,
  Award,
  FolderOpen,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Star,
  Briefcase,
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

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your student community and track engagement</p>
            </div>
            <Link
              href="/community/students"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              View All Students
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-5 gap-4">
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Members</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                  <p className="text-xs text-gray-500">Courses Completed</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <FolderOpen className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                  <p className="text-xs text-gray-500">Projects</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Star className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgScore}</p>
                  <p className="text-xs text-gray-500">Avg. Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Colleges</option>
              {colleges.map((college) => (
                <option key={college} value={college}>
                  {college}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="score">Top Score</option>
              <option value="name">Name</option>
              <option value="courses">Most Courses</option>
            </select>
          </div>

          {/* Members Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No members found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="group rounded-xl border bg-white p-6 transition-all hover:shadow-md hover:border-gray-300"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                      {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {student.name}
                      </h3>
                      <p className="text-sm text-gray-500">{student.email}</p>
                      <p className="text-sm text-gray-500">{student.college}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        student.status === "active"
                          ? "bg-green-100 text-green-700"
                          : student.status === "alumni"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-600"
                      )}
                    >
                      {student.status}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-500">Community Score</span>
                      <span className="font-semibold text-gray-900">{student.communityScore}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${student.communityScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-lg font-bold text-gray-900">{student.coursesCompleted}</p>
                      <p className="text-xs text-gray-500">Courses</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-lg font-bold text-gray-900">{student.projectsCount}</p>
                      <p className="text-xs text-gray-500">Projects</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2">
                      <p className="text-lg font-bold text-gray-900">{student.certificatesCount}</p>
                      <p className="text-xs text-gray-500">Certs</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="mb-2 text-xs font-medium text-gray-500">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {student.skills.length > 4 && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          +{student.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t">
                    {student.github && (
                      <a
                        href={student.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
                        className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Briefcase className="h-4 w-4" />
                        LinkedIn
                      </a>
                    )}
                    <button className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
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
