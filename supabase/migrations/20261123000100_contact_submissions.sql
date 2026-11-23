-- BC Labs website enquiries and private admin workspace.
-- Public visitors submit through the Next.js API using a server-only service key.
-- Dashboard reads and updates are only performed after a server-side admin allowlist check.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 140),
  email text not null check (char_length(email) between 3 and 254),
  organisation text not null default '' check (char_length(organisation) <= 180),
  country text not null default '' check (char_length(country) <= 100),
  service text not null check (char_length(service) between 1 and 180),
  selected_modules text[] not null default '{}',
  message text not null check (char_length(message) between 1 and 8000),
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'qualified', 'won', 'lost', 'spam')),
  admin_notes text not null default '' check (char_length(admin_notes) <= 8000)
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_status_created_at_idx
  on public.contact_submissions (status, created_at desc);

create or replace function public.set_contact_submission_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contact_submissions_updated_at on public.contact_submissions;
create trigger contact_submissions_updated_at
before update on public.contact_submissions
for each row execute function public.set_contact_submission_updated_at();

alter table public.contact_submissions enable row level security;

-- Do not permit browser/anon clients to read or modify lead data.
revoke all on table public.contact_submissions from anon, authenticated;
grant all on table public.contact_submissions to service_role;
