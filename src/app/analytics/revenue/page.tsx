"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { DollarSign, TrendingUp, CreditCard, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Revenue", value: "$45,230", icon: DollarSign, gradient: "from-[#D4764E] to-[#E8956A]" },
  { label: "Monthly Recurring", value: "$8,900", icon: TrendingUp, gradient: "from-[#6B8E6B] to-[#8CB88C]" },
  { label: "Pending Payments", value: "$2,340", icon: CreditCard, gradient: "from-[#B8860B] to-[#DAA520]" },
  { label: "Total Wallet", value: "$12,500", icon: Wallet, gradient: "from-[#8B6F47] to-[#A0845C]" },
]

const revenueStreams = [
  { name: "Course Sales", amount: 18500, percent: 41 },
  { name: "Fellowships", amount: 12400, percent: 27 },
  { name: "Workshops", amount: 8900, percent: 20 },
  { name: "Partnerships", amount: 5430, percent: 12 },
]

export default function RevenuePage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Revenue Analytics</h1><p className="mt-1 text-[#6B6B6B]">Track revenue and financial metrics</p></div>
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
          <h3 className="mb-6 text-lg font-semibold text-[#2D2D2D]">Revenue Breakdown</h3>
          <div className="space-y-4">
            {revenueStreams.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#2D2D2D]">{r.name}</span>
                  <span className="text-sm text-[#999]">${r.amount.toLocaleString()} ({r.percent}%)</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#F0EBE3]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#D4764E] to-[#E8956A]" style={{ width: `${r.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
