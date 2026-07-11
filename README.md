# Aeviion OS

> The internal operating system that powers education, community, events, fellowships, partnerships, and student growth.

## Overview

Aeviion OS is a modular platform designed for EdTech organizations. It provides a comprehensive suite of tools for managing students, courses, events, certificates, and more. Every employee logs into the same platform and sees different modules based on their role.

## Features

### Core Modules

- **Dashboard** - Role-specific overview with KPIs and quick actions
- **Student Database** - Complete student profiles with skills, courses, and progress
- **Event Management** - Create, manage, and track workshops, bootcamps, and seminars
- **Learning Management** - Courses, modules, lessons, and assignments
- **Form Builder** - Typeform-style form creation with drag-and-drop
- **Certificate System** - Generate, manage, and verify certificates
- **Analytics** - Track growth, engagement, and performance metrics

### Additional Modules

- **Community** - Manage communities, channels, and discussions
- **Fellowship** - Batches, mentors, weekly reviews, and graduation
- **Projects** - Track student projects with Kanban boards and mentor reviews
- **Portfolio** - Auto-generated student portfolios
- **CRM** - Lead management and pipeline tracking
- **Marketing** - Campaigns, email, WhatsApp, and newsletters
- **Careers** - Job postings, applications, and talent search
- **Alumni** - Directory, networking, and mentoring

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Lucide React** - Icons

### State Management

- **Zustand** - Lightweight state management

### Forms

- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Tables

- **TanStack Table** - Headless table library

### Charts

- **Recharts** - React charting library

### Search

- **Fuse.js** - Fuzzy search

### Rich Text

- **TipTap** - Extensible rich text editor

### Backend

- **Supabase** - Authentication, database, and storage
- **Drizzle ORM** - Type-safe ORM
- **PostgreSQL** - Database

### Deployment

- **Vercel** - Frontend deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/aeviion-os.git

# Navigate to project directory
cd aeviion-os

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
aeviion-os/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/         # Dashboard page
│   │   ├── community/         # Community module
│   │   ├── learning/          # Learning management
│   │   ├── events/            # Event management
│   │   ├── forms/             # Form builder
│   │   ├── projects/          # Project management
│   │   ├── certificates/      # Certificate system
│   │   ├── analytics/         # Analytics dashboard
│   │   ├── settings/          # Settings pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # UI components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── forms/            # Form builder components
│   │   ├── events/           # Event components
│   │   ├── students/         # Student components
│   │   ├── community/        # Community components
│   │   ├── learning/         # Learning components
│   │   ├── certificates/     # Certificate components
│   │   └── analytics/        # Analytics components
│   ├── lib/                   # Utility functions
│   │   ├── utils.ts          # General utilities
│   │   ├── supabase/         # Supabase client
│   │   └── db/               # Database schema
│   ├── store/                 # Zustand stores
│   ├── types/                 # TypeScript types
│   └── hooks/                 # Custom hooks
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## User Roles

| Role | Permissions |
|------|------------|
| CEO | Full access to all modules |
| CTO | Users, Platform, Analytics (no Finance) |
| CLO | Learning, Courses, Fellowships |
| CCO | Community, Events, Volunteers |
| CPO | Partnerships, Careers |
| COO | Operations, Forms, Analytics |
| Admin | System administration |
| Mentor | Assigned students, Reviews, Attendance |
| Instructor | Course management, Student progress |
| Organizer | Event creation and management |
| Student | Own dashboard, Courses, Projects |
| Alumni | Directory, Networking, Mentoring |

## Development Phases

### Phase 1 ✅
- Authentication & RBAC
- Dashboard
- Form Builder MVP
- Event registration
- Student database
- Certificates

### Phase 2 🚧
- Learning Management
- Assessments
- Fellowship
- Mentor dashboard
- Project management (basic)

### Phase 3 📋
- Portfolio
- Careers
- CRM
- Marketing
- Analytics

### Phase 4 🔮
- AI integration
- Third-party integrations
- Advanced workflows
- Industry simulation
- GitHub integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@aeviion.com or join our Slack channel.
