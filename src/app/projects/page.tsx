"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Github,
  Star,
  Eye,
  Users,
  Calendar,
  Tag,
  ArrowUpRight,
  Code,
  Layers,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

interface Project {
  id: string
  title: string
  description: string
  studentName: string
  studentId: string
  college: string
  category: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  stars: number
  views: number
  teamSize: number
  status: "draft" | "submitted" | "approved" | "featured"
  createdAt: string
}

const mockProjects: Project[] = [
  {
    id: "proj_1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user auth, product management, cart, and payment integration.",
    studentName: "Alex Kumar",
    studentId: "stu_1",
    college: "MIT",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/alexk/ecommerce",
    liveUrl: "https://ecommerce-demo.vercel.app",
    stars: 45,
    views: 234,
    teamSize: 2,
    status: "featured",
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "proj_2",
    title: "AI Image Generator",
    description: "Deep learning model that generates images from text descriptions using Stable Diffusion API.",
    studentName: "Sarah Johnson",
    studentId: "stu_2",
    college: "Stanford",
    category: "Machine Learning",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    githubUrl: "https://github.com/sarahj/ai-image-gen",
    stars: 89,
    views: 456,
    teamSize: 3,
    status: "featured",
    createdAt: "2025-01-08T10:00:00Z",
  },
  {
    id: "proj_3",
    title: "Real-time Chat Application",
    description: "WebSocket-based chat app with rooms, file sharing, and end-to-end encryption.",
    studentName: "Mike Chen",
    studentId: "stu_3",
    college: "UC Berkeley",
    category: "Web Development",
    tags: ["Socket.io", "React", "Express", "Redis"],
    githubUrl: "https://github.com/mikechen/chat-app",
    stars: 34,
    views: 189,
    teamSize: 1,
    status: "approved",
    createdAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "proj_4",
    title: "Climate Data Dashboard",
    description: "Interactive dashboard visualizing global climate data with real-time updates and predictive analytics.",
    studentName: "Emily Davis",
    studentId: "stu_4",
    college: "Harvard",
    category: "Data Science",
    tags: ["Python", "D3.js", "PostgreSQL", "Docker"],
    liveUrl: "https://climate-dashboard.vercel.app",
    stars: 67,
    views: 345,
    teamSize: 4,
    status: "approved",
    createdAt: "2025-01-03T10:00:00Z",
  },
  {
    id: "proj_5",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for tracking workouts, nutrition, and health metrics.",
    studentName: "Rahul Sharma",
    studentId: "stu_5",
    college: "IIT Delhi",
    category: "Mobile Development",
    tags: ["React Native", "Firebase", "HealthKit"],
    githubUrl: "https://github.com/rahuls/fitness-tracker",
    stars: 23,
    views: 156,
    teamSize: 2,
    status: "submitted",
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "proj_6",
    title: "Blockchain Voting System",
    description: "Decentralized voting application using Ethereum smart contracts for secure and transparent elections.",
    studentName: "Lisa Wang",
    studentId: "stu_6",
    college: "Carnegie Mellon",
    category: "Blockchain",
    tags: ["Solidity", "React", "Web3.js", "Hardhat"],
    githubUrl: "https://github.com/lisawang/blockchain-vote",
    stars: 56,
    views: 278,
    teamSize: 3,
    status: "featured",
    createdAt: "2024-12-28T10:00:00Z",
  },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"stars" | "views" | "newest">("stars")

  const categories = Array.from(new Set(projects.map((p) => p.category)))

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
      const matchesStatus = statusFilter === "all" || project.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars
      if (sortBy === "views") return b.views - a.views
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const stats = {
    total: projects.length,
    featured: projects.filter((p) => p.status === "featured").length,
    totalStars: projects.reduce((sum, p) => sum + p.stars, 0),
    totalViews: projects.reduce((sum, p) => sum + p.views, 0),
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="mt-1 text-sm text-gray-600">Showcase and manage student projects</p>
            </div>
            <Link
              href="/projects/gallery"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Submit Project
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Projects</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStars}</p>
                  <p className="text-xs text-gray-500">Total Stars</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Views</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Layers className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
                  <p className="text-xs text-gray-500">Featured</p>
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
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="featured">Featured</option>
              <option value="approved">Approved</option>
              <option value="submitted">Submitted</option>
              <option value="draft">Draft</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="stars">Most Stars</option>
              <option value="views">Most Views</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No projects found</h3>
              <p className="mt-2 text-gray-600">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-xl border bg-white overflow-hidden transition-all hover:shadow-md hover:border-gray-300"
                >
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 p-6 flex items-end">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-medium",
                          project.status === "featured"
                            ? "bg-amber-400 text-amber-900"
                            : project.status === "approved"
                            ? "bg-green-400 text-green-900"
                            : project.status === "submitted"
                            ? "bg-blue-400 text-blue-900"
                            : "bg-gray-400 text-gray-900"
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-500 line-clamp-2">{project.description}</p>

                    {/* Student Info */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                        {project.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{project.studentName}</p>
                        <p className="text-xs text-gray-500">{project.college}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-1">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.teamSize}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live
                        </a>
                      )}
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                        View Details
                      </button>
                    </div>
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
