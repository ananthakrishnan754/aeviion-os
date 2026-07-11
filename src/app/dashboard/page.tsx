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
} from "lucide-react"

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
    title: "Active Mentors",
    value: "89",
    change: "+5%",
    trend: "up",
    icon: GraduationCap,
    color: "bg-green-500",
  },
  {
    title: "Upcoming Events",
    value: "24",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    title: "Revenue",
    value: "$45,230",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "bg-yellow-500",
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
  {
    id: 1,
    name: "Alex Kumar",
    college: "MIT",
    score: 98,
    projects: 12,
    avatar: "AK",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    college: "Stanford",
    score: 96,
    projects: 10,
    avatar: "SJ",
  },
  {
    id: 3,
    name: "Mike Chen",
    college: "Berkeley",
    score: 94,
    projects: 9,
    avatar: "MC",
  },
  {
    id: 4,
    name: "Emily Davis",
    college: "Harvard",
    score: 92,
    projects: 8,
    avatar: "ED",
  },
]

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with Aeviion today.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`rounded-lg p-3 ${stat.color}`}>
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
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium text-blue-600">
                        {activity.target}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border p-4 hover:border-blue-200 hover:bg-blue-50"
                >
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {event.date}
                    </span>
                    <span>{event.time}</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {event.registrations}/{event.maxParticipants} registered
                      </span>
                      <span className="text-green-600 font-medium">
                        {Math.round(
                          (event.registrations / event.maxParticipants) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-500"
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
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Top Students</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center gap-4 rounded-lg p-3 hover:bg-gray-50"
                >
                  <span className="text-lg font-bold text-gray-400">
                    {index + 1}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-medium text-white">
                    {student.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.college}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{student.score}%</p>
                    <p className="text-xs text-gray-500">
                      {student.projects} projects
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:border-blue-200 hover:bg-blue-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Create Event
                </span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:border-green-200 hover:bg-green-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Add Student
                </span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:border-purple-200 hover:bg-purple-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Issue Certificate
                </span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:border-yellow-200 hover:bg-yellow-50">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  View Analytics
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
