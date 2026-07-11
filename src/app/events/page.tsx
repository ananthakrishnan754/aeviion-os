"use client"

import { useState } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  QrCode,
  TrendingUp,
  ArrowUpRight,
  Download,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  isOnline: boolean
  maxParticipants: number
  registrations: number
  status: "draft" | "published" | "ongoing" | "completed" | "cancelled"
  type: "workshop" | "bootcamp" | "seminar" | "meetup" | "hackathon"
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering ML fundamentals, neural networks, and practical applications.",
    date: "2025-01-15",
    time: "10:00 AM - 4:00 PM",
    location: "Online (Zoom)",
    isOnline: true,
    maxParticipants: 50,
    registrations: 45,
    status: "published",
    type: "workshop",
  },
  {
    id: "2",
    title: "Full Stack Web Development Bootcamp",
    description: "Intensive 5-day bootcamp covering React, Node.js, databases, and deployment.",
    date: "2025-01-20",
    time: "9:00 AM - 5:00 PM",
    location: "Tech Hub, Bangalore",
    isOnline: false,
    maxParticipants: 40,
    registrations: 32,
    status: "published",
    type: "bootcamp",
  },
  {
    id: "3",
    title: "Cybersecurity Essentials Seminar",
    description: "Learn about ethical hacking, network security, and protection strategies.",
    date: "2025-01-25",
    time: "2:00 PM - 5:00 PM",
    location: "Online (Google Meet)",
    isOnline: true,
    maxParticipants: 30,
    registrations: 28,
    status: "published",
    type: "seminar",
  },
  {
    id: "4",
    title: "Open Source Contribution Meetup",
    description: "Connect with open source enthusiasts and contribute to real projects.",
    date: "2025-02-01",
    time: "3:00 PM - 6:00 PM",
    location: "Community Center, Chennai",
    isOnline: false,
    maxParticipants: 25,
    registrations: 18,
    status: "draft",
    type: "meetup",
  },
  {
    id: "5",
    title: "24-Hour Hackathon: Build for Good",
    description: "Build innovative solutions for social impact in 24 hours.",
    date: "2025-02-10",
    time: "All Day",
    location: "Tech Campus, Hyderabad",
    isOnline: false,
    maxParticipants: 100,
    registrations: 67,
    status: "published",
    type: "hackathon",
  },
]

const stats = [
  { title: "Total Events", value: "24", change: "+8%", icon: Calendar, color: "from-[var(--primary)] to-[#C06840]" },
  { title: "Total Registrations", value: "1,234", change: "+15%", icon: Users, color: "from-[var(--success)] to-[#2D7A4A]" },
  { title: "Avg. Attendance", value: "85%", change: "+3%", icon: TrendingUp, color: "from-[#9B6DD7] to-[#7B4FB7]" },
  { title: "Certificates Issued", value: "892", change: "+12%", icon: Download, color: "from-[var(--warning)] to-[#B88030]" },
]

export default function EventsPage() {
  const [events] = useState<Event[]>(mockEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-[var(--muted)] text-[var(--muted-foreground)]"
      case "published": return "bg-[var(--success-light)] text-[var(--success)]"
      case "ongoing": return "bg-[var(--info-light)] text-[var(--info)]"
      case "completed": return "bg-[#F3EEFA] text-[#7B4FB7]"
      case "cancelled": return "bg-[#FDECEE] text-[var(--destructive)]"
      default: return "bg-[var(--muted)] text-[var(--muted-foreground)]"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "workshop": return "bg-[var(--primary-light)] text-[var(--primary)]"
      case "bootcamp": return "bg-[#F3EEFA] text-[#7B4FB7]"
      case "seminar": return "bg-[var(--success-light)] text-[var(--success)]"
      case "meetup": return "bg-[var(--warning-light)] text-[var(--warning)]"
      case "hackathon": return "bg-[#FDECEE] text-[var(--destructive)]"
      default: return "bg-[var(--muted)] text-[var(--muted-foreground)]"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Events</h1>
            <p className="text-[var(--foreground-subtle)]">Manage workshops, bootcamps, seminars, and more.</p>
          </div>
          <Link href="/events/upcoming" className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all">
            <Plus className="h-4 w-4" />
            Create Event
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
          >
            <option value="all">All Types</option>
            <option value="workshop">Workshop</option>
            <option value="bootcamp">Bootcamp</option>
            <option value="seminar">Seminar</option>
            <option value="meetup">Meetup</option>
            <option value="hackathon">Hackathon</option>
          </select>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card-premium overflow-hidden group">
              {/* Event header */}
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex gap-2">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", getStatusColor(event.status))}>
                      {event.status}
                    </span>
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", getTypeColor(event.type))}>
                      {event.type}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {event.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-[var(--foreground-subtle)]">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-[var(--foreground-subtle)]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Event footer */}
              <div className="border-t border-[var(--border)] bg-[var(--background-subtle)] px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <span className="text-[var(--foreground-subtle)]">
                      {event.registrations}/{event.maxParticipants} registered
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[var(--success)]">
                    {Math.round((event.registrations / event.maxParticipants) * 100)}%
                  </span>
                </div>
                <div className="mb-4 h-2 rounded-full bg-[var(--border)]">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A]"
                    style={{ width: `${(event.registrations / event.maxParticipants) * 100}%` }}
                  />
                </div>

                <div className="flex gap-2">
                  <Link href={`/events/upcoming`} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors">
                    <QrCode className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="card-premium p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
            <h3 className="mt-4 text-lg font-medium text-[var(--foreground)]">No events found</h3>
            <p className="mt-2 text-[var(--foreground-subtle)]">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
