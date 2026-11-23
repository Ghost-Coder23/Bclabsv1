-- Website content managed by authorised BC Labs administrators.
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('project', 'article')),
  title text not null check (char_length(title) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category text not null default '' check (char_length(category) <= 100),
  summary text not null default '' check (char_length(summary) <= 600),
  body text not null default '' check (char_length(body) <= 30000),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_content_kind_status_created_idx
  on public.site_content (kind, status, created_at desc);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
before update on public.site_content
for each row execute function public.set_site_content_updated_at();

alter table public.site_content enable row level security;
revoke all on table public.site_content from anon, authenticated;
grant select on table public.site_content to anon, authenticated;
grant all on table public.site_content to service_role;

drop policy if exists "Published website content is publicly readable" on public.site_content;
create policy "Published website content is publicly readable"
  on public.site_content
  for select
  to anon, authenticated
  using (status = 'published');
