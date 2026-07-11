"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Calendar, Search, MapPin, Users, Clock, ArrowUpRight, Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: "workshop" | "seminar" | "bootcamp" | "meetup" | "webinar"
  registrations: number
  maxParticipants: number
  status: "upcoming" | "live" | "completed"
}

const events: Event[] = [
  { id: "1", title: "AI Workshop: Building with LLMs", date: "Jan 25, 2025", time: "10:00 AM", location: "Online", type: "workshop", registrations: 45, maxParticipants: 50, status: "upcoming" },
  { id: "2", title: "Web Dev Bootcamp 2025", date: "Feb 1-3, 2025", time: "9:00 AM", location: "Bangalore", type: "bootcamp", registrations: 32, maxParticipants: 40, status: "upcoming" },
  { id: "3", title: "Cybersecurity Seminar", date: "Jan 30, 2025", time: "2:00 PM", location: "Online", type: "seminar", registrations: 28, maxParticipants: 100, status: "upcoming" },
  { id: "4", title: "React Advanced Patterns", date: "Feb 10, 2025", time: "11:00 AM", location: "Mumbai", type: "workshop", registrations: 18, maxParticipants: 25, status: "upcoming" },
  { id: "5", title: "Startup Meetup", date: "Feb 15, 2025", time: "6:00 PM", location: "Delhi", type: "meetup", registrations: 55, maxParticipants: 60, status: "upcoming" },
]

const getTypeStyle = (t: string) => {
  switch (t) {
    case "workshop": return "bg-[#D4764E]/10 text-[#C06540]"
    case "bootcamp": return "bg-[#6B8E6B]/10 text-[#5A7A5A]"
    case "seminar": return "bg-[#4A7DC9]/10 text-[#3A6DB9]"
    case "meetup": return "bg-[#B8860B]/10 text-[#B8860B]"
    case "webinar": return "bg-[#8B6F47]/10 text-[#8B6F47]"
    default: return "bg-[#999]/10 text-[#888]"
  }
}

export default function UpcomingEventsPage() {
  const [search, setSearch] = useState("")
  const filtered = events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2D2D2D]">Upcoming Events</h1>
            <p className="mt-1 text-[#6B6B6B]">Browse and register for upcoming events</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">
            <Plus className="h-4 w-4" />Create Event
          </button>
        </div>
        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input type="text" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e, i) => (
            <div key={e.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getTypeStyle(e.type))}>{e.type}</span>
                <span className="rounded-full bg-[#6B8E6B]/15 px-2.5 py-0.5 text-xs font-medium text-[#5A7A5A]">{e.status}</span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[#2D2D2D]">{e.title}</h3>
              <div className="mb-4 space-y-2 text-sm text-[#6B6B6B]">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#D4764E]" />{e.date}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#D4764E]" />{e.time}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#D4764E]" />{e.location}</div>
              </div>
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between text-xs text-[#999]">
                  <span>{e.registrations}/{e.maxParticipants} registered</span>
                  <span>{Math.round((e.registrations / e.maxParticipants) * 100)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#F0EBE3]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#D4764E] to-[#E8956A] transition-all" style={{ width: `${(e.registrations / e.maxParticipants) * 100}%` }} />
                </div>
              </div>
              <button className="w-full rounded-xl bg-[#FAF8F5] py-2.5 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]">Register</button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
