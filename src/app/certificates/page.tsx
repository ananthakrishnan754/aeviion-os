"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Award,
  Download,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  QrCode,
  CheckCircle,
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
  {
    id: "1",
    title: "Web Development Bootcamp Completion",
    recipientName: "Alex Kumar",
    recipientEmail: "alex.kumar@email.com",
    recipientCollege: "MIT",
    courseName: "Web Development Bootcamp",
    issuedAt: "2025-01-10",
    verificationCode: "AEV-2025-WEB-001",
    status: "issued",
    type: "course",
  },
  {
    id: "2",
    title: "AI Workshop Participation",
    recipientName: "Sarah Johnson",
    recipientEmail: "sarah.j@email.com",
    recipientCollege: "Stanford University",
    eventName: "AI & Machine Learning Workshop",
    issuedAt: "2025-01-08",
    verificationCode: "AEV-2025-AI-042",
    status: "issued",
    type: "event",
  },
  {
    id: "3",
    title: "Innovation Award - Best Project",
    recipientName: "Mike Chen",
    recipientEmail: "mike.chen@email.com",
    recipientCollege: "UC Berkeley",
    courseName: "Machine Learning Course",
    issuedAt: "2025-01-05",
    verificationCode: "AEV-2025-PRJ-015",
    status: "issued",
    type: "project",
  },
  {
    id: "4",
    title: "Fellowship Completion",
    recipientName: "Emily Davis",
    recipientEmail: "emily.d@email.com",
    recipientCollege: "Harvard University",
    courseName: "Full Stack Fellowship",
    issuedAt: "2024-12-20",
    verificationCode: "AEV-2024-FEL-008",
    status: "issued",
    type: "fellowship",
  },
  {
    id: "5",
    title: "Cybersecurity Workshop Participation",
    recipientName: "Rahul Sharma",
    recipientEmail: "rahul.s@email.com",
    recipientCollege: "IIT Delhi",
    eventName: "Cybersecurity Essentials Seminar",
    issuedAt: "2025-01-12",
    verificationCode: "AEV-2025-CYB-023",
    status: "pending",
    type: "event",
  },
  {
    id: "6",
    title: "Data Science Course Completion",
    recipientName: "Lisa Wang",
    recipientEmail: "lisa.w@email.com",
    recipientCollege: "Carnegie Mellon University",
    courseName: "Data Science Fundamentals",
    issuedAt: "2025-01-11",
    verificationCode: "AEV-2025-DS-019",
    status: "issued",
    type: "course",
  },
]

const stats = [
  {
    title: "Total Issued",
    value: "2,456",
    change: "+12%",
    icon: Award,
    color: "bg-blue-500",
  },
  {
    title: "Pending",
    value: "23",
    change: "-5%",
    icon: Clock,
    color: "bg-yellow-500",
  },
  {
    title: "This Month",
    value: "156",
    change: "+18%",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    title: "Templates",
    value: "12",
    change: "+2",
    icon: FileText,
    color: "bg-purple-500",
  },
]

const templates = [
  {
    id: "1",
    name: "Course Completion",
    description: "Standard certificate for course completion",
    usageCount: 1234,
    preview: "bg-gradient-to-br from-blue-500 to-purple-600",
  },
  {
    id: "2",
    name: "Workshop Participation",
    description: "Certificate for workshop attendance",
    usageCount: 876,
    preview: "bg-gradient-to-br from-green-500 to-teal-600",
  },
  {
    id: "3",
    name: "Innovation Award",
    description: "Special award for outstanding projects",
    usageCount: 234,
    preview: "bg-gradient-to-br from-yellow-500 to-orange-600",
  },
  {
    id: "4",
    name: "Fellowship Completion",
    description: "Certificate for fellowship graduates",
    usageCount: 456,
    preview: "bg-gradient-to-br from-purple-500 to-pink-600",
  },
]

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [activeTab, setActiveTab] = useState<"certificates" | "templates">("certificates")

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || cert.status === statusFilter
    const matchesType = typeFilter === "all" || cert.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "issued":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "revoked":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "course":
        return "bg-blue-100 text-blue-700"
      case "event":
        return "bg-green-100 text-green-700"
      case "project":
        return "bg-purple-100 text-purple-700"
      case "fellowship":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
            <p className="text-gray-600">
              Generate, manage, and verify certificates.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Bulk Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Generate Certificate
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={cn("rounded-lg p-3", stat.color)}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab("certificates")}
            className={cn(
              "border-b-2 pb-4 text-sm font-medium transition-colors",
              activeTab === "certificates"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Certificates
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={cn(
              "border-b-2 pb-4 text-sm font-medium transition-colors",
              activeTab === "templates"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Templates
          </button>
        </div>

        {activeTab === "certificates" ? (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search certificates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="issued">Issued</option>
                <option value="pending">Pending</option>
                <option value="revoked">Revoked</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="rounded-lg border bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="course">Course</option>
                <option value="event">Event</option>
                <option value="project">Project</option>
                <option value="fellowship">Fellowship</option>
              </select>
            </div>

            {/* Certificates list */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Certificate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Recipient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Issued
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCertificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                              <Award className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {cert.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {cert.verificationCode}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {cert.recipientName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {cert.recipientCollege}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-medium",
                              getTypeColor(cert.type)
                            )}
                          >
                            {cert.type}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {new Date(cert.issuedAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-medium",
                              getStatusColor(cert.status)
                            )}
                          >
                            {cert.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex gap-2">
                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                              <Mail className="h-4 w-4" />
                            </button>
                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                              <QrCode className="h-4 w-4" />
                            </button>
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className={cn("h-40 rounded-t-xl", template.preview)}>
                  <div className="flex h-full items-center justify-center">
                    <Award className="h-16 w-16 text-white/80" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{template.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {template.usageCount} uses
                    </span>
                    <div className="flex gap-2">
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-300 hover:bg-blue-50">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                Create Template
              </span>
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
