"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Briefcase, Search, Plus, MapPin, DollarSign, ExternalLink } from "lucide-react"

export default function CareersPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Careers</h1>
            <p className="text-[var(--muted-foreground)]">Job postings and career opportunities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Open Positions", value: 0, color: "from-blue-500 to-blue-600" },
            { label: "Applications", value: 0, color: "from-green-500 to-green-600" },
            { label: "Partners", value: 0, color: "from-purple-500 to-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="card-premium p-5">
              <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
              <p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="card-premium p-12 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">Career board coming soon</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">Post job opportunities from partner companies for students and alumni</p>
        </div>
      </div>
    </AppLayout>
  )
}
