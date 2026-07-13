import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  const [usersRes, eventsRes, coursesRes, certsRes, formsRes, projectsRes] = await Promise.all([
    supabase.from("users").select("id, role, status, created_at"),
    supabase.from("events").select("id, status, registrations, attendance, date"),
    supabase.from("courses").select("id, status, enrolled_students, rating"),
    supabase.from("certificates").select("id, status, type, issued_at"),
    supabase.from("forms").select("id, status, responses_count, views_count"),
    supabase.from("projects").select("id, status, featured"),
  ])

  const users = usersRes.data || []
  const events = eventsRes.data || []
  const courses = coursesRes.data || []
  const certs = certsRes.data || []
  const forms = formsRes.data || []
  const projects = projectsRes.data || []

  return NextResponse.json({
    users: {
      total: users.length,
      students: users.filter((u) => u.role === "student").length,
      active: users.filter((u) => u.status === "active").length,
    },
    events: {
      total: events.length,
      upcoming: events.filter((e) => new Date(e.date) > new Date()).length,
      totalRegistrations: events.reduce((s, e) => s + (e.registrations || 0), 0),
      totalAttendance: events.reduce((s, e) => s + (e.attendance || 0), 0),
    },
    courses: {
      total: courses.length,
      published: courses.filter((c) => c.status === "published").length,
      totalEnrolled: courses.reduce((s, c) => s + (c.enrolled_students || 0), 0),
      avgRating: courses.length > 0 ? (courses.reduce((s, c) => s + (parseFloat(c.rating) || 0), 0) / courses.length).toFixed(1) : "0",
    },
    certificates: {
      total: certs.length,
      issued: certs.filter((c) => c.status === "issued").length,
      revoked: certs.filter((c) => c.status === "revoked").length,
    },
    forms: {
      total: forms.length,
      published: forms.filter((f) => f.status === "published").length,
      totalResponses: forms.reduce((s, f) => s + (f.responses_count || 0), 0),
      totalViews: forms.reduce((s, f) => s + (f.views_count || 0), 0),
    },
    projects: {
      total: projects.length,
      completed: projects.filter((p) => p.status === "completed").length,
      featured: projects.filter((p) => p.featured).length,
    },
  })
}
