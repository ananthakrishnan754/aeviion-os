"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { AppLayout } from "@/components/layout/AppLayout"
import { Award, ArrowLeft, Trash2, Ban, CheckCircle, Calendar, Mail, GraduationCap, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface Certificate {
  id: string
  title: string
  recipient_name: string
  recipient_email: string
  recipient_college: string
  type: string
  event_name?: string
  course_name?: string
  verification_code: string
  status: string
  issued_at: string
  revoked_at?: string
  revoked_reason?: string
}

const statusColors: Record<string, string> = {
  issued: "bg-green-100 text-green-700",
  revoked: "bg-red-100 text-red-600",
}

export default function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [cert, setCert] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/certificates/${id}`)
      .then((r) => r.json())
      .then(setCert)
      .finally(() => setLoading(false))
  }, [id])

  const revoke = async () => {
    const reason = prompt("Reason for revocation:")
    if (reason === null) return
    setActionLoading(true)
    try {
      await fetch(`/api/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "revoked", revoked_reason: reason }),
      })
      setCert((prev) => prev ? { ...prev, status: "revoked", revoked_reason: reason, revoked_at: new Date().toISOString() } : prev)
    } finally {
      setActionLoading(false)
    }
  }

  const deleteCert = async () => {
    if (!confirm("Permanently delete this certificate?")) return
    setActionLoading(true)
    try {
      await fetch(`/api/certificates/${id}`, { method: "DELETE" })
      window.location.href = "/certificates"
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto animate-pulse space-y-6">
          <div className="h-8 bg-[var(--muted)] rounded w-1/3" />
          <div className="card-premium h-64" />
        </div>
      </AppLayout>
    )
  }

  if (!cert) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto text-center py-20">
          <h2 className="text-xl font-semibold">Certificate not found</h2>
          <Link href="/certificates" className="text-[var(--primary)] mt-2 inline-block">Back to certificates</Link>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/certificates" className="rounded-xl border border-[var(--border)] p-2 hover:bg-[var(--muted)] transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{cert.title}</h1>
            <p className="text-sm text-[var(--muted-foreground)] font-mono">{cert.verification_code}</p>
          </div>
          <span className={cn("inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium", statusColors[cert.status])}>
            {cert.status}
          </span>
        </div>

        <div className="card-premium p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] text-xl font-bold text-white">
              {cert.recipient_name.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">{cert.recipient_name}</h2>
              <p className="text-sm text-[var(--muted-foreground)]">{cert.recipient_email}</p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-[var(--muted-foreground)]" />
              <span className="text-[var(--muted-foreground)]">Issued:</span>
              <span className="text-[var(--foreground)]">{new Date(cert.issued_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            {cert.recipient_college && (
              <div className="flex items-center gap-3 text-sm">
                <GraduationCap className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span className="text-[var(--muted-foreground)]">College:</span>
                <span className="text-[var(--foreground)]">{cert.recipient_college}</span>
              </div>
            )}
            {cert.course_name && (
              <div className="flex items-center gap-3 text-sm">
                <BookOpen className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span className="text-[var(--muted-foreground)]">Course:</span>
                <span className="text-[var(--foreground)]">{cert.course_name}</span>
              </div>
            )}
            {cert.event_name && (
              <div className="flex items-center gap-3 text-sm">
                <Award className="h-4 w-4 text-[var(--muted-foreground)]" />
                <span className="text-[var(--muted-foreground)]">Event:</span>
                <span className="text-[var(--foreground)]">{cert.event_name}</span>
              </div>
            )}
            {cert.revoked_at && (
              <div className="flex items-center gap-3 text-sm">
                <Ban className="h-4 w-4 text-red-500" />
                <span className="text-red-600">Revoked:</span>
                <span className="text-red-600">{cert.revoked_reason || "No reason provided"}</span>
              </div>
            )}
          </div>
        </div>

        {cert.status === "issued" && (
          <div className="flex gap-3 pb-8">
            <button
              onClick={revoke}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
            >
              <Ban className="h-4 w-4" /> Revoke
            </button>
            <button
              onClick={deleteCert}
              disabled={actionLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-all disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
