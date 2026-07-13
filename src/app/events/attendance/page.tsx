"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { UserCheck, Search, Calendar, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface AttendanceRecord {
  id: string
  event_id: string
  event_title: string
  event_date: string
  user_name: string
  user_email: string
  checked_in_at: string
}

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchAttendance()
  }, [])

  const fetchAttendance = async () => {
    setLoading(true)
    try {
      const eventsRes = await fetch("/api/events")
      const events = await eventsRes.json()
      const allRecords: AttendanceRecord[] = []
      for (const event of events || []) {
        const regRes = await fetch(`/api/events/${event.id}/registrations`)
        if (regRes.ok) {
          const regs = await regRes.json()
          for (const reg of regs || []) {
            if (reg.checked_in) {
              allRecords.push({
                id: reg.id,
                event_id: event.id,
                event_title: event.title,
                event_date: event.date,
                user_name: reg.user?.name || "Unknown",
                user_email: reg.user?.email || "",
                checked_in_at: reg.checked_in_at,
              })
            }
          }
        }
      }
      setRecords(allRecords)
    } finally {
      setLoading(false)
    }
  }

  const filtered = records.filter((r) => {
    const q = searchQuery.toLowerCase()
    return r.user_name.toLowerCase().includes(q) || r.user_email.toLowerCase().includes(q) || r.event_title.toLowerCase().includes(q)
  })

  const totalEvents = new Set(records.map((r) => r.event_id)).size
  const totalStudents = new Set(records.map((r) => r.user_email)).size
  const avgAttendance = totalEvents > 0 ? Math.round(records.length / totalEvents) : 0

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Attendance</h1>
          <p className="text-[var(--muted-foreground)]">Track who attended which events</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Attendees", value: records.length, icon: UserCheck, color: "from-green-500 to-green-600" },
            { label: "Unique Students", value: totalStudents, icon: TrendingUp, color: "from-blue-500 to-blue-600" },
            { label: "Avg per Event", value: avgAttendance, icon: Calendar, color: "from-purple-500 to-purple-600" },
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

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search attendance records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
            />
          </div>
        </div>

        {loading ? (
          <div className="card-premium p-6 animate-pulse h-40" />
        ) : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <UserCheck className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No attendance records</h3>
            <p className="text-sm text-[var(--muted-foreground)]">No one has checked in to any events yet</p>
          </div>
        ) : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Student</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Event</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Event Date</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Checked In</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((rec) => (
                    <tr key={rec.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[var(--foreground)]">{rec.user_name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{rec.user_email}</div>
                      </td>
                      <td className="px-4 py-3 text-[var(--foreground)]">{rec.event_title}</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">
                        {new Date(rec.event_date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-medium">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          {new Date(rec.checked_in_at).toLocaleTimeString()}
                        </span>
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
