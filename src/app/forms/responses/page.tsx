"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Download,
  Search,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Clock,
  Users,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import type { Form, FormBlock } from "@/types"

interface FormResponse {
  id: string
  form_id: string
  respondent_email: string | null
  respondent_name: string | null
  answers: Record<string, unknown>
  metadata: Record<string, unknown> | null
  status: string
  submitted_at: string
}

export default function FormResponsesPage() {
  const [forms, setForms] = useState<Form[]>([])
  const [selectedFormId, setSelectedFormId] = useState<string>("")
  const [responses, setResponses] = useState<FormResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [responsesLoading, setResponsesLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchForms()
  }, [])

  useEffect(() => {
    if (selectedFormId) fetchResponses(selectedFormId)
  }, [selectedFormId])

  const fetchForms = async () => {
    try {
      const res = await fetch("/api/forms")
      if (res.ok) {
        const data = await res.json()
        setForms(data)
        if (data.length > 0) setSelectedFormId(data[0].id)
      }
    } catch (err) {
      console.error("Failed to fetch forms:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchResponses = async (formId: string) => {
    setResponsesLoading(true)
    try {
      const res = await fetch(`/api/forms/${formId}/responses`)
      if (res.ok) {
        const data = await res.json()
        setResponses(data.responses || [])
      }
    } catch (err) {
      console.error("Failed to fetch responses:", err)
    } finally {
      setResponsesLoading(false)
    }
  }

  const selectedForm = forms.find((f) => f.id === selectedFormId)
  const blocks: FormBlock[] = (selectedForm?.blocks as unknown as FormBlock[]) || []

  const filteredResponses = responses.filter((r) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      r.respondent_email?.toLowerCase().includes(q) ||
      r.respondent_name?.toLowerCase().includes(q) ||
      JSON.stringify(r.answers).toLowerCase().includes(q)
    )
  })

  const exportCSV = () => {
    if (!selectedForm || responses.length === 0) return

    const headers = ["Submitted At", "Email", "Name"]
    const blockIds = blocks.filter((b) => !["heading", "paragraph", "divider", "page-break", "statement"].includes(b.type))
    blockIds.forEach((b) => headers.push(b.label))

    const rows = responses.map((r) => {
      const row = [
        new Date(r.submitted_at).toLocaleString(),
        r.respondent_email || "",
        r.respondent_name || "",
      ]
      blockIds.forEach((b) => {
        const val = r.answers[b.id]
        if (Array.isArray(val)) row.push(val.join(", "))
        else row.push(String(val || ""))
      })
      return row
    })

    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedForm.title.replace(/[^a-z0-9]/gi, "_")}_responses.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportJSON = () => {
    if (!selectedForm || responses.length === 0) return
    const blob = new Blob([JSON.stringify(responses, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${selectedForm.title.replace(/[^a-z0-9]/gi, "_")}_responses.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getBlockLabel = (blockId: string): string => {
    const block = blocks.find((b) => b.id === blockId)
    return block?.label || blockId
  }

  const renderAnswer = (value: unknown): string => {
    if (Array.isArray(value)) return value.join(", ")
    if (typeof value === "object" && value !== null) return JSON.stringify(value)
    return String(value || "—")
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/forms" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-[var(--muted-foreground)] hover:bg-gray-100 transition-all">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Form Responses</h1>
              <p className="text-[var(--foreground-subtle)]">View and export submissions</p>
            </div>
          </div>
          {responses.length > 0 && (
            <div className="flex items-center gap-2">
              <button onClick={exportCSV} className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-gray-50 transition-all">
                <Download className="h-4 w-4" />
                Export CSV
              </button>
              <button onClick={exportJSON} className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:bg-gray-50 transition-all">
                <Download className="h-4 w-4" />
                Export JSON
              </button>
            </div>
          )}
        </div>

        {/* Form Selector */}
        <div className="card-premium p-5">
          <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">Select Form</label>
          <select
            value={selectedFormId}
            onChange={(e) => setSelectedFormId(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none"
          >
            {forms.map((f) => (
              <option key={f.id} value={f.id}>{f.title} ({f.responsesCount || 0} responses)</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        {selectedForm && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="card-premium p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)]">
                  <Users className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{selectedForm.responsesCount || 0}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Total Responses</p>
                </div>
              </div>
            </div>
            <div className="card-premium p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{selectedForm.viewsCount || 0}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Total Views</p>
                </div>
              </div>
            </div>
            <div className="card-premium p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--foreground)]">{selectedForm.completionRate || 0}%</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Completion Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-white py-2.5 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none"
          />
        </div>

        {/* Responses List */}
        {responsesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          </div>
        ) : filteredResponses.length === 0 ? (
          <div className="card-premium flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-light)]">
              <BarChart3 className="h-8 w-8 text-[var(--primary)]" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">No responses yet</h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Responses will appear here once people start filling out your form.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResponses.map((response) => {
              const isExpanded = expandedId === response.id
              return (
                <div key={response.id} className="card-premium overflow-hidden">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : response.id)}
                    className="flex w-full items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-light)] text-sm font-semibold text-[var(--primary)]">
                        {(response.respondent_name || response.respondent_email || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">
                          {response.respondent_name || response.respondent_email || "Anonymous"}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {new Date(response.submitted_at).toLocaleString()}
                          {response.respondent_email && ` • ${response.respondent_email}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", response.status === "submitted" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>
                        {response.status}
                      </span>
                      {isExpanded ? <ChevronDown className="h-4 w-4 text-[var(--muted-foreground)]" /> : <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-[var(--border)] bg-gray-50/50 p-5">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {Object.entries(response.answers).map(([blockId, value]) => (
                          <div key={blockId} className="rounded-lg border border-[var(--border)] bg-white p-3">
                            <p className="text-xs font-semibold text-[var(--muted-foreground)]">{getBlockLabel(blockId)}</p>
                            <p className="mt-1 text-sm text-[var(--foreground)]">{renderAnswer(value)}</p>
                          </div>
                        ))}
                        {Object.keys(response.answers).length === 0 && (
                          <p className="text-sm text-[var(--muted-foreground)]">No answers recorded</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
