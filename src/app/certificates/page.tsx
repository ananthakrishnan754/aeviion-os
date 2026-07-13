"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Award,
  Search,
  Plus,
  Eye,
  Trash2,
  Download,
  TrendingUp,
  FileText,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Certificate {
  id: string
  title: string
  recipient_name: string
  recipient_email: string
  recipient_college: string
  type: string
  event_name?: string
  course_name?: string
  verification_code: string
  status: string
  issued_at: string
  revoked_at?: string
  revoked_reason?: string
}

const typeColors: Record<string, string> = {
  course: "bg-blue-100 text-blue-700",
  event: "bg-green-100 text-green-700",
  project: "bg-purple-100 text-purple-700",
  fellowship: "bg-orange-100 text-orange-700",
}

const statusColors: Record<string, string> = {
  issued: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  revoked: "bg-red-100 text-red-600",
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/certificates")
      if (res.ok) setCertificates(await res.json())
    } finally {
      setLoading(false)
    }
  }

  const deleteCertificate = async (id: string) => {
    if (!confirm("Delete this certificate?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" })
      if (res.ok) setCertificates((prev) => prev.filter((c) => c.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  const filtered = certificates.filter((c) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch = c.recipient_name?.toLowerCase().includes(q) || c.title?.toLowerCase().includes(q) || c.verification_code?.toLowerCase().includes(q)
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    const matchesType = typeFilter === "all" || c.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const issued = certificates.filter((c) => c.status === "issued").length
  const revoked = certificates.filter((c) => c.status === "revoked").length

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Certificates</h1>
            <p className="text-[var(--muted-foreground)]">Issue, manage, and verify certificates</p>
          </div>
          <Link
            href="/certificates/generate"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all"
          >
            <Plus className="h-4 w-4" /> Issue Certificate
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Issued", value: certificates.length, icon: Award, color: "from-blue-500 to-blue-600" },
            { label: "Active", value: issued, icon: FileText, color: "from-green-500 to-green-600" },
            { label: "Revoked", value: revoked, icon: Clock, color: "from-red-500 to-red-600" },
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
              <input
                type="text"
                placeholder="Search by name, title, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30">
              <option value="all">All Status</option>
              <option value="issued">Issued</option>
              <option value="revoked">Revoked</option>
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30">
              <option value="all">All Types</option>
              <option value="course">Course</option>
              <option value="event">Event</option>
              <option value="project">Project</option>
              <option value="fellowship">Fellowship</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="card-premium p-6 animate-pulse h-40" />
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Award className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              {searchQuery || statusFilter !== "all" || typeFilter !== "all" ? "Try adjusting your filters" : "Issue your first certificate"}
            </p>
            <Link href="/certificates/generate" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary)]/90">
              <Plus className="h-4 w-4" /> Issue Certificate
            </Link>
          </div>
        ) : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Recipient</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Title</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Type</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Code</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Issued</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((cert) => (
                    <tr key={cert.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[var(--foreground)]">{cert.recipient_name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{cert.recipient_email}</div>
                      </td>
                      <td className="px-4 py-3 text-[var(--foreground)] max-w-[200px] truncate">{cert.title}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", typeColors[cert.type] || "bg-gray-100 text-gray-600")}>
                          {cert.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--muted-foreground)]">{cert.verification_code}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", statusColors[cert.status] || "bg-gray-100 text-gray-600")}>
                          {cert.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">
                        {new Date(cert.issued_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link href={`/certificates/${cert.id}`} className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all">
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => deleteCertificate(cert.id)}
                            disabled={deleting === cert.id}
                            className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
