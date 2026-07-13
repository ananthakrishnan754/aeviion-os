"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Award, FileText, Palette, Plus, Users, Calendar, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const templates = [
  { id: "course", name: "Course Completion", description: "For students who complete a course", icon: BookOpen, color: "from-blue-500 to-blue-600", usageCount: 0 },
  { id: "event", name: "Event Participation", description: "For attendees of workshops and events", icon: Calendar, color: "from-green-500 to-green-600", usageCount: 0 },
  { id: "project", name: "Project Excellence", description: "Outstanding project achievement", icon: Award, color: "from-purple-500 to-purple-600", usageCount: 0 },
  { id: "fellowship", name: "Fellowship Completion", description: "Fellowship program completion", icon: Users, color: "from-orange-500 to-orange-600", usageCount: 0 },
]

export default function CertificateTemplatesPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Certificate Templates</h1>
            <p className="text-[var(--muted-foreground)]">Pre-built templates for different certificate types</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {templates.map((tmpl) => (
            <div key={tmpl.id} className="card-premium p-6 hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4">
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white shrink-0", tmpl.color)}>
                  <tmpl.icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">{tmpl.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-3">{tmpl.description}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Standard layout</span>
                    <span className="flex items-center gap-1"><Palette className="h-3.5 w-3.5" /> Customizable</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs text-[var(--muted-foreground)]">Use from Generate page</span>
                <a
                  href={`/certificates/generate?type=${tmpl.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Use Template
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
