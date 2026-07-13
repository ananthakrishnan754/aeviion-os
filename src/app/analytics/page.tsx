"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Calendar, BookOpen, Award, FolderOpen, FileText, TrendingUp, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Analytics {
  users: { total: number; students: number; active: number }
  events: { total: number; upcoming: number; totalRegistrations: number; totalAttendance: number }
  courses: { total: number; published: number; totalEnrolled: number; avgRating: string }
  certificates: { total: number; issued: number; revoked: number }
  forms: { total: number; published: number; totalResponses: number; totalViews: number }
  projects: { total: number; completed: number; featured: number }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/analytics").then((r) => r.json()).then(setData).finally(() => setLoading(false))
  }, [])

  const stats = data ? [
    { label: "Total Students", value: data.users.students, icon: Users, color: "from-blue-500 to-blue-600", href: "/community/students" },
    { label: "Active Events", value: data.events.upcoming, icon: Calendar, color: "from-green-500 to-green-600", href: "/events/upcoming" },
    { label: "Courses Published", value: data.courses.published, icon: BookOpen, color: "from-purple-500 to-purple-600", href: "/learning/courses" },
    { label: "Certificates Issued", value: data.certificates.issued, icon: Award, color: "from-orange-500 to-orange-600", href: "/certificates" },
    { label: "Projects Completed", value: data.projects.completed, icon: FolderOpen, color: "from-red-500 to-red-600", href: "/projects" },
    { label: "Form Responses", value: data.forms.totalResponses, icon: FileText, color: "from-teal-500 to-teal-600", href: "/forms/responses" },
  ] : []

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Analytics</h1>
          <p className="text-[var(--muted-foreground)]">Platform-wide performance overview</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="card-premium p-5 animate-pulse h-24" />)}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <a key={stat.label} href={stat.href} className="card-premium p-5 hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
                      <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                    </div>
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", stat.color)}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-[var(--primary)] group-hover:underline">
                    View details <ArrowUpRight className="h-3 w-3" />
                  </div>
                </a>
              ))}
            </div>

            {data && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">Engagement</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Event Registrations", value: data.events.totalRegistrations, max: Math.max(data.events.totalRegistrations, 1) },
                      { label: "Event Attendance", value: data.events.totalAttendance, max: Math.max(data.events.totalRegistrations, 1) },
                      { label: "Course Enrollments", value: data.courses.totalEnrolled, max: Math.max(data.courses.totalEnrolled, 1) },
                      { label: "Form Views", value: data.forms.totalViews, max: Math.max(data.forms.totalViews, 1) },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-[var(--muted-foreground)]">{item.label}</span>
                          <span className="font-medium text-[var(--foreground)]">{item.value}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[var(--muted)]">
                          <div className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A]" style={{ width: `${(item.value / item.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-premium p-6">
                  <h3 className="font-semibold text-[var(--foreground)] mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Users Active", value: data.users.active, color: "text-green-600" },
                      { label: "Avg Course Rating", value: data.courses.avgRating, color: "text-yellow-600" },
                      { label: "Featured Projects", value: data.projects.featured, color: "text-purple-600" },
                      { label: "Forms Published", value: data.forms.published, color: "text-blue-600" },
                      { label: "Certs Revoked", value: data.certificates.revoked, color: "text-red-600" },
                      { label: "Total Forms", value: data.forms.total, color: "text-teal-600" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl bg-[var(--muted)]/50 p-3">
                        <p className="text-2xl font-bold text-[var(--foreground)]">{item.value}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}
