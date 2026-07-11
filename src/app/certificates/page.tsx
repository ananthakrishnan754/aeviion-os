"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Award,
  Download,
  Search,
  Plus,
  Eye,
  Edit,
  Mail,
  QrCode,
  Clock,
  FileText,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Certificate {
  id: string
  title: string
  recipientName: string
  recipientEmail: string
  recipientCollege: string
  courseName?: string
  eventName?: string
  issuedAt: string
  verificationCode: string
  status: "issued" | "pending" | "revoked"
  type: "course" | "event" | "project" | "fellowship"
}

const mockCertificates: Certificate[] = [
  { id: "1", title: "Web Development Bootcamp Completion", recipientName: "Alex Kumar", recipientEmail: "alex.kumar@email.com", recipientCollege: "MIT", courseName: "Web Development Bootcamp", issuedAt: "2025-01-10", verificationCode: "AEV-2025-WEB-001", status: "issued", type: "course" },
  { id: "2", title: "AI Workshop Participation", recipientName: "Sarah Johnson", recipientEmail: "sarah.j@email.com", recipientCollege: "Stanford University", eventName: "AI & ML Workshop", issuedAt: "2025-01-08", verificationCode: "AEV-2025-AI-042", status: "issued", type: "event" },
  { id: "3", title: "Innovation Award - Best Project", recipientName: "Mike Chen", recipientEmail: "mike.chen@email.com", recipientCollege: "UC Berkeley", courseName: "Machine Learning Course", issuedAt: "2025-01-05", verificationCode: "AEV-2025-PRJ-015", status: "issued", type: "project" },
  { id: "4", title: "Fellowship Completion", recipientName: "Emily Davis", recipientEmail: "emily.d@email.com", recipientCollege: "Harvard University", courseName: "Full Stack Fellowship", issuedAt: "2024-12-20", verificationCode: "AEV-2024-FEL-008", status: "issued", type: "fellowship" },
  { id: "5", title: "Cybersecurity Workshop", recipientName: "Rahul Sharma", recipientEmail: "rahul.s@email.com", recipientCollege: "IIT Delhi", eventName: "Cybersecurity Essentials", issuedAt: "2025-01-12", verificationCode: "AEV-2025-CYB-023", status: "pending", type: "event" },
  { id: "6", title: "Data Science Course Completion", recipientName: "Lisa Wang", recipientEmail: "lisa.w@email.com", recipientCollege: "Carnegie Mellon", courseName: "Data Science Fundamentals", issuedAt: "2025-01-11", verificationCode: "AEV-2025-DS-019", status: "issued", type: "course" },
]

const stats = [
  { title: "Total Issued", value: "2,456", change: "+12%", icon: Award, color: "from-[var(--primary)] to-[#C06840]" },
  { title: "Pending", value: "23", change: "-5%", icon: Clock, color: "from-[var(--warning)] to-[#B88030]" },
  { title: "This Month", value: "156", change: "+18%", icon: TrendingUp, color: "from-[var(--success)] to-[#2D7A4A]" },
  { title: "Templates", value: "12", change: "+2", icon: FileText, color: "from-[#9B6DD7] to-[#7B4FB7]" },
]

