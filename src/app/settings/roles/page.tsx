"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Search, Mail, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  created_at: string
}

export default function SettingsRolesPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/students").then((r) => r.json()).then((data) => setUsers(data || [])).finally(() => setLoading(false))
  }, [])

  const roles = [
    { name: "admin", label: "Admin", color: "bg-red-100 text-red-700", count: users.filter((u) => u.role === "admin").length },
    { name: "mentor", label: "Mentor", color: "bg-blue-100 text-blue-700", count: users.filter((u) => u.role === "mentor").length },
    { name: "instructor", label: "Instructor", color: "bg-green-100 text-green-700", count: users.filter((u) => u.role === "instructor").length },
    { name: "student", label: "Student", color: "bg-purple-100 text-purple-700", count: users.filter((u) => u.role === "student").length },
    { name: "alumni", label: "Alumni", color: "bg-orange-100 text-orange-700", count: users.filter((u) => u.role === "alumni").length },
    { name: "partner", label: "Partner", color: "bg-teal-100 text-teal-700", count: users.filter((u) => u.role === "partner").length },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Roles & Permissions</h1>
          <p className="text-[var(--muted-foreground)]">Manage user roles and access control</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <div key={role.name} className="card-premium p-5">
              <div className="flex items-center justify-between mb-2">
                <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium", role.color)}>{role.label}</span>
                <span className="text-sm font-medium text-[var(--foreground)]">{role.count}</span>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">Role-based access for {role.label.toLowerCase()}s</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="card-premium p-6 animate-pulse h-40" />
        ) : (
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">User</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Role</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Status</th>
                    <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 20).map((u) => (
                    <tr key={u.id} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[var(--foreground)]">{u.name}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">{u.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium capitalize",
                          u.role === "admin" ? "bg-red-100 text-red-700" : u.role === "mentor" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium",
                          u.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>
                          {u.status}
                        </span>
                      </td>
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
