"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Award, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  { id: "1", name: "Course Completion", description: "Standard certificate for completing a course", color: "from-[#D4764E] to-[#E8956A]", usage: 234 },
  { id: "2", name: "Fellowship Completion", description: "Certificate for completing a fellowship program", color: "from-[#6B8E6B] to-[#8CB88C]", usage: 56 },
  { id: "3", name: "Workshop Attendance", description: "Attendance certificate for workshops and seminars", color: "from-[#4A7DC9] to-[#3A6DB9]", usage: 412 },
  { id: "4", name: "Achievement Award", description: "Special recognition for outstanding performance", color: "from-[#B8860B] to-[#DAA520]", usage: 89 },
]

export default function CertTemplatesPage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Certificate Templates</h1><p className="mt-1 text-[#6B6B6B]">Design and manage certificate templates</p></div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Plus className="h-4 w-4" />Create Template</button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((t, i) => (
            <div key={t.id} className="glass-card overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={cn("h-32 bg-gradient-to-br flex items-center justify-center", t.color)}>
                <Award className="h-16 w-16 text-white/30" />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-semibold text-[#2D2D2D]">{t.name}</h3>
                <p className="mb-3 text-sm text-[#6B6B6B]">{t.description}</p>
                <p className="mb-4 text-xs text-[#999]">Used {t.usage} times</p>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-xl bg-[#FAF8F5] py-2.5 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]">Use</button>
                  <button className="rounded-xl border border-[#E8E0D4] bg-white px-3 py-2 text-[#999] transition-all hover:text-[#2D2D2D]"><Edit className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
