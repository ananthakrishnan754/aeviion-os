# Aeviion OS — Supabase Setup Guide

## Quick Start (5 minutes)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) → Sign in
2. Click **"New Project"**
3. Fill in:
   - **Organization**: Create new or select existing
   - **Project name**: `aeviion-os`
   - **Database password**: Generate a strong password (save it!)
   - **Region**: Select closest to your users (e.g., `ap-south-1` for India)
4. Click **"Create new project"** — wait ~2 minutes

### Step 2: Get Your Keys

1. Go to **Settings** → **API** (left sidebar)
2. Copy these two values:
   - **Project URL**: `https://xxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOi...`

### Step 3: Update Environment Variables

Edit `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your-anon-key...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Aeviion OS
```

### Step 4: Run SQL Migrations

Go to **SQL Editor** in Supabase dashboard and run these files **in order**:

1. **`supabase/migrations/001_initial_schema.sql`** — Creates all 16 tables
2. **`supabase/migrations/002_rls_policies.sql`** — Sets up row-level security
3. **`supabase/migrations/003_seed_data.sql`** — Inserts demo data

> Copy the contents of each file and paste into the SQL Editor, then click **"Run"**.

### Step 5: Create Demo User Accounts

The seed SQL creates auth users. You also need to create them via Supabase Dashboard:

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Create these accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@aeviion.com | demo1234 | admin |
| mentor@aeviion.com | demo1234 | mentor |
| student@aeviion.com | demo1234 | student |

> Or use the SQL Editor to run the seed file which creates them automatically.

### Step 6: Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Under **Email**, make sure:
   - **Confirm email** is OFF (for demo purposes)
   - **Enable email provider** is ON

### Step 7: Run the App

```bash
cd /home/ananthakrishnan/aeviion-os
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → Login with any demo account.

---

## What's Set Up

| Feature | Status |
|---------|--------|
| Auth (login/signup/logout) | ✅ |
| Protected routes (middleware) | ✅ |
| Row-Level Security (RLS) | ✅ |
| Auto-create user on signup | ✅ |
| Demo seed data | ✅ |
| Login/Signup pages | ✅ |
| Auth callback route | ✅ |

## Architecture

```
src/lib/supabase/
├── client.ts       # Browser client (use in "use client" components)
├── server.ts       # Server client (use in API routes, Server Components)
└── middleware.ts    # Auth middleware (protects all routes)

src/middleware.ts    # Next.js middleware entry point

supabase/migrations/
├── 001_initial_schema.sql   # All 16 tables
├── 002_rls_policies.sql     # Row-Level Security
└── 003_seed_data.sql        # Demo users + data
```

## RLS Policy Summary

| Table | Read | Write |
|-------|------|-------|
| users | Own profile + Admins | Admins + Own profile |
| forms | Published + Own | Admins |
| form_responses | Admins + Form creators | Anyone (submit) |
| events | Published | Admins |
| courses | Published | Admins |
| certificates | Anyone (verify) | Admins |
| projects | Published/Featured | Admins + Creators |
| communities | Public | Admins |
| notifications | Own | Admins (create) |
| activity_logs | Admins | System |

## Troubleshooting

**"Invalid API key"** → Check `.env.local` matches your Supabase project settings

**Tables not found** → Run the SQL migrations in order

**Users not auto-created** → Check the `handle_new_user()` trigger is created (migration 002)

**Login fails** → Check email auth is enabled and demo users exist
