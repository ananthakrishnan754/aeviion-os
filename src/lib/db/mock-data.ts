// Mock data store for testing without database
// This will be replaced with real Supabase calls in production

import type { FormBlock, FormSettings } from "./schema"

export interface MockForm {
  id: string
  title: string
  description: string
  slug: string
  blocks: FormBlock[]
  settings: FormSettings
  status: "draft" | "published" | "closed"
  responsesCount: number
  viewsCount: number
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface MockEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  isOnline: boolean
  maxParticipants: number
  registrations: number
  attendance: number
  status: "draft" | "published" | "ongoing" | "completed" | "cancelled"
  type: string
  createdBy: string
}

export interface MockStudent {
  id: string
  name: string
  email: string
  college: string
  skills: string[]
  interests: string[]
  github?: string
  linkedin?: string
  portfolio?: string
  communityScore: number
  coursesCompleted: number
  projectsCount: number
  certificatesCount: number
  status: "active" | "inactive" | "alumni"
}

export interface MockCourse {
  id: string
  title: string
  description: string
  category: string
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  enrolledStudents: number
  rating: number
  status: "draft" | "published"
}

export interface MockCertificate {
  id: string
  title: string
  recipientName: string
  recipientEmail: string
  recipientCollege: string
  type: string
  verificationCode: string
  status: "issued" | "pending" | "revoked"
  issuedAt: string
}

// ============================================================
// FORMS
// ============================================================

const defaultBlocks: FormBlock[] = [
  {
    id: "heading_1",
    type: "heading",
    label: "Workshop Registration Form",
    required: false,
    width: "full",
  },
  {
    id: "paragraph_1",
    type: "paragraph",
    label: "Please fill out this form to register for the workshop. All fields marked with * are required.",
    required: false,
    width: "full",
  },
  {
    id: "text_1",
    type: "text",
    label: "Full Name",
    required: true,
    placeholder: "Enter your full name",
    width: "full",
  },
  {
    id: "email_1",
    type: "email",
    label: "Email Address",
    required: true,
    placeholder: "Enter your email address",
    width: "full",
  },
  {
    id: "phone_1",
    type: "phone",
    label: "Phone Number",
    required: true,
    placeholder: "Enter your phone number",
    width: "half",
  },
  {
    id: "text_2",
    type: "text",
    label: "College/University",
    required: true,
    placeholder: "Enter your college name",
    width: "half",
  },
  {
    id: "dropdown_1",
    type: "dropdown",
    label: "Year of Study",
    required: true,
    options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate", "Working Professional"],
    width: "half",
  },
  {
    id: "dropdown_2",
    type: "dropdown",
    label: "Experience Level",
    required: true,
    options: ["Beginner", "Intermediate", "Advanced"],
    width: "half",
  },
  {
    id: "checkbox_1",
    type: "checkbox",
    label: "Topics of Interest",
    required: false,
    options: ["Web Development", "AI/ML", "Cybersecurity", "Cloud Computing", "Mobile Development", "DevOps"],
    width: "full",
  },
  {
    id: "textarea_1",
    type: "textarea",
    label: "Why do you want to attend this workshop?",
    required: false,
    placeholder: "Tell us about your goals and what you hope to learn...",
    width: "full",
  },
  {
    id: "file_1",
    type: "file",
    label: "Resume (Optional)",
    required: false,
    width: "full",
  },
  {
    id: "rating_1",
    type: "rating",
    label: "How did you hear about us?",
    required: false,
    width: "full",
  },
  {
    id: "divider_1",
    type: "divider",
    label: "",
    required: false,
    width: "full",
  },
  {
    id: "checkbox_2",
    type: "checkbox",
    label: "Terms & Conditions",
    required: true,
    options: ["I agree to the terms and conditions and privacy policy"],
    width: "full",
  },
]

