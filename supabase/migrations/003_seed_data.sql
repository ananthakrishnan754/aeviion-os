-- Aeviion OS — Seed Data
-- Run AFTER migrations. Creates demo users via Supabase Auth + public.users

-- ============================================================
-- DEMO USERS (via Supabase Auth)
-- Password for all: demo1234
-- ============================================================

-- Admin
insert into auth.users (id, email, raw_user_meta_data, encrypted_password, email_confirmed_at, created_at)
values (
  'a0000000-0000-0000-0000-000000000001',
  'admin@aeviion.com',
  '{"name": "Admin User", "role": "admin"}'::jsonb,
  crypt('demo1234', gen_salt('bf')),
  now(),
  now()
);

-- Mentor
insert into auth.users (id, email, raw_user_meta_data, encrypted_password, email_confirmed_at, created_at)
values (
  'a0000000-0000-0000-0000-000000000002',
  'mentor@aeviion.com',
  '{"name": "Mentor Singh", "role": "mentor"}'::jsonb,
  crypt('demo1234', gen_salt('bf')),
  now(),
  now()
);

-- Student 1
insert into auth.users (id, email, raw_user_meta_data, encrypted_password, email_confirmed_at, created_at)
values (
  'a0000000-0000-0000-0000-000000000003',
  'student@aeviion.com',
  '{"name": "Anantha Krishnan", "role": "student"}'::jsonb,
  crypt('demo1234', gen_salt('bf')),
  now(),
  now()
);

-- Student 2
insert into auth.users (id, email, raw_user_meta_data, encrypted_password, email_confirmed_at, created_at)
values (
  'a0000000-0000-0000-0000-000000000004',
  'priya@aeviion.com',
  '{"name": "Priya Sharma", "role": "student"}'::jsonb,
  crypt('demo1234', gen_salt('bf')),
  now(),
  now()
);

-- Student 3
insert into auth.users (id, email, raw_user_meta_data, encrypted_password, email_confirmed_at, created_at)
values (
  'a0000000-0000-0000-0000-000000000005',
  'rahul@aeviion.com',
  '{"name": "Rahul Patel", "role": "student"}'::jsonb,
  crypt('demo1234', gen_salt('bf')),
  now(),
  now()
);

-- ============================================================
-- STUDENT PROFILES
-- ============================================================
insert into student_profiles (user_id, college, degree, year, skills, interests, github, linkedin, bio, community_score)
values
  ('a0000000-0000-0000-0000-000000000003', 'VIT Vellore', 'B.Tech CSE', 3, '["React","Node.js","Python","TypeScript"]'::jsonb, '["AI/ML","Web Dev","Open Source"]'::jsonb, 'https://github.com/ananthakrishnan754', 'https://linkedin.com/in/ananthakrishnan754', 'Full-stack developer passionate about AI and open source.', 850),
  ('a0000000-0000-0000-0000-000000000004', 'SRM Chennai', 'B.Tech IT', 2, '["JavaScript","React","Figma"]'::jsonb, '["UI/UX","Product Design"]'::jsonb, 'https://github.com/priyasharma', 'https://linkedin.com/in/priyasharma', 'Design-minded developer building beautiful interfaces.', 720),
  ('a0000000-0000-0000-0000-000000000005', 'Anna University', 'B.Tech CSE', 3, '["Java","Spring Boot","SQL","AWS"]'::jsonb, '["Cloud","Backend","DevOps"]'::jsonb, 'https://github.com/rahulpatel', 'https://linkedin.com/in/rahulpatel', 'Backend engineer exploring cloud-native architectures.', 680);

-- ============================================================
-- DEMO FORMS
-- ============================================================
insert into forms (title, description, slug, blocks, settings, status, responses_count, views_count, created_by)
values
  (
    'Welcome Survey',
    'Tell us about yourself and your learning goals',
    'welcome-survey',
    '[
      {"id":"b1","type":"heading","label":"Welcome to Aeviion!","required":false,"width":"full"},
      {"id":"b2","type":"text","label":"Your Name","required":true,"placeholder":"Enter your full name","width":"full"},
      {"id":"b3","type":"email","label":"Email Address","required":true,"width":"full"},
      {"id":"b4","type":"select","label":"Current Year","required":true,"options":["1st Year","2nd Year","3rd Year","4th Year","Graduate"],"width":"half"},
      {"id":"b5","type":"select","label":"Primary Interest","required":true,"options":["Web Development","AI/ML","Cloud Computing","Mobile Dev","Cybersecurity"],"width":"half"},
      {"id":"b6","type":"textarea","label":"What do you hope to achieve?","required":false,"width":"full"}
    ]'::jsonb,
    '{"submitButtonText":"Complete Survey","successMessage":"Welcome aboard! 🎉","theme":"dark"}'::jsonb,
    'published',
    47,
    132,
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    'Event Feedback',
    'Rate your experience at our latest event',
    'event-feedback',
    '[
      {"id":"b1","type":"rating","label":"Overall Experience","required":true,"width":"full"},
      {"id":"b2","type":"textarea","label":"What did you enjoy most?","required":false,"width":"full"},
      {"id":"b3","type":"textarea","label":"Suggestions for improvement","required":false,"width":"full"},
      {"id":"b4","type":"mcq","label":"Would you attend again?","required":true,"options":["Definitely","Maybe","Probably not"],"width":"full"}
    ]'::jsonb,
    '{"submitButtonText":"Submit Feedback","theme":"dark"}'::jsonb,
    'published',
    31,
    89,
    'a0000000-0000-0000-0000-000000000001'
  );

