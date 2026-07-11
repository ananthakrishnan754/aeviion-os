"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Star,
  Upload,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react"
import type { FormBlock, FormSettings } from "@/lib/db/schema"
import { formsDB } from "@/lib/db/mock-data"

interface FormData {
  id: string
  title: string
  description: string
  blocks: FormBlock[]
  settings: FormSettings
}

export default function PublicFormPage() {
  const params = useParams()
  const slug = params.slug as string

  const [form, setForm] = useState<FormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showProgress, setShowProgress] = useState(true)

  useEffect(() => {
    loadForm()
  }, [slug])

  const loadForm = async () => {
    setLoading(true)
    const formData = await formsDB.getBySlug(slug)
    if (formData) {
      setForm({
        id: formData.id,
        title: formData.title,
        description: formData.description,
        blocks: formData.blocks,
        settings: formData.settings,
      })
    } else {
      setNotFound(true)
    }
    setLoading(false)
  }

  const updateAnswer = (blockId: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [blockId]: value }))
    // Clear error when user answers
    if (errors[blockId]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[blockId]
        return newErrors
      })
    }
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}
    const visibleBlocks = getVisibleBlocks()

    visibleBlocks.forEach((block) => {
      if (block.required) {
        const answer = answers[block.id]
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          newErrors[block.id] = "This field is required"
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getVisibleBlocks = () => {
    // For simplicity, return all blocks (could add conditional logic later)
    return form?.blocks || []
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCurrentStep()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (notFound || !form) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h1 className="mt-4 text-xl font-semibold text-gray-900">Form not found</h1>
          <p className="mt-2 text-gray-600">This form may have been removed or is no longer available.</p>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Thank you!</h1>
          <p className="mt-2 text-gray-600">
            {form.settings.successMessage || "Your submission has been recorded."}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setAnswers({})
              setCurrentStep(0)
            }}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    )
  }

  const visibleBlocks = getVisibleBlocks()
  const progress = ((currentStep + 1) / visibleBlocks.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-blue-600">Aeviion</span>
            <span>•</span>
            <span>Powered by Form Builder</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="border-b bg-white">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Question {currentStep + 1} of {visibleBlocks.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="mx-auto max-w-2xl px-4 py-12">
        <form onSubmit={handleSubmit}>
          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{form.title}</h1>
            {form.description && (
              <p className="mt-2 text-gray-600">{form.description}</p>
            )}
          </div>

          {/* Current Block */}
          <div className="space-y-6">
            {visibleBlocks.map((block, index) => (
              <div
                key={block.id}
                className={cn(
                  "transition-all duration-300",
                  index === currentStep ? "opacity-100" : "hidden"
                )}
              >
                {renderBlock(block, answers, updateAnswer, errors[block.id])}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                currentStep === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {currentStep < visibleBlocks.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (validateCurrentStep()) {
                    setCurrentStep((prev) => prev + 1)
                  }
                }}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  form.settings.submitButtonText || "Submit"
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="border-t bg-white mt-12">
        <div className="mx-auto max-w-2xl px-4 py-6 text-center text-sm text-gray-500">
          This form was created with Aeviion Form Builder
        </div>
      </div>
    </div>
  )
}

function renderBlock(
  block: FormBlock,
  answers: Record<string, unknown>,
  updateAnswer: (id: string, value: unknown) => void,
  error?: string
) {
  switch (block.type) {
    case "heading":
      return <h2 className="text-2xl font-bold text-gray-900">{block.label}</h2>
    case "paragraph":
      return <p className="text-gray-600">{block.label}</p>
    case "divider":
      return <hr className="border-gray-200" />
    case "text":
    case "email":
    case "phone":
    case "number":
    case "url":
    case "password":
      return (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {block.helpText && <p className="text-sm text-gray-500">{block.helpText}</p>}
          <input
            type={
              block.type === "number" ? "number" :
              block.type === "email" ? "email" :
              block.type === "url" ? "url" :
              block.type === "password" ? "password" : "text"
            }
            value={(answers[block.id] as string) || ""}
            onChange={(e) => updateAnswer(block.id, e.target.value)}
            placeholder={block.placeholder}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors",
              error ? "border-red-500" : "border-gray-300"
            )}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "textarea":
      return (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {block.helpText && <p className="text-sm text-gray-500">{block.helpText}</p>}
          <textarea
            value={(answers[block.id] as string) || ""}
            onChange={(e) => updateAnswer(block.id, e.target.value)}
            placeholder={block.placeholder}
            rows={4}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none",
              error ? "border-red-500" : "border-gray-300"
            )}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "dropdown":
      return (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {block.helpText && <p className="text-sm text-gray-500">{block.helpText}</p>}
          <select
            value={(answers[block.id] as string) || ""}
            onChange={(e) => updateAnswer(block.id, e.target.value)}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors",
              error ? "border-red-500" : "border-gray-300"
            )}
          >
            <option value="">Select an option</option>
            {block.options?.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "radio":
      return (
        <div className="space-y-3">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {block.helpText && <p className="text-sm text-gray-500">{block.helpText}</p>}
          <div className="space-y-3">
            {block.options?.map((opt, i) => (
              <label
                key={i}
                className={cn(
                  "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors",
                  answers[block.id] === opt
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <input
                  type="radio"
                  name={block.id}
                  value={opt}
                  checked={answers[block.id] === opt}
                  onChange={(e) => updateAnswer(block.id, e.target.value)}
                  className="h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "checkbox":
      return (
        <div className="space-y-3">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {block.helpText && <p className="text-sm text-gray-500">{block.helpText}</p>}
          <div className="space-y-3">
            {block.options?.map((opt, i) => {
              const selected = (answers[block.id] as string[]) || []
              const isChecked = selected.includes(opt)
              return (
                <label
                  key={i}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors",
                    isChecked
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      const current = (answers[block.id] as string[]) || []
                      if (e.target.checked) {
                        updateAnswer(block.id, [...current, opt])
                      } else {
                        updateAnswer(block.id, current.filter((v) => v !== opt))
                      }
                    }}
                    className="h-5 w-5 rounded text-blue-600"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              )
            })}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "date":
      return (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          <input
            type="date"
            value={(answers[block.id] as string) || ""}
            onChange={(e) => updateAnswer(block.id, e.target.value)}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors",
              error ? "border-red-500" : "border-gray-300"
            )}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "time":
      return (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          <input
            type="time"
            value={(answers[block.id] as string) || ""}
            onChange={(e) => updateAnswer(block.id, e.target.value)}
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors",
              error ? "border-red-500" : "border-gray-300"
            )}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "file":
      return (
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
            <Upload className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="mt-1 text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    case "rating":
      return (
        <div className="space-y-3">
          <label className="block text-lg font-medium text-gray-900">
            {block.label}
            {block.required && <span className="ml-1 text-red-500">*</span>}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => updateAnswer(block.id, star)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-10 w-10 transition-colors",
                    (answers[block.id] as number) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 hover:text-yellow-200"
                  )}
                />
              </button>
            ))}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )
    default:
      return (
        <div className="rounded-lg border border-gray-200 p-4 text-center text-gray-500">
          Unsupported field type: {block.type}
        </div>
      )
  }
}
