"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  Calendar,
  Clock,
  MapPin,
  Globe,
  Users,
  ArrowLeft,
  Trash2,
  CheckCircle,
  UserCheck,
  QrCode,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Registration {
  id: string
  user_id: string
  status: string
  checked_in: boolean
  checked_in_at: string | null
  registered_at: string
  user: { id: string; name: string; email: string; avatar?: string }
}

interface EventDetail {
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
  event_registrations: Registration[]
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  published: "bg-green-100 text-green-700",
  ongoing: "bg-blue-100 text-blue-700",
  completed: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-600",
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/events/${id}`)
      if (res.ok) setEvent(await res.json())
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (status: string) => {
    setActionLoading("status")
    try {
      await fetch(`/api/events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      fetchEvent()
    } finally {
      setActionLoading(null)
    }
  }

  const toggleCheckIn = async (userId: string, current: boolean) => {
    setActionLoading(userId)
    try {
      await fetch(`/api/events/${id}/registrations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, checked_in: !current }),
      })
      fetchEvent()
    } finally {
      setActionLoading(null)
    }
  }

  const deleteRegistration = async (userId: string) => {
    if (!confirm("Remove this registration?")) return
    setActionLoading(userId)
    try {
      await fetch(`/api/events/${id}/registrations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, status: "cancelled" }),
      })
      fetchEvent()
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 bg-[var(--muted)] rounded w-1/3" />
          <div className="card-premium p-6 h-64" />
        </div>
      </AppLayout>
    )
  }

  if (!event) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 className="text-xl font-semibold">Event not found</h2>
          <Link href="/events" className="text-[var(--primary)] mt-2 inline-block">Back to events</Link>
        </div>
      </AppLayout>
    )
  }

  const activeRegistrations = event.event_registrations?.filter((r) => r.status !== "cancelled") || []
  const checkedIn = activeRegistrations.filter((r) => r.checked_in).length

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/events" className="rounded-xl border border-[var(--border)] p-2 hover:bg-[var(--muted)] transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[var(--foreground)]">{event.title}</h1>
              <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", statusColors[event.status])}>
                {event.status}
              </span>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="card-premium p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
              <Calendar className="h-5 w-5 shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
                <Clock className="h-5 w-5 shrink-0" />
                <span>{event.time}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
              {event.is_online ? <Globe className="h-5 w-5 shrink-0" /> : <MapPin className="h-5 w-5 shrink-0" />}
              <span>{event.location || (event.is_online ? "Online" : "TBA")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
              <Users className="h-5 w-5 shrink-0" />
              <span>{activeRegistrations.length} registered{event.max_participants ? ` / ${event.max_participants}` : ""}</span>
            </div>
          </div>
          {event.description && (
            <p className="text-[var(--muted-foreground)] pt-2 border-t border-[var(--border)]">{event.description}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {event.status === "draft" && (
            <button
              onClick={() => updateStatus("published")}
              disabled={actionLoading === "status"}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-all disabled:opacity-50"
            >
              <CheckCircle className="h-4 w-4" /> Publish
            </button>
          )}
          {event.status === "published" && (
            <button
              onClick={() => updateStatus("ongoing")}
              disabled={actionLoading === "status"}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              <CheckCircle className="h-4 w-4" /> Start Event
            </button>
          )}
          {event.status === "ongoing" && (
            <button
              onClick={() => updateStatus("completed")}
              disabled={actionLoading === "status"}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition-all disabled:opacity-50"
            >
              <CheckCircle className="h-4 w-4" /> Complete
            </button>
          )}
          {event.is_online && event.meeting_url && (
            <a
              href={event.meeting_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
            >
              <Globe className="h-4 w-4" /> Join Meeting
            </a>
          )}
        </div>

        {/* Registrations */}
        <div className="card-premium">
          <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Registrations</h2>
              <p className="text-sm text-[var(--muted-foreground)]">{checkedIn} checked in / {activeRegistrations.length} registered</p>
            </div>
          </div>
          {activeRegistrations.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto h-10 w-10 text-[var(--muted-foreground)] mb-3" />
              <p className="text-sm text-[var(--muted-foreground)]">No registrations yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {activeRegistrations.map((reg) => (
                <div key={reg.id} className="flex items-center gap-4 p-4 hover:bg-[var(--muted)]/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-sm font-bold text-white shrink-0">
                    {reg.user?.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">{reg.user?.name || "Unknown"}</p>
                    <p className="text-xs text-[var(--muted-foreground)] truncate">{reg.user?.email}</p>
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {new Date(reg.registered_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    {event.status === "ongoing" && (
                      <button
                        onClick={() => toggleCheckIn(reg.user_id, reg.checked_in)}
                        disabled={actionLoading === reg.user_id}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          reg.checked_in
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                        )}
                      >
                        <UserCheck className="h-3.5 w-3.5 mr-1 inline" />
                        {reg.checked_in ? "Checked In" : "Check In"}
                      </button>
                    )}
                    <button
                      onClick={() => deleteRegistration(reg.user_id)}
                      className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
