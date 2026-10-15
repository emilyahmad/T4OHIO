-- T4 Ohio database schema.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run. Then run seed.sql.
--
-- Security model (enforced by the database, not the website):
--   • anyone can READ the menu
--   • only users listed in public.admins can CHANGE it
--   • admins can only be added from this SQL editor, never from the site

-- ── Tables ─────────────────────────────────────────────

create table public.categories (
    id          text primary key,
    name        text not null,
    sort_order  int  not null default 0
);

create table public.menu_items (
    id           text primary key,
    category_id  text not null references public.categories (id) on delete cascade,
    name         text not null,
    price        numeric(6, 2) not null check (price >= 0),
    image        text,                              -- null → the site shows the T4 logo
    alt          text,                              -- null → the item name is used
    tags         text[] not null default '{}',      -- filter tags: Hot, Cold, Vegan, …
    modifiers    text[] not null default '{}',      -- customization groups: ice, sweetness, …
    badge        text,
    available    boolean not null default true,     -- false → sold out
    sort_order   int not null default 0
);

create index menu_items_category_id_idx on public.menu_items (category_id);

create table public.admins (
    user_id  uuid primary key references auth.users (id) on delete cascade
);

-- True when the signed-in user is in public.admins.
-- security definer lets it read admins without exposing that table to everyone.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- ── Row level security ─────────────────────────────────

alter table public.categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.admins     enable row level security;

create policy "Anyone can read categories"
    on public.categories for select to anon, authenticated
    using (true);

create policy "Admins can change categories"
    on public.categories for all to authenticated
    using (public.is_admin()) with check (public.is_admin());

create policy "Anyone can read menu items"
    on public.menu_items for select to anon, authenticated
    using (true);

create policy "Admins can change menu items"
    on public.menu_items for all to authenticated
    using (public.is_admin()) with check (public.is_admin());

-- No insert/update/delete policies on admins: rows can only be added from the SQL editor.
create policy "Users can see their own admin row"
    on public.admins for select to authenticated
    using (user_id = (select auth.uid()));

-- ── API access ─────────────────────────────────────────

grant select on public.categories, public.menu_items to anon, authenticated;
grant insert, update, delete on public.categories, public.menu_items to authenticated;
grant select on public.admins to authenticated;
grant execute on function public.is_admin() to anon, authenticated;