const mockForms: MockForm[] = [
  {
    id: "form_1",
    title: "Workshop Registration Form",
    description: "Register for our upcoming AI & ML Workshop",
    slug: "workshop-registration",
    blocks: defaultBlocks,
    settings: {
      submitButtonText: "Register Now",
      successMessage: "Thank you for registering! We'll send you a confirmation email shortly.",
      allowMultipleSubmissions: false,
      theme: "light",
    },
    status: "published",
    responsesCount: 156,
    viewsCount: 1234,
    createdBy: "user_1",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "form_2",
    title: "Fellowship Application",
    description: "Apply for our 6-month Fellowship Program",
    slug: "fellowship-application",
    blocks: [
      { id: "h1", type: "heading", label: "Fellowship Application 2025", required: false },
      { id: "t1", type: "text", label: "Full Name", required: true, placeholder: "Your full name" },
      { id: "e1", type: "email", label: "Email", required: true, placeholder: "your@email.com" },
      { id: "p1", type: "phone", label: "Phone", required: true },
      { id: "d1", type: "dropdown", label: "Preferred Track", required: true, options: ["Full Stack", "AI/ML", "Cybersecurity", "Cloud"] },
      { id: "ta1", type: "textarea", label: "Tell us about yourself", required: true },
    ],
    settings: { submitButtonText: "Submit Application", successMessage: "Application submitted successfully!" },
    status: "published",
    responsesCount: 89,
    viewsCount: 567,
    createdBy: "user_1",
    createdAt: "2025-01-08T10:00:00Z",
    updatedAt: "2025-01-08T10:00:00Z",
  },
  {
    id: "form_3",
    title: "Feedback Form",
    description: "Share your feedback about the workshop",
    slug: "workshop-feedback",
    blocks: [
      { id: "h1", type: "heading", label: "Workshop Feedback", required: false },
      { id: "r1", type: "rating", label: "Overall Experience", required: true },
      { id: "r2", type: "rating", label: "Content Quality", required: true },
      { id: "r3", type: "rating", label: "Instructor Quality", required: true },
      { id: "ta1", type: "textarea", label: "What did you like most?", required: false },
      { id: "ta2", type: "textarea", label: "What can be improved?", required: false },
    ],
    settings: { submitButtonText: "Submit Feedback", successMessage: "Thank you for your feedback!" },
    status: "published",
    responsesCount: 45,
    viewsCount: 234,
    createdBy: "user_1",
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "form_4",
    title: "Volunteer Application",
    description: "Join our team as a volunteer",
    slug: "volunteer-application",
    blocks: [
      { id: "h1", type: "heading", label: "Volunteer Application", required: false },
      { id: "t1", type: "text", label: "Full Name", required: true },
      { id: "e1", type: "email", label: "Email", required: true },
      { id: "d1", type: "dropdown", label: "Area of Interest", required: true, options: ["Event Management", "Technical", "Marketing", "Content"] },
      { id: "ta1", type: "textarea", label: "Why do you want to volunteer?", required: true },
    ],
    settings: { submitButtonText: "Apply" },
    status: "draft",
    responsesCount: 12,
    viewsCount: 78,
    createdBy: "user_1",
    createdAt: "2025-01-12T10:00:00Z",
    updatedAt: "2025-01-12T10:00:00Z",
  },
]

// ============================================================
// EVENTS
// ============================================================

const mockEvents: MockEvent[] = [
  {
    id: "evt_1",
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop covering ML fundamentals and practical applications.",
    date: "2025-01-20T10:00:00Z",
    time: "10:00 AM - 4:00 PM",
    location: "Online (Zoom)",
    isOnline: true,
    maxParticipants: 50,
    registrations: 45,
    attendance: 0,
    status: "published",
    type: "workshop",
    createdBy: "user_1",
  },
  {
    id: "evt_2",
    title: "Full Stack Bootcamp",
    description: "Intensive 5-day bootcamp on React, Node.js, and databases.",
    date: "2025-01-25T09:00:00Z",
    time: "9:00 AM - 5:00 PM",
    location: "Tech Hub, Bangalore",
    isOnline: false,
    maxParticipants: 40,
    registrations: 38,
    attendance: 0,
    status: "published",
    type: "bootcamp",
    createdBy: "user_1",
  },
  {
    id: "evt_3",
    title: "Cybersecurity Seminar",
    description: "Learn about ethical hacking and network security.",
    date: "2025-01-18T14:00:00Z",
    time: "2:00 PM - 5:00 PM",
    location: "Online (Google Meet)",
    isOnline: true,
    maxParticipants: 100,
    registrations: 87,
    attendance: 76,
    status: "completed",
    type: "seminar",
    createdBy: "user_1",
  },
  {
    id: "evt_4",
    title: "Open Source Meetup",
    description: "Connect with open source enthusiasts and contribute to projects.",
    date: "2025-02-01T15:00:00Z",
    time: "3:00 PM - 6:00 PM",
    location: "Community Center, Chennai",
    isOnline: false,
    maxParticipants: 30,
    registrations: 12,
    attendance: 0,
    status: "draft",
    type: "meetup",
    createdBy: "user_1",
  },
]

