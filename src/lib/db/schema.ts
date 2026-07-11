import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  decimal,
  uniqueIndex,
} from "drizzle-orm/pg-core"

// ============================================================
// USERS & AUTH
// ============================================================

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  avatar: text("avatar"),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 50 }).notNull().default("student"),
  status: varchar("status", { length: 20 }).default("active"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const studentProfiles = pgTable("student_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  college: varchar("college", { length: 255 }),
  degree: varchar("degree", { length: 255 }),
  year: integer("year"),
  skills: jsonb("skills").$type<string[]>().default([]),
  interests: jsonb("interests").$type<string[]>().default([]),
  github: text("github"),
  linkedin: text("linkedin"),
  portfolio: text("portfolio"),
  resume: text("resume"),
  bio: text("bio"),
  communityScore: integer("community_score").default(0),
})

// ============================================================
// FORMS
// ============================================================

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  blocks: jsonb("blocks").$type<FormBlock[]>().default([]),
  settings: jsonb("settings").$type<FormSettings>().default({}),
  status: varchar("status", { length: 20 }).default("draft"),
  responsesCount: integer("responses_count").default(0),
  viewsCount: integer("views_count").default(0),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  closedAt: timestamp("closed_at"),
})

export const formResponses = pgTable("form_responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("form_id").references(() => forms.id, { onDelete: "cascade" }).notNull(),
  respondentEmail: varchar("respondent_email", { length: 255 }),
  respondentName: varchar("respondent_name", { length: 255 }),
  answers: jsonb("answers").$type<Record<string, unknown>>().default({}),
  metadata: jsonb("metadata").$type<ResponseMetadata>().default({}),
  status: varchar("status", { length: 20 }).default("submitted"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
})

// ============================================================
// EVENTS
// ============================================================

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  endDate: timestamp("end_date"),
  time: varchar("time", { length: 50 }),
  location: text("location"),
  isOnline: boolean("is_online").default(true),
  meetingUrl: text("meeting_url"),
  maxParticipants: integer("max_participants"),
  registrations: integer("registrations").default(0),
  attendance: integer("attendance").default(0),
  status: varchar("status", { length: 20 }).default("draft"),
  type: varchar("type", { length: 50 }),
  thumbnail: text("thumbnail"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const eventRegistrations = pgTable("event_registrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id").references(() => events.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  status: varchar("status", { length: 20 }).default("registered"),
  checkedIn: boolean("checked_in").default(false),
  checkedInAt: timestamp("checked_in_at"),
  qrCode: text("qr_code"),
  registeredAt: timestamp("registered_at").defaultNow().notNull(),
})

// ============================================================
// COURSES & LEARNING
// ============================================================

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  category: varchar("category", { length: 100 }),
  level: varchar("level", { length: 20 }).default("beginner"),
  duration: varchar("duration", { length: 100 }),
  thumbnail: text("thumbnail"),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  enrolledStudents: integer("enrolled_students").default(0),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0"),
  status: varchar("status", { length: 20 }).default("draft"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const courseModules = pgTable("course_modules", {
  id: uuid("id").defaultRandom().primaryKey(),
  courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const lessons = pgTable("lessons", {
  id: uuid("id").defaultRandom().primaryKey(),
  moduleId: uuid("module_id").references(() => courseModules.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  type: varchar("type", { length: 20 }).default("video"),
  content: text("content"),
  videoUrl: text("video_url"),
  duration: varchar("duration", { length: 50 }),
  order: integer("order").default(0),
  isFree: boolean("is_free").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ============================================================
// CERTIFICATES
// ============================================================

export const certificates = pgTable("certificates", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  recipientId: uuid("recipient_id").references(() => users.id),
  recipientName: varchar("recipient_name", { length: 255 }).notNull(),
  recipientEmail: varchar("recipient_email", { length: 255 }),
  recipientCollege: varchar("recipient_college", { length: 255 }),
  type: varchar("type", { length: 50 }),
  eventName: varchar("event_name", { length: 255 }),
  courseName: varchar("course_name", { length: 255 }),
  projectId: uuid("project_id"),
  templateId: uuid("template_id"),
  verificationCode: varchar("verification_code", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).default("issued"),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
  revokedAt: timestamp("revoked_at"),
  revokedReason: text("revoked_reason"),
})

export const certificateTemplates = pgTable("certificate_templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  backgroundUrl: text("background_url"),
  layout: jsonb("layout").$type<Record<string, unknown>>().default({}),
  variables: jsonb("variables").$type<string[]>().default([]),
  usageCount: integer("usage_count").default(0),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ============================================================
// PROJECTS
// ============================================================

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  teamMembers: jsonb("team_members").$type<string[]>().default([]),
  mentorId: uuid("mentor_id").references(() => users.id),
  techStack: jsonb("tech_stack").$type<string[]>().default([]),
  category: varchar("category", { length: 100 }),
  status: varchar("status", { length: 20 }).default("draft"),
  github: text("github"),
  demoUrl: text("demo_url"),
  demoVideo: text("demo_video"),
  progress: integer("progress").default(0),
  rating: integer("rating"),
  feedback: text("feedback"),
  featured: boolean("featured").default(false),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ============================================================
// COMMUNITY
// ============================================================

export const communities = pgTable("communities", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: text("icon"),
  coverImage: text("cover_image"),
  members: integer("members").default(0),
  isPublic: boolean("is_public").default(true),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const communityMembers = pgTable("community_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  communityId: uuid("community_id").references(() => communities.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  role: varchar("role", { length: 20 }).default("member"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
})

// ============================================================
// NOTIFICATIONS
// ============================================================

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  type: varchar("type", { length: 20 }).default("info"),
  read: boolean("read").default(false),
  actionUrl: text("action_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ============================================================
// ACTIVITY LOGS
// ============================================================

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  entity: varchar("entity", { length: 100 }).notNull(),
  entityId: uuid("entity_id"),
  details: jsonb("details").$type<Record<string, unknown>>().default({}),
  ipAddress: varchar("ip_address", { length: 45 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// ============================================================
// TYPES
// ============================================================

export interface FormBlock {
  id: string
  type: string
  label: string
  required: boolean
  placeholder?: string
  helpText?: string
  options?: string[]
  validation?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
  }
  width?: "full" | "half" | "third"
}

export interface FormSettings {
  submitButtonText?: string
  successMessage?: string
  redirectUrl?: string
  allowMultipleSubmissions?: boolean
  requiresAuth?: boolean
  closedMessage?: string
  theme?: "light" | "dark" | "auto"
}

export interface ResponseMetadata {
  userAgent?: string
  ipAddress?: string
  country?: string
  city?: string
  device?: string
  browser?: string
}