const templates = [
  { id: "1", name: "Course Completion", description: "Standard certificate for course completion", usageCount: 1234, preview: "bg-gradient-to-br from-[var(--primary)] to-[#9B6DD7]" },
  { id: "2", name: "Workshop Participation", description: "Certificate for workshop attendance", usageCount: 876, preview: "bg-gradient-to-br from-[var(--success)] to-[#2D7A4A]" },
  { id: "3", name: "Innovation Award", description: "Special award for outstanding projects", usageCount: 234, preview: "bg-gradient-to-br from-[var(--warning)] to-[#D4964E]" },
  { id: "4", name: "Fellowship Completion", description: "Certificate for fellowship graduates", usageCount: 456, preview: "bg-gradient-to-br from-[#9B6DD7] to-[#7B4FB7]" },
]

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState<"certificates" | "templates">("certificates")

  const filteredCertificates = mockCertificates.filter((cert) => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter
    const matchesType = typeFilter === "all" || cert.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued": return "bg-[var(--success-light)] text-[var(--success)]"
      case "pending": return "bg-[var(--warning-light)] text-[var(--warning)]"
      case "revoked": return "bg-[#FDECEE] text-[var(--destructive)]"
      default: return "bg-[var(--muted)] text-[var(--muted-foreground)]"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course": return "bg-[var(--primary-light)] text-[var(--primary)]"
      case "event": return "bg-[var(--success-light)] text-[var(--success)]"
      case "project": return "bg-[#F3EEFA] text-[#7B4FB7]"
      case "fellowship": return "bg-[var(--warning-light)] text-[var(--warning)]"
      default: return "bg-[var(--muted)] text-[var(--muted-foreground)]"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Certificates</h1>
            <p className="text-[var(--foreground-subtle)]">Generate, manage, and verify certificates.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] transition-colors">
              <Download className="h-4 w-4" />
              Bulk Export
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all">
              <Plus className="h-4 w-4" />
              Generate Certificate
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {stats.map((stat) => (
            <div key={stat.title} className="card-premium p-5 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--muted-foreground)]">{stat.title}</p>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                </div>
                <div className={cn("rounded-xl bg-gradient-to-br p-3 text-white shadow-sm", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--success)]" />
                <span className="text-sm font-semibold text-[var(--success)]">{stat.change}</span>
                <span className="text-xs text-[var(--muted-foreground)]">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-[var(--border)]">
          {(["certificates", "templates"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 pb-4 text-sm font-semibold transition-colors capitalize",
                activeTab === tab
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "certificates" ? (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
                <option value="all">All Status</option>
                <option value="issued">Issued</option>
                <option value="pending">Pending</option>
                <option value="revoked">Revoked</option>
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
                <option value="all">All Types</option>
                <option value="course">Course</option>
                <option value="event">Event</option>
                <option value="project">Project</option>
                <option value="fellowship">Fellowship</option>
              </select>
            </div>

            {/* Certificates table */}
            <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--background-subtle)]">
                      <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Certificate</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Recipient</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Type</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Issued</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Status</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {filteredCertificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-[var(--background-subtle)] transition-colors">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#C06840] text-white shadow-sm">
                              <Award className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--foreground)]">{cert.title}</p>
                              <p className="text-sm text-[var(--muted-foreground)]">{cert.verificationCode}</p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-[var(--foreground)]">{cert.recipientName}</p>
                            <p className="text-sm text-[var(--muted-foreground)]">{cert.recipientCollege}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", getTypeColor(cert.type))}>{cert.type}</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--foreground-subtle)]">{new Date(cert.issuedAt).toLocaleDateString()}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", getStatusColor(cert.status))}>{cert.status}</span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex gap-1.5">
                            {[Eye, Download, Mail, QrCode].map((Icon, i) => (
                              <button key={i} className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                                <Icon className="h-4 w-4" />
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Templates */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 stagger-children">
            {templates.map((template) => (
              <div key={template.id} className="card-premium overflow-hidden group">
                <div className={cn("h-40 flex items-center justify-center", template.preview)}>
                  <Award className="h-16 w-16 text-white/80" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[var(--foreground)]">{template.name}</h3>
                  <p className="mt-1 text-sm text-[var(--foreground-subtle)]">{template.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-[var(--muted-foreground)] font-medium">{template.usageCount} uses</span>
                    <div className="flex gap-1.5">
                      <button className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] p-6 hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] transition-all">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--muted)]">
                <Plus className="h-6 w-6 text-[var(--muted-foreground)]" />
              </div>
              <span className="mt-2 text-sm font-semibold text-[var(--foreground-subtle)]">Create Template</span>
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
