"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Lock, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

const permissions = [
  { resource: "Students", actions: ["view", "create", "edit", "delete", "export"] },
  { resource: "Courses", actions: ["view", "create", "edit", "delete", "publish"] },
  { resource: "Events", actions: ["view", "create", "edit", "delete", "manage"] },
  { resource: "Certificates", actions: ["view", "create", "revoke", "export"] },
  { resource: "Projects", actions: ["view", "create", "approve", "reject"] },
  { resource: "Analytics", actions: ["view", "export"] },
  { resource: "Settings", actions: ["view", "edit"] },
]

const rolePermissions: Record<string, string[]> = {
  Admin: ["view", "create", "edit", "delete", "export", "publish", "manage", "revoke", "approve", "reject"],
  Mentor: ["view", "edit", "approve"],
  Instructor: ["view", "create", "edit", "publish"],
  Organizer: ["view", "create", "edit", "manage"],
  Student: ["view"],
}

export default function PermissionsPage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Permissions</h1><p className="mt-1 text-[#6B6B6B]">Configure role-based access control</p></div>
        <div className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
          <table className="w-full">
            <thead className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Resource</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Admin</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Mentor</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Instructor</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Organizer</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Student</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D4]">
              {permissions.map((p) => (
                <tr key={p.resource} className="transition-colors hover:bg-[#FAF8F5]/50">
                  <td className="px-6 py-4 font-medium text-[#2D2D2D]">{p.resource}</td>
                  {Object.keys(rolePermissions).map((role) => (
                    <td key={role} className="px-6 py-4 text-center">
                      {p.actions.some((a) => rolePermissions[role].includes(a)) ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6B8E6B]/15"><Check className="h-3.5 w-3.5 text-[#5A7A5A]" /></span>
                      ) : (
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#999]/10"><X className="h-3.5 w-3.5 text-[#ccc]" /></span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
