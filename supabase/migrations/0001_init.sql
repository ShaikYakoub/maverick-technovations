-- ============================================================
-- Mavericks Technovations — Initial Schema
-- ============================================================

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- leads
-- Stores every inbound lead from the website lead-gen drawer.
-- ------------------------------------------------------------
create table if not exists public.leads (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null    default now(),
  name          text        not null,
  whatsapp      text        not null,
  email         text        not null,
  intent        text        not null check (intent in ('marketing', 'training')),
  source_page   text,
  source_city   text,
  contacted     boolean     not null default false,
  notes         text
);

comment on table public.leads is
  'Inbound leads captured from the website conversion funnel.';

-- ------------------------------------------------------------
-- analytics_events
-- Lightweight event tracking for funnel analytics.
-- ------------------------------------------------------------
create table if not exists public.analytics_events (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  event_name  text        not null,
  properties  jsonb       not null    default '{}'
);

comment on table public.analytics_events is
  'Lightweight client-side funnel events. No PII stored directly.';

-- ------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------
alter table public.leads            enable row level security;
alter table public.analytics_events enable row level security;

-- Anonymous clients can INSERT leads (form submission) but cannot read them.
create policy "anon_insert_leads"
  on public.leads for insert
  to anon
  with check (true);

-- Service role can read and manage all leads (used server-side only).
create policy "service_role_all_leads"
  on public.leads for all
  to service_role
  using (true)
  with check (true);

-- Anonymous clients can INSERT analytics events.
create policy "anon_insert_analytics"
  on public.analytics_events for insert
  to anon
  with check (true);

-- Service role can read all analytics.
create policy "service_role_all_analytics"
  on public.analytics_events for all
  to service_role
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------
create index if not exists leads_created_at_idx   on public.leads (created_at desc);
create index if not exists leads_intent_idx        on public.leads (intent);
create index if not exists leads_contacted_idx     on public.leads (contacted) where contacted = false;
create index if not exists analytics_event_name_idx
  on public.analytics_events (event_name, created_at desc);
