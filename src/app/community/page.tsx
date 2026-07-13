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
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

interface Student {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  status: string
  created_at: string
}

export default function CommunityPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students")
      if (res.ok) {
        const data = await res.json()
        setStudents(data)
      }
    } catch (err) {
      console.error("Failed to fetch students:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Community</h1>
            <p className="text-[var(--foreground-subtle)]">
              Manage your community members and engagement.
            </p>
          </div>
          <Link
            href="/community/students"
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all"
          >
            <UserPlus className="h-4 w-4" />
            Add Member
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {[
            { label: "Total Members", value: students.length, icon: Users, color: "from-[#D4764E] to-[#B85C3A]" },
            { label: "Active Students", value: students.filter((s) => s.status === "active").length, icon: GraduationCap, color: "from-[#4E9DD4] to-[#3A7AB8]" },
            { label: "Mentors", value: "—", icon: Award, color: "from-[#6ABF69] to-[#4FA34E]" },
            { label: "Alumni", value: "—", icon: Briefcase, color: "from-[#9B59B6] to-[#7D3C98]" },
          ].map((stat) => (
            <div key={stat.label} className="card-premium p-5">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
          />
        </div>

        {/* Members Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="card-premium flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-light)]">
              <Users className="h-8 w-8 text-[var(--primary)]" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">No members yet</h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Members will appear here once they sign up.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <div key={student.id} className="card-premium p-6 group">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-lg font-bold text-white shadow-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                      {student.name}
                    </h3>
                    <p className="text-sm text-[var(--foreground-subtle)] truncate">{student.email}</p>
                    <span className="mt-1 inline-flex items-center rounded-full bg-[var(--primary-light)] px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                      {student.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
