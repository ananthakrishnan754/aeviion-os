"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Plus,
  Search,
  MoreVertical,
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
  Filter,
  Download,
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

  useEffect(() => {
    loadForms()
  }, [])

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

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
              <p className="mt-1 text-sm text-gray-600">Create and manage Typeform-style forms with JSON-based architecture</p>
            </div>
            <Link
              href="/forms/create"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Form
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-6 grid grid-cols-4 gap-4">
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Forms</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                  <p className="text-xs text-gray-500">Published</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                  <p className="text-xs text-gray-500">Drafts</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalResponses.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Total Responses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="responses">Most Responses</option>
              <option value="views">Most Views</option>
            </select>
          </div>

          {/* Forms Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-gray-300 py-16 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No forms found</h3>
              <p className="mt-2 text-gray-600">Get started by creating your first form</p>
              <Link
                href="/forms/create"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Create Form
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredForms.map((form) => (
                <div
                  key={form.id}
                  className="group rounded-xl border bg-white p-6 transition-all hover:shadow-md hover:border-gray-300"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {form.title}
                        </h3>
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            form.status === "published"
                              ? "bg-green-100 text-green-700"
                              : form.status === "draft"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-700"
                          )}
                        >
                          {form.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{form.description}</p>
                    </div>
                    <div className="relative">
                      <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <BarChart3 className="h-4 w-4" />
                      <span>{form.responsesCount} responses</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Eye className="h-4 w-4" />
                      <span>{form.viewsCount} views</span>
                    </div>
                  </div>

                  {/* Block count */}
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {form.blocks.length} blocks
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {form.blocks.filter((b) => b.required).length} required
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t">
                    <Link
                      href={`/forms/create?id=${form.id}`}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit
                    </Link>
                    <Link
                      href={`/f/${form.slug}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </Link>
                    <button
                      onClick={() => handleDuplicate(form)}
                      className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      title="Duplicate"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
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
