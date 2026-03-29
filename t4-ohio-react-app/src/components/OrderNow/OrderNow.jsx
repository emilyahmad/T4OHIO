import "./OrderNow.css";
import { useState } from "react";

function OrderNow() {
    const [selectedDrink, setSelectedDrink] = useState(null);

    const menu = [
        {
            category: "Classics",
            item: [
                { key: 1, name: "Jadeite Royal Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "4.75" },
                { key: 2, name: "Jasmine Green Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "4.75" },
                { key: 3, name: "Earl Grey Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "4.75" },
                { key: 4, name: "Roasted Oolong Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "4.75" },
                { key: 5, name: "Wintermelon", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25", tags1: "⭐️", tags2: "🔶" },
                { key: 6, name: "Green Apple", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25", tags1: "🆕", tags2: "🔶" },
                { key: 7, name: "Honey Grass Jelly", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25", tags1: "❄️", tags2: "🔶" },
                { key: 8, name: "Honey Green Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 9, name: "Honey Aloe", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25", tags1: "🔶" },
                { key: 10, name: "Elegant Rose Drink", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25", tags1: "❄️", tags2: "🔶" },
            ]
        },
        {
            category: "Smoothies",
            item: [
                { key: 1, name: "Lemon Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 2, name: "Lychee Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 3, name: "Green Apple Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "🆕" },
                { key: 4, name: "Strawberry Lemon Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "⭐️", tags2: "🔶" },
                { key: 5, name: "Passion Fruit Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 6, name: "Honey Peach Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "🔶" },
                { key: 7, name: "Sweet Mango Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 8, name: "Fruit Party Bubble", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.25" },
            ]
        },
        {
            category: "Milkshakes",
            item: [
                { key: 1, name: "Chocolate Milkshake", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.25", tags1: "🌱" },
                { key: 2, name: "Tornado Passionfruit Milkshake", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.25", tags1: "🔶", tags2: "🌱" },
                { key: 3, name: "Red Bean Milkshake", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.25", tags1: "🌱" },
                { key: 4, name: "Strawberry Milkshake", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.25", tags1: "🔶" },
                { key: 5, name: "Real Avocado Milkshake", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "7", tags1: "🔶", tags2: "🌱" },
                { key: 6, name: "Real TaroChunk Milkshake", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "7", tags1: "🔶", tags2: "🌱" },
            ]
        },
        {
            category: "Fresh & Fruity",
            item: [
                { key: 1, name: "Niji Fruit Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 2, name: "Strawberry Green Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "⭐️" },
                { key: 3, name: "Strawberry Lemonade", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "🔶" },
                { key: 4, name: "Elegant Rose Royal Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "⭐️" },
                { key: 5, name: "Pineapple Green Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 6, name: "Peach Green Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 7, name: "Green Apple Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "🆕" },
                { key: 8, name: "Lemon Green Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "⭐️" },
                { key: 9, name: "Lychee Black Tea (E/O)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 10, name: "Apple Black Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 11, name: "Honey Peach Royal Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25", tags1: "⭐️" },
                { key: 12, name: "Passionfruit Royal Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 13, name: "Mango Royal Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 14, name: "Grapefruit Royal Tea Ele", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
            ]
        },
        {
            category: "Milk Tea & Toppings",
            item: [
                { key: 1, name: "Pearl Milk Tea (Boba Tea)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6", tags1: "⭐️" },
                { key: 2, name: "Grass Jelly Milk Tea (E/O)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 3, name: "French Pudding Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 4, name: "Coconut Jelly Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 5, name: "Coffee Jelly Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6", tags1: "⭐️" },
                { key: 6, name: "Red Bean Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 7, name: "Rainbow Jelly Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 8, name: "Milk Tea w/ Pearls & CoffeeJ", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 9, name: "Boba Cake Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "7" },
            ]
        },
        {
            category: "Cream Crown",
            item: [
                { key: 1, name: "Cream Crown Your Way", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "1" },
            ]
        },
        {
            category: "Specialties",
            item: [
                { key: 1, name: "Earl Grey Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 2, name: "Jasmine Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 3, name: "Roasted Oolong Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 4, name: "Fresh Milk Tea (E/R/J/O)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.00" },
                { key: 5, name: "Taro Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "🔶" },
                { key: 6, name: "Caramel Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 7, name: "Classical Rose Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 8, name: "Wintermelon Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 9, name: "Peppermint Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 10, name: "Ballet Chocolate", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 11, name: "Kyoto Matcha Latte", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.00" },
                { key: 12, name: "Okinawa Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 13, name: "Strawberry Milk Tea (E/J)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 14, name: "Amber Pearl Latte", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.25", tags1: "🔶" },
            ]
        },
        {
            category: "Blissful Harmony (Seasonal)",
            item: [
                { key: 1, name: "Ginger Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "⭐️" },
                { key: 2, name: "Gingerbread Latte", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6", tags1: "🔶" },
                { key: 3, name: "Gingerbread Coffee Latte", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6", tags1: "☕" },
                { key: 4, name: "Pumpkin Spice Milk Tea", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
                { key: 5, name: "Green Apple Drink (w/or w/o tea)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.25" },
                { key: 6, name: "Green Apple Smoothie", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75" },
            ]
        },
        {
            category: "Coffee Fuse",
            item: [
                { key: 1, name: "New Yorker Coffee", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75", tags1: "☕" },
                { key: 2, name: "Ying & Yang Teaffee (Coffee Milk Tea)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.6", tags1: "⭐️", tags2: "☕" },
                { key: 3, name: "Tiramisù Frappé", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.6", tags1: "☕" },
                { key: 4, name: "Coffee Frappé", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6", tags1: "☕" },
                { key: 5, name: "Mocha Frappé", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.6", tags1: "☕" },
                { key: 6, name: "Cream Crown Coffee", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6.6", tags1: "☕" },
                { key: 7, name: "Gingerbread Coffee Latte", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6", tags1: "☕" },
            ]
        },
        {
            category: "Snacks",
            item: [
                { key: 1, name: "Macaron (1)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "1.75", tags1: "🌱" },
                { key: 2, name: "Korean CornDog", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5.75-6.50" },
                { key: 3, name: "A Piece of Cake (Tiramisù)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 4, name: "SteamBun", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "2.5" },
                { key: 5, name: "RedBeam Sesame Rice Balls (4)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5", tags1: "⭐️", tags2: "🌱" },
                { key: 6, name: "French Fries", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5", tags1: "🌱" },
                { key: 7, name: "Sweet Potato Fries", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6", tags1: "🌱" },
                { key: 8, name: "Veg. Spring Rolls (3)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "5", tags1: "🌱" },
                { key: 9, name: "Green Onion Pocket", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "4", tags1: "🌱" },
                { key: 10, name: "Black Pepper Pocket", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "4" },
                { key: 11, name: "Salt & Pepper Tofu", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "10", tags1: "⭐️", tags2: "🌱" },
                { key: 12, name: "Takoyaki (4)", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "6" },
                { key: 13, name: "Popcorn Chicken", image: "https://msshiandmrhe.com/wp-content/uploads/2022/11/WeChat-Image_20221114171715.jpg", alt: "change", price: "10", tags1: "⭐️" },
            ]
        },
    ]
    return (
        <>
            <div className="menu-header">
                <h1>Menu</h1>
                <div className="filters">
                    {["Classic", "Smoothie", "Milkshake", "Fresh & Fruity", "Milk Tea with Toppings", "Cream Crown", "Specialty", "Seasonal", "Coffee Fuse", "Snacks"].map((filter) => (
                        <button key={filter} className="filter-pill">
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
            
            {menu.map((category) => (
                <div className="classic" key={category.category}>
                    <h1>{category.category}</h1>
                    <div className="classic-drinks">
                        {category.item.map((item) => (
                            <div className="drink-card"
                            key={item.key}
                            onClick={() => setSelectedDrink(item)}>
                                <div className="tags">
                                    {(item.tags1 &&
                                    <p className="first-tag">{item.tags1}</p>
                                    )}
                                    {(item.tags2 &&
                                    <p className="second-tag">{item.tags2}</p>
                                    )}
                                    {(item.tags3 &&
                                    <p className="third-tag">{item.tags3}</p>
                                    )}
                                </div>
                                <img src={item.image}/>
                                <h3>{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

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

        </>
    );
}

export default OrderNow;