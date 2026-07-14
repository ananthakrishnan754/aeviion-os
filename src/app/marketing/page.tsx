"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Megaphone, Search, Plus, Mail, Eye, Users } from "lucide-react"

export default function MarketingPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Marketing</h1>
            <p className="text-[var(--muted-foreground)]">Campaigns, newsletters, and outreach</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Total Campaigns", value: 0, icon: Megaphone, color: "from-blue-500 to-blue-600" },
            { label: "Emails Sent", value: 0, icon: Mail, color: "from-green-500 to-green-600" },
            { label: "Total Reach", value: 0, icon: Users, color: "from-purple-500 to-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className="card-premium p-5">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p><p className="text-2xl font-bold text-[var(--foreground)]">{stat.value}</p></div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white ${stat.color}`}><stat.icon className="h-5 w-5" /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-premium p-12 text-center">
          <Megaphone className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">Marketing campaigns coming soon</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">Create email campaigns, newsletters, and track outreach performance</p>
        </div>
      </div>
    </AppLayout>
  )
}
