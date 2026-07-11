"use client"

import { useState, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Plus,
  GripVertical,
  Trash2,
  Copy,
  Eye,
  Save,
  Undo,
  Redo,
  Type,
  Mail,
  Phone,
  Calendar,
  Upload,
  Star,
  ChevronDown,
  CheckSquare,
  Square,
  Heading1,
  AlignLeft,
  Minus,
  Image,
  Video,
  FileText,
  Hash,
  Link,
  Lock,
  Clock,
  Code,
  List,
  ListOrdered,
  LayoutTemplate,
} from "lucide-react"
import { AppLayout } from "@/components/layout/AppLayout"
import type { FormBlock, FormSettings } from "@/lib/db/schema"
import { toast } from "react-hot-toast"

interface BlockDefinition {
  type: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  category: "layout" | "basic" | "choice" | "advanced" | "media"
  description: string
}

const blockDefinitions: BlockDefinition[] = [
  { type: "heading", label: "Heading", icon: Heading1, category: "layout", description: "Add a heading" },
  { type: "paragraph", label: "Paragraph", icon: AlignLeft, category: "layout", description: "Add a paragraph" },
  { type: "divider", label: "Divider", icon: Minus, category: "layout", description: "Add a divider" },
  { type: "image", label: "Image", icon: Image, category: "layout", description: "Add an image" },
  { type: "text", label: "Text Input", icon: Type, category: "basic", description: "Single line text" },
  { type: "email", label: "Email", icon: Mail, category: "basic", description: "Email address field" },
  { type: "phone", label: "Phone", icon: Phone, category: "basic", description: "Phone number field" },
  { type: "number", label: "Number", icon: Hash, category: "basic", description: "Number input" },
  { type: "textarea", label: "Text Area", icon: AlignLeft, category: "basic", description: "Multi-line text" },
  { type: "url", label: "URL", icon: Link, category: "basic", description: "Website URL" },
  { type: "password", label: "Password", icon: Lock, category: "basic", description: "Password field" },
  { type: "dropdown", label: "Dropdown", icon: ChevronDown, category: "choice", description: "Dropdown select" },
  { type: "radio", label: "Radio Group", icon: Square, category: "choice", description: "Single selection" },
  { type: "checkbox", label: "Checkbox Group", icon: CheckSquare, category: "choice", description: "Multiple selection" },
  { type: "date", label: "Date", icon: Calendar, category: "advanced", description: "Date picker" },
  { type: "time", label: "Time", icon: Clock, category: "advanced", description: "Time picker" },
  { type: "file", label: "File Upload", icon: Upload, category: "advanced", description: "File upload field" },
  { type: "rating", label: "Rating", icon: Star, category: "advanced", description: "Star rating" },
  { type: "video", label: "Video", icon: Video, category: "media", description: "Embed video" },
]

const generateId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

const createDefaultBlock = (type: string): FormBlock => {
  const base: FormBlock = { id: generateId(), type, label: "", required: false, width: "full" }
  switch (type) {
    case "heading": return { ...base, label: "Heading" }
    case "paragraph": return { ...base, label: "Enter your paragraph text here..." }
    case "text": return { ...base, label: "Text Field", placeholder: "Enter text..." }
    case "email": return { ...base, label: "Email Address", placeholder: "you@example.com" }
    case "phone": return { ...base, label: "Phone Number", placeholder: "+1 (555) 000-0000" }
    case "number": return { ...base, label: "Number", placeholder: "0" }
    case "textarea": return { ...base, label: "Message", placeholder: "Type your message..." }
    case "url": return { ...base, label: "Website URL", placeholder: "https://" }
    case "password": return { ...base, label: "Password", placeholder: "••••••••" }
    case "dropdown": return { ...base, label: "Select Option", options: ["Option 1", "Option 2", "Option 3"] }
    case "radio": return { ...base, label: "Choose One", options: ["Option 1", "Option 2", "Option 3"] }
    case "checkbox": return { ...base, label: "Select All That Apply", options: ["Option 1", "Option 2", "Option 3"] }
    case "date": return { ...base, label: "Select Date" }
    case "time": return { ...base, label: "Select Time" }
    case "file": return { ...base, label: "Upload File" }
    case "rating": return { ...base, label: "Rate Your Experience" }
    case "divider": return { ...base, label: "" }
    case "image": return { ...base, label: "Image Caption" }
    case "video": return { ...base, label: "Video Title" }
    default: return { ...base, label: "New Field" }
  }
}

