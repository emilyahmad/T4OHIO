import "./OrderNow.css";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FILTER_TAGS, itemImage } from "../../data/menu.js";
import { useMenu } from "../../data/useMenu.js";
import ItemModal from "./ItemModal.jsx";
import QuizModal from "../BobaQuiz/QuizModal.jsx";
import { CartButton, CartDrawer } from "../Cart/Cart.jsx";
import { useCart } from "../Cart/useCart.js";
import { CART_ENABLED } from "../Cart/cartConfig.js";
import { track } from "../../lib/analytics.js";

const formatPrice = (n) => `$${n.toFixed(2)}`;

// One menu item: photo, name, iced/hot, price and an add button. The whole card opens the item.
function DrinkCard({ item, onSelect }) {
    const temperature = [item.tags.includes("Cold") && "Iced", item.tags.includes("Hot") && "Hot"].filter(Boolean).join(" · ");
    const isNew = item.tags.includes("New");

    return (
        <button type="button" className="drink-card" onClick={() => onSelect(item)}>
            <div className={item.image ? "drink-card-image" : "drink-card-image is-logo"}>
                <img src={itemImage(item)} alt={item.alt || item.name} loading="lazy" />
                {isNew && <span className="drink-card-badge">New</span>}
            </div>
            <div className="drink-card-body">
                <h3>{item.name}</h3>
                {temperature && <span className="drink-card-meta">{temperature}</span>}
                <div className="drink-card-footer">
                    <span className="drink-card-price">{formatPrice(item.price)}</span>
                    <span className="drink-card-add" aria-hidden="true"><i className="fa-solid fa-plus"></i></span>
                </div>
            </div>
        </button>
    );
}

// These filters share the second row with the search box; the rest go on the first row
const SECOND_ROW_FILTERS = ["Gluten Free", "Vegetarian"];

const statusStyle = { color: "var(--t4-mist)", fontSize: "1.25rem" };

