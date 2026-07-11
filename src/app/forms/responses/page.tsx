"use client"

import React, { useState, useEffect } from "react"
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

  const statCards = [
    { label: "Total Responses", value: stats.total, icon: BarChart3, gradient: "from-[#D4764E] to-[#E8956A]" },
    { label: "Complete", value: stats.complete, icon: CheckCircle2, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
    { label: "Partial", value: stats.partial, icon: XCircle, gradient: "from-[#B8860B] to-[#DAA520]" },
    { label: "Avg. Completion", value: stats.avgTime, icon: Clock, gradient: "from-[#8B6F47] to-[#A0845C]" },
  ]

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/forms"
            className="rounded-xl p-2.5 text-[#6B6B6B] transition-all hover:bg-[#F0EBE3] hover:text-[#D4764E]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#2D2D2D]">Form Responses</h1>
            <p className="mt-1 text-sm text-[#6B6B6B]">View and analyze responses from your forms</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg hover:shadow-[#D4764E]/30">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* Form Selector */}
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-5">
          <label className="mb-2 block text-sm font-semibold text-[#2D2D2D]">Select Form</label>
          <select
            value={selectedFormId || ""}
            onChange={(e) => handleFormSelect(e.target.value)}
            className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D2D2D] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]"
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
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {statCards.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-5 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-xl bg-gradient-to-br p-2.5 text-white shadow-md", stat.gradient)}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#2D2D2D]">{stat.value}</p>
                      <p className="text-xs font-medium text-[#6B6B6B]">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
                <input
                  type="text"
                  placeholder="Search responses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]"
                />
              </div>
            </div>

            {/* Responses Table */}
            <div className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white">
              <table className="w-full">
                <thead className="border-b border-[#E8E0D4] bg-[#FAF8F5]">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Respondent
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Submitted
                    </th>
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Answers
                    </th>
                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E0D4]">
                  {filteredResponses.map((response) => (
                    <React.Fragment key={response.id}>
                      <tr className="transition-colors hover:bg-[#FAF8F5]/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">
                              {response.submittedBy.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-[#2D2D2D]">
                              {response.submittedBy}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-0.5 text-xs font-medium",
                              response.status === "complete"
                                ? "bg-[#6B8E6B]/15 text-[#5A7A5A]"
                                : "bg-[#B8860B]/15 text-[#B8860B]"
                            )}
                          >
                            {response.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B6B6B]">
                          {new Date(response.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B6B6B]">
                          {Object.keys(response.answers).length} answers
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() =>
                              setExpandedResponse(
                                expandedResponse === response.id ? null : response.id
                              )
                            }
                            className="rounded-lg p-2 text-[#999] transition-colors hover:bg-[#F0EBE3] hover:text-[#D4764E]"
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
                          <td colSpan={5} className="bg-[#FAF8F5] px-6 py-5">
                            <div className="space-y-3">
                              {selectedForm.blocks.map((block) => {
                                const answer = response.answers[block.id]
                                if (answer === undefined || answer === null || answer === "") return null
                                return (
                                  <div key={block.id} className="flex gap-4">
                                    <span className="w-48 text-sm font-semibold text-[#2D2D2D]">
                                      {block.label}
                                    </span>
                                    <span className="flex-1 text-sm text-[#6B6B6B]">
                                      {Array.isArray(answer) ? answer.join(", ") : String(answer)}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {filteredResponses.length === 0 && (
                <div className="py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EBE3]">
                    <BarChart3 className="h-8 w-8 text-[#999]" />
                  </div>
                  <p className="mt-5 font-medium text-[#2D2D2D]">No responses found</p>
                  <p className="mt-1 text-sm text-[#6B6B6B]">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
