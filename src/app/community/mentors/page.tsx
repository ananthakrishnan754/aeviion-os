"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Users, Search, Star, MapPin, BookOpen, Github, Linkedin, Mail, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface Mentor {
  id: string
  name: string
  email: string
  company: string
  role: string
  expertise: string[]
  rating: number
  students: number
  location: string
  availability: "available" | "busy" | "unavailable"
  github?: string
  linkedin?: string
}

const mentors: Mentor[] = [
  { id: "1", name: "Arjun Mehta", email: "arjun@google.com", company: "Google", role: "Staff Engineer", expertise: ["System Design", "React", "Go"], rating: 4.9, students: 24, location: "Bangalore", availability: "available", github: "#", linkedin: "#" },
  { id: "2", name: "Priyanka Das", email: "priyanka@microsoft.com", company: "Microsoft", role: "Senior PM", expertise: ["Product Strategy", "Azure", "Agile"], rating: 4.8, students: 18, location: "Hyderabad", availability: "available", github: "#", linkedin: "#" },
  { id: "3", name: "Rohan Gupta", email: "rohan@amazon.in", company: "Amazon", role: "SDE II", expertise: ["Java", "AWS", "Microservices"], rating: 4.7, students: 15, location: "Chennai", availability: "busy", github: "#", linkedin: "#" },
  { id: "4", name: "Neha Sharma", email: "neha@startup.io", company: "BuildX (Founder)", role: "CEO", expertise: ["Startups", "Product", "React"], rating: 4.9, students: 30, location: "Delhi", availability: "available", github: "#", linkedin: "#" },
  { id: "5", name: "Vikram Singh", email: "vikram@cloudnative.dev", company: "CloudNative Labs", role: "DevOps Lead", expertise: ["Docker", "Kubernetes", "CI/CD"], rating: 4.6, students: 12, location: "Pune", availability: "unavailable", github: "#", linkedin: "#" },
  { id: "6", name: "Ananya Nair", email: "ananya@designstudio.com", company: "DesignStudio", role: "Design Lead", expertise: ["UI/UX", "Figma", "Design Systems"], rating: 4.8, students: 20, location: "Mumbai", availability: "available", linkedin: "#" },
]

const getAvailabilityStyle = (a: string) => {
  switch (a) {
    case "available": return "bg-[#6B8E6B]/15 text-[#5A7A5A]"
    case "busy": return "bg-[#B8860B]/15 text-[#B8860B]"
    case "unavailable": return "bg-[#999]/15 text-[#888]"
    default: return "bg-[#999]/15 text-[#888]"
  }
}

export default function MentorsPage() {
  const [search, setSearch] = useState("")

  const filtered = mentors.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase())))

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold text-[#2D2D2D]">Mentors</h1>
          <p className="mt-1 text-[#6B6B6B]">Connect with industry experts who guide student growth</p>
        </div>

        <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#999]" />
            <input type="text" placeholder="Search by name or expertise..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] py-2.5 pl-10 pr-4 text-sm text-[#2D2D2D] placeholder:text-[#999] focus:border-[#D4764E] focus:outline-none focus:ring-1 focus:ring-[#D4764E]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m, i) => (
            <div key={m.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#D4764E] to-[#E8956A] text-sm font-bold text-white">
                    {m.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2D2D2D]">{m.name}</h3>
                    <p className="text-xs text-[#6B6B6B]">{m.role} at {m.company}</p>
                  </div>
                </div>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", getAvailabilityStyle(m.availability))}>{m.availability}</span>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {m.expertise.map((e) => (
                  <span key={e} className="rounded-full bg-[#D4764E]/10 px-2.5 py-0.5 text-xs font-medium text-[#C06540]">{e}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-[#999]">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-[#B8860B] text-[#B8860B]" />{m.rating}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{m.students} students</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{m.location}</span>
              </div>
              <div className="mt-4 border-t border-[#E8E0D4] pt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-[#FAF8F5] py-2.5 text-sm font-medium text-[#2D2D2D] transition-all hover:bg-[#D4764E]/10 hover:text-[#D4764E]">Connect</button>
                <a href={`mailto:${m.email}`} className="rounded-xl border border-[#E8E0D4] bg-white px-3 py-2 text-[#999] transition-all hover:border-[#D4764E]/30 hover:text-[#D4764E]"><Mail className="h-4 w-4" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
