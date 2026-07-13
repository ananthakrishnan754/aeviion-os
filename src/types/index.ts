// ============================================================
// FORM BUILDER TYPES — Tally-style block system
// ============================================================

export type FormBlockType =
  | "heading"
  | "paragraph"
  | "text"
  | "email"
  | "phone"
  | "number"
  | "textarea"
  | "select"
  | "multi-select"
  | "checkbox"
  | "radio"
  | "date"
  | "time"
  | "file"
  | "url"
  | "divider"
  | "page-break"
  | "rating"
  | "statement"

export interface FormBlockOption {
  id: string
  label: string
  value: string
}

export interface ConditionalRule {
  blockId: string
  action: "show" | "hide"
  condition: "equals" | "not_equals" | "contains" | "not_empty" | "is_empty"
  value?: string
}

export interface FormBlockValidation {
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  customMessage?: string
}

export interface FormBlock {
  id: string
  type: FormBlockType
  label: string
  required: boolean
  placeholder?: string
  helpText?: string
  options?: FormBlockOption[]
  validation?: FormBlockValidation
  width?: "full" | "half" | "third"
  settings?: Record<string, unknown>
  conditionalRules?: ConditionalRule[]
}

export interface FormTheme {
  primaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  borderRadius: string
  hideBrandBadge: boolean
}

export interface FormSettings {
  submitButtonText: string
  successMessage: string
  successRedirectUrl?: string
  requireEmail: boolean
  allowMultipleSubmissions: boolean
  closeDate?: string
  password?: string
  customCss?: string
  webhookUrl?: string
  notifyEmail?: string
  theme: FormTheme
}

export interface Form {
  id: string
  title: string
  description: string
  slug: string
  blocks: FormBlock[]
  settings: FormSettings
  status: "draft" | "published" | "closed"
  responsesCount: number
  viewsCount: number
  completionRate: number
  createdBy: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface FormResponse {
  id: string
  formId: string
  respondentEmail?: string
  respondentName?: string
  answers: Record<string, unknown>
  metadata?: {
    userAgent?: string
    ipAddress?: string
    device?: string
    browser?: string
    country?: string
  }
  status: "submitted" | "viewed" | "flagged"
  submittedAt: string
}

export interface FormView {
  id: string
  formId: string
  viewedAt: string
  metadata?: Record<string, unknown>
}

// ============================================================
// OTHER TYPES
// ============================================================

export type UserRole =
  | "ceo" | "cto" | "clo" | "cco" | "cpo" | "coo"
  | "admin" | "mentor" | "instructor" | "organizer"
  | "community_leader" | "student" | "alumni" | "partner"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface NavigationItem {
  title: string
  href: string
  icon: string
  badge?: number
  children?: NavigationItem[]
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  actionUrl?: string
}

export interface DashboardStats {
  totalStudents: number
  activeMentors: number
  totalEvents: number
  totalCourses: number
  totalProjects: number
  totalCertificates: number
  totalForms: number
  totalResponses: number
  revenue: number
  growth: number
}
