"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Star,
  Award,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Student {
  id: string
  name: string
  email: string
  phone?: string
  college: string
  skills: string[]
  interests: string[]
  github?: string
  linkedin?: string
  portfolio?: string
  communityScore: number
  coursesCompleted: number
  projectsCount: number
  certificatesCount: number
  status: "active" | "inactive" | "alumni"
  joinedAt: string
  lastActive: string
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Alex Kumar",
    email: "alex.kumar@email.com",
    phone: "+91 98765 43210",
    college: "MIT",
    skills: ["React", "Node.js", "Python", "Machine Learning"],
    interests: ["AI", "Web Development", "Open Source"],
    github: "https://github.com/alexkumar",
    linkedin: "https://linkedin.com/in/alexkumar",
    portfolio: "https://alexkumar.dev",
    communityScore: 98,
    coursesCompleted: 12,
    projectsCount: 8,
    certificatesCount: 15,
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2025-01-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    college: "Stanford University",
    skills: ["TypeScript", "React", "AWS", "Docker"],
    interests: ["Cloud Computing", "DevOps", "UI/UX"],
    github: "https://github.com/sarahj",
    linkedin: "https://linkedin.com/in/sarahj",
    communityScore: 96,
    coursesCompleted: 10,
    projectsCount: 6,
    certificatesCount: 12,
    status: "active",
    joinedAt: "2024-02-20",
    lastActive: "2025-01-09",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    college: "UC Berkeley",
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science"],
    interests: ["Machine Learning", "AI", "Research"],
    github: "https://github.com/mikechen",
    linkedin: "https://linkedin.com/in/mikechen",
    communityScore: 94,
    coursesCompleted: 8,
    projectsCount: 5,
    certificatesCount: 10,
    status: "active",
    joinedAt: "2024-03-10",
    lastActive: "2025-01-08",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@email.com",
    college: "Harvard University",
    skills: ["JavaScript", "Vue.js", "Firebase", "GraphQL"],
    interests: ["Frontend", "Mobile Apps", "Startups"],
    github: "https://github.com/emilyd",
    linkedin: "https://linkedin.com/in/emilyd",
    portfolio: "https://emilyd.dev",
    communityScore: 92,
    coursesCompleted: 9,
    projectsCount: 7,
    certificatesCount: 11,
    status: "active",
    joinedAt: "2024-04-05",
    lastActive: "2025-01-07",
  },
  {
    id: "5",
    name: "Rahul Sharma",
    email: "rahul.s@email.com",
    college: "IIT Delhi",
    skills: ["Java", "Spring Boot", "Microservices", "Kubernetes"],
    interests: ["Backend", "System Design", "Architecture"],
    github: "https://github.com/rahuls",
    linkedin: "https://linkedin.com/in/rahuls",
    communityScore: 90,
    coursesCompleted: 7,
    projectsCount: 4,
    certificatesCount: 8,
    status: "active",
    joinedAt: "2024-05-15",
    lastActive: "2025-01-06",
  },
  {
    id: "6",
    name: "Lisa Wang",
    email: "lisa.w@email.com",
    college: "Carnegie Mellon University",
    skills: ["Rust", "Go", "Systems Programming", "Blockchain"],
    interests: ["Web3", "Security", "Low-level Programming"],
    github: "https://github.com/lisawang",
    linkedin: "https://linkedin.com/in/lisawang",
    communityScore: 88,
    coursesCompleted: 6,
    projectsCount: 3,
    certificatesCount: 7,
    status: "active",
    joinedAt: "2024-06-20",
    lastActive: "2025-01-05",
  },
]

const stats = [
  {
    title: "Total Students",
    value: "12,456",
    change: "+12%",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Active Students",
    value: "8,234",
    change: "+8%",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    title: "Avg. Score",
    value: "87%",
    change: "+3%",
    icon: Star,
    color: "bg-purple-500",
  },
  {
    title: "Top Colleges",
    value: "156",
    change: "+5%",
    icon: Award,
    color: "bg-yellow-500",
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "inactive":
        return "bg-gray-100 text-gray-700"
      case "alumni":
        return "bg-purple-100 text-purple-700"
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
            <h1 className="text-2xl font-bold text-gray-900">Student Database</h1>
            <p className="text-gray-600">
              Manage and track all student information in one place.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Student
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name, email, or college..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="alumni">Alumni</option>
          </select>
          <div className="flex rounded-lg border bg-white">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "rounded-l-lg px-3 py-2 text-sm font-medium",
                viewMode === "grid"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "rounded-r-lg px-3 py-2 text-sm font-medium",
                viewMode === "list"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              List
            </button>
          </div>
        </div>

        {/* Students grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="group rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {student.name}
                        </h3>
                        <p className="text-sm text-gray-600">{student.college}</p>
                      </div>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        getStatusColor(student.status)
                      )}
                    >
                      {student.status}
                    </span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {student.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {student.skills.length > 3 && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        +{student.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {student.coursesCompleted}
                      </p>
                      <p className="text-xs text-gray-500">Courses</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {student.projectsCount}
                      </p>
                      <p className="text-xs text-gray-500">Projects</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {student.certificatesCount}
                      </p>
                      <p className="text-xs text-gray-500">Certificates</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {student.communityScore}
                      </span>
                      <span className="text-xs text-gray-500">score</span>
                    </div>
                    <div className="flex gap-2">
                      {student.github && (
                        <a
                          href={student.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {student.linkedin && (
                        <a
                          href={student.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t bg-gray-50 px-6 py-3">
                  <div className="flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <Eye className="h-4 w-4" />
                      View Profile
                    </button>
                    <button className="flex items-center justify-center rounded-lg border bg-white px-3 py-2 text-gray-700 hover:bg-gray-50">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      College
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Score
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
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {student.name}
                            </p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                        {student.college}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.skills.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                            >
                              {skill}
                            </span>
                          ))}
                          {student.skills.length > 2 && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                              +{student.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {student.communityScore}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            getStatusColor(student.status)
                          )}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2">
                          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600">
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

        {filteredStudents.length === 0 && (
          <div className="rounded-xl border bg-white p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No students found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
