-- Aeviion OS — Row-Level Security Policies
-- Run AFTER the initial schema migration

-- ============================================================
-- Enable RLS on all tables
-- ============================================================
alter table users enable row level security;
alter table student_profiles enable row level security;
alter table forms enable row level security;
alter table form_responses enable row level security;
alter table events enable row level security;
alter table event_registrations enable row level security;
alter table courses enable row level security;
alter table course_modules enable row level security;
alter table lessons enable row level security;
alter table certificates enable row level security;
alter table certificate_templates enable row level security;
alter table projects enable row level security;
alter table communities enable row level security;
alter table community_members enable row level security;
alter table notifications enable row level security;
alter table activity_logs enable row level security;

-- ============================================================
-- Helper: get current user's role
-- ============================================================
create or replace function get_user_role()
returns varchar as $$
  select role from users where id = auth.uid();
$$ language sql security definer stable;

create or replace function is_admin_or_above()
returns boolean as $$
  select get_user_role() in ('admin', 'cto', 'ceo', 'clo', 'cco', 'cpo', 'coo');
$$ language sql security definer stable;

-- ============================================================
-- USERS
-- ============================================================
create policy "Users can view own profile"
  on users for select
  using (id = auth.uid());

create policy "Admins can view all users"
  on users for select
  using (is_admin_or_above());

create policy "Admins can insert users"
  on users for insert
  with check (is_admin_or_above());

create policy "Admins can update users"
  on users for update
  using (is_admin_or_above());

create policy "Users can update own profile"
  on users for update
  using (id = auth.uid());

create policy "Admins can delete users"
  on users for delete
  using (is_admin_or_above());

-- ============================================================
-- STUDENT PROFILES
-- ============================================================
create policy "Students can view own profile"
  on student_profiles for select
  using (user_id = auth.uid());

create policy "Admins can view all student profiles"
  on student_profiles for select
  using (is_admin_or_above());

create policy "Students can update own profile"
  on student_profiles for update
  using (user_id = auth.uid());

create policy "Admins can manage student profiles"
  on student_profiles for all
  using (is_admin_or_above());

-- ============================================================
-- FORMS
-- ============================================================
create policy "Anyone can view published forms"
  on forms for select
  using (status = 'published');

create policy "Admins can manage all forms"
  on forms for all
  using (is_admin_or_above());

create policy "Creators can view own forms"
  on forms for select
  using (created_by = auth.uid());

-- ============================================================
-- FORM RESPONSES
-- ============================================================
create policy "Anyone can submit form responses"
  on form_responses for insert
  with check (true);

create policy "Admins can view all responses"
  on form_responses for select
  using (is_admin_or_above());

create policy "Form creators can view responses"
  on form_responses for select
  using (
    exists (
      select 1 from forms
      where forms.id = form_responses.form_id
      and forms.created_by = auth.uid()
    )
  );

-- ============================================================
-- EVENTS
-- ============================================================
create policy "Anyone can view published events"
  on events for select
  using (status = 'published' or status = 'upcoming');

create policy "Admins can manage events"
  on events for all
  using (is_admin_or_above());

-- ============================================================
-- EVENT REGISTRATIONS
-- ============================================================
create policy "Users can register for events"
  on event_registrations for insert
  with check (user_id = auth.uid());

create policy "Users can view own registrations"
  on event_registrations for select
  using (user_id = auth.uid());

create policy "Admins can manage registrations"
  on event_registrations for all
  using (is_admin_or_above());

-- ============================================================
-- COURSES
-- ============================================================
create policy "Anyone can view published courses"
  on courses for select
  using (status = 'published');

create policy "Admins can manage courses"
  on courses for all
  using (is_admin_or_above());

-- ============================================================
-- COURSE MODULES
-- ============================================================
create policy "Anyone can view course modules"
  on course_modules for select
  using (true);

create policy "Admins can manage course modules"
  on course_modules for all
  using (is_admin_or_above());

-- ============================================================
-- LESSONS
-- ============================================================
create policy "Anyone can view lessons"
  on lessons for select
  using (true);

create policy "Admins can manage lessons"
  on lessons for all
  using (is_admin_or_above());

-- ============================================================
-- CERTIFICATES
-- ============================================================
create policy "Anyone can verify certificates"
  on certificates for select
  using (true);

create policy "Admins can manage certificates"
  on certificates for all
  using (is_admin_or_above());

create policy "Users can view own certificates"
  on certificates for select
  using (recipient_id = auth.uid());

-- ============================================================
-- CERTIFICATE TEMPLATES
-- ============================================================
create policy "Admins can manage templates"
  on certificate_templates for all
  using (is_admin_or_above());

-- ============================================================
-- PROJECTS
-- ============================================================
create policy "Anyone can view published projects"
  on projects for select
  using (status = 'published' or featured = true);

create policy "Admins can manage projects"
  on projects for all
  using (is_admin_or_above());

create policy "Creators can manage own projects"
  on projects for all
  using (created_by = auth.uid());

-- ============================================================
-- COMMUNITIES
-- ============================================================
create policy "Anyone can view public communities"
  on communities for select
  using (is_public = true);

create policy "Admins can manage communities"
  on communities for all
  using (is_admin_or_above());

-- ============================================================
-- COMMUNITY MEMBERS
-- ============================================================
create policy "Users can view community members"
  on community_members for select
  using (true);

create policy "Users can join communities"
  on community_members for insert
  with check (user_id = auth.uid());

create policy "Users can leave communities"
  on community_members for delete
  using (user_id = auth.uid());

-- ============================================================
-- NOTIFICATIONS
-- ============================================================
create policy "Users can view own notifications"
  on notifications for select
  using (user_id = auth.uid());

create policy "Users can update own notifications"
  on notifications for update
  using (user_id = auth.uid());

create policy "Admins can send notifications"
  on notifications for insert
  with check (is_admin_or_above());

-- ============================================================
-- ACTIVITY LOGS
-- ============================================================
create policy "Admins can view activity logs"
  on activity_logs for select
  using (is_admin_or_above());

create policy "System can insert activity logs"
  on activity_logs for insert
  with check (true);

-- ============================================================
-- AUTH: Auto-create user record on signup
-- ============================================================
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'student')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
