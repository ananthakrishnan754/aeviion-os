"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Calendar, CheckCircle2, XCircle, Clock, Users, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const attendance = [
  { id: "1", event: "AI Workshop", date: "Jan 15, 2025", present: 42, absent: 3, total: 45 },
  { id: "2", event: "Web Dev Bootcamp", date: "Jan 10, 2025", present: 30, absent: 2, total: 32 },
  { id: "3", event: "Cybersecurity Seminar", date: "Jan 5, 2025", present: 25, absent: 3, total: 28 },
]

export default function AttendancePage() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Attendance</h1>
          <p className="mt-1 text-[#6B6B6B]">Track event attendance and participation</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {attendance.map((a, i) => (
            <div key={a.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <h3 className="mb-2 text-lg font-semibold text-[#2D2D2D]">{a.event}</h3>
              <p className="mb-4 text-sm text-[#999]">{a.date}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-xl bg-[#6B8E6B]/10 p-3"><p className="text-xl font-bold text-[#5A7A5A]">{a.present}</p><p className="text-xs text-[#999]">Present</p></div>
                <div className="rounded-xl bg-[#D4764E]/10 p-3"><p className="text-xl font-bold text-[#C06540]">{a.absent}</p><p className="text-xs text-[#999]">Absent</p></div>
                <div className="rounded-xl bg-[#FAF8F5] p-3"><p className="text-xl font-bold text-[#2D2D2D]">{a.total}</p><p className="text-xs text-[#999]">Total</p></div>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-xs text-[#999]">
                  <span>Attendance Rate</span>
                  <span>{Math.round((a.present / a.total) * 100)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#F0EBE3]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#6B8E6B] to-[#8CB88C]" style={{ width: `${(a.present / a.total) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
