"use client"

import { useState, useEffect } from "react"
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
  Trash2,
  TrendingUp,
  ArrowUpRight,
  Filter,
  Grid3X3,
  List,
  Globe,
  MapPinned,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description: string
  date: string
  end_date?: string
  time: string
  location: string
  is_online: boolean
  meeting_url?: string
  max_participants: number | null
  registrations: number
  attendance: number
  status: string
  type: string
  thumbnail?: string
  created_at: string
}

const typeColors: Record<string, string> = {
  workshop: "bg-blue-100 text-blue-700",
  bootcamp: "bg-purple-100 text-purple-700",
  seminar: "bg-green-100 text-green-700",
  meetup: "bg-orange-100 text-orange-700",
  hackathon: "bg-red-100 text-red-700",
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  published: "bg-green-100 text-green-700",
  ongoing: "bg-blue-100 text-blue-700",
  completed: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-600",
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/events")
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" })
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id))
      }
    } finally {
      setDeleting(null)
    }
  }

  const filtered = events.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || e.status === statusFilter
    const matchesType = typeFilter === "all" || e.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalRegistrations = events.reduce((sum, e) => sum + (e.registrations || 0), 0)
  const totalAttendance = events.reduce((sum, e) => sum + (e.attendance || 0), 0)
  const upcomingEvents = events.filter((e) => new Date(e.date) > new Date() && e.status !== "cancelled").length

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Events</h1>
            <p className="text-[var(--muted-foreground)]">Manage workshops, meetups, and community events</p>
          </div>
          <Link
            href="/events/create"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all"
          >
            <Plus className="h-4 w-4" /> Create Event
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Events", value: events.length, icon: Calendar, color: "from-blue-500 to-blue-600" },
            { label: "Upcoming", value: upcomingEvents, icon: Clock, color: "from-green-500 to-green-600" },
            { label: "Registrations", value: totalRegistrations, icon: Users, color: "from-purple-500 to-purple-600" },
            { label: "Attendance", value: totalAttendance, icon: TrendingUp, color: "from-orange-500 to-orange-600" },
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

        {/* Filters */}
        <div className="card-premium p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            >
              <option value="all">All Types</option>
              <option value="workshop">Workshop</option>
              <option value="bootcamp">Bootcamp</option>
              <option value="seminar">Seminar</option>
              <option value="meetup">Meetup</option>
              <option value="hackathon">Hackathon</option>
            </select>
            <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--background)] p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("rounded-lg p-2 transition-all", viewMode === "grid" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]")}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("rounded-lg p-2 transition-all", viewMode === "list" ? "bg-[var(--primary)] text-white" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Events */}
        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-premium p-5 animate-pulse">
                <div className="h-4 bg-[var(--muted)] rounded w-1/3 mb-3" />
                <div className="h-6 bg-[var(--muted)] rounded w-2/3 mb-2" />
                <div className="h-4 bg-[var(--muted)] rounded w-full mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-[var(--muted)] rounded w-16" />
                  <div className="h-6 bg-[var(--muted)] rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No events found</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your filters"
                : "Create your first event to get started"}
            </p>
            <Link
              href="/events/create"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary)]/90"
            >
              <Plus className="h-4 w-4" /> Create Event
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((event) => (
              <div key={event.id} className="card-premium p-5 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2">
                    <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", typeColors[event.type] || "bg-gray-100 text-gray-600")}>
                      {event.type}
                    </span>
                    <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", statusColors[event.status] || "bg-gray-100 text-gray-600")}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteEvent(event.id)}
                      disabled={deleting === event.id}
                      className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">{event.title}</h3>
                {event.description && (
                  <p className="text-sm text-[var(--muted-foreground)] mb-3 line-clamp-2">{event.description}</p>
                )}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                    {event.time && <span className="text-[var(--border)]">·</span>}
                    {event.time && <span>{event.time}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    {event.is_online ? <Globe className="h-4 w-4" /> : <MapPinned className="h-4 w-4" />}
                    <span>{event.location || (event.is_online ? "Online" : "TBA")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.registrations} registered
                      {event.max_participants && ` / ${event.max_participants} max`}
                    </span>
                  </div>
                </div>
                {event.max_participants && (
                  <div className="w-full h-2 rounded-full bg-[var(--muted)] mb-4">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A] transition-all"
                      style={{ width: `${Math.min((event.registrations / event.max_participants) * 100, 100)}%` }}
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/events/${event.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
                  >
                    <Eye className="h-4 w-4" /> View
                  </Link>
                  <Link
                    href={`/events/${event.id}/registrations`}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)]/10 px-3 py-2 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all"
                  >
                    <Users className="h-4 w-4" /> Registrations
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Event</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Date</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Type</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Registrations</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((event) => (
                    <tr key={event.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[var(--foreground)]">{event.title}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{event.location || "TBA"}</div>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{formatDate(event.date)}</td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", typeColors[event.type] || "bg-gray-100 text-gray-600")}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", statusColors[event.status] || "bg-gray-100 text-gray-600")}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">
                        {event.registrations}{event.max_participants ? ` / ${event.max_participants}` : ""}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Link href={`/events/${event.id}`} className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all">
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            disabled={deleting === event.id}
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
