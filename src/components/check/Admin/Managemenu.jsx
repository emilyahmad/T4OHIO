import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./Managemenu.css";
import { supabase } from "../../../lib/supabase.js";
import { useMenu } from "../../../data/useMenu.js";
import { FILTER_TAGS, modifierGroups, itemImage } from "../../../data/menu.js";
import { useEditHistory } from "./useEditHistory.js";
import { SaveBar, Toggle, ImageField, MoveButtons } from "./AdminParts.jsx";
import { moveInList, shortId, useReportDirty } from "./adminUtils.js";

// Only the fields the editor changes, so "unsaved changes" compares like with like
function toDraft(menu) {
    return menu.map(category => ({
        id: category.id,
        name: category.name,
        items: category.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            alt: item.alt,
            tags: item.tags,
            modifiers: item.modifiers,
            badge: item.badge,
            available: item.available,
        })),
    }));
}

// The first thing that would stop the menu from saving, or null.
function findProblem(categories) {
    for (const category of categories) {
        if (!category.name.trim()) return { categoryId: category.id, message: "Every category needs a name." };
        for (const item of category.items) {
            if (!item.name.trim()) return { categoryId: category.id, itemId: item.id, message: `An item in “${category.name}” needs a name.` };
            if (item.price === "" || !(Number(item.price) >= 0)) return { categoryId: category.id, itemId: item.id, message: `“${item.name}” needs a price.` };
        }
    }
    return null;
}

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const blankToNull = (text) => text?.trim() || null;

function ManageMenu() {
    const { menu, loading, error } = useMenu();

    if (loading || error) {
        return (
            <div className="adm-page">
                <h1 className="adm-title">Menu</h1>
                <div className="adm-panel adm-empty">
                    {error ? "Couldn't load the menu. Refresh the page to try again." : <><i className="fa-solid fa-spinner fa-spin" /> Loading menu…</>}
                </div>
            </div>
        );
    }

    return <MenuEditor initialMenu={toDraft(menu)} />;
}

