import "./OrderNow.css";
import { useState } from "react";

function OrderNow() {
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);

    const toggleFilter = (filter) => {
        setActiveFilters((prev) =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    const menu = [
    {
        category: "Specialty",
        item: [
            { key: 1, name: "Earl Grey Milk Tea", image: "https://cloverstatic.com/menu-assets/items/8V505A3ZGP576_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 2, name: "Jasmine Green Milk Tea", image: "https://cloverstatic.com/menu-assets/items/SSG9BTXGFJD16_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 3, name: "Winter Melon Milk Tea", image: "https://cloverstatic.com/menu-assets/items/3BRREBVTYKBA4_1500x1125.jpeg", alt: "change", price: "5.75", tags2: "🔶" },
            { key: 4, name: "Ballet Chocolate", image: "https://cloverstatic.com/menu-assets/items/GWWFX7ZGDNFS8_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 5, name: "Black Tea with Fresh Milk", image: "https://cloverstatic.com/menu-assets/items/3GX8J7V6MRQ6Y_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 6, name: "Caramel Milk Tea", image: "https://cloverstatic.com/menu-assets/items/2QGK307HF5VJ2_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 7, name: "Classical Rose Milk Tea", image: "https://cloverstatic.com/menu-assets/items/0EWYJG849MZTJ_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 8, name: "Kyoto Green Tea Latte", image: "https://cloverstatic.com/menu-assets/items/0B6G2KNVYW4XJ_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 9, name: "Okinawa Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 10, name: "Peppermint Milk Tea", image: "https://cloverstatic.com/menu-assets/items/PMV001T3BFFTP_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 11, name: "Roasted Oolong Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25" },
            { key: 12, name: "Taro Milk Tea", image: "https://cloverstatic.com/menu-assets/items/KQNP2W2VSFQJE_1500x1125.jpeg", alt: "change", price: "5.75", tags2: "🔶" },
            { key: 13, name: "Green Tea with Fresh Milk", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 14, name: "Royal Tea with Fresh Milk", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 15, name: "Oolong Tea with Fresh Milk", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 16, name: "Strawberry Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 17, name: "Boba Cake Milk Tea", image: "https://cloverstatic.com/menu-assets/items/WG4BFA84PP2V4_1500x1125.jpeg", alt: "change", price: "7.00" },
            { key: 18, name: "Mango Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.50" },
            { key: 19, name: "Pumpkin Spice Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 20, name: "Gingerbread Latte", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" }
        ]
    },
    {
        category: "Seasonal",
        item: [
            { key: 1, name: "T4 LightSaber", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.50", tags2: "🔶" },
            { key: 2, name: "Hibiscus Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.50", tags2: "🔶" },
            { key: 3, name: "Sakura (Cherry Blossom) Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 4, name: "Gingerbread Latte", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 5, name: "Ginger Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.50", tags2: "🔶" },
            { key: 6, name: "Ginger Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 7, name: "Gingerbread Coffee Latte (Hot)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00", tags1: "☕" },
            { key: 8, name: "Red Velvet Cake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" }
        ]
    },
    {
        category: "Fresh & Fruity",
        item: [
            { key: 1, name: "Peach Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25" },
            { key: 2, name: "Yogurt Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25" },
            { key: 3, name: "Peach Black Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25" },
            { key: 4, name: "Peach Green Tea w/ Green Tea Jelly", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 5, name: "Peach Oolong", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25" },
            { key: 6, name: "Strawberry Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 7, name: "Strawberry Lemonade Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 8, name: "Grapefruit Royal Tea", image: "https://cloverstatic.com/menu-assets/items/CSZ8KJ69FZ5G4_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 9, name: "Honey Peach Royal Tea", image: "https://cloverstatic.com/menu-assets/items/5H6QQG305PPT2_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 10, name: "Lemon Green Tea", image: "https://cloverstatic.com/menu-assets/items/H9RC86WHN7EG8_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 11, name: "Lychee Black Tea", image: "https://cloverstatic.com/menu-assets/items/F0T5S3B077QX8_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 12, name: "Lychee Oolong", image: "https://cloverstatic.com/menu-assets/items/5RY262GK3ATZ8_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 13, name: "Mango Royal Tea", image: "https://cloverstatic.com/menu-assets/items/ZVQ012QWJ4P8J_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 14, name: "Niji Fruit Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 15, name: "Passion Fruit Royal Tea", image: "https://cloverstatic.com/menu-assets/items/ZQ6ERFNK69S6C_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 16, name: "Passion Fruit Tea w/ Jelly & Pearl", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 17, name: "Apple Black Tea", image: "https://cloverstatic.com/menu-assets/items/H678238XTNEGW_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 18, name: "Elegant Rose Royal Tea", image: "https://cloverstatic.com/menu-assets/items/SZDK9QH8N9Q6R_1500x1125.jpeg", alt: "change", price: "5.25" },
            { key: 19, name: "Sunny Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 20, name: "Lychee Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25" }
        ]
    },
    {
        category: "Smoothie / Milkshake",
        item: [
            { key: 1, name: "Apple Smoothie", image: "https://cloverstatic.com/menu-assets/items/QNZTHTT2M1SQJ_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 2, name: "Honey Peach Smoothie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 3, name: "Strawberry Lemonade Smoothie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 4, name: "Sweet Mango Smoothie", image: "https://cloverstatic.com/menu-assets/items/T688ADQ133Q6T_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 5, name: "Fruit Party Bubble", image: "https://cloverstatic.com/menu-assets/items/E7DZREMSXCXKG_1500x1125.jpeg", alt: "change", price: "6.25" },
            { key: 6, name: "Lemon Smoothie w/ Aloe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 7, name: "Lychee Smoothie w/ Aloe", image: "https://cloverstatic.com/menu-assets/items/E250CK0Z9BB8P_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 8, name: "Passion Fruit Smoothie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.75" },
            { key: 9, name: "Fresh Avocado Milkshake", image: "https://cloverstatic.com/menu-assets/items/AN74N0RGZM7CT_1500x1125.jpeg", alt: "change", price: "7.00" },
            { key: 10, name: "Chocolate Milkshake", image: "https://cloverstatic.com/menu-assets/items/ER3TA99CE0EZW_1500x1125.jpeg", alt: "change", price: "6.25" },
            { key: 11, name: "Red Bean Milkshake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.25" },
            { key: 12, name: "Strawberry Milkshake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.25" },
            { key: 13, name: "Taro Milkshake w/ Taro Lump", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "7.00" },
            { key: 14, name: "Tornado Passion Fruit Milkshake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.25" }
        ]
    },
    {
        category: "Taiwan Classic",
        item: [
            { key: 1, name: "Winter Melon", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25", tags2: "🔶" },
            { key: 2, name: "Elegant Rose Drink", image: "https://cloverstatic.com/menu-assets/items/33GEF81M8JZNA_1500x1125.jpeg", alt: "change", price: "5.25", tags2: "🔶" },
            { key: 3, name: "Honey Drink w/ Grass Jelly", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25", tags2: "🔶" },
            { key: 4, name: "Wintermelon Twist", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25", tags2: "🔶" },
            { key: 5, name: "Honey Aloe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25", tags2: "🔶" },
            { key: 6, name: "Jasmine Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "4.75" },
            { key: 7, name: "Jadeite Royal Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "4.75" },
            { key: 8, name: "Honey Green Tea (Longan Honey)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25" },
            { key: 9, name: "Earl Grey Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "4.75" },
            { key: 10, name: "Roasted Oolong Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "4.75" }
        ]
    },
    {
        category: "Milk Tea With Toppings",
        item: [
            { key: 1, name: "Grass Jelly Milk Tea", image: "https://cloverstatic.com/menu-assets/items/8WB1RB5QXWGNJ_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 2, name: "Grass Jelly Oolong Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 3, name: "Bubble Pearl Milk Royal Tea", image: "https://cloverstatic.com/menu-assets/items/K9MSQ3P7GVJA6_1500x1125.jpeg", alt: "change", price: "6.50" },
            { key: 4, name: "Red Bean Milk Tea", image: "https://cloverstatic.com/menu-assets/items/9811C4EFVDCEJ_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 5, name: "Snow Globe & Pearl Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 6, name: "Milk Tea w/ Pearl & Coffee Jelly", image: "https://cloverstatic.com/menu-assets/items/T1KHSFMCEBZ5P_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 7, name: "Coconut Jelly Milk Tea", image: "https://cloverstatic.com/menu-assets/items/NSV6MNETTX0ZA_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 8, name: "Coffee Jelly Milk Tea", image: "https://cloverstatic.com/menu-assets/items/R3YBM2J9X49J8_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 9, name: "Rainbow Jelly Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 10, name: "Jadeite Royal Milk Tea w/ Green Tea Jelly", image: "https://cloverstatic.com/menu-assets/items/8PA08PFBJCFY2_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 11, name: "French Pudding Milk Tea", image: "https://cloverstatic.com/menu-assets/items/MPR1G8EPDZ750_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 12, name: "Amber Pearl Latte", image: "https://cloverstatic.com/menu-assets/items/WDMFRKNJ3QYAW_1500x1125.jpeg", alt: "change", price: "6.25", tags2: "🔶" }
        ]
    },
    {
        category: "Snacks",
        item: [
            { key: 1, name: "French Fries", image: "https://cloverstatic.com/menu-assets/items/0A8V54AGBKX9T_1500x1125.jpeg", alt: "change", price: "5.00", tags1: "🌱" },
            { key: 2, name: "Sweet Potato Fries", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00", tags1: "🌱" },
            { key: 3, name: "Popcorn Chicken", image: "https://cloverstatic.com/menu-assets/items/T8Q9PQ57CX9GW_1500x1125.jpeg", alt: "change", price: "10.00" },
            { key: 4, name: "Salt & Pepper Tofu", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "10.00", tags1: "🌱" },
            { key: 5, name: "Black Pepper Pocket Pie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "4.00" },
            { key: 6, name: "Green Onion Pocket Pie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "4.00", tags1: "🌱" },
            { key: 7, name: "Veg Spring Rolls", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.00", tags1: "🌱" },
            { key: 8, name: "Takoyaki (4 pcs)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" },
            { key: 9, name: "Tiramisù", image: "https://cloverstatic.com/menu-assets/items/ZPW4GB27HFPAE_1500x1125.jpeg", alt: "change", price: "6.00" },
            { key: 10, name: "Red Bean Sesame Balls (4)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.00" },
            { key: 11, name: "Pack - Tea Leaves", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "4.75" },
            { key: 12, name: "Steam Bun", image: "https://cloverstatic.com/menu-assets/items/7Y9HT8PXYNGZR_1500x1125.jpeg", alt: "change", price: "2.50" },
            { key: 13, name: "Korean CornDog (Fish/Mozzarella)", image: "https://cloverstatic.com/menu-assets/items/4XVRG2GCK1AB6_1500x1125.jpeg", alt: "change", price: "5.75" },
            { key: 14, name: "Korean CornDog (Jalapeno)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.50" },
            { key: 15, name: "PuChao Chewing Candy", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "2.75" },
            { key: 16, name: "Korean CornDog w/ Crispy Potato", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.50" },
            { key: 17, name: "GF Macaron (Caramel)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "1.75", tags1: "🌱" },
            { key: 18, name: "GF Macaron (Lemon)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "1.75", tags1: "🌱" },
            { key: 19, name: "GF Macaron (Chocolate)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "1.75", tags1: "🌱" },
            { key: 20, name: "Red Velvet Cake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00" }
        ]
    },
    {
        category: "Cream Crown",
        item: [
            { key: 1, name: "Cream Crown Chocolate", image: "https://cloverstatic.com/menu-assets/items/0HXYXPHD32XB0_1500x1125.jpeg", alt: "change", price: "6.75" },
            { key: 2, name: "Cream Crown Winter Melon", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.25", tags2: "🔶" },
            { key: 3, name: "Cream Crown Royal Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.25" },
            { key: 4, name: "Cream Crown Green Tea", image: "https://cloverstatic.com/menu-assets/items/H3JQW86R74JPY_1500x1125.jpeg", alt: "change", price: "6.25" },
            { key: 5, name: "Cream Crown Earl Grey", image: "https://cloverstatic.com/menu-assets/items/QDSMNXFPSHVTA_1500x1125.jpeg", alt: "change", price: "6.25" },
            { key: 6, name: "Cream Crown Oolong Tea", image: "https://cloverstatic.com/menu-assets/items/5AMATFNH647B6_1500x1125.jpeg", alt: "change", price: "6.25" }
        ]
    },
    {
        category: "Coffee",
        item: [
            { key: 1, name: "Coffee Frappe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00", tags1: "☕" },
            { key: 2, name: "Coffee Jelly Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00", tags1: "☕" },
            { key: 3, name: "Cream Crown Coffee", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.60", tags1: "☕" },
            { key: 4, name: "Mocha Frappe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.60", tags1: "☕" },
            { key: 5, name: "Tiramisù Frappé", image: "https://cloverstatic.com/menu-assets/items/6CQD78RTAAXXP_1500x1125.jpeg", alt: "change", price: "6.60", tags1: "☕" },
            { key: 6, name: "Ying & Yang Teaffee", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.60", tags1: "⭐️", tags2: "☕" },
            { key: 7, name: "Gingerbread Coffee Latte (Hot)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "6.00", tags1: "☕" },
            { key: 8, name: "New Yorker Deli Coffee", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "change", price: "5.25", tags1: "☕" }
        ]
    }
];

    return (
        <div className="menu-container">
            <div className="menu-header">
                <div className="menu-video-container">
                    <iframe className="menu-video" width="560" height="315"
                    src="https://www.youtube.com/embed/hiGIQ0xwrxo?autoplay=1&mute=1&controls=0&loop=1&playlist=hiGIQ0xwrxo&si=busjpJVvxQdNVQK1"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write;
                    encrypted-media; gyroscope; picture-in-picture;
                    web-share" referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen></iframe>
                </div>
                <h1 className="menu-title" >Menu</h1>
            <div className="menu-explore-container">
                <div className="filter-menu-options">
                    <div className="filters">
                        <h2>Filters</h2>
                        <br></br>
                        {["New", "Hot", "Cold", "Coffee",
                            "No Caffeine", "Snacks", "Gluten Free", "Vegan"].map((filter => (
                                <li
                                key={filter}
                                className={activeFilters.includes(filter) ? "filter-pill-active" : "filter-pill"}
                                onClick={() => toggleFilter(filter)}>
                                    {filter}
                                    {activeFilters.includes(filter) && (
                                        <i className="fa-solid fa-circle-check"></i>
                                    )}
                                </li>
                            )))
                        }
                    </div>
                </div>
                <div className="menu-items">
                    {menu.map((category) => (
                    <div className="classic" 
                    key={category.category}
                    style={category.style}>
                        <h1>{category.category}</h1>
                        <div className="classic-drinks">
                            {category.item.map((item) => (
                                <div className="drink-card"
                                key={item.key}
                                onClick={() => setSelectedDrink(item)}>
                                    {/* <div className="tags">
                                        {(item.tags1 &&
                                        <p className="first-tag">{item.tags1}</p>
                                        )}
                                        {(item.tags2 &&
                                        <p className="second-tag">{item.tags2}</p>
                                        )}
                                        {(item.tags3 &&
                                        <p className="third-tag">{item.tags3}</p>
                                        )}
                                    </div> */}
                                    <div className="drink-card-image-container">
                                        <img src={item.image}/>
                                    </div>
                                    <h3>{item.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    ))}


                </div>

            </div>
            </div>

            {selectedDrink && (
                <div className="modal-container" onClick={() => setSelectedDrink(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-left-column">
                            <img src={selectedDrink.image} alt={selectedDrink.alt} />
                            <div className="submit-order-options">
                                <div className="order-quantity-options">
                                    <h2>-</h2>
                                    <h2>1</h2>
                                    <h2>+</h2>
                                    </div>
                                <div className="add-order-options">
                                    <h2>Add to order</h2>
                                    <h2>$5.75</h2>
                                </div>
                            </div>
                        </div>
                        <div className="modal-text">
                            <h2>Ingredients: yomama, yomama, yomama, yomama</h2>
                            <h2>{selectedDrink.name}</h2>
                            <p>${selectedDrink.price}</p>
                            { /* <div className="submit-order-options">
                                <div className="quantity">
                                    <i class="fa-regular fa-minus"></i>
                                    <h2>1</h2> {/* fix hardcoded
                                    <i class="fa-regular fa-plus"></i>
                                </div>
                                <div className="add-order-options">
                                    <h2>Add to order</h2>
                                    <h2>$5.25</h2> {/* fix hardcoded
                                </div>
                            </div> */}
                            <button onClick={() => setSelectedDrink(null)}><i className="fa-regular fa-circle-xmark"></i></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderNow;