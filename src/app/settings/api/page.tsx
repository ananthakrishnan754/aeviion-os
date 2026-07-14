"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Key, Copy, Plus, Trash2, Check } from "lucide-react"

interface ApiKey { id: string; name: string; key: string; created: string; lastUsed: string }

const initialKeys: ApiKey[] = [
  { id: "1", name: "Production API", key: "aev_prod_**************************8f2a", created: "2025-01-10", lastUsed: "2 hours ago" },
  { id: "2", name: "Development", key: "aev_dev_**************************3b1c", created: "2025-01-05", lastUsed: "5 days ago" },
]

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys)
  const [copied, setCopied] = useState<string | null>(null)

  const copyKey = (key: string) => { navigator.clipboard.writeText(key); setCopied(key); setTimeout(() => setCopied(null), 2000) }
  const deleteKey = (id: string) => { if (confirm("Delete this API key?")) setKeys((prev) => prev.filter((k) => k.id !== id)) }
  const createKey = () => {
    const newKey: ApiKey = {
      id: String(Date.now()),
      name: `API Key ${keys.length + 1}`,
      key: `aev_${Math.random().toString(36).slice(2, 6)}_**************************${Math.random().toString(36).slice(2, 6)}`,
      created: new Date().toISOString().slice(0, 10),
      lastUsed: "Never",
    }
    setKeys((prev) => [...prev, newKey])
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">API Keys</h1>
            <p className="text-[var(--muted-foreground)]">Manage programmatic access to the platform</p>
          </div>
          <button onClick={createKey} className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[var(--primary)]/90 transition-all">
            <Plus className="h-4 w-4" /> Create Key
          </button>
        </div>
        <div className="space-y-3">
          {keys.map((k) => (
            <div key={k.id} className="card-premium p-5 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] shrink-0"><Key className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--foreground)]">{k.name}</p>
                <p className="text-xs font-mono text-[var(--muted-foreground)] truncate">{k.key}</p>
              </div>
              <div className="text-xs text-[var(--muted-foreground)] shrink-0">Created {k.created}</div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => copyKey(k.key)} className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all">
                  {copied === k.key ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
                <button onClick={() => deleteKey(k.id)} className="rounded-lg p-1.5 text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {keys.length === 0 && <div className="card-premium p-12 text-center"><Key className="mx-auto h-12 w-12 text-[var(--muted-foreground)] mb-4" /><h3 className="text-lg font-semibold mb-2">No API keys</h3><p className="text-sm text-[var(--muted-foreground)]">Create one to get started</p></div>}
        </div>
      </div>
    </AppLayout>
  )
}
