"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"

interface Data { events: { total: number; upcoming: number; totalRegistrations: number; totalAttendance: number } }

export default function EventAnalyticsPage() {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { fetch("/api/analytics").then((r) => r.json()).then(setData).finally(() => setLoading(false)) }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Event Analytics</h1>
          <p className="text-[var(--muted-foreground)]">Event performance and attendance metrics</p>
        </div>
        {loading ? <div className="card-premium p-6 animate-pulse h-40" /> : data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Events", value: data.events.total },
              { label: "Upcoming", value: data.events.upcoming },
              { label: "Total Registrations", value: data.events.totalRegistrations },
              { label: "Total Attendance", value: data.events.totalAttendance },
            ].map((s) => (
              <div key={s.label} className="card-premium p-5">
                <p className="text-sm text-[var(--muted-foreground)]">{s.label}</p>
                <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
