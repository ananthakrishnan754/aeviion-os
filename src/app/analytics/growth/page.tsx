"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { TrendingUp, Users, GraduationCap, DollarSign, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const metrics = [
  { label: "Student Growth", value: "+24%", detail: "vs last quarter", icon: Users, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Course Completions", value: "1,847", detail: "+18% growth", icon: GraduationCap, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Revenue Growth", value: "+32%", detail: "vs last quarter", icon: DollarSign, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Retention Rate", value: "94%", detail: "Monthly active", icon: TrendingUp, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

const monthlyData = [
  { month: "Jul", students: 1200, revenue: 45000 },
  { month: "Aug", students: 1450, revenue: 52000 },
  { month: "Sep", students: 1680, revenue: 58000 },
  { month: "Oct", students: 1920, revenue: 64000 },
  { month: "Nov", students: 2100, revenue: 71000 },
  { month: "Dec", students: 2340, revenue: 78000 },
]

export default function GrowthPage() {
  const maxStudents = Math.max(...monthlyData.map((d) => d.students))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Growth Analytics</h1><p className="mt-1 text-[#6B6B6B]">Track platform growth and engagement metrics</p></div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-5 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-3">
                <div className={cn("rounded-xl bg-gradient-to-br p-2.5 text-white shadow-md", m.gradient)}><m.icon className="h-5 w-5" /></div>
                <div><p className="text-2xl font-bold text-[#2D2D2D]">{m.value}</p><p className="text-xs font-medium text-[#6B6B6B]">{m.label}</p></div>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6">
          <h3 className="mb-6 text-lg font-semibold text-[#2D2D2D]">Student Growth Trend</h3>
          <div className="flex items-end gap-4 h-64">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold text-[#2D2D2D]">{(d.students / 1000).toFixed(1)}K</span>
                <div className="w-full rounded-t-xl bg-gradient-to-t from-[#D4764E] to-[#E8956A] transition-all duration-500" style={{ height: `${(d.students / maxStudents) * 200}px`, animationDelay: `${i * 100}ms` }} />
                <span className="text-xs text-[#999]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