function MenuEditor({ initialMenu }) {
    const { notify } = useOutletContext();
    const history = useEditHistory(initialMenu);
    const { draft: categories, update, undo, markSaved } = history;
    const [selectedId, setSelectedId] = useState(initialMenu[0]?.id ?? null);
    const [search, setSearch] = useState("");
    const [expanded, setExpanded] = useState(null); // item id with its details open
    const [newCategoryName, setNewCategoryName] = useState("");
    const [problem, setProblem] = useState(null);
    const [saving, setSaving] = useState(false);

    useReportDirty(history.dirty);

    // Undo can remove the selected category, so fall back to the first one
    const current = categories.find(c => c.id === selectedId) ?? categories[0];
    const itemCount = categories.reduce((n, c) => n + c.items.length, 0);
    const soldOutCount = categories.reduce((n, c) => n + c.items.filter(i => !i.available).length, 0);

    // ── Edits ──

    const updateCategory = (categoryId, changes, mergeKey) =>
        update(cats => cats.map(c => c.id === categoryId ? { ...c, ...changes } : c), mergeKey);

    const updateItem = (itemId, changes, mergeKey) =>
        update(cats => cats.map(c => !c.items.some(i => i.id === itemId) ? c : {
            ...c,
            items: c.items.map(i => i.id === itemId ? { ...i, ...changes } : i),
        }), mergeKey);

    const addItem = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        const template = category.items[category.items.length - 1]; // new items start with the same tags/options as their neighbours
        const item = {
            id: `${categoryId}-${shortId()}`,
            name: "",
            price: template?.price ?? 0,
            image: null,
            alt: null,
            tags: template?.tags ?? [],
            modifiers: template?.modifiers ?? [],
            badge: null,
            available: true,
        };
        update(cats => cats.map(c => c.id === categoryId ? { ...c, items: [...c.items, item] } : c));
        setSearch("");
        setExpanded(item.id);
    };

    const duplicateItem = (categoryId, item) => {
        const copy = { ...item, id: `${categoryId}-${shortId()}`, name: `${item.name} (copy)` };
        update(cats => cats.map(c => {
            if (c.id !== categoryId) return c;
            const items = [...c.items];
            items.splice(items.findIndex(i => i.id === item.id) + 1, 0, copy);
            return { ...c, items };
        }));
        setExpanded(copy.id);
    };

    const deleteItem = (item) => {
        update(cats => cats.map(c => ({ ...c, items: c.items.filter(i => i.id !== item.id) })));
        notify(`Removed “${item.name || "Untitled item"}”`, { action: { label: "Undo", onClick: undo } });
    };

    const moveItem = (categoryId, index, delta) =>
        update(cats => cats.map(c => c.id === categoryId ? { ...c, items: moveInList(c.items, index, delta) } : c));

    const changeItemCategory = (item, toCategoryId) =>
        update(cats => cats.map(c => {
            if (c.id === toCategoryId) return { ...c, items: [...c.items, item] };
            return { ...c, items: c.items.filter(i => i.id !== item.id) };
        }));

    const addCategory = (e) => {
        e.preventDefault();
        const name = newCategoryName.trim();
        if (!name) return;
        const id = `${slugify(name) || "category"}-${shortId()}`;
        update(cats => [...cats, { id, name, items: [] }]);
        setNewCategoryName("");
        setSelectedId(id);
        setSearch("");
    };

    const deleteCategory = (category) => {
        const count = category.items.length;
        if (count > 0 && !window.confirm(`Delete “${category.name}” and its ${count} item${count === 1 ? "" : "s"}?\n\nNothing changes for customers until you save, and you can undo this.`)) return;
        update(cats => cats.filter(c => c.id !== category.id));
        notify(`Removed the “${category.name}” category`, { action: { label: "Undo", onClick: undo } });
    };

    const moveCategory = (index, delta) => update(cats => moveInList(cats, index, delta));

    // ── Save ──

    const handleSave = async () => {
        const found = findProblem(categories);
        setProblem(found);
        if (found) {
            setSelectedId(found.categoryId);
            setSearch("");
            if (found.itemId) setExpanded(found.itemId);
            notify(found.message, { type: "error" });
            return;
        }

        const snapshot = categories;
        const p_categories = snapshot.map((c, index) => ({ id: c.id, name: c.name.trim(), sort_order: index }));
        const p_items = snapshot.flatMap(c => c.items.map((item, index) => ({
            ...item,
            name: item.name.trim(),
            price: Number(item.price),
            alt: blankToNull(item.alt),
            badge: blankToNull(item.badge),
            category_id: c.id,
            sort_order: index,
        })));

        setSaving(true);
        const { error } = await supabase.rpc("save_menu", { p_categories, p_items });
        setSaving(false);

        if (error) {
            console.error("Failed to save menu", error);
            notify(error.code === "PGRST202"
                ? "The database isn't set up for saving yet. Run supabase/admin.sql in the Supabase SQL editor."
                : `Couldn't save: ${error.message}`, { type: "error" });
        } else {
            markSaved(snapshot);
            notify("Menu saved. Customers see the changes now.");
        }
    };

    // ── Render ──

    const query = search.trim().toLowerCase();
    const searchResults = query && categories.flatMap(c => c.items
        .filter(i => i.name.toLowerCase().includes(query))
        .map(item => ({ item, category: c })));

    const rowProps = { categories, expanded, setExpanded, updateItem, deleteItem, duplicateItem, changeItemCategory, problem };

    return (
        <div className="adm-page">
            <header className="adm-header">
                <div>
                    <h1 className="adm-title">Menu</h1>
                    <p className="adm-subtitle">
                        {categories.length} categories · {itemCount} items
                        {soldOutCount > 0 && <> · <span className="adm-text-warn">{soldOutCount} sold out</span></>}
                    </p>
                </div>
                <div className="adm-search">
                    <i className="fa-solid fa-magnifying-glass" />
                    <input className="adm-input" type="search" placeholder="Search all items…"
                        value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </header>

            <div className="mm-layout">
                {/* ── Categories ── */}
                <aside className="adm-panel mm-categories">
                    <h2 className="adm-panel-title">Categories</h2>
                    <ul className="mm-category-list">
                        {categories.map((c, index) => (
                            <li key={c.id} className={`mm-category${c.id === current?.id && !query ? " active" : ""}`}>
                                <button className="mm-category-name" onClick={() => { setSelectedId(c.id); setSearch(""); }}>
                                    <span>{c.name || <em>Untitled</em>}</span>
                                    <span className="mm-category-count">
                                        {c.items.length}
                                        {c.items.some(i => !i.available) && <i className="fa-solid fa-circle mm-soldout-dot" title="Has sold-out items" />}
                                    </span>
                                </button>
                                <MoveButtons index={index} count={categories.length} label="category" onMove={(d) => moveCategory(index, d)} />
                            </li>
                        ))}
                    </ul>
                    <form className="mm-add-category" onSubmit={addCategory}>
                        <input className="adm-input adm-input-small" placeholder="New category name"
                            value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                        <button className="adm-btn adm-btn-small" type="submit" disabled={!newCategoryName.trim()}>
                            <i className="fa-solid fa-plus" /> Add
                        </button>
                    </form>
                </aside>

                {/* ── Items ── */}
                <section className="adm-panel mm-items">
                    {query ? (
                        <>
                            <div className="mm-items-header">
                                <h2 className="adm-panel-title">
                                    {searchResults.length} result{searchResults.length === 1 ? "" : "s"} for “{search.trim()}”
                                </h2>
                                <button className="adm-btn adm-btn-ghost adm-btn-small" onClick={() => setSearch("")}>Clear search</button>
                            </div>
                            {searchResults.length === 0 && <p className="adm-empty">No items match.</p>}
                            {searchResults.map(({ item, category }) => (
                                <ItemRow key={item.id} item={item} category={category} showCategory {...rowProps} />
                            ))}
                        </>
                    ) : current ? (
                        <>
                            <div className="mm-items-header">
                                <input className={`adm-input mm-category-title${problem?.categoryId === current.id && !current.name.trim() ? " invalid" : ""}`}
                                    value={current.name} placeholder="Category name" aria-label="Category name"
                                    onChange={(e) => updateCategory(current.id, { name: e.target.value }, `${current.id}:name`)} />
                                <button className="adm-btn adm-btn-danger adm-btn-small" onClick={() => deleteCategory(current)}>
                                    <i className="fa-regular fa-trash-can" /> Delete category
                                </button>
                            </div>

                            {current.items.length === 0 && <p className="adm-empty">No items in this category yet.</p>}
                            {current.items.map((item, index) => (
                                <ItemRow key={item.id} item={item} category={current}
                                    index={index} count={current.items.length}
                                    onMove={(d) => moveItem(current.id, index, d)} {...rowProps} />
                            ))}

                            <button className="mm-add-item" onClick={() => addItem(current.id)}>
                                <i className="fa-solid fa-plus" /> Add item to {current.name || "this category"}
                            </button>
                        </>
                    ) : (
                        <p className="adm-empty">No categories yet. Add one on the left.</p>
                    )}
                </section>
            </div>

            <SaveBar history={history} saving={saving} onSave={handleSave} />
        </div>
    );
}

