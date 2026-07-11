"use client"

import { useState } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  modules: number
  lessons: number
  enrolledStudents: number
  rating: number
  status: "draft" | "published" | "archived"
  category: string
}

const mockCourses: Course[] = [
  { id: "1", title: "Complete Web Development Bootcamp", description: "Master HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive course.", instructor: "John Smith", duration: "40 hours", level: "beginner", modules: 12, lessons: 156, enrolledStudents: 2345, rating: 4.8, status: "published", category: "Web Development" },
  { id: "2", title: "Advanced Machine Learning with Python", description: "Deep dive into ML algorithms, neural networks, and real-world applications.", instructor: "Dr. Sarah Johnson", duration: "35 hours", level: "advanced", modules: 10, lessons: 120, enrolledStudents: 1876, rating: 4.9, status: "published", category: "Machine Learning" },
  { id: "3", title: "Cybersecurity Fundamentals", description: "Learn ethical hacking, network security, and protection strategies.", instructor: "Mike Chen", duration: "25 hours", level: "intermediate", modules: 8, lessons: 96, enrolledStudents: 1543, rating: 4.7, status: "published", category: "Cybersecurity" },
  { id: "4", title: "Mobile App Development with React Native", description: "Build cross-platform mobile apps for iOS and Android.", instructor: "Emily Davis", duration: "30 hours", level: "intermediate", modules: 9, lessons: 108, enrolledStudents: 1234, rating: 4.6, status: "published", category: "Mobile Development" },
  { id: "5", title: "Cloud Computing with AWS", description: "Master Amazon Web Services and cloud architecture.", instructor: "David Wilson", duration: "28 hours", level: "intermediate", modules: 7, lessons: 84, enrolledStudents: 987, rating: 4.5, status: "draft", category: "Cloud Computing" },
  { id: "6", title: "Data Structures and Algorithms", description: "Master DSA for coding interviews and competitive programming.", instructor: "Lisa Wang", duration: "45 hours", level: "intermediate", modules: 15, lessons: 180, enrolledStudents: 3456, rating: 4.9, status: "published", category: "Computer Science" },
]

const stats = [
  { title: "Total Courses", value: "48", change: "+6%", icon: BookOpen, color: "from-[var(--primary)] to-[#C06840]" },
  { title: "Total Students", value: "8,234", change: "+15%", icon: Users, color: "from-[var(--success)] to-[#2D7A4A]" },
  { title: "Avg. Rating", value: "4.7", change: "+0.2", icon: Star, color: "from-[var(--warning)] to-[#B88030]" },
  { title: "Completion Rate", value: "78%", change: "+5%", icon: TrendingUp, color: "from-[#9B6DD7] to-[#7B4FB7]" },
]

const categories = ["All", "Web Development", "Machine Learning", "Cybersecurity", "Mobile Development", "Cloud Computing", "Computer Science"]

export default function LearningPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === "all" || course.level === levelFilter
    const matchesCategory = categoryFilter === "All" || course.category === categoryFilter
    return matchesSearch && matchesLevel && matchesCategory
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-[var(--success-light)] text-[var(--success)]"
      case "intermediate": return "bg-[var(--warning-light)] text-[var(--warning)]"
      case "advanced": return "bg-[#FDECEE] text-[var(--destructive)]"
      default: return "bg-[var(--muted)] text-[var(--muted-foreground)]"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-[var(--muted)] text-[var(--muted-foreground)]"
      case "published": return "bg-[var(--success-light)] text-[var(--success)]"
      case "archived": return "bg-[#FDECEE] text-[var(--destructive)]"
      default: return "bg-[var(--muted)] text-[var(--muted-foreground)]"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Learning Management</h1>
            <p className="text-[var(--foreground-subtle)]">Manage courses, modules, and learning content.</p>
          </div>
          <Link href="/learning/courses" className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all">
            <Plus className="h-4 w-4" />
            Create Course
          </Link>
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

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                categoryFilter === category
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-white text-[var(--foreground-subtle)] border border-[var(--border)] hover:bg-[var(--background-subtle)]"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card-premium overflow-hidden group">
              {/* Course thumbnail placeholder */}
              <div className="relative h-44 bg-gradient-to-br from-[var(--primary)] to-[#9B6DD7]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-14 w-14 text-white/80" />
                </div>
                <div className="absolute right-3 top-3 flex gap-2">
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", getStatusColor(course.status))}>
                    {course.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", getLevelColor(course.level))}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)] line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                  {course.title}
                </h3>
                <p className="mb-4 text-sm text-[var(--foreground-subtle)] line-clamp-2">
                  {course.description}
                </p>

                <div className="mb-4 flex items-center gap-4 text-sm text-[var(--foreground-subtle)]">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[var(--muted-foreground)]" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-[var(--muted-foreground)]" />
                    {course.lessons} lessons
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[var(--warning)] text-[var(--warning)]" />
                    <span className="text-sm font-bold text-[var(--foreground)]">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-[var(--foreground-subtle)]">
                    <Users className="h-4 w-4" />
                    {course.enrolledStudents.toLocaleString()} students
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-sm text-[var(--muted-foreground)]">By {course.instructor}</span>
                  <div className="flex gap-1.5">
                    <button className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[#FDECEE] hover:text-[var(--destructive)] transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="card-premium p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
            <h3 className="mt-4 text-lg font-medium text-[var(--foreground)]">No courses found</h3>
            <p className="mt-2 text-[var(--foreground-subtle)]">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
