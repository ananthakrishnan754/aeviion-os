-- Aeviion OS — Supabase Migration
-- Run this in the Supabase SQL Editor

-- ============================================================
-- EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS & AUTH
-- ============================================================
create table users (
  id uuid primary key default uuid_generate_v4(),
  email varchar(255) not null unique,
  name varchar(255) not null,
  avatar text,
  phone varchar(20),
  role varchar(50) not null default 'student',
  status varchar(20) default 'active',
  last_login timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table student_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade not null,
  college varchar(255),
  degree varchar(255),
  year integer,
  skills jsonb default '[]'::jsonb,
  interests jsonb default '[]'::jsonb,
  github text,
  linkedin text,
  portfolio text,
  resume text,
  bio text,
  community_score integer default 0
);

-- ============================================================
-- FORMS
-- ============================================================
create table forms (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  description text,
  slug varchar(255) not null unique,
  blocks jsonb default '[]'::jsonb,
  settings jsonb default '{}'::jsonb,
  status varchar(20) default 'draft',
  responses_count integer default 0,
  views_count integer default 0,
  created_by uuid references users(id),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  published_at timestamptz,
  closed_at timestamptz
);

create table form_responses (
  id uuid primary key default uuid_generate_v4(),
  form_id uuid references forms(id) on delete cascade not null,
  respondent_email varchar(255),
  respondent_name varchar(255),
  answers jsonb default '{}'::jsonb,
  metadata jsonb default '{}'::jsonb,
  status varchar(20) default 'submitted',
  submitted_at timestamptz default now() not null
);

-- ============================================================
-- EVENTS
-- ============================================================
create table events (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  description text,
  date timestamptz not null,
  end_date timestamptz,
  time varchar(50),
  location text,
  is_online boolean default true,
  meeting_url text,
  max_participants integer,
  registrations integer default 0,
  attendance integer default 0,
  status varchar(20) default 'draft',
  type varchar(50),
  thumbnail text,
  created_by uuid references users(id),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table event_registrations (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid references events(id) on delete cascade not null,
  user_id uuid references users(id) not null,
  status varchar(20) default 'registered',
  checked_in boolean default false,
  checked_in_at timestamptz,
  qr_code text,
  registered_at timestamptz default now() not null
);

-- ============================================================
-- COURSES & LEARNING
-- ============================================================
create table courses (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  description text,
  short_description varchar(500),
  category varchar(100),
  level varchar(20) default 'beginner',
  duration varchar(100),
  thumbnail text,
  price decimal(10,2) default 0,
  enrolled_students integer default 0,
  rating decimal(3,1) default 0,
  status varchar(20) default 'draft',
  created_by uuid references users(id),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table course_modules (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid references courses(id) on delete cascade not null,
  title varchar(255) not null,
  description text,
  "order" integer default 0,
  created_at timestamptz default now() not null
);

create table lessons (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references course_modules(id) on delete cascade not null,
  title varchar(255) not null,
  type varchar(20) default 'video',
  content text,
  video_url text,
  duration varchar(50),
  "order" integer default 0,
  is_free boolean default false,
  created_at timestamptz default now() not null
);

-- ============================================================
-- CERTIFICATES
-- ============================================================
create table certificates (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  recipient_id uuid references users(id),
  recipient_name varchar(255) not null,
  recipient_email varchar(255),
  recipient_college varchar(255),
  type varchar(50),
  event_name varchar(255),
  course_name varchar(255),
  project_id uuid,
  template_id uuid,
  verification_code varchar(100) not null,
  status varchar(20) default 'issued',
  issued_at timestamptz default now() not null,
  revoked_at timestamptz,
  revoked_reason text
);

create table certificate_templates (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null,
  description text,
  background_url text,
  layout jsonb default '{}'::jsonb,
  variables jsonb default '[]'::jsonb,
  usage_count integer default 0,
  created_by uuid references users(id),
  created_at timestamptz default now() not null
);

-- ============================================================
-- PROJECTS
-- ============================================================
create table projects (
  id uuid primary key default uuid_generate_v4(),
  title varchar(255) not null,
  description text,
  team_members jsonb default '[]'::jsonb,
  mentor_id uuid references users(id),
  tech_stack jsonb default '[]'::jsonb,
  category varchar(100),
  status varchar(20) default 'draft',
  github text,
  demo_url text,
  demo_video text,
  progress integer default 0,
  rating integer,
  feedback text,
  featured boolean default false,
  created_by uuid references users(id),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================================
-- COMMUNITY
-- ============================================================
create table communities (
  id uuid primary key default uuid_generate_v4(),
  name varchar(255) not null,
  description text,
  icon text,
  cover_image text,
  members integer default 0,
  is_public boolean default true,
  created_by uuid references users(id),
  created_at timestamptz default now() not null
);

create table community_members (
  id uuid primary key default uuid_generate_v4(),
  community_id uuid references communities(id) on delete cascade not null,
  user_id uuid references users(id) not null,
  role varchar(20) default 'member',
  joined_at timestamptz default now() not null
);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) not null,
  title varchar(255) not null,
  message text,
  type varchar(20) default 'info',
  read boolean default false,
  action_url text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- ACTIVITY LOGS
-- ============================================================
create table activity_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  action varchar(100) not null,
  entity varchar(100) not null,
  entity_id uuid,
  details jsonb default '{}'::jsonb,
  ip_address varchar(45),
  created_at timestamptz default now() not null
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_forms_slug on forms(slug);
create index idx_forms_status on forms(status);
create index idx_form_responses_form_id on form_responses(form_id);
create index idx_events_date on events(date);
create index idx_events_status on events(status);
create index idx_courses_category on courses(category);
create index idx_certificates_verification on certificates(verification_code);
create index idx_certificates_recipient on certificates(recipient_id);
create index idx_projects_status on projects(status);
create index idx_notifications_user on notifications(user_id);
create index idx_activity_logs_user on activity_logs(user_id);
create index idx_community_members_user on community_members(user_id);