function ItemRow({ item, category, categories, index, count, onMove, showCategory, expanded, setExpanded,
    updateItem, deleteItem, duplicateItem, changeItemCategory, problem }) {
    const isOpen = expanded === item.id;
    const flagged = problem?.itemId === item.id;
    const field = (name) => (e) => updateItem(item.id, { [name]: e.target.value }, `${item.id}:${name}`);
    const toggleIn = (list, value) => list.includes(value) ? list.filter(v => v !== value) : [...list, value];
    const allTags = [...FILTER_TAGS, ...item.tags.filter(t => !FILTER_TAGS.includes(t))];

    return (
        <div className={`mm-item${isOpen ? " open" : ""}${item.available ? "" : " sold-out"}`}>
            <div className="mm-item-main">
                {onMove && <MoveButtons index={index} count={count} onMove={onMove} />}
                <img className="mm-item-thumb" src={itemImage(item)} alt="" />
                <div className="mm-item-name">
                    <input className={`adm-input${flagged && !item.name.trim() ? " invalid" : ""}`}
                        value={item.name} placeholder="Item name" aria-label="Item name"
                        autoFocus={isOpen && item.name === ""} onChange={field("name")} />
                    {showCategory && <span className="mm-item-category">{category.name}</span>}
                </div>
                <div className={`mm-price${flagged && (item.price === "" || !(Number(item.price) >= 0)) ? " invalid" : ""}`}>
                    <span>$</span>
                    <input className="adm-input" type="number" min="0" step="0.01" aria-label="Price"
                        value={item.price} onChange={(e) => updateItem(item.id, { price: e.target.value === "" ? "" : Number(e.target.value) }, `${item.id}:price`)} />
                </div>
                <Toggle checked={item.available} onLabel="Available" offLabel="Sold out"
                    onChange={(available) => updateItem(item.id, { available })} />
                <div className="mm-item-actions">
                    <button className="adm-icon-btn" onClick={() => setExpanded(isOpen ? null : item.id)}
                        aria-expanded={isOpen} title={isOpen ? "Hide details" : "Edit photo, tags & options"}>
                        <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-pen"}`} />
                    </button>
                    <button className="adm-icon-btn" onClick={() => duplicateItem(category.id, item)} title="Duplicate">
                        <i className="fa-regular fa-copy" />
                    </button>
                    <button className="adm-icon-btn adm-icon-btn-danger" onClick={() => deleteItem(item)} title="Delete">
                        <i className="fa-regular fa-trash-can" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="mm-item-details">
                    <div className="adm-field">
                        <span className="adm-label">Photo</span>
                        <ImageField value={item.image} folder="menu" fallback={itemImage({})}
                            onChange={(image) => updateItem(item.id, { image })} />
                    </div>
                    <div className="mm-detail-grid">
                        <label className="adm-field">
                            <span className="adm-label">Photo description <span className="adm-hint">(for screen readers)</span></span>
                            <input className="adm-input" value={item.alt ?? ""} placeholder={item.name} onChange={field("alt")} />
                        </label>
                        <label className="adm-field">
                            <span className="adm-label">Badge <span className="adm-hint">(optional, e.g. “Best seller”)</span></span>
                            <input className="adm-input" value={item.badge ?? ""} onChange={field("badge")} />
                        </label>
                        <label className="adm-field">
                            <span className="adm-label">Category</span>
                            <select className="adm-input" value={category.id} onChange={(e) => changeItemCategory(item, e.target.value)}>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name || "Untitled"}</option>)}
                            </select>
                        </label>
                    </div>
                    <div className="adm-field">
                        <span className="adm-label">Filter tags <span className="adm-hint">(customers filter the menu by these)</span></span>
                        <div className="adm-chips">
                            {allTags.map(tag => (
                                <button key={tag} type="button" className={`adm-chip${item.tags.includes(tag) ? " on" : ""}`}
                                    onClick={() => updateItem(item.id, { tags: toggleIn(item.tags, tag) })}>
                                    {item.tags.includes(tag) && <i className="fa-solid fa-check" />} {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="adm-field">
                        <span className="adm-label">Customization options <span className="adm-hint">(shown when ordering)</span></span>
                        <div className="adm-chips">
                            {Object.entries(modifierGroups).map(([key, group]) => (
                                <button key={key} type="button" className={`adm-chip${item.modifiers.includes(key) ? " on" : ""}`}
                                    onClick={() => updateItem(item.id, {
                                        // keep the order the order page expects
                                        modifiers: Object.keys(modifierGroups).filter(k => k === key ? !item.modifiers.includes(k) : item.modifiers.includes(k)),
                                    })}>
                                    {item.modifiers.includes(key) && <i className="fa-solid fa-check" />} {group.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageMenu;
