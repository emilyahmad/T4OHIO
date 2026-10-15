import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Managemenu.css";
import { useMenu } from "../../../data/useMenu.js";

// Loads the menu, then hands it to the editor (which keeps its own working copy)
function ManageMenu() {
    const { menu, loading, error } = useMenu();

    if (loading || error) {
        return (
            <div className="mm-page">
                <h1 className="mm-page-title">Manage Menu</h1>
                <div className="mm-card">
                    <p>{error ? "Couldn't load the menu. Refresh the page to try again." : "Loading menu…"}</p>
                </div>
            </div>
        );
    }

    return <MenuEditor initialCategories={menu} />;
}

function MenuEditor({ initialCategories }) {
    const navigate = useNavigate();
    const [view, setView] = useState("select"); // "select" | "edit" | "add"
    const [categories, setCategories] = useState(initialCategories); // edits stay on this page until Phase 2 connects Save Changes to the database
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [saveMsg, setSaveMsg] = useState("");

    const currentCategory = categories.find(c => c.id === selectedCategory);

    const handleSelectCategory = (id) => {
        setSelectedCategory(id);
        setView("edit");
    };

    const handleItemChange = (itemId, field, value) => {
        setCategories(prev => prev.map(cat =>
            cat.id === selectedCategory
                ? { ...cat, items: cat.items.map(item =>
                    item.id === itemId ? { ...item, [field]: value } : item
                )}
                : cat
        ));
    };

    const handleDeleteItem = (itemId) => {
        setCategories(prev => prev.map(cat =>
            cat.id === selectedCategory
                ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
                : cat
        ));
    };

    const handleAddItem = () => {
        setCategories(prev => prev.map(cat =>
            cat.id === selectedCategory
                ? { ...cat, items: [...cat.items, { id: `${cat.id}-${Date.now()}`, name: "", price: "", image: null, tags: [], modifiers: [] }] }
                : cat
        ));
    };

    const handleDeleteCategory = () => {
        setCategories(prev => prev.filter(c => c.id !== selectedCategory));
        setView("select");
        setSelectedCategory("");
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        setCategories(prev => [...prev, { id: `category-${Date.now()}`, name: newCategoryName.trim(), items: [] }]);
        setNewCategoryName("");
        setView("select");
    };

    const handleSave = () => {
        setSaveMsg("Changes saved!");
        setTimeout(() => setSaveMsg(""), 2500);
    };

    return (
        <div className="mm-page">
            <h1 className="mm-page-title">Manage Menu</h1>

            <div className="mm-card">

                {/* ── SELECT VIEW ── */}
                {view === "select" && (
                    <div className="mm-select-view">
                        <button className="mm-back-btn" onClick={() => navigate("/admin")}>
                            ← Back to Admin
                        </button>
                        <h2 className="mm-section-title">Select a category to edit or delete</h2>
                        <div className="mm-category-list">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className="mm-category-btn"
                                    onClick={() => handleSelectCategory(cat.id)}>
                                    {cat.name}
                                    <span className="mm-item-count">{cat.items.length} items</span>
                                </button>
                            ))}
                        </div>
                        <div className="mm-divider"><span>OR</span></div>
                        <button className="mm-add-category-btn" onClick={() => setView("add")}>
                            + Add a Category
                        </button>
                    </div>
                )}

                {/* ── EDIT VIEW ── */}
                {view === "edit" && currentCategory && (
                    <div className="mm-edit-view">
                        <div className="mm-edit-header">
                            <button className="mm-back-btn" onClick={() => setView("select")}>
                                ← Back
                            </button>
                            <h2 className="mm-section-title">{currentCategory.name}</h2>
                            <button className="mm-delete-category-btn" onClick={handleDeleteCategory}>
                                Delete Category
                            </button>
                        </div>

                        <div className="mm-table-header">
                            <span>Name</span>
                            <span>Price ($)</span>
                            <span></span>
                        </div>

                        <div className="mm-items-list">
                            {currentCategory.items.map(item => (
                                <div className="mm-item-row" key={item.id}>
                                    <input
                                        className="mm-input"
                                        type="text"
                                        value={item.name}
                                        placeholder="Item name"
                                        onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                                    />
                                    <input
                                        className="mm-input mm-input-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.price}
                                        placeholder="0.00"
                                        onChange={(e) => handleItemChange(item.id, "price", e.target.value === "" ? "" : Number(e.target.value))}
                                    />
                                    <button
                                        className="mm-delete-item-btn"
                                        onClick={() => handleDeleteItem(item.id)}>
                                        <i className="fa-regular fa-trash-can" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button className="mm-add-item-btn" onClick={handleAddItem}>
                            + Add Item
                        </button>

                        <div className="mm-save-row">
                            {saveMsg && <span className="mm-save-msg">{saveMsg}</span>}
                            <button className="mm-save-btn" onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* ── ADD CATEGORY VIEW ── */}
                {view === "add" && (
                    <div className="mm-add-view">
                        <button className="mm-back-btn" onClick={() => setView("select")}>
                            ← Back
                        </button>
                        <h2 className="mm-section-title">Add a New Category</h2>
                        <div className="mm-add-field">
                            <label className="mm-label">Category Name</label>
                            <input
                                className="mm-input"
                                type="text"
                                placeholder="e.g. Seasonal"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                        </div>
                        <div className="mm-save-row">
                            <button className="mm-save-btn" onClick={handleAddCategory}>
                                Create Category
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ManageMenu;