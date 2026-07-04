-- ============================================================================
-- Corelinks public website — enquiries table
-- Lets the public contact form save leads into your Supabase project.
-- Run once in the SAME Supabase project the management app uses
--   (project ref cbcvkctjspofvilwbhul), in the SQL Editor.
-- ============================================================================

create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  email       text,
  course      text,
  message     text,
  status      text not null default 'new',   -- new / contacted / enrolled / closed
  created_at  timestamptz not null default now()
);
create index if not exists idx_enquiries_created on public.enquiries(created_at desc);

alter table public.enquiries enable row level security;

-- Anyone (the public website, anon key) may SUBMIT an enquiry...
drop policy if exists enquiries_public_insert on public.enquiries;
create policy enquiries_public_insert on public.enquiries
  for insert to anon, authenticated with check (true);

-- ...but only staff/admin can READ or manage them (relies on public.is_staff()
-- from the management app's policies). If is_staff() doesn't exist, replace the
-- USING clause with: using (public.is_admin())
drop policy if exists enquiries_staff_read on public.enquiries;
create policy enquiries_staff_read on public.enquiries
  for all using (public.is_staff()) with check (public.is_staff());

-- ============================================================================
-- Upcoming Batches — shown on the public website Home page.
-- You update rows here (Supabase → Table Editor → upcoming_classes) any time.
-- ============================================================================
create table if not exists public.upcoming_classes (
  id          uuid primary key default gen_random_uuid(),
  course      text not null,                 -- e.g. 'CCNA (Routing & Switching)'
  instructor  text,                          -- instructor's name
  timing      text,                          -- e.g. '06:00 PM – 08:00 PM'
  start_date  date,                          -- batch starting date
  mode        text not null default 'On-campus',  -- 'Online' | 'On-campus' | 'Online & On-campus'
  seats       text,                          -- optional, e.g. 'Few seats left'
  active      boolean not null default true, -- untick to hide from the website
  sort        int not null default 0,        -- optional manual ordering
  created_at  timestamptz not null default now()
);
create index if not exists idx_upcoming_start on public.upcoming_classes(start_date);

alter table public.upcoming_classes enable row level security;
-- Public website (anon) can READ active rows...
drop policy if exists uc_public_read on public.upcoming_classes;
create policy uc_public_read on public.upcoming_classes
  for select to anon, authenticated using (active = true);
-- ...only staff/admin can add / edit / delete.
drop policy if exists uc_staff_all on public.upcoming_classes;
create policy uc_staff_all on public.upcoming_classes
  for all using (public.is_staff()) with check (public.is_staff());

-- Sample rows (safe to delete/replace with your real schedule)
insert into public.upcoming_classes (course, instructor, timing, start_date, mode, seats, sort)
select * from (values
  ('CCNA (Routing & Switching)', 'Sami Ullah',      '06:00 PM – 08:00 PM', date '2026-08-04', 'On-campus',            'Few seats left', 1),
  ('CCNP Enterprise',            'Muhammad Awais',   '04:00 PM – 06:00 PM', date '2026-08-11', 'Online & On-campus',   null,             2),
  ('MCSE (Microsoft)',           'Usman Khan',       '05:00 PM – 07:00 PM', date '2026-08-18', 'On-campus',            null,             3),
  ('AI CCTV & Video Analytics',  'Imran Khan',       '11:00 AM – 01:00 PM', date '2026-08-20', 'On-campus',            'Limited seats',  4),
  ('Certified Ethical Hacking',  'Fahad Ullah',      '07:00 PM – 09:00 PM', date '2026-08-25', 'Online',               null,             5),
  ('AWS Cloud (Associate)',      'Bilal Ahmed',      '08:00 PM – 10:00 PM', date '2026-09-01', 'Online',               null,             6)
) as v(course, instructor, timing, start_date, mode, seats, sort)
where not exists (select 1 from public.upcoming_classes);

notify pgrst, 'reload schema';
