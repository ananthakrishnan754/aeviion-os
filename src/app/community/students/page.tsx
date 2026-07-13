"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Users, Search, Plus, Download, Eye, Edit, Trash2,
  Mail, Phone, MapPin, Github, Linkedin, Star,
  Award, BookOpen, X, Loader2, ChevronLeft, ChevronRight,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

interface StudentProfile {
  id: string
  user_id: string
  college: string | null
  degree: string | null
  year: number | null
  skills: string[] | null
  interests: string[] | null
  github: string | null
  linkedin: string | null
  portfolio: string | null
  bio: string | null
  community_score: number | null
}

interface Student {
  id: string
  name: string
  email: string
  phone: string | null
  avatar: string | null
  role: string
  status: string
  created_at: string
  student_profiles: StudentProfile | null
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" })
      if (searchQuery) params.set("search", searchQuery)
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/students?${params}`)
      if (res.ok) {
        const data = await res.json()
        setStudents(data.students || [])
        setTotalPages(data.totalPages || 1)
        setTotal(data.total || 0)
      }
    } catch (err) {
      console.error("Failed to fetch students:", err)
    } finally {
      setLoading(false)
    }
  }, [page, searchQuery, statusFilter])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, statusFilter])

  const deleteStudent = async (id: string) => {
    if (!confirm("Delete this student?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" })
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s.id !== id))
        setTotal((prev) => prev - 1)
        if (selectedStudent?.id === id) setSelectedStudent(null)
      }
    } finally {
      setDeleting(null)
    }
  }

  const getScore = (s: Student) => s.student_profiles?.community_score || 0
  const getSkills = (s: Student) => s.student_profiles?.skills || []
  const getCollege = (s: Student) => s.student_profiles?.college || "—"

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
    alumni: "bg-blue-100 text-blue-700",
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Students</h1>
            <p className="text-[var(--foreground-subtle)]">{total} students registered</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")} className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-all">
              {viewMode === "grid" ? "List" : "Grid"}
            </button>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all">
              <Plus className="h-4 w-4" /> Add Student
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex gap-6">
          {/* List/Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
              </div>
            ) : students.length === 0 ? (
              <div className="card-premium flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-light)]">
                  <Users className="h-8 w-8 text-[var(--primary)]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">No students yet</h3>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">Students will appear here once they sign up.</p>
                <button onClick={() => setShowAddModal(true)} className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all">
                  <Plus className="h-4 w-4" /> Add Student
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {students.map((student) => (
                  <div key={student.id} className={cn("card-premium p-5 cursor-pointer transition-all hover:shadow-md", selectedStudent?.id === student.id && "ring-2 ring-[var(--primary)]")} onClick={() => setSelectedStudent(student)}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-sm font-bold text-white shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[var(--foreground)] truncate">{student.name}</h3>
                        <p className="text-xs text-[var(--muted-foreground)] truncate">{student.email}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{getCollege(student)}</p>
                      </div>
                      <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", statusColors[student.status] || statusColors.active)}>
                        {student.status}
                      </span>
                    </div>
                    {getSkills(student).length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {getSkills(student).slice(0, 3).map((skill: string) => (
                          <span key={skill} className="rounded-full bg-[var(--primary-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--primary)]">{skill}</span>
                        ))}
                        {getSkills(student).length > 3 && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">+{getSkills(student).length - 3}</span>
                        )}
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                      <span>Score: {getScore(student)}</span>
                      <span>{new Date(student.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-premium overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-left text-xs font-semibold text-[var(--muted-foreground)]">
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">College</th>
                      <th className="px-4 py-3">Skills</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50/50 cursor-pointer" onClick={() => setSelectedStudent(student)}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-xs font-bold text-white">{student.name.charAt(0)}</div>
                            <div>
                              <p className="text-sm font-medium text-[var(--foreground)]">{student.name}</p>
                              <p className="text-xs text-[var(--muted-foreground)]">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[var(--foreground-subtle)]">{getCollege(student)}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">{getSkills(student).slice(0, 2).map((s: string) => <span key={s} className="rounded-full bg-[var(--primary-light)] px-2 py-0.5 text-[10px] font-medium text-[var(--primary)]">{s}</span>)}</div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">{getScore(student)}</td>
                        <td className="px-4 py-3"><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", statusColors[student.status])}>{student.status}</span></td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={(e) => { e.stopPropagation(); deleteStudent(student.id) }} disabled={deleting === student.id} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-500 transition-colors">
                            {deleting === student.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-[var(--muted-foreground)]">Page {page} of {totalPages}</p>
                <div className="flex gap-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-30 transition-all"><ChevronLeft className="h-4 w-4" /></button>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-30 transition-all"><ChevronRight className="h-4 w-4" /></button>
                </div>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selectedStudent && (
            <div className="w-[360px] shrink-0 card-premium p-6 sticky top-6 self-start">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-xl font-bold text-white">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">{selectedStudent.name}</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">{selectedStudent.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-gray-100"><X className="h-4 w-4" /></button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[var(--foreground-subtle)]"><Mail className="h-4 w-4 text-[var(--muted-foreground)]" />{selectedStudent.email}</div>
                {selectedStudent.phone && <div className="flex items-center gap-2 text-[var(--foreground-subtle)]"><Phone className="h-4 w-4 text-[var(--muted-foreground)]" />{selectedStudent.phone}</div>}
                <div className="flex items-center gap-2 text-[var(--foreground-subtle)]"><MapPin className="h-4 w-4 text-[var(--muted-foreground)]" />{getCollege(selectedStudent)}</div>
                {selectedStudent.student_profiles?.github && <div className="flex items-center gap-2 text-[var(--foreground-subtle)]"><Github className="h-4 w-4 text-[var(--muted-foreground)]" />{selectedStudent.student_profiles.github}</div>}
                {selectedStudent.student_profiles?.linkedin && <div className="flex items-center gap-2 text-[var(--foreground-subtle)]"><Linkedin className="h-4 w-4 text-[var(--muted-foreground)]" />{selectedStudent.student_profiles.linkedin}</div>}
              </div>

              {getSkills(selectedStudent).length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-[var(--muted-foreground)]">Skills</p>
                  <div className="flex flex-wrap gap-1">{getSkills(selectedStudent).map((s: string) => <span key={s} className="rounded-full bg-[var(--primary-light)] px-2.5 py-1 text-xs font-medium text-[var(--primary)]">{s}</span>)}</div>
                </div>
              )}

              {selectedStudent.student_profiles?.bio && (
                <div className="mt-4">
                  <p className="mb-1 text-xs font-semibold text-[var(--muted-foreground)]">Bio</p>
                  <p className="text-sm text-[var(--foreground-subtle)]">{selectedStudent.student_profiles.bio}</p>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[var(--secondary)] p-3 text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]">{getScore(selectedStudent)}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Community Score</p>
                </div>
                <div className="rounded-lg bg-[var(--secondary)] p-3 text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]">{getSkills(selectedStudent).length}</p>
                  <p className="text-[10px] text-[var(--muted-foreground)]">Skills</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => deleteStudent(selectedStudent.id)} className="flex-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-all">Delete</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && <AddStudentModal onClose={() => setShowAddModal(false)} onAdded={() => { setShowAddModal(false); fetchStudents() }} />}
    </AppLayout>
  )
}

function AddStudentModal({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", college: "", degree: "", year: "", skills: "", github: "", linkedin: "" })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email) { setError("Name and email are required"); return }
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: form.year ? parseInt(form.year) : null,
          skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
        }),
      })
      if (!res.ok) { const err = await res.json(); setError(err.error || "Failed to add student"); setSaving(false); return }
      onAdded()
    } catch { setError("Network error"); setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Add Student</h2>
          <button onClick={onClose} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-gray-100"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">College</label>
              <input type="text" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">Degree</label>
              <input type="text" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">Year</label>
              <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">Skills (comma separated)</label>
            <input type="text" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="React, Python, ML..." className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">GitHub</label>
              <input type="text" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-[var(--muted-foreground)]">LinkedIn</label>
              <input type="text" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className="w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm focus:border-[var(--primary)] outline-none transition-all" />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-all">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all disabled:opacity-50">
              {saving ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
