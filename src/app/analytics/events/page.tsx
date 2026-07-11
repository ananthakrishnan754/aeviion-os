"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Calendar, Users, TrendingUp, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Events", value: "48", icon: Calendar, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Total Registrations", value: "2,340", icon: Users, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Avg. Attendance", value: "85%", icon: CheckCircle2, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Satisfaction", value: "4.8/5", icon: TrendingUp, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

const eventPerformance = [
  { name: "AI Workshop", registrations: 45, attended: 42, rating: 4.9 },
  { name: "Web Dev Bootcamp", registrations: 32, attended: 30, rating: 4.7 },
  { name: "Cybersecurity Seminar", registrations: 28, attended: 25, rating: 4.6 },
  { name: "React Advanced", registrations: 18, attended: 16, rating: 4.8 },
]

export default function EventAnalyticsPage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Event Analytics</h1><p className="mt-1 text-[#6B6B6B]">Measure event performance and impact</p></div>
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
          <h3 className="mb-6 text-lg font-semibold text-[#2D2D2D]">Event Performance</h3>
          <div className="space-y-4">
            {eventPerformance.map((e) => (
              <div key={e.name} className="flex items-center gap-4 rounded-xl bg-[#FAF8F5] p-4">
                <div className="flex-1">
                  <h4 className="font-medium text-[#2D2D2D]">{e.name}</h4>
                  <div className="mt-2 flex items-center gap-4 text-xs text-[#999]">
                    <span>{e.attended}/{e.registrations} attended</span>
                    <span>Rating: {e.rating}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F0EBE3]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#6B8E6B] to-[#8CB88C]" style={{ width: `${(e.attended / e.registrations) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
