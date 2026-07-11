"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  FolderOpen,
  Plus,
  Search,
  ExternalLink,
  Github,
  Star,
  Eye,
  Users,
  ArrowUpRight,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"

interface Project {
  id: string
  title: string
  description: string
  studentName: string
  college: string
  category: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  stars: number
  views: number
  teamSize: number
  status: "draft" | "submitted" | "approved" | "featured"
  createdAt: string
}

const mockProjects: Project[] = [
  { id: "proj_1", title: "E-Commerce Platform", description: "Full-stack e-commerce solution with React, Node.js, and MongoDB.", studentName: "Alex Kumar", college: "MIT", category: "Web Development", tags: ["React", "Node.js", "MongoDB", "Stripe"], githubUrl: "#", liveUrl: "#", stars: 45, views: 234, teamSize: 2, status: "featured", createdAt: "2025-01-10T10:00:00Z" },
  { id: "proj_2", title: "AI Image Generator", description: "Deep learning model that generates images from text descriptions.", studentName: "Sarah Johnson", college: "Stanford", category: "Machine Learning", tags: ["Python", "TensorFlow", "FastAPI", "React"], githubUrl: "#", stars: 89, views: 456, teamSize: 3, status: "featured", createdAt: "2025-01-08T10:00:00Z" },
  { id: "proj_3", title: "Real-time Chat Application", description: "WebSocket-based chat app with rooms, file sharing, and E2E encryption.", studentName: "Mike Chen", college: "UC Berkeley", category: "Web Development", tags: ["Socket.io", "React", "Express", "Redis"], githubUrl: "#", stars: 34, views: 189, teamSize: 1, status: "approved", createdAt: "2025-01-05T10:00:00Z" },
  { id: "proj_4", title: "Climate Data Dashboard", description: "Interactive dashboard visualizing global climate data with predictive analytics.", studentName: "Emily Davis", college: "Harvard", category: "Data Science", tags: ["Python", "D3.js", "PostgreSQL", "Docker"], liveUrl: "#", stars: 67, views: 345, teamSize: 4, status: "approved", createdAt: "2025-01-03T10:00:00Z" },
  { id: "proj_5", title: "Mobile Fitness Tracker", description: "Cross-platform mobile app for tracking workouts, nutrition, and health metrics.", studentName: "Rahul Sharma", college: "IIT Delhi", category: "Mobile Development", tags: ["React Native", "Firebase", "HealthKit"], githubUrl: "#", stars: 23, views: 156, teamSize: 2, status: "submitted", createdAt: "2025-01-01T10:00:00Z" },
  { id: "proj_6", title: "Blockchain Voting System", description: "Decentralized voting application using Ethereum smart contracts.", studentName: "Lisa Wang", college: "Carnegie Mellon", category: "Blockchain", tags: ["Solidity", "React", "Web3.js", "Hardhat"], githubUrl: "#", stars: 56, views: 278, teamSize: 3, status: "featured", createdAt: "2024-12-28T10:00:00Z" },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"stars" | "views" | "newest">("stars")

  const categories = Array.from(new Set(mockProjects.map((p) => p.category)))

  const filteredProjects = mockProjects
    .filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    total: mockProjects.length,
    featured: mockProjects.filter((p) => p.status === "featured").length,
    totalStars: mockProjects.reduce((sum, p) => sum + p.stars, 0),
    totalViews: mockProjects.reduce((sum, p) => sum + p.views, 0),
  }

  const statCards = [
    { label: "Total Projects", value: stats.total, icon: FolderOpen, color: "from-[var(--primary)] to-[#C06840]" },
    { label: "Total Stars", value: stats.totalStars, icon: Star, color: "from-[var(--warning)] to-[#B88030]" },
    { label: "Total Views", value: stats.totalViews.toLocaleString(), icon: Eye, color: "from-[#9B6DD7] to-[#7B4FB7]" },
    { label: "Featured", value: stats.featured, icon: ArrowUpRight, color: "from-[var(--success)] to-[#2D7A4A]" },
  ]

  return (
    <AppLayout>
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between animate-slide-up">
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Projects</h1>
              <p className="mt-1 text-sm text-[var(--foreground-subtle)]">Showcase and manage student projects</p>
            </div>
            <Link
              href="/projects/gallery"
              className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              Submit Project
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4 stagger-children">
            {statCards.map((stat) => (
              <div key={stat.label} className="card-premium p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                    <p className="text-xs text-[var(--muted-foreground)] font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
              />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
              <option value="all">All Categories</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
              <option value="all">All Status</option>
              <option value="featured">Featured</option>
              <option value="approved">Approved</option>
              <option value="submitted">Submitted</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
              <option value="stars">Most Stars</option>
              <option value="views">Most Views</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-[var(--border)] py-16 text-center">
              <FolderOpen className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
              <h3 className="mt-4 text-lg font-medium text-[var(--foreground)]">No projects found</h3>
              <p className="mt-2 text-[var(--foreground-subtle)]">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 stagger-children">
              {filteredProjects.map((project) => (
                <div key={project.id} className="card-premium overflow-hidden group">
                  {/* Project Image Placeholder */}
                  <div className="h-44 bg-gradient-to-br from-[var(--primary)] to-[#9B6DD7] p-6 flex items-end">
                    <span className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      project.status === "featured"
                        ? "bg-[var(--warning)] text-white"
                        : project.status === "approved"
                        ? "bg-[var(--success)] text-white"
                        : project.status === "submitted"
                        ? "bg-[var(--info)] text-white"
                        : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                    )}>
                      {project.status}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-[var(--foreground-subtle)] line-clamp-2">{project.description}</p>

                    {/* Student Info */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-sm font-bold text-white">
                        {project.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">{project.studentName}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{project.college}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="rounded-full bg-[var(--background-subtle)] px-2.5 py-1 text-xs font-medium text-[var(--foreground-subtle)]">{tag}</span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mb-4 flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                      <div className="flex items-center gap-1"><Star className="h-4 w-4" /><span>{project.stars}</span></div>
                      <div className="flex items-center gap-1"><Eye className="h-4 w-4" /><span>{project.views}</span></div>
                      <div className="flex items-center gap-1"><Users className="h-4 w-4" /><span>{project.teamSize}</span></div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                          <Github className="h-4 w-4" />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                          <ExternalLink className="h-4 w-4" />
                          Live
                        </a>
                      )}
                      <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors">
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
