"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  FileText,
  Plus,
  Eye,
  BarChart3,
  Copy,
  Trash2,
  ExternalLink,
  Search,
  MoreHorizontal,
  Calendar,
  Users,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import type { Form } from "@/types"

export default function FormsPage() {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchForms()
  }, [])

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/forms")
      if (res.ok) {
        const data = await res.json()
        setForms(data)
      }
    } catch (err) {
      console.error("Failed to fetch forms:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredForms = forms.filter((f) => {
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || f.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const duplicateForm = async (form: Form) => {
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${form.title} (Copy)`,
          description: form.description,
          blocks: form.blocks,
          settings: form.settings,
        }),
      })
      if (res.ok) fetchForms()
    } catch (err) {
      console.error("Failed to duplicate form:", err)
    }
  }

  const deleteForm = async (id: string) => {
    if (!confirm("Are you sure you want to delete this form?")) return
    try {
      const res = await fetch(`/api/forms/${id}`, { method: "DELETE" })
      if (res.ok) setForms((prev) => prev.filter((f) => f.id !== id))
    } catch (err) {
      console.error("Failed to delete form:", err)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700"
      case "draft":
        return "bg-gray-100 text-gray-600"
      case "closed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Forms</h1>
            <p className="text-[var(--foreground-subtle)]">
              Create and manage forms with our Tally-style builder.
            </p>
          </div>
          <Link
            href="/forms/create"
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all"
          >
            <Plus className="h-4 w-4" />
            Create Form
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {[
            { label: "Total Forms", value: forms.length, icon: FileText },
            { label: "Published", value: forms.filter((f) => f.status === "published").length, icon: Eye },
            { label: "Drafts", value: forms.filter((f) => f.status === "draft").length, icon: FileText },
            { label: "Total Responses", value: forms.reduce((acc, f) => acc + (f.responsesCount || 0), 0), icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="card-premium p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)]">
                  <stat.icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Forms Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          </div>
        ) : filteredForms.length === 0 ? (
          <div className="card-premium flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-light)]">
              <FileText className="h-8 w-8 text-[var(--primary)]" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">No forms yet</h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Create your first form to start collecting responses.
            </p>
            <Link
              href="/forms/create"
              className="mt-4 flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all"
            >
              <Plus className="h-4 w-4" />
              Create Form
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredForms.map((form) => (
              <div key={form.id} className="card-premium group">
                {/* Form Header */}
                <div className="border-b border-[var(--border)] p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                        {form.title}
                      </h3>
                      {form.description && (
                        <p className="mt-1 text-sm text-[var(--muted-foreground)] truncate">
                          {form.description}
                        </p>
                      )}
                    </div>
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", getStatusStyle(form.status))}>
                      {form.status}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 border-b border-[var(--border)] p-5">
                  <div>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{form.blocks?.length || 0}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Blocks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{form.responsesCount || 0}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Responses</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 p-4">
                  <Link
                    href={`/forms/create?id=${form.id}`}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--primary-light)] px-3 py-2.5 text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all"
                  >
                    Edit
                  </Link>
                  {form.status === "published" && (
                    <Link
                      href={`/f/${form.slug}`}
                      target="_blank"
                      className="flex items-center justify-center gap-1 rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-gray-50 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}
                  <Link
                    href={`/forms/responses?id=${form.id}`}
                    className="flex items-center justify-center gap-1 rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-gray-50 transition-all"
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => duplicateForm(form)}
                    className="flex items-center justify-center gap-1 rounded-xl border border-[var(--border)] bg-white px-3 py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-gray-50 transition-all"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => deleteForm(form.id)}
                    className="flex items-center justify-center gap-1 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
