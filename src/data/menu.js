// Menu settings that live in code. The items and categories themselves are in the database (see useMenu.js).
import { asset } from "../utils/asset.js";

// Items without a photo yet (image: null) show the T4 logo.
export const itemImage = (item) => item.image || asset("img/logo.png");

// Every filter tag the order page offers.
export const FILTER_TAGS = ["New", "Hot", "Cold", "Coffee", "No Caffeine", "Snacks", "Gluten Free", "Vegan"];

// Customization groups an item can offer. min/max are how many options the customer may pick.
// An option with `onlyForTag` only appears on items that have that tag (e.g. no "Hot" on iced-only drinks).
export const modifierGroups = {
    customized: {
        title: "Customized",
        min: 0,
        max: 1,
        options: [
            { label: "PF/STR Jam", price: 1.0 },
            { label: "Other Flavor Added", price: 1.0 },
            { label: "Oat Milk", price: 0.75 },
            { label: "Cream Crown(Cheese)", price: 1.0 },
            { label: "Coffee (A Shot)", price: 3.5 },
        ],
    },
    ice: {
        title: "Ice / Hot",
        min: 1,
        max: 1,
        default: "100%",
        options: [
            { label: "100%", price: 0, onlyForTag: "Cold" },
            { label: "120%", price: 0, onlyForTag: "Cold" },
            { label: "80%", price: 0, onlyForTag: "Cold" },
            { label: "30%", price: 0, onlyForTag: "Cold" },
            { label: "0%", price: 0, onlyForTag: "Cold" },
            { label: "HOT", price: 0, onlyForTag: "Hot" },
            { label: "WARM", price: 0, onlyForTag: "Hot" },
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
        options: ["80%", "30%", "50%", "0%", "100%", "120%"].map((label) => ({ label, price: 0 })),
    },
    toppings: {
        title: "Toppings",
        min: 0,
        max: 4,
        options: [
            "Amber Pearl", "Boba", "Mini Boba", "Lychee CJ",
            "Mixed Boba w/ Mini", "Blueberry Popping", "Kiwi Pop'n",
            "Honeydew Pop'n Boba", "Strawberry Pop'n", "Green TJ",
            "Coconut J", "Pudding (Flan)", "Rainbow J", "Grass J",
            "Cream Crown", "Coffee J", "Aloe", "Agar P", "Red Bean",
        ].map((label) => ({ label, price: 0.75 })),
    },
};

