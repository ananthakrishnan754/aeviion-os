"use client"

import { useState } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { ClipboardList, Plus, Search, Calendar, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Assignments</h1>
            <p className="text-[var(--muted-foreground)]">Manage student assignments and submissions</p>
          </div>
          <Link href="/learning/courses/create" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-all">
            <Plus className="h-4 w-4" /> Create Assignment
          </Link>
        </div>

        <div className="card-premium p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search assignments..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30" />
          </div>
        </div>

        <div className="card-premium p-12 text-center">
          <ClipboardList className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">Assignments coming soon</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">Assignment management will be available once courses are fully set up with modules and lessons</p>
          <Link href="/learning/courses" className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all">
            <ClipboardList className="h-4 w-4" /> Go to Courses
          </Link>
        </div>
      </div>
    </AppLayout>
  )
}
