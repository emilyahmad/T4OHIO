-- Admin dashboard: editable front page, one-step menu saving, and image uploads.
-- Run once after schema.sql and seed.sql (SQL Editor → New query → paste → Run).

-- ── Front page content ─────────────────────────────────
-- One row per section ('hero', 'seasonal'); the section's fields live in `content`.

create table public.site_content (
    key         text primary key,
    content     jsonb not null,
    updated_at  timestamptz not null default now(),
    updated_by  uuid references auth.users (id) on delete set null
);

-- Stamp every change with when and who, so the dashboard can show "last updated".
create or replace function public.stamp_site_content()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at := now();
    new.updated_by := (select auth.uid());
    return new;
end;
$$;

create trigger stamp_site_content
    before insert or update on public.site_content
    for each row execute function public.stamp_site_content();

alter table public.site_content enable row level security;

create policy "Anyone can read site content"
    on public.site_content for select to anon, authenticated
    using (true);

create policy "Admins can change site content"
    on public.site_content for all to authenticated
    using (public.is_admin()) with check (public.is_admin());

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

-- What the front page showed before it moved to the database.
insert into public.site_content (key, content) values
    ('hero', '{
        "title": "T4 Ohio",
        "subtitle1": "A cup of tea for you",
        "subtitle2": "清茶达人",
        "image": "img/hero-img.png",
        "alt": "Two hands adjusting a set up of four tea cups on a wooden basket with a brown plant on the right side."
    }'),
    ('seasonal', '{
        "title": "Seasonal",
        "subtitle": "Stay up-to-date with new drinks, snacks, upcoming events and promotions",
        "cards": [
            {"id": "poster-1", "image": "img/posters/poster1.png", "alt": "A poster of a tiramisu frappe boba drink", "description": "A rich and creamy milk tea layered with soft cake textures and chewy boba for a perfectly indulgent treat.", "visible": true},
            {"id": "poster-2", "image": "img/posters/poster2.png", "alt": "A poster of a boba cake milk tea drink", "description": "A smooth iced coffee topped with a velvety sea salt cream foam that creates the perfect balance of sweet and savory.", "visible": true},
            {"id": "poster-3", "image": "img/posters/poster3.png", "alt": "A poster of a cream crown sea salt coffee boba tea drink", "description": "A smooth iced coffee topped with a velvety sea salt cream foam that creates the perfect balance of sweet and savory.", "visible": true}
        ]
    }')
on conflict (key) do nothing;

-- ── Saving the menu ────────────────────────────────────
-- Replaces the whole menu with the admin's edited copy in one transaction:
-- either every change lands or none do, so customers never see a half-saved menu.
-- security invoker: runs as the signed-in user, so the row level security above still applies.

create or replace function public.save_menu(p_categories jsonb, p_items jsonb)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
    if not public.is_admin() then
        raise exception 'Only admins can change the menu' using errcode = '42501';
    end if;

    delete from public.menu_items
    where id not in (select x.id from jsonb_populate_recordset(null::public.menu_items, p_items) x);

    delete from public.categories
    where id not in (select x.id from jsonb_populate_recordset(null::public.categories, p_categories) x);

    insert into public.categories (id, name, sort_order)
    select x.id, x.name, x.sort_order
    from jsonb_populate_recordset(null::public.categories, p_categories) x
    on conflict (id) do update set
        name       = excluded.name,
        sort_order = excluded.sort_order;

    insert into public.menu_items (id, category_id, name, price, image, alt, tags, modifiers, badge, available, sort_order)
    select x.id, x.category_id, x.name, x.price, x.image, x.alt,
           coalesce(x.tags, '{}'), coalesce(x.modifiers, '{}'), x.badge, coalesce(x.available, true), x.sort_order
    from jsonb_populate_recordset(null::public.menu_items, p_items) x
    on conflict (id) do update set
        category_id = excluded.category_id,
        name        = excluded.name,
        price       = excluded.price,
        image       = excluded.image,
        alt         = excluded.alt,
        tags        = excluded.tags,
        modifiers   = excluded.modifiers,
        badge       = excluded.badge,
        available   = excluded.available,
        sort_order  = excluded.sort_order;
end;
$$;

revoke execute on function public.save_menu(jsonb, jsonb) from public, anon;
grant execute on function public.save_menu(jsonb, jsonb) to authenticated;

-- ── Image uploads ──────────────────────────────────────
-- A public bucket: anyone can view the images, only admins can add, replace or remove them.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

create policy "Admins can upload site images"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'site-images' and public.is_admin());

create policy "Admins can replace site images"
    on storage.objects for update to authenticated
    using (bucket_id = 'site-images' and public.is_admin());

create policy "Admins can delete site images"
    on storage.objects for delete to authenticated
    using (bucket_id = 'site-images' and public.is_admin());
