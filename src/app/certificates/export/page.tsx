"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Download, Search, Award, FileJson, FileText, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Certificate {
  id: string
  title: string
  recipient_name: string
  recipient_email: string
  type: string
  verification_code: string
  status: string
  issued_at: string
}

export default function CertificatesExportPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/certificates")
      .then((r) => r.json())
      .then((data) => setCertificates(data || []))
      .finally(() => setLoading(false))
  }, [])

  const exportCSV = () => {
    setExporting("csv")
    const headers = ["Title", "Recipient", "Email", "Type", "Code", "Status", "Issued"]
    const rows = certificates.map((c) => [
      c.title, c.recipient_name, c.recipient_email, c.type, c.verification_code, c.status, new Date(c.issued_at).toISOString(),
    ])
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v || ""}"`).join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `certificates-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setTimeout(() => setExporting(null), 1000)
  }

  const exportJSON = () => {
    setExporting("json")
    const json = JSON.stringify(certificates, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `certificates-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setTimeout(() => setExporting(null), 1000)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Export Certificates</h1>
          <p className="text-[var(--muted-foreground)]">Bulk export certificate data</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={exportCSV}
            disabled={loading || certificates.length === 0}
            className="card-premium p-6 text-left hover:shadow-lg transition-all group disabled:opacity-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
                {exporting === "csv" ? <Check className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">Export as CSV</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Spreadsheet-compatible format</p>
              </div>
            </div>
          </button>

          <button
            onClick={exportJSON}
            disabled={loading || certificates.length === 0}
            className="card-premium p-6 text-left hover:shadow-lg transition-all group disabled:opacity-50"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {exporting === "json" ? <Check className="h-6 w-6" /> : <FileJson className="h-6 w-6" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">Export as JSON</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Structured data format</p>
              </div>
            </div>
          </button>
        </div>

        <div className="card-premium p-5">
          <h3 className="font-semibold text-[var(--foreground)] mb-3">Preview ({certificates.length} certificates)</h3>
          {loading ? (
            <div className="animate-pulse h-20 bg-[var(--muted)] rounded-xl" />
          ) : certificates.length === 0 ? (
            <p className="text-sm text-[var(--muted-foreground)]">No certificates to export</p>
          ) : (
            <div className="max-h-60 overflow-y-auto space-y-2">
              {certificates.slice(0, 10).map((c) => (
                <div key={c.id} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-[var(--muted)]/50">
                  <Award className="h-4 w-4 text-[var(--primary)] shrink-0" />
                  <span className="font-medium text-[var(--foreground)] truncate">{c.title}</span>
                  <span className="text-[var(--muted-foreground)]">—</span>
                  <span className="text-[var(--muted-foreground)] truncate">{c.recipient_name}</span>
                  <span className="ml-auto text-xs text-[var(--muted-foreground)] font-mono">{c.verification_code}</span>
                </div>
              ))}
              {certificates.length > 10 && (
                <p className="text-xs text-[var(--muted-foreground)] text-center pt-2">...and {certificates.length - 10} more</p>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
