import "./OrderNow.css";
import { useState } from "react";
import { FILTER_TAGS, itemImage } from "../../data/menu.js";
import { useMenu } from "../../data/useMenu.js";
import ItemModal from "./ItemModal.jsx";

function DrinkCard({ item, onSelect }) {
    return (
        <div className="drink-card" onClick={() => onSelect(item)}>
            <div className="drink-card-image-container">
                <img src={itemImage(item)} alt={item.alt || item.name} />
            </div>
            <h3>{item.name}</h3>
        </div>
    );
}

const statusStyle = { color: "var(--t4-mist)", fontSize: "1.25rem" };

function OrderNow() {
    const { menu: fullMenu, loading, error } = useMenu();
    const [selectedDrink, setSelectedDrink] = useState(null);

    // Sold-out items stay in the database but are hidden from customers
    const menu = fullMenu
        .map(category => ({ ...category, items: category.items.filter(item => item.available) }))
        .filter(category => category.items.length > 0);
    const [activeFilters, setActiveFilters] = useState([]);

    const toggleFilter = (filter) => {
        setActiveFilters((prev) =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    // Some items are listed under two categories; show each only once when filtering
    const filteredMenu = activeFilters.length === 0 ? null : menu
        .flatMap(category => category.items)
        .filter(item => activeFilters.every(f => item.tags.includes(f)))
        .filter((item, i, items) => items.findIndex(other => other.name === item.name) === i);
    const filterTitle = activeFilters.length === 1 ? `${activeFilters[0]}` : `${activeFilters.join(" & ")} Items`;

    // TODO (Phase 4): put the line item in the cart
    const handleAdd = () => setSelectedDrink(null);

    return (
        <div className="menu-container">
            <div className="menu-header">
                <div className="menu-video-container">
                    <iframe className="menu-video" width="560" height="315"
                    src="https://www.youtube.com/embed/hiGIQ0xwrxo?autoplay=1&mute=1&controls=0&loop=1&playlist=hiGIQ0xwrxo&si=busjpJVvxQdNVQK1"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write;
                    encrypted-media; gyroscope; picture-in-picture;
                    web-share" referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>
                </div>
                <h1 className="menu-title" >Menu</h1>
            <div className="menu-explore-container">
                <div className="filter-menu-options">
                    <div className="filters">
                        <h2>Filters</h2>
                        <br></br>
                        {FILTER_TAGS.map((filter => (
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
                    {loading ? (
                        <p style={statusStyle}>Loading the menu…</p>
                    ) : error ? (
                        <p style={statusStyle}>Sorry, the menu couldn't load. Please refresh the page to try again.</p>
                    ) : filteredMenu ? (
                        <div className="classic">
                            <h1>{filterTitle}</h1>
                            <div className="classic-drinks">
                                {filteredMenu.length > 0 ? filteredMenu.map((item) => (
                                    <DrinkCard key={item.id} item={item} onSelect={setSelectedDrink} />
                                )) : (
                                    <p style={statusStyle}>
                                        No items match these filters.
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        menu.map((category) => (
                            <div className="classic" key={category.id}>
                                <h1>{category.name}</h1>
                                <div className="classic-drinks">
                                    {category.items.map((item) => (
                                        <DrinkCard key={item.id} item={item} onSelect={setSelectedDrink} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
            </div>

            {selectedDrink && (
                <ItemModal
                    key={selectedDrink.id}
                    item={selectedDrink}
                    onClose={() => setSelectedDrink(null)}
                    onAdd={handleAdd} />
            )}
        </div>
    );
}

export default OrderNow;
