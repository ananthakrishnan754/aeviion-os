"use client"

import { cn } from "@/lib/utils"
import { Star, Calendar, Clock, Upload } from "lucide-react"
import type { FormBlock, FormBlockOption } from "@/types"

interface BlockRendererProps {
  block: FormBlock
  value?: unknown
  onChange?: (value: unknown) => void
  preview?: boolean
  primaryColor?: string
}

export function BlockRenderer({ block, value, onChange, preview = false, primaryColor = "#D4764E" }: BlockRendererProps) {
  const handleChange = (v: unknown) => onChange?.(v)

  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl font-bold text-[#2D2D2D]">
          {block.label || "Heading"}
        </h2>
      )

    case "paragraph":
      return (
        <p className="text-[var(--foreground-subtle)]">
          {block.label || "Paragraph text"}
        </p>
      )

    case "divider":
      return <hr className="border-[var(--border)]" />

    case "statement":
      return (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4">
          <p className="text-sm text-[#2D2D2D]">{block.label || "Statement text"}</p>
        </div>
      )

    case "text":
    case "email":
    case "phone":
    case "url":
      return (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <input
            type={block.type === "email" ? "email" : block.type === "phone" ? "tel" : block.type === "url" ? "url" : "text"}
            placeholder={block.placeholder || ""}
            value={(value as string) || ""}
            onChange={(e) => handleChange(e.target.value)}
            readOnly={!preview && !onChange}
            className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[#2D2D2D] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none"
          />
        </div>
      )

    case "number":
      return (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <input
            type="number"
            placeholder={block.placeholder || ""}
            value={(value as string) || ""}
            onChange={(e) => handleChange(e.target.value)}
            readOnly={!preview && !onChange}
            min={block.validation?.min}
            max={block.validation?.max}
            className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[#2D2D2D] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none"
          />
        </div>
      )

    case "textarea":
      return (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <textarea
            placeholder={block.placeholder || ""}
            value={(value as string) || ""}
            onChange={(e) => handleChange(e.target.value)}
            readOnly={!preview && !onChange}
            rows={4}
            className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[#2D2D2D] placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none resize-none"
          />
        </div>
      )

    case "select":
      return (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <select
            value={(value as string) || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none"
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
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <div className="space-y-2">
            {block.options?.map((opt: FormBlockOption) => {
              const selected = ((value as string[]) || []).includes(opt.value)
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
                      "flex h-5 w-5 items-center justify-center rounded border-2 transition-all shrink-0",
                      selected ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
                    )}
                  >
                    {selected && <span className="text-xs text-white">✓</span>}
                  </div>
                  <span className="text-sm text-[#2D2D2D]">{opt.label}</span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    onChange={() => {
                      const current = (value as string[]) || []
                      const next = selected
                        ? current.filter((v) => v !== opt.value)
                        : [...current, opt.value]
                      handleChange(next)
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
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <div className="space-y-2">
            {block.options?.map((opt: FormBlockOption) => {
              const selected = value === opt.value
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
                      "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all shrink-0",
                      selected ? "border-[var(--primary)]" : "border-[var(--border)]"
                    )}
                  >
                    {selected && <div className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />}
                  </div>
                  <span className="text-sm text-[#2D2D2D]">{opt.label}</span>
                  <input
                    type="radio"
                    className="sr-only"
                    name={block.id}
                    checked={selected}
                    onChange={() => handleChange(opt.value)}
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
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              type="date"
              value={(value as string) || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-white py-3 pl-10 pr-4 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none"
            />
          </div>
        </div>
      )

    case "time":
      return (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <div className="relative">
            <Clock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <input
              type="time"
              value={(value as string) || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-white py-3 pl-10 pr-4 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all outline-none"
            />
          </div>
        </div>
      )

    case "file":
      return (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-[var(--border)] bg-white px-4 py-6 text-center hover:border-[var(--primary)]/30 transition-all cursor-pointer">
            <Upload className="h-5 w-5 text-[var(--muted-foreground)] mx-auto" />
            <div>
              <p className="text-sm font-medium text-[#2D2D2D]">Click to upload or drag and drop</p>
              <p className="text-xs text-[var(--muted-foreground)]">Any file format</p>
            </div>
          </div>
        </div>
      )

    case "rating":
      const rating = (value as number) || 0
      return (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[#2D2D2D]">
            {block.label} {block.required && <span className="text-red-500">*</span>}
          </label>
          {block.helpText && <p className="mb-1.5 text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleChange(star)}
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
