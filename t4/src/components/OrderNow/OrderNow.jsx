import "./OrderNow.css";
import "../check/Modal.css";
import { useState } from "react";

function OrderNow() {
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedIce, setSelectedIce] = useState("100%I");
    const [selectedSweetness, setSelectedSweetness] = useState("100%S");

    const toggleFilter = (filter) => {
        setActiveFilters((prev) =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    const toggleOption = (option) => {
        setSelectedOptions(prev =>
            prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
        );
    };

    const menu = [
    {
        category: "Specialty",
        item: [
            { key: 1, name: "Earl Grey Milk Tea", image: "https://cloverstatic.com/menu-assets/items/8V505A3ZGP576_1500x1125.jpeg", alt: "Cup of creamy beige milk tea filled with black tapioca pearls and ice, shown with tea leaves and pearl ingredients", price: "5.25", filterTags: ["Cold", "Hot"] },
            { key: 2, name: "Jasmine Green Milk Tea", image: "https://cloverstatic.com/menu-assets/items/SSG9BTXGFJD16_1500x1125.jpeg", alt: "Pale peach‑coloured milk tea with ice and a teal T4 logo, leafy background and decorative text box", price: "5.25", filterTags: ["Cold", "Hot"] },
            { key: 3, name: "Winter Melon Milk Tea", image: "https://cloverstatic.com/menu-assets/items/3BRREBVTYKBA4_1500x1125.jpeg", alt: "Cup of pale beige milk tea with ice and descriptive text about flowers and fruits", price: "5.75", filterTags: ["Cold", "Hot", "No Caffeine"] },
            { key: 4, name: "Ballet Chocolate", image: "https://cloverstatic.com/menu-assets/items/GWWFX7ZGDNFS8_1500x1125.jpeg", alt: "Cup of pale milk tea with a jar of syrup and Chinese characters referencing winter melon", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 5, name: "Black Tea with Fresh Milk", image: "https://cloverstatic.com/menu-assets/items/3GX8J7V6MRQ6Y_1500x1125.jpeg", alt: "Hot chocolate drink in a paper cup topped with chocolate pieces on a red festive background", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 6, name: "Caramel Milk Tea", image: "https://cloverstatic.com/menu-assets/items/2QGK307HF5VJ2_1500x1125.jpeg", alt: "Layered drink with dark tea at the bottom and a creamy top swirling with caramel", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 7, name: "Classical Rose Milk Tea", image: "https://cloverstatic.com/menu-assets/items/0EWYJG849MZTJ_1500x1125.jpeg", alt: "Cup of sweet milk tea with ice and caramel being poured over, shown with caramel candies", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 8, name: "Kyoto Green Tea Latte", image: "https://cloverstatic.com/menu-assets/items/0B6G2KNVYW4XJ_1500x1125.jpeg", alt: "Pale beige iced latte with a T4 logo on the cup", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 9, name: "Okinawa Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 10, name: "Peppermint Milk Tea", image: "https://cloverstatic.com/menu-assets/items/PMV001T3BFFTP_1500x1125.jpeg", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 11, name: "Roasted Oolong Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold", "Hot"] },
            { key: 12, name: "Taro Milk Tea", image: "https://cloverstatic.com/menu-assets/items/KQNP2W2VSFQJE_1500x1125.jpeg", alt: "Bright green mint drink with ice and mint leaves with text describing a refreshing taste", price: "5.75", filterTags: ["Cold", "Hot", "No Caffeine"] },
            { key: 13, name: "Green Tea with Fresh Milk", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 14, name: "Royal Tea with Fresh Milk", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 15, name: "Oolong Tea with Fresh Milk", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 16, name: "Strawberry Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 17, name: "Boba Cake Milk Tea", image: "https://cloverstatic.com/menu-assets/items/WG4BFA84PP2V4_1500x1125.jpeg", alt: "Lavender taro milk tea with ice, taro root slices and a green leaf, with text describing taro sweet milk tea", price: "7.00", filterTags: ["Cold"] },
            { key: 18, name: "Mango Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.50", filterTags: ["Cold"] },
            { key: 19, name: "Pumpkin Spice Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 20, name: "Gingerbread Latte", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Hot"] },
        ]
    },
    {
        category: "Seasonal",
        item: [
            { key: 1, name: "T4 LightSaber", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.50", filterTags: ["Cold", "No Caffeine"] },
            { key: 2, name: "Hibiscus Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.50", filterTags: ["Cold", "No Caffeine"] },
            { key: 3, name: "Sakura (Cherry Blossom) Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 4, name: "Gingerbread Latte", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Hot"] },
            { key: 5, name: "Ginger Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.50", filterTags: ["Cold", "Hot", "No Caffeine"] },
            { key: 6, name: "Ginger Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "Hot"] },
            { key: 7, name: "Gingerbread Coffee Latte (Hot)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", tags1: "☕", filterTags: ["Hot", "Coffee"] },
            { key: 8, name: "Red Velvet Cake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Snacks"] },
        ]
    },
    {
        category: "Fresh & Fruity",
        item: [
            { key: 1, name: "Peach Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold"] },
            { key: 2, name: "Yogurt Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold"] },
            { key: 3, name: "Peach Black Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold"] },
            { key: 4, name: "Peach Green Tea w/ Green Tea Jelly", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold"] },
            { key: 5, name: "Peach Oolong", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold"] },
            { key: 6, name: "Strawberry Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold"] },
            { key: 7, name: "Strawberry Lemonade Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "No Caffeine"] },
            { key: 8, name: "Grapefruit Royal Tea", image: "https://cloverstatic.com/menu-assets/items/CSZ8KJ69FZ5G4_1500x1125.jpeg", alt: "Vibrant gradient drink that fades from pink or red to orange, garnished with grapefruit slices", price: "5.25", filterTags: ["Cold"] },
            { key: 9, name: "Honey Peach Royal Tea", image: "https://cloverstatic.com/menu-assets/items/5H6QQG305PPT2_1500x1125.jpeg", alt: "Golden gradient iced tea decorated with fresh peach slices", price: "5.25", filterTags: ["Cold"] },
            { key: 10, name: "Lemon Green Tea", image: "https://cloverstatic.com/menu-assets/items/H9RC86WHN7EG8_1500x1125.jpeg", alt: "Golden yellow iced tea accompanied by juicy peach slices in the background", price: "5.25", filterTags: ["Cold"] },
            { key: 11, name: "Lychee Black Tea", image: "https://cloverstatic.com/menu-assets/items/F0T5S3B077QX8_1500x1125.jpeg", alt: "Bright golden iced tea with ice and condensation drops on the cup", price: "5.25", filterTags: ["Cold"] },
            { key: 12, name: "Lychee Oolong", image: "https://cloverstatic.com/menu-assets/items/5RY262GK3ATZ8_1500x1125.jpeg", alt: "Amber oolong tea with ice, surrounded by lychee fruits and delicate white blossoms", price: "5.25", filterTags: ["Cold"] },
            { key: 13, name: "Mango Royal Tea", image: "https://cloverstatic.com/menu-assets/items/ZVQ012QWJ4P8J_1500x1125.jpeg", alt: "Deep amber iced tea with visible ice cubes", price: "5.25", filterTags: ["Cold"] },
            { key: 14, name: "Niji Fruit Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold"] },
            { key: 15, name: "Passion Fruit Royal Tea", image: "https://cloverstatic.com/menu-assets/items/ZQ6ERFNK69S6C_1500x1125.jpeg", alt: "Golden iced tea with slices of tropical fruit on a sunny beach background", price: "5.25", filterTags: ["Cold"] },
            { key: 16, name: "Passion Fruit Tea w/ Jelly & Pearl", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold"] },
            { key: 17, name: "Apple Black Tea", image: "https://cloverstatic.com/menu-assets/items/H678238XTNEGW_1500x1125.jpeg", alt: "Golden‑yellow iced tea with half a passion fruit and green leaves", price: "5.25", filterTags: ["New", "Cold"] },
            { key: 18, name: "Elegant Rose Royal Tea", image: "https://cloverstatic.com/menu-assets/items/SZDK9QH8N9Q6R_1500x1125.jpeg", alt: "Advertisement collage for apple black tea and a slushy drink with apples and sugar crystals", price: "5.25", filterTags: ["New", "Cold"] },
            { key: 19, name: "Sunny Drink", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold"] },
            { key: 20, name: "Lychee Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold"] },
        ]
    },
    {
        category: "Smoothie / Milkshake",
        item: [
            { key: 1, name: "Apple Smoothie", image: "https://cloverstatic.com/menu-assets/items/QNZTHTT2M1SQJ_1500x1125.jpeg", alt: "Gradient drink that shifts from red to gold with ice on top", price: "5.75", filterTags: ["New", "Cold"] },
            { key: 2, name: "Honey Peach Smoothie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "No Caffeine"] },
            { key: 3, name: "Strawberry Lemonade Smoothie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold", "No Caffeine"] },
            { key: 4, name: "Sweet Mango Smoothie", image: "https://cloverstatic.com/menu-assets/items/T688ADQ133Q6T_1500x1125.jpeg", alt: "Teal‑coloured poster featuring multiple T4 drinks including a tiramisu frappé, cream crown coffee and boba cake milk tea", price: "5.75", filterTags: ["Cold"] },
            { key: 5, name: "Fruit Party Bubble", image: "https://cloverstatic.com/menu-assets/items/E7DZREMSXCXKG_1500x1125.jpeg", alt: "Bright yellow mango smoothie swirling with diced mango pieces", price: "6.25", filterTags: ["Cold"] },
            { key: 6, name: "Lemon Smoothie w/ Aloe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold"] },
            { key: 7, name: "Lychee Smoothie w/ Aloe", image: "https://cloverstatic.com/menu-assets/items/E250CK0Z9BB8P_1500x1125.jpeg", alt: "Collage advert showing golden popping boba and a honeydew melon", price: "5.75", filterTags: ["Cold"] },
            { key: 8, name: "Passion Fruit Smoothie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.75", filterTags: ["Cold"] },
            { key: 9, name: "Fresh Avocado Milkshake", image: "https://cloverstatic.com/menu-assets/items/AN74N0RGZM7CT_1500x1125.jpeg", alt: "Creamy white smoothie topped with aloe cubes, shown with lychee fruit and a basket of lychee", price: "7.00", filterTags: ["Cold", "Vegan", "No Caffeine"] },
            { key: 10, name: "Chocolate Milkshake", image: "https://cloverstatic.com/menu-assets/items/ER3TA99CE0EZW_1500x1125.jpeg", alt: "Creamy pale green avocado smoothie with halved avocados and a description about buttery avocado", price: "6.25", filterTags: ["Cold"] },
            { key: 11, name: "Red Bean Milkshake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 12, name: "Strawberry Milkshake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 13, name: "Taro Milkshake w/ Taro Lump", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "7.00", filterTags: ["Cold", "Vegan", "No Caffeine"] },
            { key: 14, name: "Tornado Passion Fruit Milkshake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.25", filterTags: ["Cold", "No Caffeine"] },
        ]
    },
    {
        category: "Taiwan Classic",
        item: [
            { key: 1, name: "Winter Melon", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 2, name: "Elegant Rose Drink", image: "https://cloverstatic.com/menu-assets/items/33GEF81M8JZNA_1500x1125.jpeg", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 3, name: "Honey Drink w/ Grass Jelly", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 4, name: "Wintermelon Twist", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 5, name: "Honey Aloe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 6, name: "Jasmine Green Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "4.75", filterTags: ["Cold", "Hot"] },
            { key: 7, name: "Jadeite Royal Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "4.75", filterTags: ["Cold", "Hot"] },
            { key: 8, name: "Honey Green Tea (Longan Honey)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", filterTags: ["Cold", "Hot"] },
            { key: 9, name: "Earl Grey Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "4.75", filterTags: ["Cold", "Hot"] },
            { key: 10, name: "Roasted Oolong Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "4.75", filterTags: ["Cold", "Hot"] },
        ]
    },
    {
        category: "Milk Tea With Toppings",
        item: [
            { key: 1, name: "Grass Jelly Milk Tea", image: "https://cloverstatic.com/menu-assets/items/8WB1RB5QXWGNJ_1500x1125.jpeg", alt: "Gradient drink that transitions from deep red or orange to pale yellow", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 2, name: "Grass Jelly Oolong Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 3, name: "Bubble Pearl Milk Royal Tea", image: "https://cloverstatic.com/menu-assets/items/K9MSQ3P7GVJA6_1500x1125.jpeg", alt: "Creamy milk tea topped with dark grass jelly cubes, served with a bowl of jelly cubes against a landscape background", price: "6.50", filterTags: ["Cold"] },
            { key: 4, name: "Red Bean Milk Tea", image: "https://cloverstatic.com/menu-assets/items/9811C4EFVDCEJ_1500x1125.jpeg", alt: "Creamy milk tea with small dark pearls accompanied by an illustration of making pearls", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 5, name: "Snow Globe & Pearl Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold"] },
            { key: 6, name: "Milk Tea w/ Pearl & Coffee Jelly", image: "https://cloverstatic.com/menu-assets/items/T1KHSFMCEBZ5P_1500x1125.jpeg", alt: "Golden popping bubbles paired with pears in an advertisement collage", price: "6.00", filterTags: ["Cold", "Coffee"] },
            { key: 7, name: "Coconut Jelly Milk Tea", image: "https://cloverstatic.com/menu-assets/items/NSV6MNETTX0ZA_1500x1125.jpeg", alt: "Milk tea with a mix of black and white agar pearls on a golden background", price: "6.00", filterTags: ["Cold"] },
            { key: 8, name: "Coffee Jelly Milk Tea", image: "https://cloverstatic.com/menu-assets/items/R3YBM2J9X49J8_1500x1125.jpeg", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold", "Coffee"] },
            { key: 9, name: "Rainbow Jelly Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Cold"] },
            { key: 10, name: "Jadeite Royal Milk Tea w/ Green Tea Jelly", image: "https://cloverstatic.com/menu-assets/items/8PA08PFBJCFY2_1500x1125.jpeg", alt: "Milk tea with translucent coconut jelly on top, shown with a coconut shell", price: "6.00", filterTags: ["Cold"] },
            { key: 11, name: "French Pudding Milk Tea", image: "https://cloverstatic.com/menu-assets/items/MPR1G8EPDZ750_1500x1125.jpeg", alt: "Two cups of creamy milk tea piled high with colourful jelly cubes and ice like a rainbow in a cup", price: "6.00", filterTags: ["Cold", "Hot"] },
            { key: 12, name: "Amber Pearl Latte", image: "https://cloverstatic.com/menu-assets/items/WDMFRKNJ3QYAW_1500x1125.jpeg", alt: "Iced milk tea with amber honey jelly pieces, surrounded by dried tea leaves and a small dish of golden jelly", price: "6.25", filterTags: ["Cold", "No Caffeine"] },
        ]
    },
    {
        category: "Snacks",
        item: [
            { key: 1, name: "French Fries", image: "https://cloverstatic.com/menu-assets/items/0A8V54AGBKX9T_1500x1125.jpeg", alt: "Pale pink iced milk tea dotted with golden custard pudding pieces, placed next to a plate of flan and an Eiffel Tower sketch", price: "5.00", tags1: "🌱", filterTags: ["Snacks", "Vegan"] },
            { key: 2, name: "Sweet Potato Fries", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", tags1: "🌱", filterTags: ["Snacks", "Vegan"] },
            { key: 3, name: "Popcorn Chicken", image: "https://cloverstatic.com/menu-assets/items/T8Q9PQ57CX9GW_1500x1125.jpeg", alt: "Slender golden French fries heaped on a ceramic plate over a dark placemat", price: "10.00", filterTags: ["Snacks"] },
            { key: 4, name: "Salt & Pepper Tofu", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "10.00", tags1: "🌱", filterTags: ["Snacks", "Vegan"] },
            { key: 5, name: "Black Pepper Pocket Pie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "4.00", filterTags: ["Snacks"] },
            { key: 6, name: "Green Onion Pocket Pie", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "4.00", tags1: "🌱", filterTags: ["Snacks", "Vegan"] },
            { key: 7, name: "Veg Spring Rolls", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.00", tags1: "🌱", filterTags: ["Snacks", "Vegan"] },
            { key: 8, name: "Takoyaki (4 pcs)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Snacks"] },
            { key: 9, name: "Tiramisù", image: "https://cloverstatic.com/menu-assets/items/ZPW4GB27HFPAE_1500x1125.jpeg", alt: "Crispy golden bite‑sized fried chicken pieces with basil leaves on a white plate", price: "6.00", filterTags: ["Snacks"] },
            { key: 10, name: "Red Bean Sesame Balls (4)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.00", filterTags: ["Snacks"] },
            { key: 11, name: "Pack - Tea Leaves", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "4.75", filterTags: ["Snacks"] },
            { key: 12, name: "Steam Bun", image: "https://cloverstatic.com/menu-assets/items/7Y9HT8PXYNGZR_1500x1125.jpeg", alt: "Split image showing a layered tiramisu cake and a pink strawberry iced drink with strawberries and handwritten text", price: "2.50", filterTags: ["Snacks"] },
            { key: 13, name: "Korean CornDog (Fish/Mozzarella)", image: "https://cloverstatic.com/menu-assets/items/4XVRG2GCK1AB6_1500x1125.jpeg", alt: "Close‑up of a steamed Chinese pork bun held in a hand with Chinese and English text on the wrapper", price: "5.75", filterTags: ["Snacks"] },
            { key: 14, name: "Korean CornDog (Jalapeno)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.50", filterTags: ["Snacks"] },
            { key: 15, name: "PuChao Chewing Candy", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "2.75", filterTags: ["Snacks"] },
            { key: 16, name: "Korean CornDog w/ Crispy Potato", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.50", filterTags: ["Snacks"] },
            { key: 17, name: "GF Macaron (Caramel)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "1.75", tags1: "🌱", filterTags: ["Snacks", "Vegan", "Gluten Free"] },
            { key: 18, name: "GF Macaron (Lemon)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "1.75", tags1: "🌱", filterTags: ["Snacks", "Vegan", "Gluten Free"] },
            { key: 19, name: "GF Macaron (Chocolate)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "1.75", tags1: "🌱", filterTags: ["Snacks", "Vegan", "Gluten Free"] },
            { key: 20, name: "Red Velvet Cake", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", filterTags: ["Snacks"] },
        ]
    },
    {
        category: "Cream Crown",
        item: [
            { key: 1, name: "Cream Crown Chocolate", image: "https://cloverstatic.com/menu-assets/items/0HXYXPHD32XB0_1500x1125.jpeg", alt: "Corn dog drizzled with mayonnaise, ketchup and mustard, served with dipping sauces and an order now sign", price: "6.75", filterTags: ["Cold"] },
            { key: 2, name: "Cream Crown Winter Melon", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.25", filterTags: ["Cold", "No Caffeine"] },
            { key: 3, name: "Cream Crown Royal Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.25", filterTags: ["Cold"] },
            { key: 4, name: "Cream Crown Green Tea", image: "https://cloverstatic.com/menu-assets/items/H3JQW86R74JPY_1500x1125.jpeg", alt: "Tall cup of dark brown tea topped with a thick white cream crown", price: "6.25", filterTags: ["Cold"] },
            { key: 5, name: "Cream Crown Earl Grey", image: "https://cloverstatic.com/menu-assets/items/QDSMNXFPSHVTA_1500x1125.jpeg", alt: "Golden tea with a white creamy crown alongside a three‑step infographic on how to drink it", price: "6.25", filterTags: ["Cold"] },
            { key: 6, name: "Cream Crown Oolong Tea", image: "https://cloverstatic.com/menu-assets/items/5AMATFNH647B6_1500x1125.jpeg", alt: "Deep amber tea topped with white cream crown next to illustrated instructions for three ways to enjoy it", price: "6.25", filterTags: ["Cold"] },
        ]
    },
    {
        category: "Coffee",
        item: [
            { key: 1, name: "Coffee Frappe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", tags1: "☕", filterTags: ["Cold", "Coffee"] },
            { key: 2, name: "Coffee Jelly Milk Tea", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", tags1: "☕", filterTags: ["Cold", "Coffee"] },
            { key: 3, name: "Cream Crown Coffee", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.60", tags1: "☕", filterTags: ["Cold", "Coffee"] },
            { key: 4, name: "Mocha Frappe", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.60", tags1: "☕", filterTags: ["Cold", "Coffee"] },
            { key: 5, name: "Tiramisù Frappé", image: "https://cloverstatic.com/menu-assets/items/6CQD78RTAAXXP_1500x1125.jpeg", alt: "White paper cup filled with a dark beverage crowned with a swirl of whipped cream", price: "6.60", tags1: "☕", filterTags: ["Cold", "Coffee"] },
            { key: 6, name: "Ying & Yang Teaffee", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.60", tags1: "⭐️", filterTags: ["Cold", "Coffee"] },
            { key: 7, name: "Gingerbread Coffee Latte (Hot)", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "6.00", tags1: "☕", filterTags: ["Hot", "Coffee"] },
            { key: 8, name: "New Yorker Deli Coffee", image: "https://t4losgatos.com/wp-content/uploads/2021/09/t4-logo-1.png", alt: "T4 bubble tea logo", price: "5.25", tags1: "☕", filterTags: ["Hot", "Coffee"] },
        ]
    }
];

    const [selectedDrink, setSelectedDrink] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);

    const filteredMenu = activeFilters.length === 0 ? null : menu.flatMap(category => category.item)
          .filter(item => item.filterTags && activeFilters.every(f => item.filterTags.includes(f)));
    const filterTitle = activeFilters.length === 1 ? `${activeFilters[0]}` : `${activeFilters.join(" & ")} Items`;

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
                    {filteredMenu ? (
    <div className="classic">
        <h1>{filterTitle}</h1>
        <div className="classic-drinks">
            {filteredMenu.length > 0 ? filteredMenu.map((item) => (
                <div className="drink-card"
                    key={`${item.name}-filtered`}
                    onClick={() => setSelectedDrink(item)}>
                    <div className="drink-card-image-container">
                        <img src={item.image} />
                    </div>
                    <h3>{item.name}</h3>
                </div>
            )) : (
                <p style={{color: "#ead6bf", fontSize: "1.25rem"}}>
                    No items match these filters.
                </p>
            )}
        </div>
    </div>
) : (
    menu.map((category) => (
        <div className="classic" key={category.category}>
            <h1>{category.category}</h1>
            <div className="classic-drinks">
                {category.item.map((item) => (
                    <div className="drink-card"
                        key={item.key}
                        onClick={() => setSelectedDrink(item)}>
                        <div className="drink-card-image-container">
                            <img src={item.image} />
                        </div>
                        <h3>{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    ))
)}
                </div>

            </div>
            </div>

            {selectedDrink && (
                <div className="modal-container" onClick={() => setSelectedDrink(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>

                        {/* LEFT COLUMN */}
                        <div className="modal-left-column">
                            <div className="modal-scrollable">
                                <h2 className="modal-drink-name">{selectedDrink.name}</h2>

                                {/* CUSTOMIZED */}
                                <div className="modal-section">
                                    <div className="modal-section-header">
                                        <span className="modal-section-title">Customized</span>
                                        <span className="modal-section-badge badge-optional">Up to 1</span>
                                    </div>
                                    {[
                                        { label: "PF/STR Jam", price: "+$1.00" },
                                        { label: "Other Flavor Added", price: "+$1.00" },
                                        { label: "Oat Milk", price: "+$0.75" },
                                        { label: "Cream Crown(Cheese)", price: "+$1.00" },
                                        { label: "Coffee (A Shot)", price: "+$3.50" },
                                    ].map(opt => (
                                        <label className="modal-option" key={opt.label}>
                                        <div className="modal-option-left">
                                        <input type="checkbox"
                                            checked={selectedOptions.includes(opt.label)}
                                            onChange={() => toggleOption(opt.label)} />
                                        <span className="modal-option-label">{opt.label}</span>
                                    </div>
                                    <span className="modal-option-price">{opt.price}</span>
                                </label>
                            ))}
                            </div>

                            {/* ICE/HOT */}
                            <div className="modal-section">
                                <div className="modal-section-header">
                                    <span className="modal-section-title">Ice / Hot</span>
                                    <span className="modal-section-badge badge-required">1 required</span>
                                </div>
                            {["100%", "120%", "80%", "30%", "0%", "HOT", "WARM"].map(opt => (
                            <label className="modal-option" key={opt}>
                                <div className="modal-option-left">
                                    <input type="radio" name="ice"
                                        checked={selectedIce === opt}
                                        onChange={() => setSelectedIce(opt)} />
                                    <span className="modal-option-label">{opt}</span>
                                </div>
                                <span className="modal-option-price">+$0.00</span>
                            </label>
                        ))}
                    </div>

                    {/* SIZE-UP */}
                    <div className="modal-section">
                        <div className="modal-section-header">
                            <span className="modal-section-title">Size-Up</span>
                            <span className="modal-section-badge badge-optional">Up to 1</span>
                        </div>
                        <label className="modal-option">
                            <div className="modal-option-left">
                                <input type="checkbox"
                                    checked={selectedOptions.includes("Size up")}
                                    onChange={() => toggleOption("Size up")} />
                                <span className="modal-option-label">Size up</span>
                            </div>
                            <span className="modal-option-price">+$0.75</span>
                        </label>
                    </div>

                    {/* SWEETNESS */}
                    <div className="modal-section">
                        <div className="modal-section-header">
                            <span className="modal-section-title">Sweetness</span>
                            <span className="modal-section-badge badge-required">1 required</span>
                        </div>
                        {["80%", "30%", "50%", "0%", "100%", "120%"].map(opt => (
                            <label className="modal-option" key={opt}>
                                <div className="modal-option-left">
                                    <input type="radio" name="sweetness"
                                        checked={selectedSweetness === opt}
                                        onChange={() => setSelectedSweetness(opt)} />
                                    <span className="modal-option-label">{opt}</span>
                                </div>
                                <span className="modal-option-price">+$0.00</span>
                            </label>
                        ))}
                    </div>

                    {/* TOPPINGS */}
                    <div className="modal-section">
                        <div className="modal-section-header">
                            <span className="modal-section-title">Toppings</span>
                            <span className="modal-section-badge badge-optional">Up to 4</span>
                        </div>
                        {[
                            "Amber Pearl", "Boba", "Mini Boba", "Lychee CJ",
                            "Mixed Boba w/ Mini", "Blueberry Popping", "Kiwi Pop'n",
                            "Honeydew Pop'n Boba", "Strawberry Pop'n", "Green TJ",
                            "Coconut J", "Pudding (Flan)", "Rainbow J", "Grass J",
                            "Cream Crown", "Coffee J", "Aloe", "Agar P", "Red Bean"
                        ].map(opt => (
                            <label className="modal-option" key={opt}>
                                <div className="modal-option-left">
                                    <input type="checkbox"
                                        checked={selectedOptions.includes(opt)}
                                        onChange={() => toggleOption(opt)} />
                                    <span className="modal-option-label">{opt}</span>
                                </div>
                                <span className="modal-option-price">+$0.75</span>
                            </label>
                        ))}
                    </div>

                    {/* SPECIAL INSTRUCTIONS */}
                    <div className="modal-instructions">
                        <i className="fa-regular fa-plus" />
                        Special instructions
                    </div>
                </div>

                {/* STICKY FOOTER */}
                <div className="modal-footer">
                    <div className="modal-quantity">
                        <button className="modal-qty-btn"
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                        <span className="modal-qty-count">{quantity}</span>
                        <button className="modal-qty-btn"
                            onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>
                    <button className="modal-add-btn">
                        <span>Add to order</span>
                        <span>${(parseFloat(selectedDrink.price) * quantity).toFixed(2)}</span>
                    </button>
                </div>
            </div>

            {/* RIGHT COLUMN — image */}
            <div className="modal-image-column">
                <button className="modal-close-btn" onClick={() => setSelectedDrink(null)}>✕</button>
                <img src={selectedDrink.image} alt={selectedDrink.alt} />
            </div>

        </div>
    </div>
)}
        </div>
    );
}

export default OrderNow;