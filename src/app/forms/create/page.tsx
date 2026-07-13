"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Eye,
  Save,
  Loader2,
  ChevronUp,
  ChevronDown,
  Copy,
  Trash2,
  Plus,
  ExternalLink,
  Check,
  Palette,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import { BlockPalette } from "@/components/forms/BlockPalette"
import { BlockEditor } from "@/components/forms/BlockEditor"
import { BlockRenderer } from "@/components/forms/BlockRenderer"
import { FormSettingsPanel } from "@/components/forms/FormSettingsPanel"
import type { Form, FormBlock, FormBlockType, FormSettings, FormBlockOption } from "@/types"

function createDefaultBlock(type: FormBlockType): FormBlock {
  const ts = Date.now()
  const base: FormBlock = {
    id: `block_${ts}_${Math.random().toString(36).slice(2, 7)}`,
    type,
    label: "",
    required: false,
    width: "full",
  }
  const mkOpts = (n: number): FormBlockOption[] =>
    Array.from({ length: n }, (_, i) => ({
      id: `opt_${ts}_${i + 1}`,
      label: `Option ${i + 1}`,
      value: `option_${i + 1}`,
    }))

  switch (type) {
    case "heading": return { ...base, label: "Heading" }
    case "paragraph": return { ...base, label: "Enter your text here..." }
    case "statement": return { ...base, label: "Statement text. Use this to provide context or instructions." }
    case "divider": return { ...base, label: "" }
    case "page-break": return { ...base, label: "" }
    case "text": return { ...base, label: "Short Text", placeholder: "Enter text..." }
    case "email": return { ...base, label: "Email", placeholder: "you@example.com" }
    case "phone": return { ...base, label: "Phone Number", placeholder: "+1 (555) 000-0000" }
    case "number": return { ...base, label: "Number", placeholder: "0" }
    case "textarea": return { ...base, label: "Long Text", placeholder: "Enter your answer..." }
    case "url": return { ...base, label: "URL", placeholder: "https://" }
    case "select": return { ...base, label: "Dropdown", options: mkOpts(3) }
    case "multi-select": return { ...base, label: "Multi-Select", options: mkOpts(3) }
    case "checkbox": return { ...base, label: "Checkbox", options: mkOpts(3) }
    case "radio": return { ...base, label: "Radio Group", options: mkOpts(3) }
    case "date": return { ...base, label: "Date" }
    case "time": return { ...base, label: "Time" }
    case "file": return { ...base, label: "File Upload" }
    case "rating": return { ...base, label: "Rating" }
    default: return base
  }
}

const defaultSettings: FormSettings = {
  submitButtonText: "Submit",
  successMessage: "Thank you for your submission!",
  requireEmail: false,
  allowMultipleSubmissions: true,
  theme: {
    primaryColor: "#D4764E",
    backgroundColor: "#FAF8F5",
    textColor: "#2D2D2D",
    fontFamily: "Inter",
    borderRadius: "12px",
    hideBrandBadge: false,
  },
}

function FormBuilderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("id")

  const [form, setForm] = useState<Form | null>(null)
  const [blocks, setBlocks] = useState<FormBlock[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [settings, setSettings] = useState<FormSettings>(defaultSettings)
  const [title, setTitle] = useState("Untitled Form")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<"draft" | "published" | "closed">("draft")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [loading, setLoading] = useState(!!editId)

  useEffect(() => {
    if (editId) loadForm(editId)
  }, [editId]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadForm = async (id: string) => {
    try {
      const res = await fetch(`/api/forms/${id}`)
      if (res.ok) {
        const data = await res.json()
        setForm(data)
        setBlocks(data.blocks || [])
        setTitle(data.title || "Untitled Form")
        setDescription(data.description || "")
        setStatus(data.status || "draft")
        if (data.settings) setSettings(data.settings)
      }
    } catch (err) {
      console.error("Failed to load form:", err)
    } finally {
      setLoading(false)
    }
  }

  const addBlock = useCallback((type: FormBlockType) => {
    const newBlock = createDefaultBlock(type)
    setBlocks((prev) => [...prev, newBlock])
    setSelectedBlockId(newBlock.id)
  }, [])

  const updateBlock = useCallback((id: string, updates: Partial<FormBlock>) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id))
    setSelectedBlockId((prev) => (prev === id ? null : prev))
  }, [])

  const duplicateBlock = useCallback((id: string) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const copy = { ...prev[idx], id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 7)}` }
      const next = [...prev]
      next.splice(idx + 1, 0, copy)
      return next
    })
  }, [])

  const moveBlock = useCallback((id: string, direction: "up" | "down") => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const newIdx = direction === "up" ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[newIdx]] = [next[newIdx], next[idx]]
      return next
    })
  }, [])

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId)

  const saveForm = async (publish = false) => {
    setSaving(true)
    try {
      const body = { title, description, blocks, settings, status: publish ? "published" : status }
      let res
      if (form?.id) {
        res = await fetch(`/api/forms/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      } else {
        res = await fetch("/api/forms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      }
      if (res.ok) {
        const data = await res.json()
        setForm(data)
        if (publish) setStatus("published")
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
        if (!form?.id) router.replace(`/forms/create?id=${data.id}`, { scroll: false })
      }
    } catch (err) {
      console.error("Failed to save:", err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
        </div>
      </AppLayout>
    )
  }

  const primaryColor = settings.theme?.primaryColor || "#D4764E"
  const bgColor = settings.theme?.backgroundColor || "#FAF8F5"
  const textColor = settings.theme?.textColor || "#2D2D2D"

  return (
    <AppLayout>
      <div className="-m-6 -mt-[73px] flex h-screen flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border)] bg-white px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Link href="/forms" className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-[var(--muted-foreground)] hover:bg-gray-100 transition-all">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Forms</span>
            </Link>
            <div className="h-5 w-px bg-[var(--border)]" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none bg-transparent text-lg font-semibold text-[#2D2D2D] outline-none placeholder:text-[var(--muted-foreground)]"
              placeholder="Untitled Form"
            />
            {status === "published" && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Published</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowSettings(!showSettings); setSelectedBlockId(null) }}
              className={cn("flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all", showSettings ? "bg-[var(--primary-light)] text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:bg-gray-100")}
            >
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Theme</span>
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={cn("flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all", showPreview ? "bg-[var(--primary-light)] text-[var(--primary)]" : "text-[var(--muted-foreground)] hover:bg-gray-100")}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button onClick={() => saveForm(false)} disabled={saving} className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[#2D2D2D] hover:bg-gray-50 transition-all disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4 text-green-600" /> : <Save className="h-4 w-4" />}
              <span className="hidden sm:inline">{saved ? "Saved!" : "Save"}</span>
            </button>
            <button onClick={() => saveForm(true)} disabled={saving} className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4" />}
              Publish
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Block Palette */}
          <div className="w-[240px] shrink-0 border-r border-[var(--border)] bg-[var(--background-subtle)] overflow-y-auto p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">Add Blocks</h3>
            <BlockPalette onAddBlock={addBlock} />
          </div>

          {/* Center - Form Canvas */}
          <div className="flex-1 overflow-y-auto" style={{ backgroundColor: bgColor }}>
            {showPreview ? (
              <div className="mx-auto max-w-2xl py-8 px-4">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold" style={{ color: textColor }}>{title || "Untitled Form"}</h1>
                  {description && <p className="mt-2 text-[var(--foreground-subtle)]">{description}</p>}
                </div>
                <div className="space-y-6">
                  {blocks.map((block) => (
                    <div key={block.id}>
                      <BlockRenderer block={block} preview primaryColor={primaryColor} />
                    </div>
                  ))}
                </div>
                {blocks.length === 0 && <p className="py-12 text-center text-[var(--muted-foreground)]">No blocks yet.</p>}
                {blocks.length > 0 && (
                  <div className="mt-8">
                    <button className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: primaryColor }}>
                      {settings.submitButtonText || "Submit"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mx-auto max-w-2xl py-8 px-4">
                <div className="mb-6 space-y-3">
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border-none bg-transparent text-3xl font-bold text-[#2D2D2D] outline-none placeholder:text-gray-300" placeholder="Form Title" />
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border-none bg-transparent text-sm text-[var(--muted-foreground)] outline-none placeholder:text-gray-300" placeholder="Form description (optional)" />
                </div>

                {blocks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] py-20 text-center">
                    <Plus className="h-10 w-10 text-[var(--muted-foreground)]" />
                    <p className="mt-3 text-sm font-medium text-[var(--muted-foreground)]">Click a block on the left to add it</p>
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">Start building your form</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {blocks.map((block, index) => (
                      <div
                        key={block.id}
                        onClick={() => { setSelectedBlockId(block.id); setShowSettings(false) }}
                        className={cn(
                          "group relative cursor-pointer rounded-xl border-2 bg-white p-5 transition-all hover:shadow-sm",
                          selectedBlockId === block.id ? "border-[var(--primary)] shadow-md ring-1 ring-[var(--primary)]/10" : "border-transparent hover:border-gray-200"
                        )}
                      >
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "up") }} disabled={index === 0} className="rounded p-0.5 text-[var(--muted-foreground)] hover:bg-gray-200 disabled:opacity-20"><ChevronUp className="h-3 w-3" /></button>
                          <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "down") }} disabled={index === blocks.length - 1} className="rounded p-0.5 text-[var(--muted-foreground)] hover:bg-gray-200 disabled:opacity-20"><ChevronDown className="h-3 w-3" /></button>
                        </div>
                        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id) }} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-gray-100"><Copy className="h-3.5 w-3.5" /></button>
                          <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id) }} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-red-50 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                        <BlockRenderer block={block} preview primaryColor={primaryColor} />
                        {block.required && (
                          <span className="absolute right-2 bottom-2 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600">Required</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {blocks.length > 0 && (
                  <div className="mt-6">
                    <button className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all opacity-60 cursor-default" style={{ backgroundColor: primaryColor }}>
                      {settings.submitButtonText || "Submit"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          {(selectedBlock || showSettings) && (
            <div className="w-[280px] shrink-0 border-l border-[var(--border)] bg-white overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <h3 className="text-sm font-semibold text-[#2D2D2D]">{showSettings ? "Form Settings" : "Block Settings"}</h3>
                <button onClick={() => { setShowSettings(false); setSelectedBlockId(null) }} className="rounded p-1 text-[var(--muted-foreground)] hover:bg-gray-100 text-lg leading-none">&times;</button>
              </div>
              <div className="p-4">
                {showSettings ? (
                  <FormSettingsPanel settings={settings} onUpdate={(u) => setSettings((prev) => ({ ...prev, ...u }))} />
                ) : selectedBlock ? (
                  <BlockEditor
                    block={selectedBlock}
                    onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
                    onDelete={() => deleteBlock(selectedBlock.id)}
                  />
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

export default function FormBuilderPage() {
  return (
    <Suspense fallback={
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
        </div>
      </AppLayout>
    }>
      <FormBuilderContent />
    </Suspense>
  )
}
