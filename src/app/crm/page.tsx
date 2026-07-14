"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Contact, Search, Mail, Phone, Building2, Plus, Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface User { id: string; name: string; email: string; phone?: string; role: string; status: string; created_at: string }

const typeColors: Record<string, string> = { partner: "bg-teal-100 text-teal-700", mentor: "bg-blue-100 text-blue-700", sponsor: "bg-purple-100 text-purple-700", vendor: "bg-orange-100 text-orange-700" }

export default function CRMPage() {
  const [contacts, setContacts] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => { fetch("/api/students").then((r) => r.json()).then((data) => setContacts(data || [])).finally(() => setLoading(false)) }, [])

  const filtered = contacts.filter((c) => c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || c.email?.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">CRM</h1>
            <p className="text-[var(--muted-foreground)]">Contact and relationship management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Contacts", value: contacts.length, icon: Contact, color: "from-blue-500 to-blue-600" },
            { label: "Active Users", value: contacts.filter((c) => c.status === "active").length, icon: Users, color: "from-green-500 to-green-600" },
            { label: "Mentors", value: contacts.filter((c) => c.role === "mentor").length, icon: Star, color: "from-purple-500 to-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="card-premium p-5">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p><p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p></div>
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", stat.color)}><stat.icon className="h-5 w-5" /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search contacts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        {loading ? <div className="card-premium p-6 animate-pulse h-40" /> : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Contact</th>
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Role</th>
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Joined</th>
                </tr></thead>
                <tbody>
                  {filtered.slice(0, 30).map((c) => (
                    <tr key={c.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                      <td className="px-4 py-3"><div className="font-medium text-[var(--foreground)]">{c.name}</div><div className="text-xs text-[var(--muted-foreground)]">{c.email}</div></td>
                      <td className="px-4 py-3"><span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium capitalize", c.role === "mentor" ? "bg-blue-100 text-blue-700" : c.role === "partner" ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-600")}>{c.role}</span></td>
                      <td className="px-4 py-3"><span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", c.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>{c.status}</span></td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">{new Date(c.created_at).toLocaleDateString()}</td>
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
