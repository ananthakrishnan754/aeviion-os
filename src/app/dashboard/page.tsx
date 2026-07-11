"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import {
  Users,
  Calendar,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Clock,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BookOpen,
  FolderOpen,
  BarChart3,
} from "lucide-react"

const stats = [
  {
    title: "Total Students",
    value: "12,456",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    gradient: "from-[#D4764E] to-[#B85C3A]",
  },
  {
    title: "Active Mentors",
    value: "89",
    change: "+5%",
    trend: "up" as const,
    icon: GraduationCap,
    gradient: "from-[#3D8B5E] to-[#2D6B4E]",
  },
  {
    title: "Upcoming Events",
    value: "24",
    change: "+8%",
    trend: "up" as const,
    icon: Calendar,
    gradient: "from-[#4A7DC9] to-[#3A6DB9]",
  },
  {
    title: "Revenue",
    value: "$45,230",
    change: "+18%",
    trend: "up" as const,
    icon: DollarSign,
    gradient: "from-[#D4964E] to-[#B87A3A]",
  },
]

const recentActivity = [
  {
    id: 1,
    user: "Sarah Johnson",
    action: "enrolled in",
    target: "Advanced Web Development",
    time: "2 minutes ago",
    type: "enrollment",
  },
  {
    id: 2,
    user: "Mike Chen",
    action: "submitted project",
    target: "AI Resume Analyzer",
    time: "15 minutes ago",
    type: "submission",
  },
  {
    id: 3,
    user: "Emily Davis",
    action: "earned certificate",
    target: "Cybersecurity Workshop",
    time: "1 hour ago",
    type: "certificate",
  },
  {
    id: 4,
    user: "Alex Kumar",
    action: "joined community",
    target: "IoT Enthusiasts",
    time: "2 hours ago",
    type: "community",
  },
  {
    id: 5,
    user: "Lisa Wang",
    action: "completed course",
    target: "React Fundamentals",
    time: "3 hours ago",
    type: "completion",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "AI Workshop",
    date: "Jan 15, 2025",
    time: "10:00 AM",
    registrations: 45,
    maxParticipants: 50,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Web Dev Bootcamp",
    date: "Jan 20, 2025",
    time: "2:00 PM",
    registrations: 32,
    maxParticipants: 40,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Cybersecurity Seminar",
    date: "Jan 25, 2025",
    time: "11:00 AM",
    registrations: 28,
    maxParticipants: 30,
    status: "upcoming",
  },
]

const topStudents = [
  { id: 1, name: "Alex Kumar", college: "MIT", score: 98, projects: 12, initials: "AK" },
  { id: 2, name: "Sarah Johnson", college: "Stanford", score: 96, projects: 10, initials: "SJ" },
  { id: 3, name: "Mike Chen", college: "Berkeley", score: 94, projects: 9, initials: "MC" },
  { id: 4, name: "Emily Davis", college: "Harvard", score: 92, projects: 8, initials: "ED" },
]

const quickActions = [
  { label: "Create Event", icon: Calendar, color: "from-[#4A7DC9] to-[#3A6DB9]" },
  { label: "Add Student", icon: Users, color: "from-[#3D8B5E] to-[#2D6B4E]" },
  { label: "Issue Certificate", icon: Award, color: "from-[#D4964E] to-[#B87A3A]" },
  { label: "View Analytics", icon: BarChart3, color: "from-[#D4764E] to-[#B85C3A]" },
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome header */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] shadow-lg shadow-[var(--primary)]/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-[28px] font-bold tracking-tight text-[var(--foreground)]">
                Welcome back, Anantha
              </h1>
              <p className="text-[15px] text-[var(--muted-foreground)]">
                Here&apos;s what&apos;s happening with Aeviion today.
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5"
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-[var(--muted-foreground)]">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-[28px] font-bold tracking-tight text-[var(--foreground)]">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-sm`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3.5 w-3.5 text-[var(--success)]" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 text-[var(--destructive)]" />
                  )}
                  <span
                    className={`text-[13px] font-semibold ${
                      stat.trend === "up"
                        ? "text-[var(--success)]"
                        : "text-[var(--destructive)]"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-[13px] text-[var(--muted-foreground)]">
                    vs last month
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-[var(--foreground)]">
                Recent Activity
              </h2>
              <button className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-1">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--secondary)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--secondary)] text-[13px] font-semibold text-[var(--foreground-subtle)]">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-[var(--foreground)]">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-[var(--primary)]">
                        {activity.target}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[12px] text-[var(--muted-foreground)]">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-[var(--foreground)]">
                Upcoming Events
              </h2>
              <button className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-xl border border-[var(--border-subtle)] p-4 transition-all hover:border-[var(--border)] hover:shadow-[var(--shadow-sm)]"
                >
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {event.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[13px] text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span>{event.time}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[var(--muted-foreground)]">
                        {event.registrations}/{event.maxParticipants}
                      </span>
                      <span className="font-semibold text-[var(--success)]">
                        {Math.round(
                          (event.registrations / event.maxParticipants) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-[var(--secondary)]">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A]"
                        style={{
                          width: `${
                            (event.registrations / event.maxParticipants) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Students */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-[var(--foreground)]">
                Top Students
              </h2>
              <button className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-[var(--primary)] hover:bg-[var(--primary-light)] transition-colors">
                View all
              </button>
            </div>
            <div className="space-y-1">
              {topStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--secondary)]"
                >
                  <span className="w-6 text-center text-[14px] font-bold text-[var(--muted-foreground)]">
                    {index + 1}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-[13px] font-semibold text-white">
                    {student.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--foreground)]">
                      {student.name}
                    </p>
                    <p className="text-[13px] text-[var(--muted-foreground)]">
                      {student.college}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--foreground)]">
                      {student.score}%
                    </p>
                    <p className="text-[12px] text-[var(--muted-foreground)]">
                      {student.projects} projects
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="mb-5 text-[17px] font-semibold text-[var(--foreground)]">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border-subtle)] p-6 transition-all duration-200 hover:border-[var(--border)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} shadow-sm transition-shadow group-hover:shadow-md`}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-[13px] font-medium text-[var(--foreground-subtle)] group-hover:text-[var(--foreground)]">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
