"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Key, Copy, RefreshCw, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const apiKeys = [
  { id: "1", name: "Production API Key", key: "aev_prod_••••••••••••••••", created: "Jan 1, 2025", lastUsed: "2 hours ago", status: "active" },
  { id: "2", name: "Development API Key", key: "aev_dev_••••••••••••••••", created: "Jan 10, 2025", lastUsed: "1 day ago", status: "active" },
  { id: "3", name: "Webhook Secret", key: "whsec_••••••••••••••••", created: "Jan 15, 2025", lastUsed: "Never", status: "active" },
]

export default function APIPage() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div><h1 className="text-3xl font-bold text-[#2D2D2D]">API Settings</h1><p className="mt-1 text-[#6B6B6B]">Manage API keys and webhooks</p></div>
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg"><Key className="h-4 w-4" />Generate Key</button>
        </div>
        <div className="space-y-4">
          {apiKeys.map((k, i) => (
            <div key={k.id} className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6 transition-all duration-300 hover:border-[#D4764E]/30 hover:shadow-lg hover:shadow-[#D4764E]/5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#2D2D2D]">{k.name}</h3>
                  <p className="mt-1 font-mono text-sm text-[#6B6B6B]">{k.key}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-[#999]">
                    <span>Created: {k.created}</span>
                    <span>Last used: {k.lastUsed}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-[#E8E0D4] bg-[#FAF8F5] px-3 py-2 text-xs font-medium text-[#2D2D2D] transition-all hover:border-[#D4764E]/30 hover:bg-[#D4764E]/10"><Copy className="h-3.5 w-3.5" /></button>
                  <button className="rounded-lg border border-[#E8E0D4] bg-[#FAF8F5] px-3 py-2 text-xs font-medium text-[#2D2D2D] transition-all hover:border-[#D4764E]/30 hover:bg-[#D4764E]/10"><RefreshCw className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
