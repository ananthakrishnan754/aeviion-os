"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Search, Plus, GraduationCap, UserCheck, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface User { id: string; name: string; email: string; role: string; status: string; created_at: string }

export default function CommunityPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => { fetch("/api/students").then((r) => r.json()).then(setUsers).finally(() => setLoading(false)) }, [])

  const filtered = users.filter((u) => u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase()))

  const stats = [
    { label: "Students", value: users.filter((u) => u.role === "student").length, icon: GraduationCap, color: "from-blue-500 to-blue-600", href: "/community/students" },
    { label: "Mentors", value: users.filter((u) => u.role === "mentor").length, icon: UserCheck, color: "from-green-500 to-green-600", href: "/community/mentors" },
    { label: "Alumni", value: users.filter((u) => u.role === "alumni" || u.status === "alumni").length, icon: Users, color: "from-purple-500 to-purple-600", href: "/community/alumni" },
    { label: "Partners", value: users.filter((u) => u.role === "partner").length, icon: Building2, color: "from-orange-500 to-orange-600", href: "/community/partners" },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Community</h1>
            <p className="text-[var(--muted-foreground)]">Your platform community members</p>
          </div>
          <Link href="/community/students" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-all">
            <Plus className="h-4 w-4" /> Add Member
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link key={stat.label} href={stat.href} className="card-premium p-5 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p><p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p></div>
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", stat.color)}><stat.icon className="h-5 w-5" /></div>
              </div>
            </Link>
          ))}
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search community..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? <div className="card-premium p-6 animate-pulse h-40" /> : filtered.length === 0 ? (
          <div className="card-premium p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold mb-2">No members found</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Community members will appear here</p>
          </div>
        ) : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Member</th>
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Role</th>
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Joined</th>
                </tr></thead>
                <tbody>
                  {filtered.slice(0, 30).map((u) => (
                    <tr key={u.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                      <td className="px-4 py-3"><div className="font-medium text-[var(--foreground)]">{u.name}</div><div className="text-xs text-[var(--muted-foreground)]">{u.email}</div></td>
                      <td className="px-4 py-3"><span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium capitalize",
                        u.role === "admin" ? "bg-red-100 text-red-700" : u.role === "mentor" ? "bg-blue-100 text-blue-700" : u.role === "partner" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600")}>{u.role}</span></td>
                      <td className="px-4 py-3"><span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium",
                        u.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{u.status}</span></td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{new Date(u.created_at).toLocaleDateString()}</td>
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