interface FormBuilderState {
  formId: string | null
  title: string
  description: string
  slug: string
  blocks: FormBlock[]
  settings: FormSettings
  status: "draft" | "published" | "closed"
  isDirty: boolean
}

export default function FormBuilderPage() {
  const [form, setForm] = useState<FormBuilderState>({
    formId: null, title: "Workshop Registration Form", description: "Register for our upcoming workshop",
    slug: "workshop-registration", blocks: [],
    settings: { submitButtonText: "Submit", successMessage: "Thank you for your submission!", allowMultipleSubmissions: false, theme: "light" },
    status: "draft", isDirty: false,
  })
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [history, setHistory] = useState<FormBuilderState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showJsonPreview, setShowJsonPreview] = useState(false)

  const saveToHistory = useCallback(() => {
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), { ...form }])
    setHistoryIndex((prev) => prev + 1)
  }, [form, historyIndex])

  const undo = useCallback(() => {
    if (historyIndex > 0) { setHistoryIndex((prev) => prev - 1); setForm(history[historyIndex - 1]) }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) { setHistoryIndex((prev) => prev + 1); setForm(history[historyIndex + 1]) }
  }, [history, historyIndex])

  const addBlock = useCallback((type: string) => {
    const newBlock = createDefaultBlock(type)
    setForm((prev) => ({ ...prev, blocks: [...prev.blocks, newBlock], isDirty: true }))
    setSelectedBlockId(newBlock.id)
    toast.success(`Added ${type} block`)
  }, [])

  const updateBlock = useCallback((id: string, updates: Partial<FormBlock>) => {
    setForm((prev) => ({ ...prev, blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)), isDirty: true }))
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setForm((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id), isDirty: true }))
    setSelectedBlockId(null)
    toast.success("Block deleted")
  }, [])

  const duplicateBlock = useCallback((id: string) => {
    setForm((prev) => {
      const idx = prev.blocks.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const block = prev.blocks[idx]
      const newBlock = { ...block, id: generateId(), label: `${block.label} (copy)` }
      const newBlocks = [...prev.blocks]
      newBlocks.splice(idx + 1, 0, newBlock)
      return { ...prev, blocks: newBlocks, isDirty: true }
    })
  }, [])

  const moveBlock = useCallback((id: string, direction: "up" | "down") => {
    setForm((prev) => {
      const idx = prev.blocks.findIndex((b) => b.id === id)
      if (idx === -1) return prev
      const newIdx = direction === "up" ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx >= prev.blocks.length) return prev
      const newBlocks = [...prev.blocks]
      const [removed] = newBlocks.splice(idx, 1)
      newBlocks.splice(newIdx, 0, removed)
      return { ...prev, blocks: newBlocks, isDirty: true }
    })
  }, [])

  const clearForm = useCallback(() => {
    setForm((prev) => ({ ...prev, blocks: [], isDirty: true }))
    setSelectedBlockId(null)
    toast.success("Form cleared")
  }, [])

  const saveForm = useCallback(async () => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setForm((prev) => ({ ...prev, isDirty: false }))
    setIsSaving(false)
    toast.success("Form saved successfully!")
  }, [])

  const loadDemoForm = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      blocks: [
        { id: generateId(), type: "heading", label: "Workshop Registration", required: false, width: "full" },
        { id: generateId(), type: "paragraph", label: "Please fill out this form to register for the workshop.", required: false, width: "full" },
        { id: generateId(), type: "text", label: "Full Name", required: true, placeholder: "Enter your full name", width: "full" },
        { id: generateId(), type: "email", label: "Email Address", required: true, placeholder: "Enter your email", width: "full" },
        { id: generateId(), type: "phone", label: "Phone Number", required: true, placeholder: "+91 98765 43210", width: "half" },
        { id: generateId(), type: "text", label: "College/University", required: true, placeholder: "Enter your college", width: "half" },
        { id: generateId(), type: "dropdown", label: "Year of Study", required: true, options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"], width: "half" },
        { id: generateId(), type: "checkbox", label: "Topics of Interest", required: false, options: ["Web Development", "AI/ML", "Cybersecurity", "Cloud Computing", "Mobile Dev"], width: "full" },
        { id: generateId(), type: "textarea", label: "Why do you want to attend?", required: false, placeholder: "Tell us about your goals...", width: "full" },
        { id: generateId(), type: "rating", label: "How did you hear about us?", required: false, width: "full" },
      ],
      isDirty: true,
    }))
    toast.success("Demo form loaded!")
  }, [])

  const selectedBlock = form.blocks.find((b) => b.id === selectedBlockId)

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Top toolbar */}
        <div className="fixed left-64 right-0 top-16 z-20 flex items-center justify-between border-b border-[var(--border)] bg-white/80 backdrop-blur-lg px-6 py-3">
          <div className="flex items-center gap-4">
            <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, isDirty: true }))}
              className="text-lg font-semibold text-[var(--foreground)] border-0 bg-transparent focus:outline-none focus:ring-0 w-80" placeholder="Form title..." />
            <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold",
              form.status === "published" ? "bg-[var(--success-light)] text-[var(--success)]" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
            )}>{form.status}</span>
            {form.isDirty && <span className="text-xs text-[var(--warning)] font-semibold">Unsaved changes</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={undo} disabled={historyIndex <= 0} className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] disabled:opacity-30 transition-colors" title="Undo"><Undo className="h-4 w-4" /></button>
            <button onClick={redo} disabled={historyIndex >= history.length - 1} className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] disabled:opacity-30 transition-colors" title="Redo"><Redo className="h-4 w-4" /></button>
            <div className="w-px h-6 bg-[var(--border)]" />
            <button onClick={() => setShowPreview(!showPreview)} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors", showPreview ? "bg-[var(--primary-light)] text-[var(--primary)]" : "text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)]")}>
              <Eye className="h-4 w-4" /> Preview
            </button>
            <button onClick={() => setShowJsonPreview(!showJsonPreview)} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors", showJsonPreview ? "bg-[#F3EEFA] text-[#7B4FB7]" : "text-[var(--foreground-subtle)] hover:bg-[var(--background-subtle)]")}>
              <Code className="h-4 w-4" /> JSON
            </button>
            <button onClick={saveForm} disabled={isSaving || !form.isDirty} className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] disabled:opacity-50 transition-all">
              <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Left sidebar */}
        <div className="w-72 border-r border-[var(--border)] bg-white mt-[57px] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Add Blocks</h3>
              <button onClick={loadDemoForm} className="text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">Load Demo</button>
            </div>
            {(["layout", "basic", "choice", "advanced", "media"] as const).map((category) => (
              <div key={category} className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">{category}</p>
                <div className="grid grid-cols-2 gap-2">
                  {blockDefinitions.filter((b) => b.category === category).map((block) => (
                    <button key={block.type} onClick={() => addBlock(block.type)}
                      className="flex flex-col items-center gap-1 rounded-xl border border-[var(--border)] p-3 text-xs font-medium text-[var(--foreground-subtle)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all"
                      title={block.description}>
                      <block.icon className="h-5 w-5" />{block.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <button onClick={clearForm} className="w-full rounded-xl border border-[#F5C6CB] px-3 py-2 text-sm font-semibold text-[var(--destructive)] hover:bg-[#FDECEE] transition-colors">Clear Form</button>
            </div>
          </div>
        </div>

        {/* Main canvas */}
        <div className="flex-1 mt-[57px] overflow-y-auto bg-[var(--background-subtle)] p-6">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 card-premium p-6">
              <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value, isDirty: true }))}
                className="w-full border-0 bg-transparent text-2xl font-bold text-[var(--foreground)] focus:outline-none placeholder:text-[var(--muted-foreground)]" placeholder="Form Title" />
              <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value, isDirty: true }))}
                className="mt-2 w-full border-0 bg-transparent text-[var(--foreground-subtle)] focus:outline-none placeholder:text-[var(--muted-foreground)] resize-none" placeholder="Add a description..." rows={2} />
            </div>

            <div className="space-y-3">
              {form.blocks.map((block, index) => (
                <div key={block.id}
                  className={cn("group relative rounded-xl border bg-white p-4 transition-all cursor-pointer",
                    selectedBlockId === block.id ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20 shadow-sm" : "border-[var(--border)] hover:border-[var(--primary)]/40 hover:shadow-sm"
                  )} onClick={() => setSelectedBlockId(block.id)}>
                  <div className="absolute -top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center rounded-lg border border-[var(--border)] bg-white shadow-sm">
                      <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "up") }} disabled={index === 0} className="rounded-l-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] disabled:opacity-30"><GripVertical className="h-3 w-3 rotate-180" /></button>
                      <button onClick={(e) => { e.stopPropagation(); moveBlock(block.id, "down") }} disabled={index === form.blocks.length - 1} className="p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)] disabled:opacity-30"><GripVertical className="h-3 w-3" /></button>
                      <div className="w-px h-4 bg-[var(--border)]" />
                      <button onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id) }} className="p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--background-subtle)]"><Copy className="h-3 w-3" /></button>
                      <button onClick={(e) => { e.stopPropagation(); deleteBlock(block.id) }} className="rounded-r-lg p-1.5 text-[var(--muted-foreground)] hover:bg-[#FDECEE] hover:text-[var(--destructive)]"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                  {block.required && <span className="absolute -top-2 left-3 rounded-full bg-[#FDECEE] px-2 py-0.5 text-[10px] font-semibold text-[var(--destructive)]">Required</span>}
                  <BlockRenderer block={block} />
                </div>
              ))}
              {form.blocks.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-[var(--border)] p-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
                  <h3 className="mt-4 text-lg font-medium text-[var(--foreground)]">Start building your form</h3>
                  <p className="mt-2 text-[var(--foreground-subtle)]">Click on a block type from the sidebar or load a demo form</p>
                  <button onClick={loadDemoForm} className="mt-4 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-all">Load Demo Form</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        {selectedBlock && !showPreview && !showJsonPreview && (
          <div className="w-80 border-l border-[var(--border)] bg-white mt-[57px] overflow-y-auto">
            <div className="p-4">
              <h3 className="mb-4 text-sm font-semibold text-[var(--foreground)]">Block Settings</h3>
              <BlockSettings block={selectedBlock} onUpdate={(updates) => updateBlock(selectedBlock.id, updates)} />
            </div>
          </div>
        )}

        {/* Preview panel */}
        {showPreview && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-8" onClick={() => setShowPreview(false)}>
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-white/80 backdrop-blur-lg px-6 py-4">
                <h3 className="font-semibold text-[var(--foreground)]">Form Preview</h3>
                <button onClick={() => setShowPreview(false)} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">✕</button>
              </div>
              <div className="p-6">
                <FormPreview blocks={form.blocks} settings={form.settings} title={form.title} description={form.description} />
              </div>
            </div>
          </div>
        )}

        {/* JSON preview */}
        {showJsonPreview && (
          <div className="w-96 border-l border-[var(--border)] bg-[#1A1615] mt-[57px] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">JSON Output</h3>
                <button onClick={() => navigator.clipboard.writeText(JSON.stringify({ title: form.title, description: form.description, blocks: form.blocks, settings: form.settings }, null, 2))}
                  className="text-xs text-[var(--primary)] hover:underline">Copy</button>
              </div>
              <pre className="text-xs text-[var(--success)] whitespace-pre-wrap font-mono">
                {JSON.stringify({ title: form.title, description: form.description, blocks: form.blocks, settings: form.settings }, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

function BlockRenderer({ block }: { block: FormBlock }) {
  switch (block.type) {
    case "heading": return <input type="text" value={block.label} onChange={() => {}} className="w-full border-0 bg-transparent text-xl font-semibold text-[var(--foreground)] focus:outline-none" />
    case "paragraph": return <textarea value={block.label} onChange={() => {}} className="w-full border-0 bg-transparent text-[var(--foreground-subtle)] focus:outline-none resize-none" rows={2} />
    case "divider": return <hr className="border-[var(--border)]" />
    case "text": case "email": case "phone": case "number": case "url": case "password":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
          <input type={block.type === "number" ? "number" : block.type === "email" ? "email" : block.type === "url" ? "url" : block.type === "password" ? "password" : "text"}
            placeholder={block.placeholder} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" disabled />
        </div>
      )
    case "textarea":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
          <textarea placeholder={block.placeholder} className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 resize-none transition-all" rows={3} disabled />
        </div>
      )
    case "dropdown":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
          <select className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" disabled>
            <option value="">Select an option</option>
            {block.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
          </select>
        </div>
      )
    case "radio":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
          <div className="space-y-2">{block.options?.map((opt, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer"><input type="radio" name={block.id} disabled className="h-4 w-4 text-[var(--primary)]" /><span className="text-sm text-[var(--foreground-subtle)]">{opt}</span></label>
          ))}</div>
        </div>
      )
    case "checkbox":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
          <div className="space-y-2">{block.options?.map((opt, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer"><input type="checkbox" disabled className="h-4 w-4 rounded text-[var(--primary)]" /><span className="text-sm text-[var(--foreground-subtle)]">{opt}</span></label>
          ))}</div>
        </div>
      )
    case "date": return <div className="space-y-2"><label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label><input type="date" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" disabled /></div>
    case "time": return <div className="space-y-2"><label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label><input type="time" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" disabled /></div>
    case "file":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
          <div className="rounded-xl border-2 border-dashed border-[var(--border)] p-6 text-center hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] transition-all cursor-pointer">
            <Upload className="mx-auto h-8 w-8 text-[var(--muted-foreground)]" />
            <p className="mt-2 text-sm text-[var(--foreground-subtle)]"><span className="font-semibold text-[var(--primary)]">Click to upload</span> or drag and drop</p>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">PNG, JPG, PDF up to 10MB</p>
          </div>
        </div>
      )
    case "rating":
      return (
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
          <div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" className="p-0.5"><Star className="h-7 w-7 text-[var(--border)] hover:text-[var(--warning)] transition-colors" /></button>
          ))}</div>
        </div>
      )
    case "image": return <div className="space-y-2"><div className="rounded-xl border-2 border-dashed border-[var(--border)] p-8 text-center bg-[var(--background-subtle)]"><Image className="mx-auto h-10 w-10 text-[var(--muted-foreground)]" /><p className="mt-2 text-sm text-[var(--foreground-subtle)]">Image placeholder</p></div>{block.label && <p className="text-xs text-center text-[var(--muted-foreground)]">{block.label}</p>}</div>
    case "video": return <div className="space-y-2"><div className="rounded-xl border-2 border-dashed border-[var(--border)] p-8 text-center bg-[var(--background-subtle)]"><Video className="mx-auto h-10 w-10 text-[var(--muted-foreground)]" /><p className="mt-2 text-sm text-[var(--foreground-subtle)]">Video placeholder</p></div></div>
    default: return <div className="rounded-xl border border-[var(--border)] p-4 text-center text-[var(--muted-foreground)] text-sm">{block.type} field</div>
  }
}

