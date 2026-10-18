-- Menu update from public/MENU_ITEMS.md.
-- Adds new items, updates existing ones (name, price, category, tags), and hides
-- items that are not in the file (marked sold out, so they can be switched back on in the admin panel).
-- Photos on existing items are kept. Run in Supabase: SQL Editor → New query → paste → Run.

begin;

-- Categories, in the order the file lists them. Ones not in the file go to the end.
insert into public.categories (id, name, sort_order) values
    ('taiwan-classic', 'Classic', 0),
    ('fresh-and-fruity', 'Fresh & Fruity', 1),
    ('specialty', 'Milk Tea', 2),
    ('smoothie-milkshake', 'Smoothie', 3),
    ('milkshake', 'Milkshake', 4),
    ('coffee', 'Coffee Fuse', 5),
    ('seasonal', 'Seasonal', 6),
    ('snacks', 'Snacks', 7)
on conflict (id) do update set name = excluded.name, sort_order = excluded.sort_order;
update public.categories set sort_order = sort_order + 100 where id not in ('taiwan-classic', 'fresh-and-fruity', 'specialty', 'smoothie-milkshake', 'milkshake', 'coffee', 'seasonal', 'snacks');

-- Updated items (existing photos are left alone)
update public.menu_items set category_id = 'taiwan-classic', name = 'Jadeite Royal Tea', price = 4.75, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 0 where id = 'taiwan-classic-7';
update public.menu_items set category_id = 'taiwan-classic', name = 'Jasmine Green Tea', price = 4.75, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 1 where id = 'taiwan-classic-6';
update public.menu_items set category_id = 'taiwan-classic', name = 'Earl Grey Tea', price = 4.75, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 2 where id = 'taiwan-classic-9';
update public.menu_items set category_id = 'taiwan-classic', name = 'Roasted Oolong Tea', price = 4.75, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 3 where id = 'taiwan-classic-10';
update public.menu_items set category_id = 'taiwan-classic', name = 'Wintermelon Drink', price = 5.25, tags = array['Cold', 'Hot', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 4 where id = 'taiwan-classic-1';
update public.menu_items set category_id = 'taiwan-classic', name = 'Honey Grass Jelly', price = 5.25, tags = array['Cold', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 5 where id = 'taiwan-classic-3';
update public.menu_items set category_id = 'taiwan-classic', name = 'Honey Green Tea', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 6 where id = 'taiwan-classic-8';
update public.menu_items set category_id = 'taiwan-classic', name = 'Elegant Rose Drink', price = 5.25, tags = array['Cold', 'Hot', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 7 where id = 'taiwan-classic-2';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Strawberry Jasmine', price = 5.75, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 0 where id = 'fresh-and-fruity-6';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Strawberry Lemonade', price = 5.75, tags = array['Cold', 'Hot', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 1 where id = 'fresh-and-fruity-7';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Mango Royal Tea', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 3 where id = 'fresh-and-fruity-13';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Honey Peach Royal Tea (G)', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 4 where id = 'fresh-and-fruity-9';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Lychee Black Tea', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 5 where id = 'fresh-and-fruity-11';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Grapefruit Royal Tea', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 6 where id = 'fresh-and-fruity-8';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Passion Fruit Royal Tea', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 7 where id = 'fresh-and-fruity-15';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Apple Black Tea', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 8 where id = 'fresh-and-fruity-17';
update public.menu_items set category_id = 'fresh-and-fruity', name = 'Elegant Rose Royal Tea', price = 5.25, tags = array['Cold', 'Hot', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 9 where id = 'fresh-and-fruity-18';
update public.menu_items set category_id = 'specialty', name = 'Earl Grey Milk Tea', price = 5.25, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 0 where id = 'specialty-1';
update public.menu_items set category_id = 'specialty', name = 'Jasmine Milk Tea', price = 5.25, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 1 where id = 'specialty-2';
update public.menu_items set category_id = 'specialty', name = 'Roasted Oolong Milk Tea', price = 5.25, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 2 where id = 'specialty-11';
update public.menu_items set category_id = 'specialty', name = 'Taro Milk Tea', price = 5.75, tags = array['Cold', 'Hot', 'No Caffeine'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 4 where id = 'specialty-12';
update public.menu_items set category_id = 'specialty', name = 'Okinawa Milk Tea', price = 5.75, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 5 where id = 'specialty-9';
update public.menu_items set category_id = 'specialty', name = 'Caramel Milk Tea', price = 5.75, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 6 where id = 'specialty-6';
update public.menu_items set category_id = 'specialty', name = 'Wintermelon Milk Tea', price = 5.75, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 7 where id = 'specialty-3';
update public.menu_items set category_id = 'specialty', name = 'Peppermint Milk Tea', price = 5.75, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 8 where id = 'specialty-10';
update public.menu_items set category_id = 'specialty', name = 'Fresh Milk Tea (E/R/O/J)', price = 6.25, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 9 where id = 'specialty-5';
update public.menu_items set category_id = 'specialty', name = 'Strawberry Milk Tea', price = 6.25, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 10 where id = 'specialty-16';
update public.menu_items set category_id = 'specialty', name = 'Amber Pearl Latte', price = 6.25, tags = array['Cold', 'Hot', 'No Caffeine'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 11 where id = 'milk-tea-with-toppings-12';
update public.menu_items set category_id = 'specialty', name = 'Matcha (Kyoto) Latte', price = 6.25, tags = array['Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 12 where id = 'specialty-8';
update public.menu_items set category_id = 'specialty', name = 'Boba Cake Milk Tea', price = 7.00, tags = array['Cold'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 13 where id = 'specialty-17';
update public.menu_items set category_id = 'smoothie-milkshake', name = 'Honey Peach Smoothie', price = 5.75, tags = array['Cold', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 0 where id = 'smoothie-milkshake-2';
update public.menu_items set category_id = 'smoothie-milkshake', name = 'Sweet Mango Smoothie', price = 5.75, tags = array['Cold', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 1 where id = 'smoothie-milkshake-4';
update public.menu_items set category_id = 'smoothie-milkshake', name = 'Strawberry Lemon Smoothie', price = 5.75, tags = array['Cold', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 2 where id = 'smoothie-milkshake-3';
update public.menu_items set category_id = 'smoothie-milkshake', name = 'Passion Fruit Smoothie', price = 5.75, tags = array['Cold', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 3 where id = 'smoothie-milkshake-8';
update public.menu_items set category_id = 'smoothie-milkshake', name = 'GreenApple Smoothie', price = 5.75, tags = array['Cold', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 4 where id = 'smoothie-milkshake-1';
update public.menu_items set category_id = 'smoothie-milkshake', name = 'Lemon Smoothie', price = 5.75, tags = array['Cold', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 6 where id = 'smoothie-milkshake-6';
update public.menu_items set category_id = 'smoothie-milkshake', name = 'Lychee Smoothie', price = 5.75, tags = array['Cold', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 7 where id = 'smoothie-milkshake-7';
update public.menu_items set category_id = 'milkshake', name = 'Chocolate Milkshake', price = 6.25, tags = array['Cold', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 0 where id = 'smoothie-milkshake-10';
update public.menu_items set category_id = 'milkshake', name = 'Tornado Passion Fruit Milkshake', price = 6.25, tags = array['Cold', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 1 where id = 'smoothie-milkshake-14';
update public.menu_items set category_id = 'milkshake', name = 'Red Bean Milkshake', price = 6.25, tags = array['Cold', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 2 where id = 'smoothie-milkshake-11';
update public.menu_items set category_id = 'milkshake', name = 'Strawberry Milkshake', price = 6.25, tags = array['Cold', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 3 where id = 'smoothie-milkshake-12';
update public.menu_items set category_id = 'milkshake', name = 'Fresh Avocado Milkshake', price = 7.00, tags = array['Cold', 'No Caffeine', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 4 where id = 'smoothie-milkshake-9';
update public.menu_items set category_id = 'coffee', name = 'Tiramisu Frappe', price = 6.65, tags = array['Cold', 'Coffee', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = '☕', available = true, sort_order = 1 where id = 'coffee-5';
update public.menu_items set category_id = 'coffee', name = 'Coffee Milk Tea (Ying & Yang Teaffee)', price = 6.65, tags = array['Cold', 'Coffee', 'Gluten Free'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = '☕', available = true, sort_order = 2 where id = 'coffee-6';
update public.menu_items set category_id = 'seasonal', name = 'Pumpkin Spice Milk Tea', price = 5.75, tags = array['New', 'Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 0 where id = 'specialty-19';
update public.menu_items set category_id = 'seasonal', name = 'Niji Fruit Tea (FruitPunch)', price = 5.75, tags = array['New', 'Cold', 'Hot'], modifiers = array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], badge = null, available = true, sort_order = 2 where id = 'fresh-and-fruity-14';
update public.menu_items set category_id = 'snacks', name = 'Macaron (Raspberry/Pistachio/Chocolate/Lemon/Caramel/Vanilla)', price = 1.75, tags = array['Snacks', 'Vegetarian'], modifiers = '{}', badge = '🌱', available = true, sort_order = 0 where id = 'snacks-17';
update public.menu_items set category_id = 'snacks', name = 'A Piece of Cake (Tiramisu)', price = 6.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 1 where id = 'snacks-9';
update public.menu_items set category_id = 'snacks', name = 'French Fries', price = 5.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 2 where id = 'snacks-1';
update public.menu_items set category_id = 'snacks', name = 'Sweet Potato Fries', price = 6.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 3 where id = 'snacks-2';
update public.menu_items set category_id = 'snacks', name = 'Veg. Spring Rolls (3)', price = 5.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 4 where id = 'snacks-7';
update public.menu_items set category_id = 'snacks', name = 'Red Bean Sesame Balls (4)', price = 5.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 5 where id = 'snacks-10';
update public.menu_items set category_id = 'snacks', name = 'Green Onion Pocket', price = 4.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 6 where id = 'snacks-6';
update public.menu_items set category_id = 'snacks', name = 'Blackpepper Pocket', price = 4.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 7 where id = 'snacks-5';
update public.menu_items set category_id = 'snacks', name = 'Salt & Pepper Tofu', price = 10.00, tags = array['Snacks', 'Vegetarian'], modifiers = '{}', badge = '🌱', available = true, sort_order = 8 where id = 'snacks-4';
update public.menu_items set category_id = 'snacks', name = 'Jalapeno CornDog (Mozza)', price = 6.50, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 10 where id = 'snacks-14';
update public.menu_items set category_id = 'snacks', name = 'Takoyaki (4)', price = 5.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 11 where id = 'snacks-8';
update public.menu_items set category_id = 'snacks', name = 'Popcorn Chicken', price = 10.00, tags = array['Snacks', 'Gluten Free'], modifiers = '{}', badge = null, available = true, sort_order = 12 where id = 'snacks-3';
update public.menu_items set category_id = 'snacks', name = 'Korean CornDog (Fish+Mozza)', price = 6.00, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 13 where id = 'snacks-13';
update public.menu_items set category_id = 'snacks', name = 'Crispy Potato CornDog (Fish)', price = 6.50, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 14 where id = 'snacks-16';
update public.menu_items set category_id = 'snacks', name = 'Steamed Buns (Spicy Pork / Sweet BBQ / MustardGreen Pork / Chicken)', price = 2.50, tags = array['Snacks'], modifiers = '{}', badge = null, available = true, sort_order = 15 where id = 'snacks-12';

-- New items (no photo yet, so they show the T4 logo)
insert into public.menu_items (id, category_id, name, price, tags, modifiers, badge, available, sort_order) values
    ('fresh-and-fruity-10008879', 'fresh-and-fruity', 'GreenApple Jasmine', 5.75, array['Cold', 'Hot', 'Gluten Free'], array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], null, true, 2),
    ('specialty-5c3aefe8', 'specialty', 'Royal (Jadeite) Milk Tea', 5.25, array['Cold', 'Hot'], array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], null, true, 3),
    ('smoothie-milkshake-4e8a2dfa', 'smoothie-milkshake', 'Pineapple Smoothie', 5.75, array['Cold', 'Gluten Free'], array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], null, true, 5),
    ('coffee-9998b6db', 'coffee', 'Iced Coffee', 5.75, array['Cold', 'Coffee', 'Gluten Free'], array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], '☕', true, 0),
    ('seasonal-bcbf569d', 'seasonal', 'Apple Butter Milk Tea', 5.75, array['New', 'Cold', 'Hot'], array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], null, true, 1),
    ('seasonal-4e3cc9bd', 'seasonal', 'Ginger Milk', 6.25, array['New', 'Cold', 'Hot', 'No Caffeine'], array['customized', 'ice', 'sizeUp', 'sweetness', 'toppings'], null, true, 3),
    ('snacks-cfbdd51d', 'snacks', 'Ramen CornDog (Mozza)', 6.50, array['Snacks'], '{}', null, true, 9);

-- Hide everything that is not in the file:
--   Coffee Frappe
--   Coffee Jelly Milk Tea
--   Cream Crown Coffee
--   Mocha Frappe
--   Gingerbread Coffee Latte (Hot)
--   New Yorker Deli Coffee
--   Cream Crown Chocolate
--   Cream Crown Winter Melon
--   Cream Crown Royal Tea
--   Cream Crown Green Tea
--   Cream Crown Earl Grey
--   Cream Crown Oolong Tea
--   Peach Green Tea
--   Lemon Green Tea
--   Lychee Oolong
--   Passion Fruit Tea w/ Jelly & Pearl
--   Sunny Drink
--   Yogurt Green Tea
--   Lychee Green Tea
--   Peach Black Tea
--   Peach Green Tea w/ Green Tea Jelly
--   Peach Oolong
--   Grass Jelly Milk Tea
--   Jadeite Royal Milk Tea w/ Green Tea Jelly
--   French Pudding Milk Tea
--   Grass Jelly Oolong Milk Tea
--   Bubble Pearl Milk Royal Tea
--   Red Bean Milk Tea
--   Snow Globe & Pearl Milk Tea
--   Milk Tea w/ Pearl & Coffee Jelly
--   Coconut Jelly Milk Tea
--   Coffee Jelly Milk Tea
--   Rainbow Jelly Milk Tea
--   T4 LightSaber
--   Hibiscus Drink
--   Sakura (Cherry Blossom) Milk Tea
--   Gingerbread Latte
--   Ginger Drink
--   Ginger Milk Tea
--   Gingerbread Coffee Latte (Hot)
--   Red Velvet Cake
--   Taro Milkshake w/ Taro Lump
--   Fruit Party Bubble
--   Pack - Tea Leaves
--   PuChao Chewing Candy
--   GF Macaron (Lemon)
--   GF Macaron (Chocolate)
--   Red Velvet Cake
--   Green Tea with Fresh Milk
--   Royal Tea with Fresh Milk
--   Oolong Tea with Fresh Milk
--   Mango Milk Tea
--   Gingerbread Latte
--   Ballet Chocolate
--   Classical Rose Milk Tea
--   Wintermelon Twist
--   Honey Aloe
update public.menu_items set available = false where id not in ('taiwan-classic-7', 'taiwan-classic-6', 'taiwan-classic-9', 'taiwan-classic-10', 'taiwan-classic-1', 'taiwan-classic-3', 'taiwan-classic-8', 'taiwan-classic-2', 'fresh-and-fruity-6', 'fresh-and-fruity-7', 'fresh-and-fruity-10008879', 'fresh-and-fruity-13', 'fresh-and-fruity-9', 'fresh-and-fruity-11', 'fresh-and-fruity-8', 'fresh-and-fruity-15', 'fresh-and-fruity-17', 'fresh-and-fruity-18', 'specialty-1', 'specialty-2', 'specialty-11', 'specialty-5c3aefe8', 'specialty-12', 'specialty-9', 'specialty-6', 'specialty-3', 'specialty-10', 'specialty-5', 'specialty-16', 'milk-tea-with-toppings-12', 'specialty-8', 'specialty-17', 'smoothie-milkshake-2', 'smoothie-milkshake-4', 'smoothie-milkshake-3', 'smoothie-milkshake-8', 'smoothie-milkshake-1', 'smoothie-milkshake-4e8a2dfa', 'smoothie-milkshake-6', 'smoothie-milkshake-7', 'smoothie-milkshake-10', 'smoothie-milkshake-14', 'smoothie-milkshake-11', 'smoothie-milkshake-12', 'smoothie-milkshake-9', 'coffee-9998b6db', 'coffee-5', 'coffee-6', 'specialty-19', 'seasonal-bcbf569d', 'fresh-and-fruity-14', 'seasonal-4e3cc9bd', 'snacks-17', 'snacks-9', 'snacks-1', 'snacks-2', 'snacks-7', 'snacks-10', 'snacks-6', 'snacks-5', 'snacks-4', 'snacks-cfbdd51d', 'snacks-14', 'snacks-8', 'snacks-3', 'snacks-13', 'snacks-16', 'snacks-12');

commit;
