"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  Copy,
  BarChart3,
  ExternalLink,
  FileText,
  Clock,
  Users,
  ArrowUpRight,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import type { MockForm } from "@/lib/db/mock-data"
import { formsDB } from "@/lib/db/mock-data"
import { toast } from "react-hot-toast"

export default function FormsListPage() {
  const [forms, setForms] = useState<MockForm[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "closed">("all")
  const [sortBy, setSortBy] = useState<"newest" | "responses" | "views">("newest")

  useEffect(() => { loadForms() }, [])

  const loadForms = async () => {
    setLoading(true)
    const data = await formsDB.getAll()
    setForms(data)
    setLoading(false)
  }

  const filteredForms = forms
    .filter((form) => {
      const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        form.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || form.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "responses") return b.responsesCount - a.responsesCount
      if (sortBy === "views") return b.viewsCount - a.viewsCount
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const handleDuplicate = async (form: MockForm) => {
    const newForm: MockForm = {
      ...form,
      id: `form_${Date.now()}`,
      title: `${form.title} (Copy)`,
      slug: `${form.slug}-copy`,
      status: "draft",
      responsesCount: 0,
      viewsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await formsDB.create(newForm)
    setForms([...forms, newForm])
    toast.success("Form duplicated")
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this form?")) {
      await formsDB.delete(id)
      setForms(forms.filter((f) => f.id !== id))
      toast.success("Form deleted")
    }
  }

  const stats = {
    total: forms.length,
    published: forms.filter((f) => f.status === "published").length,
    draft: forms.filter((f) => f.status === "draft").length,
    totalResponses: forms.reduce((sum, f) => sum + f.responsesCount, 0),
  }

  const statCards = [
    { label: "Total Forms", value: stats.total, icon: FileText, color: "from-[var(--primary)] to-[#C06840]" },
    { label: "Published", value: stats.published, icon: ArrowUpRight, color: "from-[var(--success)] to-[#2D7A4A]" },
    { label: "Drafts", value: stats.draft, icon: Clock, color: "from-[var(--warning)] to-[#B88030]" },
    { label: "Total Responses", value: stats.totalResponses.toLocaleString(), icon: Users, color: "from-[#9B6DD7] to-[#7B4FB7]" },
  ]

  return (
    <AppLayout>
      <div className="min-h-screen p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between animate-slide-up">
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Form Builder</h1>
              <p className="mt-1 text-sm text-[var(--foreground-subtle)]">Create and manage Typeform-style forms with JSON-based architecture</p>
            </div>
            <Link
              href="/forms/create"
              className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              Create Form
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4 stagger-children">
            {statCards.map((stat) => (
              <div key={stat.label} className="card-premium p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm", stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                    <p className="text-xs text-[var(--muted-foreground)] font-medium">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="responses">Most Responses</option>
              <option value="views">Most Views</option>
            </select>
          </div>

          {/* Forms Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent" />
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-[var(--border)] py-16 text-center">
              <FileText className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
              <h3 className="mt-4 text-lg font-medium text-[var(--foreground)]">No forms found</h3>
              <p className="mt-2 text-[var(--foreground-subtle)]">Get started by creating your first form</p>
              <Link
                href="/forms/create"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all"
              >
                <Plus className="h-4 w-4" />
                Create Form
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 stagger-children">
              {filteredForms.map((form) => (
                <div key={form.id} className="card-premium p-5 group">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                          {form.title}
                        </h3>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-semibold shrink-0",
                            form.status === "published"
                              ? "bg-[var(--success-light)] text-[var(--success)]"
                              : form.status === "draft"
                              ? "bg-[var(--muted)] text-[var(--muted-foreground)]"
                              : "bg-[#FDECEE] text-[var(--destructive)]"
                          )}
                        >
                          {form.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-[var(--foreground-subtle)] line-clamp-2">{form.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                      <BarChart3 className="h-4 w-4" />
                      <span>{form.responsesCount} responses</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
                      <Eye className="h-4 w-4" />
                      <span>{form.viewsCount} views</span>
                    </div>
                  </div>

                  {/* Block count */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xs text-[var(--muted-foreground)] font-medium">{form.blocks.length} blocks</span>
                    <span className="text-xs text-[var(--border)]">•</span>
                    <span className="text-xs text-[var(--muted-foreground)] font-medium">{form.blocks.filter((b) => b.required).length} required</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                    <Link
                      href={`/forms/create?id=${form.id}`}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </Link>
                    <Link
                      href={`/f/${form.slug}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Link>
                    <button
                      onClick={() => handleDuplicate(form)}
                      className="rounded-xl border border-[var(--border)] p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] hover:text-[var(--foreground)] transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="rounded-xl border border-[var(--border)] p-2 text-[var(--muted-foreground)] hover:bg-[#FDECEE] hover:text-[var(--destructive)] transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
