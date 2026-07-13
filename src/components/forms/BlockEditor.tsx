"use client"

import { useState } from "react"
import { Trash2, Plus, X, GripVertical } from "lucide-react"
import type { FormBlock, FormBlockOption } from "@/types"

interface BlockEditorProps {
  block: FormBlock
  onUpdate: (updates: Partial<FormBlock>) => void
  onDelete: () => void
}

export function BlockEditor({ block, onUpdate, onDelete }: BlockEditorProps) {
  const hasOptions = ["select", "multi-select", "checkbox", "radio"].includes(block.type)
  const hasLabel = !["heading", "paragraph", "divider", "page-break"].includes(block.type)
  const hasPlaceholder = ["text", "email", "phone", "number", "textarea", "url"].includes(block.type)
  const hasValidation = ["text", "email", "phone", "number", "textarea"].includes(block.type)

  const addOption = () => {
    const newOpt: FormBlockOption = {
      id: `opt_${Date.now()}`,
      label: `Option ${(block.options?.length || 0) + 1}`,
      value: `option_${(block.options?.length || 0) + 1}`,
    }
    onUpdate({ options: [...(block.options || []), newOpt] })
  }

  const updateOption = (index: number, updates: Partial<FormBlockOption>) => {
    const newOptions = [...(block.options || [])]
    newOptions[index] = { ...newOptions[index], ...updates }
    onUpdate({ options: newOptions })
  }

  const removeOption = (index: number) => {
    onUpdate({ options: block.options?.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-5">
      {/* Label */}
      {hasLabel && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">Label</label>
          <input
            type="text"
            value={block.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
          />
        </div>
      )}

      {/* Placeholder */}
      {hasPlaceholder && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">Placeholder</label>
          <input
            type="text"
            value={block.placeholder || ""}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
          />
        </div>
      )}

      {/* Help Text */}
      {hasLabel && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">Help Text</label>
          <input
            type="text"
            value={block.helpText || ""}
            onChange={(e) => onUpdate({ helpText: e.target.value })}
            placeholder="Optional helper text"
            className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
          />
        </div>
      )}

      {/* Required toggle */}
      {hasLabel && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[var(--muted-foreground)]">Required</label>
          <button
            type="button"
            onClick={() => onUpdate({ required: !block.required })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              block.required ? "bg-[var(--primary)]" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                block.required ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      )}

      {/* Width */}
      {block.type !== "page-break" && (
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">Width</label>
          <div className="flex gap-1">
            {(["full", "half", "third"] as const).map((w) => (
              <button
                key={w}
                onClick={() => onUpdate({ width: w })}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  block.width === w
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] bg-white text-[#2D2D2D] hover:bg-gray-50"
                }`}
              >
                {w === "full" ? "Full" : w === "half" ? "Half" : "Third"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Options editor */}
      {hasOptions && (
        <div>
          <label className="mb-2 block text-xs font-semibold text-[var(--muted-foreground)]">Options</label>
          <div className="space-y-1.5">
            {block.options?.map((opt: FormBlockOption, i: number) => (
              <div key={opt.id} className="flex items-center gap-1.5">
                <GripVertical className="h-3 w-3 text-[var(--muted-foreground)] cursor-grab" />
                <input
                  type="text"
                  value={opt.label}
                  onChange={(e) => updateOption(i, { label: e.target.value, value: e.target.value.toLowerCase().replace(/\s+/g, "_") })}
                  className="flex-1 rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
                />
                <button
                  onClick={() => removeOption(i)}
                  className="rounded p-1 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addOption}
            className="mt-2 flex items-center gap-1 rounded-lg border border-dashed border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all"
          >
            <Plus className="h-3 w-3" />
            Add Option
          </button>
        </div>
      )}

      {/* Validation */}
      {hasValidation && (
        <div>
          <label className="mb-2 block text-xs font-semibold text-[var(--muted-foreground)]">Validation</label>
          <div className="space-y-2">
            {block.type === "text" || block.type === "textarea" ? (
              <>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="mb-0.5 block text-[10px] text-[var(--muted-foreground)]">Min Length</label>
                    <input
                      type="number"
                      value={block.validation?.minLength || ""}
                      onChange={(e) => onUpdate({ validation: { ...block.validation, minLength: parseInt(e.target.value) || undefined } })}
                      className="w-full rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-0.5 block text-[10px] text-[var(--muted-foreground)]">Max Length</label>
                    <input
                      type="number"
                      value={block.validation?.maxLength || ""}
                      onChange={(e) => onUpdate({ validation: { ...block.validation, maxLength: parseInt(e.target.value) || undefined } })}
                      className="w-full rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-0.5 block text-[10px] text-[var(--muted-foreground)]">Pattern (Regex)</label>
                  <input
                    type="text"
                    value={block.validation?.pattern || ""}
                    onChange={(e) => onUpdate({ validation: { ...block.validation, pattern: e.target.value || undefined } })}
                    placeholder="e.g. ^[a-zA-Z]+$"
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
                  />
                </div>
              </>
            ) : block.type === "number" ? (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="mb-0.5 block text-[10px] text-[var(--muted-foreground)]">Min</label>
                  <input
                    type="number"
                    value={block.validation?.min || ""}
                    onChange={(e) => onUpdate({ validation: { ...block.validation, min: parseInt(e.target.value) || undefined } })}
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-0.5 block text-[10px] text-[var(--muted-foreground)]">Max</label>
                  <input
                    type="number"
                    value={block.validation?.max || ""}
                    onChange={(e) => onUpdate({ validation: { ...block.validation, max: parseInt(e.target.value) || undefined } })}
                    className="w-full rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
                  />
                </div>
              </div>
            ) : null}
            <div>
              <label className="mb-0.5 block text-[10px] text-[var(--muted-foreground)]">Custom Error Message</label>
              <input
                type="text"
                value={block.validation?.customMessage || ""}
                onChange={(e) => onUpdate({ validation: { ...block.validation, customMessage: e.target.value || undefined } })}
                placeholder="e.g. Please enter a valid value"
                className="w-full rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-xs text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete */}
      <button
        onClick={onDelete}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition-all"
      >
        <Trash2 className="h-3 w-3" />
        Delete Block
      </button>
    </div>
  )
}
