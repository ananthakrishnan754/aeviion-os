"use client"

import { useState, useEffect } from "react"
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
  Sparkles,
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
    icon: <LayoutDashboard className="h-[18px] w-[18px]" />,
  },
  {
    title: "Community",
    href: "/community",
    icon: <MessageSquare className="h-[18px] w-[18px]" />,
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
    icon: <GraduationCap className="h-[18px] w-[18px]" />,
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
    icon: <Calendar className="h-[18px] w-[18px]" />,
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
    icon: <FileText className="h-[18px] w-[18px]" />,
    children: [
      { title: "Create Form", href: "/forms/create" },
      { title: "Responses", href: "/forms/responses" },
      { title: "Analytics", href: "/forms/analytics" },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <FolderOpen className="h-[18px] w-[18px]" />,
    children: [
      { title: "Project Gallery", href: "/projects/gallery" },
      { title: "Student Portfolio", href: "/projects/portfolio" },
      { title: "Submissions", href: "/projects/submissions" },
    ],
  },
  {
    title: "Certificates",
    href: "/certificates",
    icon: <Award className="h-[18px] w-[18px]" />,
    children: [
      { title: "Generate", href: "/certificates/generate" },
      { title: "Templates", href: "/certificates/templates" },
      { title: "Bulk Export", href: "/certificates/export" },
    ],
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-[18px] w-[18px]" />,
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
    icon: <Briefcase className="h-[18px] w-[18px]" />,
  },
  {
    title: "Alumni",
    href: "/alumni",
    icon: <Heart className="h-[18px] w-[18px]" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-[18px] w-[18px]" />,
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

  // Auto-expand active section
  useEffect(() => {
    const activeParent = navigation.find(
      (item) => item.children?.some((child) => pathname === child.href)
    )
    if (activeParent) {
      setOpenItems((prev) =>
        prev.includes(activeParent.title) ? prev : [...prev, activeParent.title]
      )
    }
  }, [pathname])

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
        className="fixed top-4 left-4 z-50 rounded-xl bg-white/80 p-2.5 shadow-md backdrop-blur-sm lg:hidden"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-[var(--border-subtle)] bg-[var(--card)] transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-[72px] items-center gap-3 border-b border-[var(--border-subtle)] px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] shadow-sm">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-[15px] font-bold tracking-tight text-[var(--foreground)]">
                Aeviion
              </span>
              <span className="ml-1 text-[15px] font-light text-[var(--muted-foreground)]">
                OS
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navigation.map((item) => (
              <li key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleItem(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                        pathname.startsWith(item.href)
                          ? "bg-[var(--primary-light)] text-[var(--primary)]"
                          : "text-[var(--foreground-subtle)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {item.title}
                      </span>
                      {openItems.includes(item.title) ? (
                        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                      )}
                    </button>
                    {openItems.includes(item.title) && (
                      <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-[var(--border-subtle)] pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-[13px] transition-all duration-200",
                                pathname === child.href
                                  ? "bg-[var(--primary-light)] font-medium text-[var(--primary)]"
                                  : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
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
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-[var(--primary-light)] text-[var(--primary)]"
                        : "text-[var(--foreground-subtle)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
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

        {/* Sidebar footer */}
        <div className="border-t border-[var(--border-subtle)] p-4">
          <div className="flex items-center gap-3 rounded-xl bg-[var(--secondary)] px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-xs font-semibold text-white">
              AK
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-[13px] font-medium text-[var(--foreground)]">
                Anantha Krishnan
              </p>
              <p className="truncate text-[11px] text-[var(--muted-foreground)]">
                CEO & Founder
              </p>
            </div>
            <button className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)]">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  )
}

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--background)]/80 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={cn(
              "w-[320px] rounded-xl border bg-[var(--secondary)] py-2.5 pl-10 pr-4 text-[13px] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition-all duration-200",
              searchFocused
                ? "border-[var(--primary)] bg-white shadow-[0_0_0_3px_rgba(212,118,78,0.1)]"
                : "border-transparent hover:bg-white hover:border-[var(--border)]"
            )}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
          </span>
        </button>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-[var(--border)]" />

        {/* User menu */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-[var(--secondary)]">
          <div className="text-right">
            <p className="text-[13px] font-medium text-[var(--foreground)]">
              Anantha
            </p>
            <p className="text-[11px] text-[var(--muted-foreground)]">
              CEO
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-xs font-semibold text-white shadow-sm">
            AK
          </div>
        </button>
      </div>
    </header>
  )
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />
      <div className="lg:pl-[260px]">
        <Header />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
