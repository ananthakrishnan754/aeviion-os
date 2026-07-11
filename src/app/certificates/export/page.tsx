"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Download, FileText, Award, Users, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const exports = [
  { id: "1", label: "All Certificates", count: 1240, icon: Award, gradient: "from-[#D4764E] to-[#E8956A]" },
  { id: "2", label: "This Month", count: 89, icon: Calendar, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { id: "3", label: "By Course", count: 12, icon: FileText, gradient: "from-[#4A7DC9] to-[#3A6DB9]" },
  { id: "4", label: "By Student", count: 456, icon: Users, gradient: "from-[#B8860B] to-[#DAA520]" },
]

export default function CertExportPage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Bulk Export</h1><p className="mt-1 text-[#6B6B6B]">Export certificates in bulk</p></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {exports.map((e, i) => (
            <div key={e.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md", e.gradient)}><e.icon className="h-6 w-6" /></div>
              <h3 className="text-lg font-semibold text-[#2D2D2D]">{e.label}</h3>
              <p className="mt-1 text-sm text-[#999]">{e.count} certificates</p>
              <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-[#FAF8F5] py-2.5 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]"><Download className="h-4 w-4" />Export PDF</button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
