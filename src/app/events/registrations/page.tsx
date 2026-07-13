"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Search, Calendar, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Registration {
  id: string
  event_id: string
  user_id: string
  status: string
  checked_in: boolean
  registered_at: string
  event?: { title: string; date: string }
  user?: { name: string; email: string }
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    setLoading(true)
    try {
      const eventsRes = await fetch("/api/events")
      const events = await eventsRes.json()
      const allRegs: Registration[] = []
      for (const event of events || []) {
        const regRes = await fetch(`/api/events/${event.id}/registrations`)
        if (regRes.ok) {
          const regs = await regRes.json()
          for (const reg of regs || []) {
            allRegs.push({ ...reg, event: { title: event.title, date: event.date } })
          }
        }
      }
      setRegistrations(allRegs)
    } finally {
      setLoading(false)
    }
  }

  const filtered = registrations.filter((r) => {
    const q = searchQuery.toLowerCase()
    return (
      r.user?.name?.toLowerCase().includes(q) ||
      r.user?.email?.toLowerCase().includes(q) ||
      r.event?.title?.toLowerCase().includes(q)
    )
  })

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Registrations</h1>
          <p className="text-[var(--muted-foreground)]">All event registrations across the platform</p>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search by name, email, or event..."
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
            <Users className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No registrations found</h3>
            <p className="text-sm text-[var(--muted-foreground)]">No one has registered for any events yet</p>
          </div>
        ) : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Student</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Event</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Registered</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Check-in</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reg) => (
                    <tr key={reg.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[var(--foreground)]">{reg.user?.name || "Unknown"}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{reg.user?.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/events/${reg.event_id}`} className="text-[var(--primary)] hover:underline">
                          {reg.event?.title || "Unknown"}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{formatDate(reg.registered_at)}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium",
                          reg.status === "registered" ? "bg-green-100 text-green-700" :
                          reg.status === "cancelled" ? "bg-red-100 text-red-600" :
                          "bg-gray-100 text-gray-600"
                        )}>
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {reg.checked_in ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                            <span className="h-2 w-2 rounded-full bg-green-500" /> Checked in
                          </span>
                        ) : (
                          <span className="text-xs text-[var(--muted-foreground)]">—</span>
                        )}
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
