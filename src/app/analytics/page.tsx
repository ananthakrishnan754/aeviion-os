"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Award,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { title: "Total Students", value: "12,456", change: "+12%", trend: "up" as const, icon: Users, color: "from-[var(--primary)] to-[#C06840]" },
  { title: "Revenue", value: "$45,230", change: "+18%", trend: "up" as const, icon: DollarSign, color: "from-[var(--success)] to-[#2D7A4A]" },
  { title: "Events Hosted", value: "24", change: "+8%", trend: "up" as const, icon: Calendar, color: "from-[#9B6DD7] to-[#7B4FB7]" },
  { title: "Certificates Issued", value: "2,456", change: "+15%", trend: "up" as const, icon: Award, color: "from-[var(--warning)] to-[#B88030]" },
]

const monthlyData = [
  { month: "Jan", students: 4000, revenue: 12000, events: 4 },
  { month: "Feb", students: 3000, revenue: 9000, events: 3 },
  { month: "Mar", students: 5000, revenue: 15000, events: 5 },
  { month: "Apr", students: 4500, revenue: 13500, events: 4 },
  { month: "May", students: 6000, revenue: 18000, events: 6 },
  { month: "Jun", students: 5500, revenue: 16500, events: 5 },
  { month: "Jul", students: 7000, revenue: 21000, events: 7 },
  { month: "Aug", students: 6500, revenue: 19500, events: 6 },
  { month: "Sep", students: 8000, revenue: 24000, events: 8 },
  { month: "Oct", students: 7500, revenue: 22500, events: 7 },
  { month: "Nov", students: 9000, revenue: 27000, events: 9 },
  { month: "Dec", students: 12456, revenue: 45230, events: 12 },
]

const topCourses = [
  { name: "Web Development Bootcamp", students: 2345, rating: 4.8 },
  { name: "Machine Learning with Python", students: 1876, rating: 4.9 },
  { name: "Cybersecurity Fundamentals", students: 1543, rating: 4.7 },
  { name: "React Native Development", students: 1234, rating: 4.6 },
  { name: "Cloud Computing with AWS", students: 987, rating: 4.5 },
]

const topColleges = [
  { name: "MIT", students: 456 },
  { name: "Stanford University", students: 389 },
  { name: "UC Berkeley", students: 312 },
  { name: "Harvard University", students: 278 },
  { name: "IIT Delhi", students: 234 },
]

const recentActivity = [
  { action: "New student enrolled", target: "Alex Kumar", time: "2 min ago" },
  { action: "Course completed", target: "Web Development Bootcamp", time: "15 min ago" },
  { action: "Certificate issued", target: "AI Workshop", time: "1 hour ago" },
  { action: "Event created", target: "Hackathon 2025", time: "2 hours ago" },
  { action: "Revenue milestone", target: "$45,000", time: "3 hours ago" },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12months")
  const [chartType, setChartType] = useState("students")

  const maxValue = Math.max(...monthlyData.map((d) => d[chartType as keyof typeof d] as number))

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Analytics</h1>
            <p className="text-[var(--foreground-subtle)]">Track growth, engagement, and performance metrics.</p>
          </div>
          <div className="flex gap-2">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="3months">Last 3 months</option>
              <option value="12months">Last 12 months</option>
            </select>
            <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {stats.map((stat) => (
            <div key={stat.title} className="card-premium p-5 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--muted-foreground)]">{stat.title}</p>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                </div>
                <div className={cn("rounded-xl bg-gradient-to-br p-3 text-white shadow-sm", stat.color)}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3.5 w-3.5 text-[var(--success)]" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5 text-[var(--destructive)]" />
                )}
                <span className={cn("text-sm font-semibold", stat.trend === "up" ? "text-[var(--success)]" : "text-[var(--destructive)]")}>
                  {stat.change}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main chart */}
        <div className="card-premium p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Growth Overview</h2>
            <div className="flex gap-1.5 bg-[var(--background-subtle)] rounded-xl p-1">
              {(["students", "revenue", "events"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={cn(
                    "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all capitalize",
                    chartType === type
                      ? "bg-white text-[var(--primary)] shadow-sm"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex h-64 items-end gap-2">
            {monthlyData.map((data) => {
              const value = data[chartType as keyof typeof data] as number
              const height = (value / maxValue) * 100
              return (
                <div key={data.month} className="flex-1">
                  <div className="flex h-56 flex-col items-center justify-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[var(--primary)] to-[#D4964E] transition-all hover:from-[var(--primary-hover)] hover:to-[var(--primary)]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-[var(--muted-foreground)] font-medium">{data.month}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 stagger-children">
          {/* Top courses */}
          <div className="card-premium p-5">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Top Courses</h2>
            <div className="space-y-3.5">
              {topCourses.map((course, index) => (
                <div key={course.name} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[var(--border)] w-6">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">{course.name}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{course.students.toLocaleString()} students</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[var(--warning)]">{course.rating}</span>
                    <span className="text-xs text-[var(--muted-foreground)]">★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top colleges */}
          <div className="card-premium p-5">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Top Colleges</h2>
            <div className="space-y-3.5">
              {topColleges.map((college, index) => (
                <div key={college.name} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[var(--border)] w-6">{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--foreground)] truncate">{college.name}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{college.students} students</p>
                  </div>
                  <div className="h-2 w-24 rounded-full bg-[var(--background-subtle)]">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[#B85C3A]"
                      style={{ width: `${(college.students / topColleges[0].students) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="card-premium p-5">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">Recent Activity</h2>
            <div className="space-y-3.5">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-[var(--primary)] shrink-0" />
                  <div>
                    <p className="text-sm text-[var(--foreground)]">
                      {activity.action}{" "}
                      <span className="font-semibold">{activity.target}</span>
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