-- ============================================================
-- DEMO EVENTS
-- ============================================================
insert into events (title, description, date, time, location, is_online, max_participants, registrations, status, type, created_by)
values
  (
    'AI/ML Workshop 2025',
    'Hands-on workshop covering machine learning fundamentals with Python',
    now() + interval '7 days',
    '10:00 AM - 4:00 PM',
    'Online (Zoom)',
    true,
    200,
    156,
    'published',
    'workshop',
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    'Hackathon: Build for Bharat',
    '48-hour hackathon focused on solving real Indian problems',
    now() + interval '14 days',
    '9:00 AM - 6:00 PM',
    'VIT Vellore, Block A',
    false,
    100,
    78,
    'published',
    'hackathon',
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    'Industry Talk: Life at Google',
    'Software engineers from Google share their journey and tips',
    now() + interval '3 days',
    '6:00 PM - 7:30 PM',
    'Online (Google Meet)',
    true,
    500,
    423,
    'upcoming',
    'talk',
    'a0000000-0000-0000-0000-000000000001'
  );

-- ============================================================
-- DEMO COURSES
-- ============================================================
insert into courses (title, description, short_description, category, level, duration, enrolled_students, rating, status, created_by)
values
  (
    'Full-Stack Web Development',
    'Complete guide to building modern web apps with React, Node.js, and databases',
    'Learn React, Node.js, PostgreSQL, and deploy to production',
    'Web Development',
    'intermediate',
    '12 weeks',
    234,
    4.8,
    'published',
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    'Machine Learning Fundamentals',
    'Introduction to ML concepts, algorithms, and practical implementation',
    'Master ML basics with Python, scikit-learn, and TensorFlow',
    'AI/ML',
    'beginner',
    '8 weeks',
    189,
    4.6,
    'published',
    'a0000000-0000-0000-0000-000000000001'
  ),
  (
    'Cloud Architecture with AWS',
    'Design and deploy scalable cloud solutions on AWS',
    'Learn EC2, S3, Lambda, and more',
    'Cloud Computing',
    'intermediate',
    '6 weeks',
    112,
    4.7,
    'published',
    'a0000000-0000-0000-0000-000000000001'
  );

-- ============================================================
-- DEMO CERTIFICATES
-- ============================================================
insert into certificates (title, recipient_name, recipient_email, recipient_college, type, event_name, verification_code, status)
values
  (
    'Certificate of Participation — AI/ML Workshop',
    'Anantha Krishnan',
    'student@aeviion.com',
    'VIT Vellore',
    'event',
    'AI/ML Workshop 2025',
    'AEV-2025-AIML-001',
    'issued'
  ),
  (
    'Certificate of Completion — Web Dev Course',
    'Priya Sharma',
    'priya@aeviion.com',
    'SRM Chennai',
    'course',
    null,
    'AEV-2025-WEBD-002',
    'issued'
  );

-- ============================================================
-- DEMO PROJECTS
-- ============================================================
insert into projects (title, description, team_members, tech_stack, category, status, github, demo_url, progress, featured, created_by)
values
  (
    'Aeviion OS',
    'Complete EdTech admin dashboard with form builder, analytics, and more',
    '["Anantha Krishnan","Priya Sharma"]'::jsonb,
    '["Next.js","React","TypeScript","Tailwind CSS","Supabase"]'::jsonb,
    'Web Development',
    'in-progress',
    'https://github.com/ananthakrishnan754/aeviion-os',
    null,
    75,
    true,
    'a0000000-0000-0000-0000-000000000003'
  ),
  (
    'StudyBuddy AI',
    'AI-powered study assistant that generates flashcards and quizzes from notes',
    '["Rahul Patel","Anantha Krishnan"]'::jsonb,
    '["Python","FastAPI","OpenAI","React"]'::jsonb,
    'AI/ML',
    'completed',
    'https://github.com/rahulpatel/studybuddy-ai',
    'https://studybuddy.demo.com',
    100,
    true,
    'a0000000-0000-0000-0000-000000000005'
  );
