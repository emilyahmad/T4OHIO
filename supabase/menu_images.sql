-- Menu photos from the image links in public/MENU_ITEMS.md (T4 Kilanas on take.app).
-- Only fills in items that have no photo yet ("and image is null"), so the photos from
-- T4 Ohio's own Clover menu are kept. Run in Supabase: SQL Editor → New query → paste → Run.

begin;

update public.menu_items set image = 'https://cdn4.take.app/fe6d4a98-fa77-46bd-a4d8-4feaf2d045d4.jpg?width=1200' where id = 'taiwan-classic-7' and image is null;  -- Jadeite Royal Tea
update public.menu_items set image = 'https://cdn4.take.app/f90c7e28-9b41-4349-96f2-6b7ccb83afd6.jpg?width=1200' where id = 'taiwan-classic-6' and image is null;  -- Jasmine Green Tea
update public.menu_items set image = 'https://cdn4.take.app/67279137-a328-46aa-bf30-091e75e29d71.jpg?width=1200' where id = 'taiwan-classic-9' and image is null;  -- Earl Grey Tea
update public.menu_items set image = 'https://cdn4.take.app/6da6a297-bd76-410a-907b-50e625557c4e.jpg?width=1200' where id = 'taiwan-classic-1' and image is null;  -- Wintermelon Drink
update public.menu_items set image = 'https://cdn4.take.app/bc0300ee-e13e-43c5-bb91-b2addea8250e.jpg?width=1200' where id = 'taiwan-classic-8' and image is null;  -- Honey Green Tea
update public.menu_items set image = 'https://cdn4.take.app/74bd362f-4feb-407d-83ad-bb96caec5b3b.jpg?width=1200' where id = 'taiwan-classic-2' and image is null;  -- Elegant Rose Drink
update public.menu_items set image = 'https://cdn4.take.app/f2b37c1c-1791-4e32-8119-fc65211a206c.jpg?width=1200' where id = 'fresh-and-fruity-9' and image is null;  -- Honey Peach Royal Tea (G)
update public.menu_items set image = 'https://cdn4.take.app/864cc810-a08d-43e8-a0da-981b394bb2be.jpg?width=1200' where id = 'fresh-and-fruity-11' and image is null;  -- Lychee Black Tea
update public.menu_items set image = 'https://cdn4.take.app/febe1da2-39cc-4f2b-b93c-f016284b70b7.jpeg?width=1200' where id = 'fresh-and-fruity-8' and image is null;  -- Grapefruit Royal Tea
update public.menu_items set image = 'https://cdn4.take.app/91f21f20-f35a-4800-8e30-6bfa2a374a43.jpg?width=1200' where id = 'fresh-and-fruity-15' and image is null;  -- Passion Fruit Royal Tea
update public.menu_items set image = 'https://cdn4.take.app/74bd362f-4feb-407d-83ad-bb96caec5b3b.jpg?width=1200' where id = 'fresh-and-fruity-18' and image is null;  -- Elegant Rose Royal Tea
update public.menu_items set image = 'https://cdn4.take.app/702b42fb-e110-4fe6-a192-0e479e28b553.jpg?width=1200' where id = 'specialty-1' and image is null;  -- Earl Grey Milk Tea
update public.menu_items set image = 'https://cdn4.take.app/76252063-81ec-41df-8fc0-3a5caeb3eafd.jpg?width=1200' where id = 'specialty-2' and image is null;  -- Jasmine Milk Tea
update public.menu_items set image = 'https://cdn4.take.app/d871e07d-ce79-45ee-934b-2f676a965178.jpg?width=1200' where id = 'specialty-10' and image is null;  -- Peppermint Milk Tea
update public.menu_items set image = 'https://cdn4.take.app/62c0c2e3-54c4-4968-80f1-deef17fcd60d.jpg?width=1200' where id = 'specialty-8' and image is null;  -- Matcha (Kyoto) Latte
update public.menu_items set image = 'https://cdn4.take.app/f1d40c2d-0f99-4617-97dd-7944b9e9e6e0.jpg?width=1200' where id = 'smoothie-milkshake-2' and image is null;  -- Honey Peach Smoothie
update public.menu_items set image = 'https://cdn4.take.app/7f8510b2-bb52-4b48-a664-27e416eef9d2.jpg?width=1200' where id = 'smoothie-milkshake-8' and image is null;  -- Passion Fruit Smoothie
update public.menu_items set image = 'https://cdn4.take.app/dc8ff8df-e866-4b6c-a126-e58a34dfef79.jpg?width=1200' where id = 'smoothie-milkshake-6' and image is null;  -- Lemon Smoothie
update public.menu_items set image = 'https://cdn4.take.app/fa180ac1-0b2e-4020-80fd-df8c26cb5250.jpeg?width=1200' where id = 'smoothie-milkshake-7' and image is null;  -- Lychee Smoothie
update public.menu_items set image = 'https://cdn4.take.app/41a7a84c-abc7-4d99-b8e0-adc800b85a6b.jpg?width=1200' where id = 'smoothie-milkshake-11' and image is null;  -- Red Bean Milkshake
update public.menu_items set image = 'https://cdn4.take.app/d2ea9281-6c81-46f9-99c1-ee38d3ea77bd.jpeg?width=1200' where id = 'snacks-3' and image is null;  -- Popcorn Chicken

commit;