function BlockSettings({ block, onUpdate }: { block: FormBlock; onUpdate: (updates: Partial<FormBlock>) => void }) {
  return (
    <div className="space-y-4">
      {block.type !== "divider" && (
        <div><label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Label</label>
          <input type="text" value={block.label} onChange={(e) => onUpdate({ label: e.target.value })}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" /></div>
      )}
      {["text", "email", "phone", "number", "url", "password", "textarea"].includes(block.type) && (
        <div><label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Placeholder</label>
          <input type="text" value={block.placeholder || ""} onChange={(e) => onUpdate({ placeholder: e.target.value })}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" /></div>
      )}
      <div><label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Help Text</label>
        <input type="text" value={block.helpText || ""} onChange={(e) => onUpdate({ helpText: e.target.value })} placeholder="Optional help text"
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" /></div>
      <div><label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Width</label>
        <select value={block.width || "full"} onChange={(e) => onUpdate({ width: e.target.value as "full" | "half" | "third" })}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
          <option value="full">Full Width</option><option value="half">Half Width</option><option value="third">One Third</option>
        </select></div>
      {block.type !== "heading" && block.type !== "paragraph" && block.type !== "divider" && (
        <div className="flex items-center gap-3">
          <button onClick={() => onUpdate({ required: !block.required })} className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors", block.required ? "bg-[var(--primary)]" : "bg-[var(--border)]")}>
            <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm", block.required ? "translate-x-6" : "translate-x-1")} />
          </button>
          <label className="text-sm font-semibold text-[var(--foreground)]">Required</label>
        </div>
      )}
      {["dropdown", "radio", "checkbox"].includes(block.type) && (
        <div><label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Options</label>
          <div className="space-y-2">{block.options?.map((opt, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={opt} onChange={(e) => { const newOptions = [...(block.options || [])]; newOptions[i] = e.target.value; onUpdate({ options: newOptions }) }}
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background-subtle)] px-3 py-2 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
              <button onClick={() => onUpdate({ options: block.options?.filter((_, index) => index !== i) })} className="rounded-lg p-2 text-[var(--muted-foreground)] hover:bg-[#FDECEE] hover:text-[var(--destructive)] transition-colors"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
            <button onClick={() => onUpdate({ options: [...(block.options || []), `Option ${(block.options?.length || 0) + 1}`] })}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border)] py-2.5 text-sm font-medium text-[var(--foreground-subtle)] hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] hover:text-[var(--primary)] transition-all">
              <Plus className="h-4 w-4" /> Add option
            </button>
          </div></div>
      )}
    </div>
  )
}

