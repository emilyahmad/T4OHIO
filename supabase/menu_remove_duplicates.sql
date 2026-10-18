-- Removes the second copy of 4 old menu items that were listed in two categories.
-- All of them are hidden (sold out) since the menu update, so customers never see them;
-- the duplicates only showed up in Admin → Menu. The copy that's kept is noted on each line.
-- Run in Supabase: SQL Editor → New query → paste → Run.

begin;

delete from public.menu_items where id in (
    'specialty-20',  -- Gingerbread Latte (kept: seasonal-4)
    'seasonal-7',    -- Gingerbread Coffee Latte (Hot) (kept: coffee-7)
    'coffee-2',      -- Coffee Jelly Milk Tea (kept: milk-tea-with-toppings-8, which has a photo)
    'seasonal-8'     -- Red Velvet Cake (kept: snacks-20)
);

commit;
