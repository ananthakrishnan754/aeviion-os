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
  BookOpen,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Students",
    value: "12,456",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Revenue",
    value: "$45,230",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    title: "Events Hosted",
    value: "24",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    title: "Certificates Issued",
    value: "2,456",
    change: "+15%",
    trend: "up",
    icon: Award,
    color: "bg-yellow-500",
  },
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">
              Track growth, engagement, and performance metrics.
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-lg border bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="3months">Last 3 months</option>
              <option value="12months">Last 12 months</option>
            </select>
            <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={cn("rounded-lg p-3", stat.color)}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  )}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main chart */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Growth Overview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType("students")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium",
                  chartType === "students"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                Students
              </button>
              <button
                onClick={() => setChartType("revenue")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium",
                  chartType === "revenue"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                Revenue
              </button>
              <button
                onClick={() => setChartType("events")}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium",
                  chartType === "events"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                Events
              </button>
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
                      className="w-full rounded-t-lg bg-blue-500 transition-all hover:bg-blue-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-gray-500">
                    {data.month}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top courses */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Top Courses
            </h2>
            <div className="space-y-4">
              {topCourses.map((course, index) => (
                <div key={course.name} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{course.name}</p>
                    <p className="text-sm text-gray-500">
                      {course.students.toLocaleString()} students
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-yellow-600">
                      {course.rating}
                    </span>
                    <span className="text-xs text-gray-500">★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top colleges */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Top Colleges
            </h2>
            <div className="space-y-4">
              {topColleges.map((college, index) => (
                <div key={college.name} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-400">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{college.name}</p>
                    <p className="text-sm text-gray-500">
                      {college.students} students
                    </p>
                  </div>
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${(college.students / topColleges[0].students) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm text-gray-900">
                      {activity.action}{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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