// ============================================================
// STUDENTS
// ============================================================

const mockStudents: MockStudent[] = [
  {
    id: "stu_1",
    name: "Alex Kumar",
    email: "alex@email.com",
    college: "MIT",
    skills: ["React", "Node.js", "Python", "Machine Learning"],
    interests: ["AI", "Web Dev", "Open Source"],
    github: "https://github.com/alexk",
    linkedin: "https://linkedin.com/in/alexk",
    communityScore: 98,
    coursesCompleted: 12,
    projectsCount: 8,
    certificatesCount: 15,
    status: "active",
  },
  {
    id: "stu_2",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    college: "Stanford",
    skills: ["TypeScript", "React", "AWS", "Docker"],
    interests: ["Cloud", "DevOps"],
    github: "https://github.com/sarahj",
    communityScore: 96,
    coursesCompleted: 10,
    projectsCount: 6,
    certificatesCount: 12,
    status: "active",
  },
  {
    id: "stu_3",
    name: "Mike Chen",
    email: "mike@email.com",
    college: "UC Berkeley",
    skills: ["Python", "TensorFlow", "PyTorch"],
    interests: ["ML", "AI", "Research"],
    github: "https://github.com/mikechen",
    communityScore: 94,
    coursesCompleted: 8,
    projectsCount: 5,
    certificatesCount: 10,
    status: "active",
  },
  {
    id: "stu_4",
    name: "Emily Davis",
    email: "emily@email.com",
    college: "Harvard",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    interests: ["Frontend", "Mobile"],
    github: "https://github.com/emilyd",
    portfolio: "https://emilyd.dev",
    communityScore: 92,
    coursesCompleted: 9,
    projectsCount: 7,
    certificatesCount: 11,
    status: "active",
  },
  {
    id: "stu_5",
    name: "Rahul Sharma",
    email: "rahul@email.com",
    college: "IIT Delhi",
    skills: ["Java", "Spring Boot", "Kubernetes"],
    interests: ["Backend", "System Design"],
    github: "https://github.com/rahuls",
    communityScore: 90,
    coursesCompleted: 7,
    projectsCount: 4,
    certificatesCount: 8,
    status: "active",
  },
  {
    id: "stu_6",
    name: "Lisa Wang",
    email: "lisa@email.com",
    college: "Carnegie Mellon",
    skills: ["Rust", "Go", "Systems"],
    interests: ["Web3", "Security"],
    github: "https://github.com/lisawang",
    communityScore: 88,
    coursesCompleted: 6,
    projectsCount: 3,
    certificatesCount: 7,
    status: "active",
  },
]

// ============================================================
// COURSES
// ============================================================

const mockCourses: MockCourse[] = [
  {
    id: "crs_1",
    title: "Complete Web Development Bootcamp",
    description: "Master HTML, CSS, JavaScript, React, Node.js and more.",
    category: "Web Development",
    level: "beginner",
    duration: "40 hours",
    enrolledStudents: 2345,
    rating: 4.8,
    status: "published",
  },
  {
    id: "crs_2",
    title: "Advanced Machine Learning with Python",
    description: "Deep dive into ML algorithms and neural networks.",
    category: "Machine Learning",
    level: "advanced",
    duration: "35 hours",
    enrolledStudents: 1876,
    rating: 4.9,
    status: "published",
  },
  {
    id: "crs_3",
    title: "Cybersecurity Fundamentals",
    description: "Learn ethical hacking and network security.",
    category: "Cybersecurity",
    level: "intermediate",
    duration: "25 hours",
    enrolledStudents: 1543,
    rating: 4.7,
    status: "published",
  },
  {
    id: "crs_4",
    title: "React Native Development",
    description: "Build cross-platform mobile apps.",
    category: "Mobile Development",
    level: "intermediate",
    duration: "30 hours",
    enrolledStudents: 1234,
    rating: 4.6,
    status: "published",
  },
  {
    id: "crs_5",
    title: "Data Structures & Algorithms",
    description: "Master DSA for coding interviews.",
    category: "Computer Science",
    level: "intermediate",
    duration: "45 hours",
    enrolledStudents: 3456,
    rating: 4.9,
    status: "published",
  },
]

