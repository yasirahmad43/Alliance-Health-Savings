-- Leads captured by POST /api/lead. Same shape as the American Healthcare
-- Choice table so the shared lead route writes every payload column.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  state text not null,
  household text,
  pre_existing text,
  timing text,
  first_name text not null,
  last_name text,
  email text not null,
  phone text not null,
  consent boolean not null default true,
  source text,
  form_location text,
  channel text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  gclid text,
  fbclid text,
  msclkid text,
  ttclid text,
  referrer text,
  landing_page text,
  submitted_at timestamptz
);

-- Insert-only for the publishable key; reading leads needs the dashboard or
-- the service-role key.
alter table public.leads enable row level security;
drop policy if exists "anon can insert leads" on public.leads;
create policy "anon can insert leads" on public.leads
  for insert to anon, authenticated with check (true);
