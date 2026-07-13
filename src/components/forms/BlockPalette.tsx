"use client"

import {
  Type,
  AlignLeft,
  Hash,
  Mail,
  Phone,
  List,
  CheckSquare,
  Circle,
  Calendar,
  Clock,
  Upload,
  Link2,
  Minus,
  Star,
  FileText,
  LayoutTemplate,
  Columns,
} from "lucide-react"
import type { FormBlockType } from "@/types"

interface BlockType {
  type: FormBlockType
  label: string
  icon: React.ReactNode
  category: string
}

const blockTypes: BlockType[] = [
  { type: "heading", label: "Heading", icon: <Type className="h-4 w-4" />, category: "layout" },
  { type: "paragraph", label: "Paragraph", icon: <AlignLeft className="h-4 w-4" />, category: "layout" },
  { type: "divider", label: "Divider", icon: <Minus className="h-4 w-4" />, category: "layout" },
  { type: "statement", label: "Statement", icon: <FileText className="h-4 w-4" />, category: "layout" },
  { type: "page-break", label: "Page Break", icon: <LayoutTemplate className="h-4 w-4" />, category: "layout" },
  { type: "text", label: "Text Input", icon: <Type className="h-4 w-4" />, category: "input" },
  { type: "email", label: "Email", icon: <Mail className="h-4 w-4" />, category: "input" },
  { type: "phone", label: "Phone", icon: <Phone className="h-4 w-4" />, category: "input" },
  { type: "number", label: "Number", icon: <Hash className="h-4 w-4" />, category: "input" },
  { type: "textarea", label: "Long Text", icon: <AlignLeft className="h-4 w-4" />, category: "input" },
  { type: "url", label: "URL", icon: <Link2 className="h-4 w-4" />, category: "input" },
  { type: "select", label: "Dropdown", icon: <List className="h-4 w-4" />, category: "choice" },
  { type: "multi-select", label: "Multi-Select", icon: <CheckSquare className="h-4 w-4" />, category: "choice" },
  { type: "checkbox", label: "Checkbox", icon: <CheckSquare className="h-4 w-4" />, category: "choice" },
  { type: "radio", label: "Radio", icon: <Circle className="h-4 w-4" />, category: "choice" },
  { type: "date", label: "Date", icon: <Calendar className="h-4 w-4" />, category: "advanced" },
  { type: "time", label: "Time", icon: <Clock className="h-4 w-4" />, category: "advanced" },
  { type: "file", label: "File Upload", icon: <Upload className="h-4 w-4" />, category: "advanced" },
  { type: "rating", label: "Rating", icon: <Star className="h-4 w-4" />, category: "advanced" },
]

const categories = [
  { id: "layout", label: "Layout" },
  { id: "input", label: "Input" },
  { id: "choice", label: "Choice" },
  { id: "advanced", label: "Advanced" },
]

interface BlockPaletteProps {
  onAddBlock: (type: FormBlockType) => void
}

export function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <div className="space-y-4">
      {categories.map((cat) => {
        const blocks = blockTypes.filter((b) => b.category === cat.id)
        if (blocks.length === 0) return null
        return (
          <div key={cat.id}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              {cat.label}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {blocks.map((block) => (
                <button
                  key={block.type}
                  onClick={() => onAddBlock(block.type)}
                  className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-xs font-medium text-[#2D2D2D] hover:border-[var(--primary)]/30 hover:bg-[var(--primary-light)] transition-all text-left"
                >
                  <span className="text-[var(--muted-foreground)]">{block.icon}</span>
                  {block.label}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
