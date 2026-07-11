"use client"

import { AppLayout } from "@/components/layout/AppLayout"
import { Palette, Upload, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const colorPresets = [
  { name: "Terracotta (Default)", primary: "#D4764E", bg: "#FAF8F5" },
  { name: "Ocean Blue", primary: "#3B82F6", bg: "#F0F7FF" },
  { name: "Forest Green", primary: "#059669", bg: "#F0FDF4" },
  { name: "Royal Purple", primary: "#7C3AED", bg: "#F5F3FF" },
  { name: "Sunset Orange", primary: "#EA580C", bg: "#FFF7ED" },
]

export default function BrandingPage() {
  const [selectedColor, setSelectedColor] = useState("#D4764E")

  return (
    <AppLayout>
      <div className="space-y-8 animate-fadeIn">
        <div><h1 className="text-3xl font-bold text-[#2D2D2D]">Branding</h1><p className="mt-1 text-[#6B6B6B]">Customize your platform appearance</p></div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-[#2D2D2D]">Logo</h3>
            <div className="mb-4 flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-[#E8E0D4] bg-[#FAF8F5]">
              <div className="text-center"><Upload className="mx-auto h-8 w-8 text-[#999]" /><p className="mt-2 text-sm text-[#999]">Click to upload logo</p></div>
            </div>
            <h3 className="mb-4 text-lg font-semibold text-[#2D2D2D]">Brand Colors</h3>
            <div className="space-y-3">
              {colorPresets.map((c) => (
                <button key={c.name} onClick={() => setSelectedColor(c.primary)} className={cn("flex w-full items-center gap-3 rounded-xl border p-3 transition-all", selectedColor === c.primary ? "border-[#D4764E] bg-[#D4764E]/5" : "border-[#E8E0D4] hover:border-[#D4764E]/30")}>
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: c.primary }} />
                  <span className="flex-1 text-left text-sm font-medium text-[#2D2D2D]">{c.name}</span>
                  {selectedColor === c.primary && <Check className="h-4 w-4 text-[#D4764E]" />}
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-2xl border border-[#E8E0D4] bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-[#2D2D2D]">Preview</h3>
            <div className="rounded-xl border border-[#E8E0D4] bg-[#FAF8F5] p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl" style={{ backgroundColor: selectedColor }} />
                <div><p className="font-semibold text-[#2D2D2D]">Aeviion OS</p><p className="text-xs text-[#999]">Education Platform</p></div>
              </div>
              <button className="rounded-xl px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: selectedColor }}>Sample Button</button>
            </div>
          </div>
        </div>
        <div className="flex justify-end"><button className="rounded-xl bg-gradient-to-r from-[#D4764E] to-[#E8956A] px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-[#D4764E]/25 transition-all hover:shadow-lg">Save Changes</button></div>
      </div>
    </AppLayout>
  )
}