// ============================================================
// CERTIFICATES
// ============================================================

const mockCertificates: MockCertificate[] = [
  {
    id: "cert_1",
    title: "Web Development Bootcamp Completion",
    recipientName: "Alex Kumar",
    recipientEmail: "alex@email.com",
    recipientCollege: "MIT",
    type: "course",
    verificationCode: "AEV-2025-WEB-001",
    status: "issued",
    issuedAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "cert_2",
    title: "AI Workshop Participation",
    recipientName: "Sarah Johnson",
    recipientEmail: "sarah@email.com",
    recipientCollege: "Stanford",
    type: "event",
    verificationCode: "AEV-2025-AI-042",
    status: "issued",
    issuedAt: "2025-01-08T10:00:00Z",
  },
  {
    id: "cert_3",
    title: "Best Project Award",
    recipientName: "Mike Chen",
    recipientEmail: "mike@email.com",
    recipientCollege: "UC Berkeley",
    type: "project",
    verificationCode: "AEV-2025-PRJ-015",
    status: "issued",
    issuedAt: "2025-01-05T10:00:00Z",
  },
]

// ============================================================
// DATA ACCESS FUNCTIONS
// ============================================================

// Forms
export const formsDB = {
  getAll: () => Promise.resolve(mockForms),
  getById: (id: string) => Promise.resolve(mockForms.find((f) => f.id === id)),
  getBySlug: (slug: string) => Promise.resolve(mockForms.find((f) => f.slug === slug)),
  create: (form: MockForm) => {
    mockForms.push(form)
    return Promise.resolve(form)
  },
  update: (id: string, updates: Partial<MockForm>) => {
    const index = mockForms.findIndex((f) => f.id === id)
    if (index !== -1) {
      mockForms[index] = { ...mockForms[index], ...updates }
      return Promise.resolve(mockForms[index])
    }
    return Promise.resolve(null)
  },
  delete: (id: string) => {
    const index = mockForms.findIndex((f) => f.id === id)
    if (index !== -1) {
      mockForms.splice(index, 1)
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
  },
  incrementViews: (id: string) => {
    const form = mockForms.find((f) => f.id === id)
    if (form) form.viewsCount++
    return Promise.resolve()
  },
  incrementResponses: (id: string) => {
    const form = mockForms.find((f) => f.id === id)
    if (form) form.responsesCount++
    return Promise.resolve()
  },
}

// Events
export const eventsDB = {
  getAll: () => Promise.resolve(mockEvents),
  getById: (id: string) => Promise.resolve(mockEvents.find((e) => e.id === id)),
  create: (event: MockEvent) => {
    mockEvents.push(event)
    return Promise.resolve(event)
  },
  update: (id: string, updates: Partial<MockEvent>) => {
    const index = mockEvents.findIndex((e) => e.id === id)
    if (index !== -1) {
      mockEvents[index] = { ...mockEvents[index], ...updates }
      return Promise.resolve(mockEvents[index])
    }
    return Promise.resolve(null)
  },
}

// Students
export const studentsDB = {
  getAll: () => Promise.resolve(mockStudents),
  getById: (id: string) => Promise.resolve(mockStudents.find((s) => s.id === id)),
  create: (student: MockStudent) => {
    mockStudents.push(student)
    return Promise.resolve(student)
  },
  update: (id: string, updates: Partial<MockStudent>) => {
    const index = mockStudents.findIndex((s) => s.id === id)
    if (index !== -1) {
      mockStudents[index] = { ...mockStudents[index], ...updates }
      return Promise.resolve(mockStudents[index])
    }
    return Promise.resolve(null)
  },
}

// Courses
export const coursesDB = {
  getAll: () => Promise.resolve(mockCourses),
  getById: (id: string) => Promise.resolve(mockCourses.find((c) => c.id === id)),
  create: (course: MockCourse) => {
    mockCourses.push(course)
    return Promise.resolve(course)
  },
}

// Certificates
export const certificatesDB = {
  getAll: () => Promise.resolve(mockCertificates),
  getById: (id: string) => Promise.resolve(mockCertificates.find((c) => c.id === id)),
  getByCode: (code: string) => Promise.resolve(mockCertificates.find((c) => c.verificationCode === code)),
  create: (cert: MockCertificate) => {
    mockCertificates.push(cert)
    return Promise.resolve(cert)
  },
}
