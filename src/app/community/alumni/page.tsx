"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Search, GraduationCap } from "lucide-react"

interface User { id: string; name: string; email: string; role: string; status: string; created_at: string }

export default function AlumniCommunityPage() {
  const [alumni, setAlumni] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetch("/api/students").then((r) => r.json()).then((data) => {
      setAlumni((data || []).filter((u: User) => u.role === "alumni" || u.status === "alumni"))
    }).finally(() => setLoading(false))
  }, [])

  const filtered = alumni.filter((a) => a.name?.toLowerCase().includes(searchQuery.toLowerCase()) || a.email?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Alumni</h1>
          <p className="text-[var(--muted-foreground)]">Graduated students and alumni network</p>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search alumni..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? <div className="card-premium p-6 animate-pulse h-40" /> : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No alumni yet</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Alumni will appear here once students graduate</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((a) => (
              <div key={a.id} className="card-premium p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-bold text-white shrink-0">{a.name?.charAt(0)}</div>
                  <div className="min-w-0"><p className="font-semibold text-[var(--foreground)] truncate">{a.name}</p><p className="text-xs text-[var(--muted-foreground)] truncate">{a.email}</p></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
