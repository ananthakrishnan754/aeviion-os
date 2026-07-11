export type UserRole =
  | "ceo"
  | "cto"
  | "clo"
  | "cco"
  | "cpo"
  | "coo"
  | "admin"
  | "mentor"
  | "instructor"
  | "organizer"
  | "community_leader"
  | "student"
  | "alumni"
  | "partner"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface Student extends User {
  role: "student"
  college?: string
  skills: string[]
  interests: string[]
  github?: string
  linkedin?: string
  portfolio?: string
  communityScore: number
}

export interface Mentor extends User {
  role: "mentor"
  assignedStudents: string[]
  expertise: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location?: string
  isOnline: boolean
  maxParticipants?: number
  registrations: number
  status: "draft" | "published" | "ongoing" | "completed" | "cancelled"
  createdBy: string
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  modules: Module[]
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  enrolledStudents: number
  createdBy: string
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
  order: number
}

export interface Lesson {
  id: string
  title: string
  type: "video" | "text" | "quiz" | "assignment"
  content: string
  duration?: string
  order: number
}

export interface Project {
  id: string
  title: string
  description: string
  teamMembers: string[]
  mentor?: string
  techStack: string[]
  status: "draft" | "in_progress" | "review" | "completed" | "featured"
  github?: string
  demoVideo?: string
  progress: number
  createdAt: string
}

export interface Certificate {
  id: string
  studentId: string
  eventId?: string
  courseId?: string
  projectId?: string
  title: string
  issuedAt: string
  verificationCode: string
  templateId: string
}

export interface Form {
  id: string
  title: string
  description?: string
  blocks: FormBlock[]
  status: "draft" | "published" | "closed"
  createdBy: string
  responses: number
  createdAt: string
  updatedAt: string
}

export interface FormBlock {
  id: string
  type: string
  label: string
  required: boolean
  placeholder?: string
  options?: string[]
  validation?: Record<string, unknown>
}

export interface Community {
  id: string
  name: string
  description: string
  icon?: string
  members: number
  channels: Channel[]
  createdBy: string
}

export interface Channel {
  id: string
  name: string
  type: "announcement" | "discussion" | "resource"
  messages: Message[]
}

export interface Message {
  id: string
  content: string
  author: string
  createdAt: string
  reactions?: Record<string, string[]>
}

export interface DashboardStats {
  totalStudents: number
  activeMentors: number
  totalEvents: number
  totalCourses: number
  totalProjects: number
  totalCertificates: number
  revenue: number
  growth: number
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
