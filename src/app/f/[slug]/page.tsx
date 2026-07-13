"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Upload,
  Star,
  Calendar,
  Clock,
} from "lucide-react"
import type { Form, FormBlock, FormBlockOption } from "@/types"

export default function PublicFormPage() {
  const params = useParams()
  const slug = params.slug as string

  const [form, setForm] = useState<Form | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [currentPage, setCurrentPage] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    fetchForm()
  }, [slug])

  const fetchForm = async () => {
    try {
      const res = await fetch(`/api/forms/slug/${slug}`)
      if (!res.ok) {
        const err = await res.json()
        setError(err.error || "Form not found")
        return
      }
      const data = await res.json()
      setForm(data)
    } catch {
      setError("Failed to load form")
    } finally {
      setLoading(false)
    }
  }

  const updateAnswer = (blockId: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [blockId]: value }))
  }

  // Split blocks into pages (by page-break blocks)
  const getPages = useCallback((): FormBlock[][] => {
    if (!form?.blocks) return [[]]
    const pages: FormBlock[][] = [[]]
    for (const block of form.blocks) {
      if (block.type === "page-break") {
        pages.push([])
      } else {
        pages[pages.length - 1].push(block)
      }
    }
    return pages
  }, [form?.blocks])

  const pages = getPages()
  const totalPages = pages.length
  const isMultiStep = totalPages > 1

  const isBlockVisible = (block: FormBlock): boolean => {
    if (!block.conditionalRules?.length) return true
    for (const rule of block.conditionalRules) {
      const answerValue = String(answers[rule.blockId] || "")
      switch (rule.condition) {
        case "equals":
          if (rule.action === "show" && answerValue !== rule.value) return false
          if (rule.action === "hide" && answerValue === rule.value) return false
          break
        case "not_equals":
          if (rule.action === "show" && answerValue === rule.value) return false
          if (rule.action === "hide" && answerValue !== rule.value) return false
          break
        case "contains":
          if (rule.action === "show" && !answerValue.includes(rule.value || "")) return false
          if (rule.action === "hide" && answerValue.includes(rule.value || "")) return false
          break
        case "not_empty":
          if (rule.action === "show" && !answerValue) return false
          if (rule.action === "hide" && answerValue) return false
          break
      }
    }
    return true
  }

  const validateCurrentPage = (): boolean => {
    const currentPageBlocks = pages[currentPage] || []
    for (const block of currentPageBlocks) {
      if (!isBlockVisible(block)) continue
      if (block.type === "heading" || block.type === "paragraph" || block.type === "divider" || block.type === "statement") continue
      if (!block.required) continue
      const value = answers[block.id]
      if (!value || (typeof value === "string" && !value.trim())) {
        setSubmitError(`Please fill in "${block.label}"`)
        return false
      }
    }
    setSubmitError("")
    return true
  }

  const handleNext = () => {
    if (!validateCurrentPage()) return
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1)
      setSubmitError("")
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1)
      setSubmitError("")
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentPage()) return
    setSubmitting(true)
    setSubmitError("")

    try {
      const res = await fetch(`/api/forms/slug/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      })

      if (!res.ok) {
        const err = await res.json()
        setSubmitError(err.error || "Failed to submit")
        return
      }

      setSubmitted(true)
    } catch {
      setSubmitError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const renderBlock = (block: FormBlock) => {
    if (!isBlockVisible(block)) return null

    const theme = form?.settings?.theme
    const primaryColor = theme?.primaryColor || "#D4764E"

    switch (block.type) {
      case "heading":
        return (
          <h2 className="text-2xl font-bold" style={{ color: theme?.textColor || "#2D2D2D" }}>
            {block.label}
          </h2>
        )

      case "paragraph":
        return (
          <p className="text-[var(--foreground-subtle)]" style={{ color: theme?.textColor ? `${theme.textColor}99` : undefined }}>
            {block.label}
          </p>
        )

      case "divider":
        return <hr className="border-[var(--border)]" />

      case "statement":
        return (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4">
            <p className="text-sm" style={{ color: theme?.textColor || "#2D2D2D" }}>{block.label}</p>
          </div>
        )

      case "text":
      case "email":
      case "phone":
      case "url":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <input
              type={block.type === "email" ? "email" : block.type === "phone" ? "tel" : block.type === "url" ? "url" : "text"}
              placeholder={block.placeholder}
              value={(answers[block.id] as string) || ""}
              onChange={(e) => updateAnswer(block.id, e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
              style={{ borderColor: theme?.primaryColor ? `${primaryColor}33` : undefined }}
            />
          </div>
        )

      case "number":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <input
              type="number"
              placeholder={block.placeholder}
              value={(answers[block.id] as string) || ""}
              onChange={(e) => updateAnswer(block.id, e.target.value)}
              min={block.validation?.min}
              max={block.validation?.max}
              className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
            />
          </div>
        )

      case "textarea":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <textarea
              placeholder={block.placeholder}
              value={(answers[block.id] as string) || ""}
              onChange={(e) => updateAnswer(block.id, e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all resize-none"
            />
          </div>
        )

      case "select":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <select
              value={(answers[block.id] as string) || ""}
              onChange={(e) => updateAnswer(block.id, e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
            >
              <option value="">Select an option...</option>
              {block.options?.map((opt: FormBlockOption) => (
                <option key={opt.id} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )

      case "multi-select":
      case "checkbox":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <div className="space-y-2">
              {block.options?.map((opt: FormBlockOption) => {
                const selected = ((answers[block.id] as string[]) || []).includes(opt.value)
                return (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all",
                      selected
                        ? "border-[var(--primary)] bg-[var(--primary-light)]"
                        : "border-[var(--border)] bg-white hover:border-[var(--primary)]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded border-2 transition-all",
                        selected ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
                      )}
                    >
                      {selected && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className="text-sm">{opt.label}</span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selected}
                      onChange={() => {
                        const current = (answers[block.id] as string[]) || []
                        const next = selected
                          ? current.filter((v) => v !== opt.value)
                          : [...current, opt.value]
                        updateAnswer(block.id, next)
                      }}
                    />
                  </label>
                )
              })}
            </div>
          </div>
        )

      case "radio":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <div className="space-y-2">
              {block.options?.map((opt: FormBlockOption) => {
                const selected = answers[block.id] === opt.value
                return (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all",
                      selected
                        ? "border-[var(--primary)] bg-[var(--primary-light)]"
                        : "border-[var(--border)] bg-white hover:border-[var(--primary)]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
                        selected ? "border-[var(--primary)]" : "border-[var(--border)]"
                      )}
                    >
                      {selected && <div className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />}
                    </div>
                    <span className="text-sm">{opt.label}</span>
                    <input
                      type="radio"
                      className="sr-only"
                      name={block.id}
                      checked={selected}
                      onChange={() => updateAnswer(block.id, opt.value)}
                    />
                  </label>
                )
              })}
            </div>
          </div>
        )

      case "date":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                type="date"
                value={(answers[block.id] as string) || ""}
                onChange={(e) => updateAnswer(block.id, e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white py-3 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
              />
            </div>
          </div>
        )

      case "time":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <input
                type="time"
                value={(answers[block.id] as string) || ""}
                onChange={(e) => updateAnswer(block.id, e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-white py-3 pl-10 pr-4 text-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
              />
            </div>
          </div>
        )

      case "file":
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-[var(--border)] bg-white px-4 py-6 text-center hover:border-[var(--primary)]/30 transition-all">
              <Upload className="h-5 w-5 text-[var(--muted-foreground)]" />
              <div>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-[var(--muted-foreground)]">Any file format</p>
              </div>
            </div>
          </div>
        )

      case "rating":
        const rating = (answers[block.id] as number) || 0
        return (
          <div>
            <label className="mb-1.5 block text-sm font-medium" style={{ color: theme?.textColor || "#2D2D2D" }}>
              {block.label} {block.required && <span className="text-red-500">*</span>}
            </label>
            {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => updateAnswer(block.id, star)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#FAF8F5" }}>
        <Loader2 className="h-8 w-8 animate-spin text-[#D4764E]" />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-900">Form Not Found</h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  // Success state
  if (submitted) {
    const message = form?.settings?.successMessage || "Thank you for your submission!"
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#FAF8F5" }}>
        <div className="mx-auto max-w-md text-center animate-fade-in">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Submitted!</h2>
          <p className="mt-3 text-gray-600">{message}</p>
        </div>
      </div>
    )
  }

  if (!form) return null

  const theme = form.settings?.theme
  const bgColor = theme?.backgroundColor || "#FAF8F5"
  const primaryColor = theme?.primaryColor || "#D4764E"
  const currentBlocks = (pages[currentPage] || []).filter(isBlockVisible)

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Form Header */}
        <div className="mb-8 animate-fade-in">
          <h1
            className="text-3xl font-bold"
            style={{ color: theme?.textColor || "#2D2D2D", fontFamily: theme?.fontFamily || "Inter" }}
          >
            {form.title}
          </h1>
          {form.description && (
            <p className="mt-2 text-[var(--foreground-subtle)]">{form.description}</p>
          )}

          {/* Progress bar for multi-step */}
          {isMultiStep && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-2">
                <span>Step {currentPage + 1} of {totalPages}</span>
                <span>{Math.round(((currentPage + 1) / totalPages) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentPage + 1) / totalPages) * 100}%`,
                    backgroundColor: primaryColor,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Form Blocks */}
        <div className="space-y-6 animate-fade-in">
          {currentBlocks.map((block) => (
            <div
              key={block.id}
              className={cn(
                "transition-all duration-200",
                block.width === "half" ? "w-full md:w-[calc(50%-0.75rem)] inline-block" :
                block.width === "third" ? "w-full md:w-[calc(33.33%-1rem)] inline-block" : "w-full"
              )}
            >
              {renderBlock(block)}
            </div>
          ))}
        </div>

        {/* Error */}
        {submitError && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          {isMultiStep && currentPage > 0 ? (
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {isMultiStep && currentPage < totalPages - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: primaryColor }}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                form.settings?.submitButtonText || "Submit"
              )}
            </button>
          )}
        </div>

        {/* Brand Badge */}
        {!theme?.hideBrandBadge && (
          <div className="mt-12 text-center">
            <p className="text-xs text-[var(--muted-foreground)]">
              Built with <span className="font-semibold" style={{ color: primaryColor }}>Aeviion</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
