"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  QrCode,
  Download,
  TrendingUp,
  ArrowUpRight,
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
    description:
      "Hands-on workshop covering ML fundamentals, neural networks, and practical applications.",
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
    description:
      "Intensive 5-day bootcamp covering React, Node.js, databases, and deployment.",
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
    description:
      "Learn about ethical hacking, network security, and protection strategies.",
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
    description:
      "Connect with open source enthusiasts and contribute to real projects.",
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
    description:
      "Build innovative solutions for social impact in 24 hours.",
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
  {
    title: "Total Events",
    value: "24",
    change: "+8%",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    title: "Total Registrations",
    value: "1,234",
    change: "+15%",
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Avg. Attendance",
    value: "85%",
    change: "+3%",
    icon: TrendingUp,
    color: "bg-purple-500",
  },
  {
    title: "Certificates Issued",
    value: "892",
    change: "+12%",
    icon: Download,
    color: "bg-yellow-500",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter
    const matchesType = typeFilter === "all" || event.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "published":
        return "bg-green-100 text-green-700"
      case "ongoing":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-purple-100 text-purple-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-blue-100 text-blue-700"
      case "bootcamp":
        return "bg-purple-100 text-purple-700"
      case "seminar":
        return "bg-green-100 text-green-700"
      case "meetup":
        return "bg-yellow-100 text-yellow-700"
      case "hackathon":
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
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600">
              Manage workshops, bootcamps, seminars, and more.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Event
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
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
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
            >
              {/* Event header */}
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex gap-2">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        getStatusColor(event.status)
                      )}
                    >
                      {event.status}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        getTypeColor(event.type)
                      )}
                    >
                      {event.type}
                    </span>
                  </div>
                  <button className="rounded-lg p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {event.title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              {/* Event footer */}
              <div className="border-t bg-gray-50 px-6 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      {event.registrations}/{event.maxParticipants} registered
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {Math.round(
                      (event.registrations / event.maxParticipants) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="mb-4 h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{
                      width: `${
                        (event.registrations / event.maxParticipants) * 100
                      }%`,
                    }}
                  />
                </div>

                <div className="flex gap-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button className="flex items-center justify-center rounded-lg border bg-white px-3 py-2 text-gray-700 hover:bg-gray-50">
                    <QrCode className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="rounded-xl border bg-white p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No events found
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
