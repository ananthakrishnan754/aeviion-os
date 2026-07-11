"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Lock,
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
  thumbnail?: string
  status: "draft" | "published" | "archived"
  category: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js, and more in this comprehensive course.",
    instructor: "John Smith",
    duration: "40 hours",
    level: "beginner",
    modules: 12,
    lessons: 156,
    enrolledStudents: 2345,
    rating: 4.8,
    status: "published",
    category: "Web Development",
  },
  {
    id: "2",
    title: "Advanced Machine Learning with Python",
    description:
      "Deep dive into ML algorithms, neural networks, and real-world applications.",
    instructor: "Dr. Sarah Johnson",
    duration: "35 hours",
    level: "advanced",
    modules: 10,
    lessons: 120,
    enrolledStudents: 1876,
    rating: 4.9,
    status: "published",
    category: "Machine Learning",
  },
  {
    id: "3",
    title: "Cybersecurity Fundamentals",
    description:
      "Learn ethical hacking, network security, and protection strategies.",
    instructor: "Mike Chen",
    duration: "25 hours",
    level: "intermediate",
    modules: 8,
    lessons: 96,
    enrolledStudents: 1543,
    rating: 4.7,
    status: "published",
    category: "Cybersecurity",
  },
  {
    id: "4",
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile apps for iOS and Android.",
    instructor: "Emily Davis",
    duration: "30 hours",
    level: "intermediate",
    modules: 9,
    lessons: 108,
    enrolledStudents: 1234,
    rating: 4.6,
    status: "published",
    category: "Mobile Development",
  },
  {
    id: "5",
    title: "Cloud Computing with AWS",
    description:
      "Master Amazon Web Services and cloud architecture.",
    instructor: "David Wilson",
    duration: "28 hours",
    level: "intermediate",
    modules: 7,
    lessons: 84,
    enrolledStudents: 987,
    rating: 4.5,
    status: "draft",
    category: "Cloud Computing",
  },
  {
    id: "6",
    title: "Data Structures and Algorithms",
    description:
      "Master DSA for coding interviews and competitive programming.",
    instructor: "Lisa Wang",
    duration: "45 hours",
    level: "intermediate",
    modules: 15,
    lessons: 180,
    enrolledStudents: 3456,
    rating: 4.9,
    status: "published",
    category: "Computer Science",
  },
]

const stats = [
  {
    title: "Total Courses",
    value: "48",
    change: "+6%",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    title: "Total Students",
    value: "8,234",
    change: "+15%",
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Avg. Rating",
    value: "4.7",
    change: "+0.2",
    icon: Star,
    color: "bg-yellow-500",
  },
  {
    title: "Completion Rate",
    value: "78%",
    change: "+5%",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
]

const categories = [
  "All",
  "Web Development",
  "Machine Learning",
  "Cybersecurity",
  "Mobile Development",
  "Cloud Computing",
  "Computer Science",
]

export default function LearningPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesLevel =
      levelFilter === "all" || course.level === levelFilter
    const matchesCategory =
      categoryFilter === "All" || course.category === categoryFilter
    return matchesSearch && matchesLevel && matchesCategory
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700"
      case "intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "published":
        return "bg-green-100 text-green-700"
      case "archived":
        return "bg-red-100 text-red-700"
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
            <h1 className="text-2xl font-bold text-gray-900">Learning Management</h1>
            <p className="text-gray-600">
              Manage courses, modules, and learning content.
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Create Course
          </button>
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

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                categoryFilter === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="rounded-lg border bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Course thumbnail placeholder */}
              <div className="relative h-48 rounded-t-xl bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-16 w-16 text-white/80" />
                </div>
                <div className="absolute right-3 top-3 flex gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      getStatusColor(course.status)
                    )}
                  >
                    {course.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      getLevelColor(course.level)
                    )}
                  >
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1">
                  {course.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons} lessons
                  </span>
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {course.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    {course.enrolledStudents.toLocaleString()} students
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-gray-600">
                    By {course.instructor}
                  </span>
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="rounded-xl border bg-white p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No courses found
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
