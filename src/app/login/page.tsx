"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, Loader2, Mail, Lock, GraduationCap } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  const handleDemoLogin = async (role: string) => {
    setLoading(true)
    setError("")

    const demoAccounts: Record<string, { email: string; password: string }> = {
      admin: { email: "admin@aeviion.com", password: "demo1234" },
      mentor: { email: "mentor@aeviion.com", password: "demo1234" },
      student: { email: "student@aeviion.com", password: "demo1234" },
    }

    const account = demoAccounts[role] || demoAccounts.student

    const { error } = await supabase.auth.signInWithPassword({
      email: account.email,
      password: account.password,
    })

    if (error) {
      setError("Demo accounts not set up yet. Create an account first!")
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#B85C3A] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-[var(--foreground)]">Aeviion OS</span>
          </div>
          <p className="text-[var(--foreground-subtle)] text-sm">Sign in to your admin dashboard</p>
        </div>

        {/* Login Card */}
        <div className="card-premium p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded-xl bg-[#FDECEE] border border-[#F5C6CB] text-[var(--destructive)] text-sm p-3.5 font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aeviion.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[var(--background-subtle)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 bg-[var(--background-subtle)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[var(--primary)] to-[#C06840] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-center text-[var(--muted-foreground)] text-xs font-medium mb-4 uppercase tracking-wider">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2.5">
              {(["admin", "mentor", "student"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => handleDemoLogin(role)}
                  disabled={loading}
                  className="py-2.5 px-3 bg-[var(--background-subtle)] border border-[var(--border)] rounded-xl text-[var(--foreground-subtle)] text-sm font-medium hover:bg-[var(--primary-light)] hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all capitalize"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-[var(--muted-foreground)] text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[var(--primary)] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