// Lowercase without accents, so "tiramisu" finds "Tiramisù Frappé"
const normalize = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function OrderNow() {
    const { menu: fullMenu, loading, error } = useMenu();
    const [selectedDrink, setSelectedDrink] = useState(null);

    // Sold-out items stay in the database but are hidden from customers
    const menu = fullMenu
        .map(category => ({ ...category, items: category.items.filter(item => item.available) }))
        .filter(category => category.items.length > 0);
    const [activeFilters, setActiveFilters] = useState([]);
    // The boba quiz sends people here with ?q=their drink, so the menu opens already searching for it
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") ?? "");
    const [quizOpen, setQuizOpen] = useState(false);
    const cart = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    // Categories start open; clicking a category's heading folds it away
    const [collapsed, setCollapsed] = useState(() => new Set());
    const toggleCategory = (id) => setCollapsed(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
    });

    const toggleFilter = (filter) => {
        if (!activeFilters.includes(filter)) track("filter", { name: filter });
        setActiveFilters((prev) =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
        );
    };

    // A search matches when every word appears in the drink's name, its category or its tags
    const words = normalize(query).split(/\s+/).filter(Boolean);
    const matchesSearch = (item, category) => {
        const haystack = normalize([item.name, category.name, ...item.tags].join(" "));
        return words.every(word => haystack.includes(word));
    };

    // Some items are listed under two categories; show each only once when searching or filtering
    const filteredMenu = activeFilters.length === 0 && words.length === 0 ? null : menu
        .flatMap(category => category.items.map(item => ({ item, category })))
        .filter(({ item, category }) => activeFilters.every(f => item.tags.includes(f)) && matchesSearch(item, category))
        .map(({ item }) => item)
        .filter((item, i, items) => items.findIndex(other => other.name === item.name) === i);
    const filterLabel = activeFilters.length === 1 ? `${activeFilters[0]}` : `${activeFilters.join(" & ")} Items`;
    const filterTitle = words.length === 0 ? filterLabel
        : `Results for “${query.trim()}”${activeFilters.length ? ` · ${activeFilters.join(" & ")}` : ""}`;

    // Log what people search for once they stop typing. Searches the quiz filled in aren't the visitor's own.
    const typedSearch = useRef(false);
    useEffect(() => {
        if (!typedSearch.current || words.length === 0) return;
        const timer = setTimeout(() => track("search", { query: words.join(" ").slice(0, 60), results: filteredMenu ? filteredMenu.length : 0 }), 1200);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- `words` is rebuilt every render; `query` is what changes
    }, [query]);

    const openItem = (item) => {
        track("item_view", { item: item.name });
        setSelectedDrink(item);
    };

    const renderFilters = (filters) => (
        <ul className="filter-list">
            {filters.map((filter) => {
                const active = activeFilters.includes(filter);
                return (
                    <li key={filter}>
                        <button type="button"
                            className={active ? "filter-pill filter-pill-active" : "filter-pill"}
                            aria-pressed={active}
                            onClick={() => toggleFilter(filter)}>
                            {filter}
                            {active && <i className="fa-solid fa-check" aria-hidden="true"></i>}
                        </button>
                    </li>
                );
            })}
        </ul>
    );

    // TODO (Phase 4): put the line item in the cart
    const handleAdd = (order) => {
        const { sweetness, ice, toppings, customized, sizeUp } = order.selections;
        track("order_add", {
            item: order.name,
            quantity: order.quantity,
            sweetness: sweetness?.[0] ?? null,
            ice: ice?.[0] ?? null,
            toppings: toppings ?? [],
            extras: [...(customized ?? []), ...(sizeUp ?? [])],
        });
        setSelectedDrink(null);
    };

    return (
        <div className="menu-container">
            <div className="menu-explore-container">
                <div className="filter-menu-options">
                    <div className="filters">
                        <div className="filter-bar">
                            {renderFilters(FILTER_TAGS.filter(f => !SECOND_ROW_FILTERS.includes(f)))}
                        </div>
                        <div className="filter-bar">
                            {renderFilters(FILTER_TAGS.filter(f => SECOND_ROW_FILTERS.includes(f)))}
                            <div className="menu-search">
                                <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                                <input type="search" placeholder="Search the menu"
                                    aria-label="Search the menu"
                                    value={query} onChange={(e) => { typedSearch.current = true; setQuery(e.target.value); }} />
                                {query && (
                                    <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                                        <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                                    </button>
                                )}
                            </div>
                        </div>
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
                                    <DrinkCard key={item.id} item={item} onSelect={openItem} />
                                )) : (
                                    <p style={statusStyle}>
                                        {words.length ? `Nothing on the menu matches “${query.trim()}”${activeFilters.length ? " with these filters" : ""}.` : "No items match these filters."}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        menu.map((category) => {
                            const open = !collapsed.has(category.id);
                            const listId = `category-${category.id}`;
                            return (
                                <div className={open ? "classic" : "classic is-collapsed"} key={category.id}>
                                    <h1>
                                        <button type="button" className="category-toggle"
                                            aria-expanded={open} aria-controls={listId}
                                            onClick={() => toggleCategory(category.id)}>
                                            {category.name}
                                            <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
                                        </button>
                                    </h1>
                                    {open && (
                                        <div className="classic-drinks" id={listId}>
                                            {category.items.map((item) => (
                                                <DrinkCard key={item.id} item={item} onSelect={openItem} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                    {/* After the last category (Snacks), or the last search/filter result */}
                    {!loading && !error && (
                        <button type="button" className="quiz-prompt" onClick={() => setQuizOpen(true)}>
                            Not sure what to get? <span>Take the quiz to find out</span>
                        </button>
                    )}
                </div>

            </div>

            {quizOpen && (
                <QuizModal
                    onClose={() => setQuizOpen(false)}
                    onPick={(drinkName) => { typedSearch.current = false; setQuery(drinkName); setQuizOpen(false); }} />
            )}

            {CART_ENABLED && <CartButton count={cart.count} onClick={() => setCartOpen(true)} />}
            {CART_ENABLED && cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} />}

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
