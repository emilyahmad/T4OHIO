-- Anonymous site insights: which devices visitors use and what they filter, search and order.
-- Run once in the SQL Editor (safe to re-run). Nothing personal is stored: no IP address, name,
-- email or account; just a random per-tab session id that is gone when the tab closes.

create table if not exists public.analytics_events (
    id          bigint generated always as identity primary key,
    created_at  timestamptz not null default now(),
    session_id  text not null check (char_length(session_id) <= 40),
    type        text not null check (type in ('visit', 'filter', 'search', 'item_view', 'order_add', 'quiz')),
    device      text not null check (device in ('mobile', 'tablet', 'desktop')),
    data        jsonb not null default '{}' check (pg_column_size(data) <= 1500)
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);

alter table public.analytics_events enable row level security;

-- Visitors can add events but never read them back; only admins can read (or clean up) the data.
drop policy if exists "Anyone can record an event" on public.analytics_events;
create policy "Anyone can record an event"
    on public.analytics_events for insert to anon, authenticated
    with check (true);

drop policy if exists "Admins can read events" on public.analytics_events;
create policy "Admins can read events"
    on public.analytics_events for select to authenticated
    using (public.is_admin());

drop policy if exists "Admins can delete events" on public.analytics_events;
create policy "Admins can delete events"
    on public.analytics_events for delete to authenticated
    using (public.is_admin());

grant insert on public.analytics_events to anon, authenticated;
grant select, delete on public.analytics_events to authenticated;
