"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Search, Mail, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface User { id: string; name: string; email: string; role: string; status: string; created_at: string }

export default function MentorsPage() {
  const [mentors, setMentors] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("/api/students").then((r) => r.json()).then((data) => {
      setMentors((data || []).filter((u: User) => u.role === "mentor"))
    }).finally(() => setLoading(false))
  }, [])

  const filtered = mentors.filter((m) => m.name?.toLowerCase().includes(searchQuery.toLowerCase()) || m.email?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Mentors</h1>
          <p className="text-[var(--muted-foreground)]">Expert mentors guiding students</p>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search mentors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-32" />)}</div> : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No mentors yet</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Mentors will appear here once assigned</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((m) => (
              <div key={m.id} className="card-premium p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shrink-0">{m.name?.charAt(0)}</div>
                  <div className="min-w-0"><p className="font-semibold text-[var(--foreground)] truncate">{m.name}</p><p className="text-xs text-[var(--muted-foreground)] truncate">{m.email}</p></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", m.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{m.status}</span>
                  <span>Joined {new Date(m.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
