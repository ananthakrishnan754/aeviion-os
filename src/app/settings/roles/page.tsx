"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Shield, Plus, Users, Edit, Trash2, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Role { id: string; name: string; description: string; users: number; permissions: string[]; color: string }

const roles: Role[] = [
  { id: "1", name: "Admin", description: "Full system access with all permissions", users: 3, permissions: ["all"], color: "from-[#D4764E] to-[#E8956A]" },
  { id: "2", name: "Mentor", description: "Guide students and review submissions", users: 24, permissions: ["view_students", "review_projects", "manage_courses"], color: "from-[#6B8E6B] to-[#8CB88C]" },
  { id: "3", name: "Instructor", description: "Create and manage course content", users: 12, permissions: ["manage_courses", "view_students", "create_assignments"], color: "from-[#4A7DC9] to-[#3A6DB9]" },
  { id: "4", name: "Organizer", description: "Manage events and registrations", users: 8, permissions: ["manage_events", "view_students", "manage_registrations"], color: "from-[#B8860B] to-[#DAA520]" },
  { id: "5", name: "Student", description: "Access courses and submit projects", users: 12400, permissions: ["view_courses", "submit_projects", "view_certificates"], color: "from-[#8B6F47] to-[#A0845C]" },
]

export default function RolesPage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Roles</h1><p className="mt-1 text-[#6B6B6B]">Manage user roles and access levels</p></div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Plus className="h-4 w-4" />Create Role</button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((r, i) => (
            <div key={r.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md", r.color)}><Shield className="h-5 w-5" /></div>
                <div className="flex gap-1"><button className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#2D2D2D]"><Edit className="h-4 w-4" /></button></div>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-[#2D2D2D]">{r.name}</h3>
              <p className="mb-3 text-sm text-[#6B6B6B]">{r.description}</p>
              <p className="mb-3 text-xs text-[#999]"><Users className="mr-1 inline h-3.5 w-3.5" />{r.users.toLocaleString()} users</p>
              <div className="flex flex-wrap gap-1.5">
                {r.permissions.slice(0, 3).map((p) => (
                  <span key={p} className="rounded-full bg-[#FAF8F5] px-2 py-0.5 text-xs text-[#6B6B6B]">{p.replace(/_/g, " ")}</span>
                ))}
                {r.permissions.length > 3 && <span className="rounded-full bg-[#FAF8F5] px-2 py-0.5 text-xs text-[#999]">+{r.permissions.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
