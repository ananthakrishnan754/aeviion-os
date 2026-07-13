"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users } from "lucide-react"

interface Data { users: { total: number; students: number; active: number } }

export default function StudentAnalyticsPage() {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { fetch("/api/analytics").then((r) => r.json()).then(setData).finally(() => setLoading(false)) }, [])

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Student Analytics</h1>
          <p className="text-[var(--muted-foreground)]">Student enrollment and engagement metrics</p>
        </div>
        {loading ? <div className="card-premium p-6 animate-pulse h-40" /> : data && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Total Students", value: data.users.students, color: "from-blue-500 to-blue-600" },
              { label: "Active Students", value: data.users.active, color: "from-green-500 to-green-600" },
              { label: "Total Users", value: data.users.total, color: "from-purple-500 to-purple-600" },
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
