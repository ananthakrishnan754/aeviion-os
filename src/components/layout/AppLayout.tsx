"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Calendar,
  GraduationCap,
  BookOpen,
  Award,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
  FileText,
  FolderOpen,
  MessageSquare,
  Briefcase,
  Heart,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  children?: { title: string; href: string }[]
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Community",
    href: "/community",
    icon: <MessageSquare className="h-5 w-5" />,
    children: [
      { title: "Students", href: "/community/students" },
      { title: "Mentors", href: "/community/mentors" },
      { title: "Alumni", href: "/community/alumni" },
      { title: "Partners", href: "/community/partners" },
    ],
  },
  {
    title: "Learning",
    href: "/learning",
    icon: <GraduationCap className="h-5 w-5" />,
    children: [
      { title: "Courses", href: "/learning/courses" },
      { title: "Fellowships", href: "/learning/fellowships" },
      { title: "Modules", href: "/learning/modules" },
      { title: "Assignments", href: "/learning/assignments" },
    ],
  },
  {
    title: "Events",
    href: "/events",
    icon: <Calendar className="h-5 w-5" />,
    children: [
      { title: "Upcoming Events", href: "/events/upcoming" },
      { title: "Registrations", href: "/events/registrations" },
      { title: "Attendance", href: "/events/attendance" },
      { title: "Certificates", href: "/events/certificates" },
    ],
  },
  {
    title: "Forms",
    href: "/forms",
    icon: <FileText className="h-5 w-5" />,
    children: [
      { title: "Create Form", href: "/forms/create" },
      { title: "Responses", href: "/forms/responses" },
      { title: "Analytics", href: "/forms/analytics" },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <FolderOpen className="h-5 w-5" />,
    children: [
      { title: "Project Gallery", href: "/projects/gallery" },
      { title: "Student Portfolio", href: "/projects/portfolio" },
      { title: "Submissions", href: "/projects/submissions" },
    ],
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: <Award className="h-5 w-5" />,
    children: [
      { title: "Generate", href: "/certificates/generate" },
      { title: "Templates", href: "/certificates/templates" },
      { title: "Bulk Export", href: "/certificates/export" },
    ],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    children: [
      { title: "Growth", href: "/analytics/growth" },
      { title: "Students", href: "/analytics/students" },
      { title: "Revenue", href: "/analytics/revenue" },
      { title: "Events", href: "/analytics/events" },
    ],
  },
  {
    title: "Careers",
    href: "/careers",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Alumni",
    href: "/alumni",
    icon: <Heart className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    children: [
      { title: "Roles", href: "/settings/roles" },
      { title: "Permissions", href: "/settings/permissions" },
      { title: "Branding", href: "/settings/branding" },
      { title: "Website", href: "/settings/website" },
      { title: "API", href: "/settings/api" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    )
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-md lg:hidden"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold">Aeviion OS</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="scrollbar-thin h-[calc(100vh-4rem)] overflow-y-auto p-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleItem(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        pathname.startsWith(item.href)
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {item.title}
                      </span>
                      {openItems.includes(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {openItems.includes(item.title) && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm transition-colors",
                                pathname === child.href
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-600 hover:bg-gray-100"
                              )}
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
        </button>

        {/* User menu */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">CEO</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <User className="h-5 w-5 text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
