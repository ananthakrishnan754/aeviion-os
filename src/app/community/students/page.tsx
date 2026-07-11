"use client"

import { useState } from "react"
import Link from "next/link"
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
    gradient: "from-[#D4764E] to-[#E8956A]",
  },
  {
    title: "Active Students",
    value: "8,234",
    change: "+8%",
    icon: TrendingUp,
    gradient: "from-[#6B8E6B] to-[#8CB88C]",
  },
  {
    title: "Avg. Score",
    value: "87%",
    change: "+3%",
    icon: Star,
    gradient: "from-[#B8860B] to-[#DAA520]",
  },
  {
    title: "Top Colleges",
    value: "156",
    change: "+5%",
    icon: Award,
    gradient: "from-[#8B6F47] to-[#A0845C]",
  },
]

export default function StudentsPage() {
  const [students] = useState<Student[]>(mockStudents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
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
        return "bg-[#6B8E6B]/15 text-[#5A7A5A]"
      case "inactive":
        return "bg-[#8B6F47]/15 text-[#8B6F47]"
      case "alumni":
        return "bg-[#D4764E]/15 text-[#C06540]"
      default:
        return "bg-[#8B6F47]/15 text-[#8B6F47]"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">Student Database</h1>
            <p className="mt-1 text-[#6B6B6B]">
              Manage and track all student information in one place.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-xl border border-[#E8E0D4] bg-white px-4 py-2.5 text-sm font-medium text-[#6B6B6B] transition-all hover:border-[#D4764E]/30 hover:text-[#D4764E]">
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-[#E8E0D4] bg-white px-4 py-2.5 text-sm font-medium text-[#6B6B6B] transition-all hover:border-[#D4764E]/30 hover:text-[#D4764E]">
              <Download className="h-4 w-4" />
              Export
            </button>
            <Link href="/community/students" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg hover:shadow-[#D4764E]/30">
              <Plus className="h-4 w-4" />
              Add Student
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.title}
              className="glass-card group rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B]">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-[#2D2D2D]">{stat.value}</p>
                </div>
                <div className={cn("rounded-xl bg-gradient-to-br p-3 text-white shadow-md", stat.gradient)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5">
                <ArrowUpRight className="h-3.5 w-3.5 text-[#6B8E6B]" />
                <span className="text-sm font-semibold text-[#6B8E6B]">
                  {stat.change}
                </span>
                <span className="text-xs text-[#999]">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card flex flex-wrap items-center gap-4 rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input
              type="text"
              placeholder="Search students by name, email, or college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="alumni">Alumni</option>
          </select>
          <div className="flex overflow-hidden rounded-xl border border-[#E8E0D4]">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-all",
                viewMode === "grid"
                  ? "bg-gradient-to-r from-[#D4764E] to-[#E8956A] text-white"
                  : "bg-[#FAF8F5] text-[#6B6B6B] hover:bg-[#F0EBE3]"
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-all",
                viewMode === "list"
                  ? "bg-gradient-to-r from-[#D4764E] to-[#E8956A] text-white"
                  : "bg-[#FAF8F5] text-[#6B6B6B] hover:bg-[#F0EBE3]"
              )}
            >
              List
            </button>
          </div>
        </div>

        {/* Students grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.map((student, i) => (
              <div
                key={student.id}
                className="glass-card group rounded-2xl border border-[#E8E0D4] bg-white transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="p-6">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-lg font-bold text-white shadow-md shadow-[#D4764E]/25">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#2D2D2D]">
                          {student.name}
                        </h3>
                        <p className="text-sm text-[#6B6B6B]">{student.college}</p>
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

                  <div className="mb-5 flex flex-wrap gap-2">
                    {student.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]"
                      >
                        {skill}
                      </span>
                    ))}
                    {student.skills.length > 3 && (
                      <span className="rounded-full bg-[#F0EBE3] px-2.5 py-0.5 text-xs font-medium text-[#8B6F47]">
                        +{student.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mb-5 grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-xl bg-[#FAF8F5] p-3">
                      <p className="text-xl font-bold text-[#2D2D2D]">
                        {student.coursesCompleted}
                      </p>
                      <p className="mt-0.5 text-xs text-[#999]">Courses</p>
                    </div>
                    <div className="rounded-xl bg-[#FAF8F5] p-3">
                      <p className="text-xl font-bold text-[#2D2D2D]">
                        {student.projectsCount}
                      </p>
                      <p className="mt-0.5 text-xs text-[#999]">Projects</p>
                    </div>
                    <div className="rounded-xl bg-[#FAF8F5] p-3">
                      <p className="text-xl font-bold text-[#2D2D2D]">
                        {student.certificatesCount}
                      </p>
                      <p className="mt-0.5 text-xs text-[#999]">Certs</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E8E0D4] pt-4">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-[#B8860B] text-[#B8860B]" />
                      <span className="text-sm font-semibold text-[#2D2D2D]">
                        {student.communityScore}
                      </span>
                      <span className="text-xs text-[#999]">score</span>
                    </div>
                    <div className="flex gap-1">
                      {student.github && (
                        <a
                          href={student.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {student.linkedin && (
                        <a
                          href={student.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#E8E0D4] bg-[#FAF8F5]/50 px-6 py-3.5">
                  <div className="flex gap-2">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F0EBE3] px-3 py-2 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]">
                      <Eye className="h-4 w-4" />
                      View Profile
                    </button>
                    <button className="flex items-center justify-center rounded-xl border border-[#E8E0D4] bg-white px-3 py-2 text-[#999] transition-all hover:border-[#D4764E]/30 hover:text-[#D4764E]">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Student
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      College
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Skills
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Score
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E0D4]">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="transition-colors hover:bg-[#FAF8F5]/50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-[#2D2D2D]">
                              {student.name}
                            </p>
                            <p className="text-sm text-[#999]">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-[#6B6B6B]">
                        {student.college}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.skills.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-[#D4764E]/10 px-2 py-0.5 text-xs font-medium text-[#C06540]"
                            >
                              {skill}
                            </span>
                          ))}
                          {student.skills.length > 2 && (
                            <span className="rounded-full bg-[#F0EBE3] px-2 py-0.5 text-xs font-medium text-[#8B6F47]">
                              +{student.skills.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#B8860B] text-[#B8860B]" />
                          <span className="text-sm font-semibold text-[#2D2D2D]">
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
                        <div className="flex gap-1">
                          <button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-red-50 hover:text-red-500">
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
          <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EBE3]">
              <Users className="h-8 w-8 text-[#999]" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#2D2D2D]">
              No students found
            </h3>
            <p className="mt-2 text-[#6B6B6B]">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
