"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { Calendar, Clock, Globe, MapPinned, Users, Search, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  is_online: boolean
  max_participants: number | null
  registrations: number
  status: string
  type: string
}

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        const now = new Date()
        setEvents(
          (data || []).filter((e: Event) => new Date(e.date) > now && e.status !== "cancelled" && e.status !== "completed")
        )
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Upcoming Events</h1>
            <p className="text-[var(--muted-foreground)]">Events scheduled for the future</p>
          </div>
          <Link href="/events/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-all">
            <Calendar className="h-4 w-4" /> Create Event
          </Link>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search upcoming events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-premium p-5 animate-pulse h-24" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
            <p className="text-sm text-[var(--muted-foreground)]">All events are in the past or completed</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="card-premium p-5 flex items-center gap-5 hover:shadow-md transition-all group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-white shrink-0">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[var(--foreground)] truncate">{event.title}</h3>
                    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", event.type === "workshop" ? "bg-blue-100 text-blue-700" : event.type === "bootcamp" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600")}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {formatDate(event.date)}{event.time ? ` · ${event.time}` : ""}</span>
                    <span className="flex items-center gap-1">{event.is_online ? <Globe className="h-3.5 w-3.5" /> : <MapPinned className="h-3.5 w-3.5" />} {event.location || (event.is_online ? "Online" : "TBA")}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {event.registrations} registered</span>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
