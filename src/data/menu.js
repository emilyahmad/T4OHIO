// Menu settings that live in code. The items and categories themselves are in the database (see useMenu.js).
import { asset } from "../utils/asset.js";

// Items without a photo yet (image: null) show the T4 logo.
export const itemImage = (item) => item.image || asset("img/logo.png");

// Every filter tag the order page offers.
export const FILTER_TAGS = ["New", "Hot", "Cold", "Coffee", "No Caffeine", "Snacks", "Gluten Free", "Vegetarian"];

// Customization groups an item can offer. min/max are how many options the customer may pick.
// An option with `onlyForTag` only appears on items that have that tag (e.g. no "Hot" on iced-only drinks).
// `display: "slider"` shows a single-choice group as a slider, one stop per option, in the order listed.
export const modifierGroups = {
    customized: {
        title: "Customized",
        min: 0,
        max: 1,
        options: [
            { label: "PF/STR Jam", price: 1.0 },
            { label: "Other Flavor Added", price: 1.0 },
            { label: "Oat Milk", price: 0.75 },
            { label: "Coconut Milk", price: 0.75 },
            { label: "Cream Crown(Cheese)", price: 1.0 },
            { label: "Coffee (A Shot)", price: 3.5 },
        ],
    },
    ice: {
        title: "Iced or Hot",
        min: 1,
        max: 1,
        default: "Iced",
        options: [
            { label: "Iced", price: 0, onlyForTag: "Cold" },
            { label: "Hot", price: 0, onlyForTag: "Hot" },
        ],
    },
    sizeUp: {
        title: "Size-Up",
        min: 0,
        max: 1,
        options: [{ label: "Size up", price: 0.75 }],
    },
    sweetness: {
        title: "Sweetness",
        min: 1,
        max: 1,
        default: "100%",
        display: "slider",
        options: ["0%", "30%", "50%", "80%", "100%", "120%"].map((label) => ({ label, price: 0 })),
    },
    toppings: {
        title: "Toppings",
        min: 0,
        max: 4,
        options: [
            "Pearls (Bouncy)", "Amber Pearls (Softer/Sweeter)", "Mini Pearls (Bouncy Miniature)",
            "Coffee Jelly", "Rainbow Jelly", "Coconut Jelly", "Lychee Coconut Jelly",
            "Red Beans", "Grass Jelly (Herbal)", "Pudding (Egg Custard)", "Green Tea Jelly",
            "Aloe Vera Cubes", "Agar (Crystal Boba)", "Kiwi Popn'", "Honeydew Popn'",
            "Blueberry Popn'", "Strawberry Popn'", "Energy Blackcurrant Popn'", "Energy Redbull Popn'",
        ].map((label) => ({ label, price: 0.75 })),
    },
};