function FormPreview({ blocks, settings, title, description }: { blocks: FormBlock[]; settings: FormSettings; title: string; description: string }) {
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  if (submitted) return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success-light)]">
        <svg className="h-8 w-8 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="text-xl font-semibold text-[var(--foreground)]">Thank you!</h3>
      <p className="mt-2 text-[var(--foreground-subtle)]">{settings.successMessage || "Your submission has been recorded."}</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div><h2 className="text-2xl font-bold text-[var(--foreground)]">{title}</h2>{description && <p className="mt-2 text-[var(--foreground-subtle)]">{description}</p>}</div>
      {blocks.map((block) => (
        <div key={block.id}>
          {block.type === "heading" ? <h3 className="text-lg font-semibold text-[var(--foreground)]">{block.label}</h3>
            : block.type === "paragraph" ? <p className="text-[var(--foreground-subtle)]">{block.label}</p>
            : block.type === "divider" ? <hr className="border-[var(--border)]" />
            : (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--foreground)]">{block.label}{block.required && <span className="ml-1 text-[var(--destructive)]">*</span>}</label>
                {["text", "email", "phone", "number", "url", "password"].includes(block.type) ? (
                  <input type={block.type === "number" ? "number" : block.type} placeholder={block.placeholder} required={block.required}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [block.id]: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                ) : block.type === "textarea" ? (
                  <textarea placeholder={block.placeholder} required={block.required} rows={4}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [block.id]: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 resize-none transition-all" />
                ) : block.type === "dropdown" ? (
                  <select required={block.required} onChange={(e) => setAnswers((prev) => ({ ...prev, [block.id]: e.target.value }))}
                    className="w-full rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all">
                    <option value="">Select an option</option>
                    {block.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                ) : block.type === "radio" ? (
                  <div className="space-y-2">{block.options?.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer"><input type="radio" name={block.id} required={block.required} className="h-4 w-4 text-[var(--primary)]" /><span className="text-sm text-[var(--foreground-subtle)]">{opt}</span></label>
                  ))}</div>
                ) : block.type === "checkbox" ? (
                  <div className="space-y-2">{block.options?.map((opt, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer"><input type="checkbox" className="h-4 w-4 rounded text-[var(--primary)]" /><span className="text-sm text-[var(--foreground-subtle)]">{opt}</span></label>
                  ))}</div>
                ) : block.type === "date" ? <input type="date" required={block.required} className="w-full rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                : block.type === "time" ? <input type="time" required={block.required} className="w-full rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 transition-all" />
                : block.type === "file" ? (
                  <div className="rounded-xl border-2 border-dashed border-[var(--border)] p-6 text-center hover:border-[var(--primary)]/40 hover:bg-[var(--primary-light)] transition-all cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-[var(--muted-foreground)]" />
                    <p className="mt-2 text-sm text-[var(--foreground-subtle)]"><span className="font-semibold text-[var(--primary)]">Click to upload</span> or drag and drop</p>
                  </div>
                ) : block.type === "rating" ? (
                  <div className="flex gap-1">{[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className="p-0.5"><Star className="h-7 w-7 text-[var(--border)] hover:text-[var(--warning)] transition-colors" /></button>
                  ))}</div>
                ) : null}
                {block.helpText && <p className="text-xs text-[var(--muted-foreground)]">{block.helpText}</p>}
              </div>
            )}
        </div>
      ))}
      <button type="submit" className="w-full rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-hover)] transition-colors">
        {settings.submitButtonText || "Submit"}
      </button>
    </form>
  )
}
