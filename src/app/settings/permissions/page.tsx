"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const modules = ["Dashboard", "Students", "Events", "Courses", "Certificates", "Projects", "Forms", "Analytics", "Settings"]
const roles = ["Admin", "Mentor", "Instructor", "Student"]
const permissions = ["View", "Create", "Edit", "Delete"]

const access: Record<string, Record<string, string[]>> = {
  Admin: { Dashboard: ["View"], Students: ["View", "Create", "Edit", "Delete"], Events: ["View", "Create", "Edit", "Delete"], Courses: ["View", "Create", "Edit", "Delete"], Certificates: ["View", "Create", "Edit", "Delete"], Projects: ["View", "Create", "Edit", "Delete"], Forms: ["View", "Create", "Edit", "Delete"], Analytics: ["View"], Settings: ["View", "Edit"] },
  Mentor: { Dashboard: ["View"], Students: ["View"], Events: ["View", "Create"], Courses: ["View", "Create"], Certificates: ["View", "Create"], Projects: ["View", "Edit"], Forms: ["View", "Create"], Analytics: ["View"], Settings: ["View"] },
  Instructor: { Dashboard: ["View"], Students: ["View"], Events: ["View"], Courses: ["View", "Create", "Edit"], Certificates: ["View", "Create"], Projects: ["View"], Forms: ["View", "Create"], Analytics: ["View"], Settings: [] },
  Student: { Dashboard: ["View"], Students: [], Events: ["View"], Courses: ["View"], Certificates: ["View"], Projects: ["View", "Create"], Forms: ["View"], Analytics: [], Settings: [] },
}

export default function PermissionsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Permissions Matrix</h1>
          <p className="text-[var(--muted-foreground)]">Access control for each role and module</p>
        </div>
        <div className="card-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-4 py-3 font-medium text-[var(--muted-foreground)]">Module</th>
                  {roles.map((r) => <th key={r} className="px-4 py-3 font-medium text-[var(--muted-foreground)] text-center">{r}</th>)}
                </tr>
              </thead>
              <tbody>
                {modules.map((mod) => (
                  <tr key={mod} className="border-b border-[var(--border)] hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{mod}</td>
                    {roles.map((r) => (
                      <td key={r} className="px-4 py-3 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {(access[r]?.[mod] || []).map((p) => (
                            <span key={p} className="rounded-md bg-green-100 text-green-700 px-1.5 py-0.5 text-[10px] font-medium">{p}</span>
                          ))}
                          {(!access[r]?.[mod] || access[r][mod].length === 0) && <span className="text-[var(--muted-foreground)]">—</span>}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
