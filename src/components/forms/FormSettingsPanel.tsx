"use client"

import type { FormSettings, FormTheme } from "@/types"

interface FormSettingsPanelProps {
  settings: FormSettings
  onUpdate: (updates: Partial<FormSettings>) => void
}

const presetColors = [
  { label: "Terracotta", value: "#D4764E" },
  { label: "Blue", value: "#4E9DD4" },
  { label: "Green", value: "#4FA34E" },
  { label: "Purple", value: "#7B4FB7" },
  { label: "Pink", value: "#D44E8A" },
  { label: "Teal", value: "#2BA89E" },
  { label: "Dark", value: "#2D2D2D" },
]

export function FormSettingsPanel({ settings, onUpdate }: FormSettingsPanelProps) {
  const theme = settings.theme || {
    primaryColor: "#D4764E",
    backgroundColor: "#FAF8F5",
    textColor: "#2D2D2D",
    fontFamily: "Inter",
    borderRadius: "12px",
    hideBrandBadge: false,
  }

  const updateTheme = (updates: Partial<FormTheme>) => {
    onUpdate({ theme: { ...theme, ...updates } })
  }

  return (
    <div className="space-y-6">
      {/* Submit Button */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Submit Button Text
        </label>
        <input
          type="text"
          value={settings.submitButtonText}
          onChange={(e) => onUpdate({ submitButtonText: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
        />
      </div>

      {/* Success Message */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Success Message
        </label>
        <textarea
          value={settings.successMessage}
          onChange={(e) => onUpdate({ successMessage: e.target.value })}
          rows={3}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all resize-none"
        />
      </div>

      {/* Success Redirect */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Redirect After Submit (optional)
        </label>
        <input
          type="url"
          value={settings.successRedirectUrl || ""}
          onChange={(e) => onUpdate({ successRedirectUrl: e.target.value || undefined })}
          placeholder="https://example.com/thank-you"
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
        />
      </div>

      <hr className="border-[var(--border)]" />

      {/* Require Email */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-[#2D2D2D]">Require Email</label>
          <p className="text-[10px] text-[var(--muted-foreground)]">Collect respondent email</p>
        </div>
        <button
          type="button"
          onClick={() => onUpdate({ requireEmail: !settings.requireEmail })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.requireEmail ? "bg-[var(--primary)]" : "bg-gray-300"
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.requireEmail ? "translate-x-6" : "translate-x-1"
          }`} />
        </button>
      </div>

      {/* Allow Multiple Submissions */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-[#2D2D2D]">Multiple Submissions</label>
          <p className="text-[10px] text-[var(--muted-foreground)]">Allow one response per email</p>
        </div>
        <button
          type="button"
          onClick={() => onUpdate({ allowMultipleSubmissions: !settings.allowMultipleSubmissions })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.allowMultipleSubmissions ? "bg-[var(--primary)]" : "bg-gray-300"
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            settings.allowMultipleSubmissions ? "translate-x-1" : "translate-x-6"
          }`} />
        </button>
      </div>

      {/* Close Date */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Close Date (optional)
        </label>
        <input
          type="datetime-local"
          value={settings.closeDate || ""}
          onChange={(e) => onUpdate({ closeDate: e.target.value || undefined })}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
        />
      </div>

      {/* Notify Email */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Notify on Submission
        </label>
        <input
          type="email"
          value={settings.notifyEmail || ""}
          onChange={(e) => onUpdate({ notifyEmail: e.target.value || undefined })}
          placeholder="email@example.com"
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
        />
      </div>

      {/* Webhook URL */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Webhook URL
        </label>
        <input
          type="url"
          value={settings.webhookUrl || ""}
          onChange={(e) => onUpdate({ webhookUrl: e.target.value || undefined })}
          placeholder="https://your-api.com/webhook"
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/10 outline-none transition-all"
        />
      </div>

      <hr className="border-[var(--border)]" />

      {/* Theme */}
      <div>
        <label className="mb-2 block text-xs font-semibold text-[var(--muted-foreground)]">
          Primary Color
        </label>
        <div className="flex flex-wrap gap-2">
          {presetColors.map((c) => (
            <button
              key={c.value}
              onClick={() => updateTheme({ primaryColor: c.value })}
              className={`h-8 w-8 rounded-full border-2 transition-all ${
                theme.primaryColor === c.value ? "border-[#2D2D2D] scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: c.value }}
              title={c.label}
            />
          ))}
          <label className="relative h-8 w-8 cursor-pointer">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => updateTheme({ primaryColor: e.target.value })}
              className="absolute inset-0 h-full w-full opacity-0"
            />
            <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-dashed border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)]">
              +
            </div>
          </label>
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Background Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={theme.backgroundColor}
            onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
            className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer"
          />
          <input
            type="text"
            value={theme.backgroundColor}
            onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
            className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs text-[#2D2D2D] font-mono focus:border-[var(--primary)] outline-none transition-all"
          />
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Text Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={theme.textColor}
            onChange={(e) => updateTheme({ textColor: e.target.value })}
            className="h-8 w-8 rounded-lg border border-[var(--border)] cursor-pointer"
          />
          <input
            type="text"
            value={theme.textColor}
            onChange={(e) => updateTheme({ textColor: e.target.value })}
            className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs text-[#2D2D2D] font-mono focus:border-[var(--primary)] outline-none transition-all"
          />
        </div>
      </div>

      {/* Font Family */}
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-[var(--muted-foreground)]">
          Font Family
        </label>
        <select
          value={theme.fontFamily}
          onChange={(e) => updateTheme({ fontFamily: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[#2D2D2D] focus:border-[var(--primary)] outline-none transition-all"
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Poppins">Poppins</option>
          <option value="Lato">Lato</option>
          <option value="Montserrat">Montserrat</option>
        </select>
      </div>

      {/* Hide Brand */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-[#2D2D2D]">Hide Brand Badge</label>
          <p className="text-[10px] text-[var(--muted-foreground)]">Remove "Built with Aeviion"</p>
        </div>
        <button
          type="button"
          onClick={() => updateTheme({ hideBrandBadge: !theme.hideBrandBadge })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            theme.hideBrandBadge ? "bg-[var(--primary)]" : "bg-gray-300"
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            theme.hideBrandBadge ? "translate-x-6" : "translate-x-1"
          }`} />
        </button>
      </div>
    </div>
  )
}
