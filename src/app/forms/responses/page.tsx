"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Eye,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import type { MockForm, MockStudent } from "@/lib/db/mock-data"
import { formsDB, studentsDB } from "@/lib/db/mock-data"

interface FormResponse {
  id: string
  formId: string
  submittedBy: string
  submittedAt: string
  answers: Record<string, unknown>
  status: "complete" | "partial"
}

// Mock responses data
const generateMockResponses = (form: MockForm, students: MockStudent[]): FormResponse[] => {
  const responses: FormResponse[] = []
  const count = Math.min(form.responsesCount, 10)

  for (let i = 0; i < count; i++) {
    const student = students[i % students.length]
    const answers: Record<string, unknown> = {}

    form.blocks.forEach((block) => {
      if (block.type === "text" || block.type === "email" || block.type === "phone") {
        if (block.type === "email") answers[block.id] = student.email
        else if (block.type === "phone") answers[block.id] = "+91 98765 43210"
        else answers[block.id] = block.label === "Full Name" ? student.name : "Sample answer"
      } else if (block.type === "dropdown") {
        answers[block.id] = block.options?.[0] || "Option 1"
      } else if (block.type === "checkbox") {
        answers[block.id] = block.options?.slice(0, 2) || []
      } else if (block.type === "textarea") {
        answers[block.id] = "This is a sample response text that the student provided."
      } else if (block.type === "rating") {
        answers[block.id] = Math.floor(Math.random() * 2) + 4
      }
    })

    responses.push({
      id: `resp_${form.id}_${i + 1}`,
      formId: form.id,
      submittedBy: student.name,
      submittedAt: new Date(Date.now() - i * 86400000).toISOString(),
      answers,
      status: i < count - 2 ? "complete" : "partial",
    })
  }

  return responses
}

export default function FormResponsesPage() {
  const [forms, setForms] = useState<MockForm[]>([])
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null)
  const [responses, setResponses] = useState<FormResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedResponse, setExpandedResponse] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const formsData = await formsDB.getAll()
    const studentsData = await studentsDB.getAll()
    setForms(formsData)

    if (formsData.length > 0 && !selectedFormId) {
      setSelectedFormId(formsData[0].id)
      const form = formsData[0]
      const mockResponses = generateMockResponses(form, studentsData)
      setResponses(mockResponses)
    }
    setLoading(false)
  }

  const handleFormSelect = async (formId: string) => {
    setSelectedFormId(formId)
    const studentsData = await studentsDB.getAll()
    const form = forms.find((f) => f.id === formId)
    if (form) {
      const mockResponses = generateMockResponses(form, studentsData)
      setResponses(mockResponses)
    }
  }

  const selectedForm = forms.find((f) => f.id === selectedFormId)

  const filteredResponses = responses.filter((r) =>
    r.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: responses.length,
    complete: responses.filter((r) => r.status === "complete").length,
    partial: responses.filter((r) => r.status === "partial").length,
    avgTime: "2m 34s",
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Link
              href="/forms"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Form Responses</h1>
              <p className="mt-1 text-sm text-gray-600">View and analyze responses from your forms</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* Form Selector */}
          <div className="mb-6 rounded-xl border bg-white p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Form</label>
            <select
              value={selectedFormId || ""}
              onChange={(e) => handleFormSelect(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {forms.map((form) => (
                <option key={form.id} value={form.id}>
                  {form.title} ({form.responsesCount} responses)
                </option>
              ))}
            </select>
          </div>

          {selectedForm && (
            <>
              {/* Stats */}
              <div className="mb-6 grid grid-cols-4 gap-4">
                <div className="rounded-xl border bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                      <p className="text-xs text-gray-500">Total Responses</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.complete}</p>
                      <p className="text-xs text-gray-500">Complete</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                      <XCircle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.partial}</p>
                      <p className="text-xs text-gray-500">Partial</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                      <Clock className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stats.avgTime}</p>
                      <p className="text-xs text-gray-500">Avg. Completion</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search responses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Responses Table */}
              <div className="rounded-xl border bg-white overflow-hidden">
                <table className="w-full">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Respondent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Answers
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredResponses.map((response) => (
                      <>
                        <tr key={response.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                                {response.submittedBy.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {response.submittedBy}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={cn(
                                "rounded-full px-2 py-1 text-xs font-medium",
                                response.status === "complete"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              )}
                            >
                              {response.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(response.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {Object.keys(response.answers).length} answers
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() =>
                                setExpandedResponse(
                                  expandedResponse === response.id ? null : response.id
                                )
                              }
                              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                              {expandedResponse === response.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                        {expandedResponse === response.id && (
                          <tr key={`${response.id}-expanded`}>
                            <td colSpan={5} className="px-6 py-4 bg-gray-50">
                              <div className="space-y-3">
                                {selectedForm.blocks.map((block) => {
                                  const answer = response.answers[block.id]
                                  if (answer === undefined || answer === null || answer === "") return null
                                  return (
                                    <div key={block.id} className="flex gap-4">
                                      <span className="w-48 text-sm font-medium text-gray-700">
                                        {block.label}
                                      </span>
                                      <span className="flex-1 text-sm text-gray-900">
                                        {Array.isArray(answer) ? answer.join(", ") : String(answer)}
                                      </span>
                                    </div>
                                  )
                                })}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>

                {filteredResponses.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-gray-500">No responses found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
