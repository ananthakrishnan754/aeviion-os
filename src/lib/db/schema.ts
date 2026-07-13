// Drizzle ORM schema — kept for reference/migration generation
// Actual queries use Supabase client directly

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

// ============================================================
// FORMS
// ============================================================

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull().default("Untitled Form"),
  description: text("description").default(""),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  blocks: jsonb("blocks").$type<unknown[]>().default([]),
  settings: jsonb("settings").$type<Record<string, unknown>>().default({}),
  status: varchar("status", { length: 20 }).default("draft"),
  responsesCount: integer("responses_count").default(0),
  viewsCount: integer("views_count").default(0),
  completionRate: integer("completion_rate").default(0),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
})

export const formResponses = pgTable("form_responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("form_id").references(() => forms.id, { onDelete: "cascade" }).notNull(),
  respondentEmail: varchar("respondent_email", { length: 255 }),
  respondentName: varchar("respondent_name", { length: 255 }),
  answers: jsonb("answers").$type<Record<string, unknown>>().default({}),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  status: varchar("status", { length: 20 }).default("submitted"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
})

export const formViews = pgTable("form_views", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("form_id").references(() => forms.id, { onDelete: "cascade" }).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
})

// ============================================================
// EVENTS
// ============================================================

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 50 }),
  location: text("location"),
  isOnline: boolean("is_online").default(true),
  maxParticipants: integer("max_participants"),
  registrations: integer("registrations").default(0),
  attendance: integer("attendance").default(0),
  status: varchar("status", { length: 20 }).default("draft"),
  type: varchar("type", { length: 50 }),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ============================================================
// COURSES
// ============================================================

export const courses = pgTable("courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  level: varchar("level", { length: 20 }).default("beginner"),
  duration: varchar("duration", { length: 100 }),
  enrolledStudents: integer("enrolled_students").default(0),
  rating: decimal("rating", { precision: 3, scale: 1 }).default("0"),
  status: varchar("status", { length: 20 }).default("draft"),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ============================================================
// CERTIFICATES
// ============================================================

export const certificates = pgTable("certificates", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  recipientName: varchar("recipient_name", { length: 255 }).notNull(),
  recipientEmail: varchar("recipient_email", { length: 255 }),
  type: varchar("type", { length: 50 }),
  verificationCode: varchar("verification_code", { length: 100 }).notNull(),
  status: varchar("status", { length: 20 }).default("issued"),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
})

// ============================================================
// PROJECTS
// ============================================================

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  techStack: jsonb("tech_stack").$type<string[]>().default([]),
  status: varchar("status", { length: 20 }).default("draft"),
  github: text("github"),
  progress: integer("progress").default(0),
  createdBy: uuid("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
