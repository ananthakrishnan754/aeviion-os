"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Users, GraduationCap, Star, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Students", value: "12,456", icon: Users, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Active This Month", value: "8,234", icon: TrendingUp, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Avg. Score", value: "87%", icon: Star, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Completion Rate", value: "78%", icon: GraduationCap, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

const topColleges = [
  { name: "IIT Bombay", students: 1240, growth: "+12%" },
  { name: "NIT Trichy", students: 980, growth: "+8%" },
  { name: "BITS Pilani", students: 870, growth: "+15%" },
  { name: "DTU", students: 760, growth: "+6%" },
  { name: "IIIT Hyderabad", students: 650, growth: "+10%" },
]

export default function StudentAnalyticsPage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Student Analytics</h1><p className="mt-1 text-[#6B6B6B]">Detailed insights into student engagement</p></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-5 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-3">
                <div className={cn("rounded-xl bg-gradient-to-br p-2.5 text-white shadow-md", s.gradient)}><s.icon className="h-5 w-5" /></div>
                <div><p className="text-2xl font-bold text-[#2D2D2D]">{s.value}</p><p className="text-xs font-medium text-[#6B6B6B]">{s.label}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold text-[#2D2D2D]">Top Colleges</h3>
          <div className="space-y-4">
            {topColleges.map((c, i) => (
              <div key={c.name} className="flex items-center gap-4">
                <span className="w-6 text-sm font-bold text-[#999]">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[#2D2D2D]">{c.name}</span>
                    <span className="text-xs text-[#999]">{c.students} students</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#F0EBE3]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#D4764E] to-[#E8956A]" style={{ width: `${(c.students / 1240) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#6B8E6B]">{c.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
