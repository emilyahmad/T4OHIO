import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Managemenu.css";

const initialCategories = [
    { name: "Classic", items: [
        { id: 1, name: "Jadeite Royal Tea", price: "4.75" },
        { id: 2, name: "Jasmine Green Tea", price: "4.75" },
    ]},
    { name: "Smoothie", items: [
        { id: 1, name: "Lemon Smoothie", price: "5.75" },
        { id: 2, name: "Lychee Smoothie", price: "5.75" },
    ]},
    { name: "Snacks", items: [
        { id: 1, name: "French Fries", price: "5.00" },
        { id: 2, name: "Popcorn Chicken", price: "10.00" },
    ]},
    { name: "Milkshake", items: [
        { id: 1, name: "Chocolate Milkshake", price: "6.25" },
        { id: 2, name: "Red Bean Milkshake", price: "6.25" },
    ]},
];

function ManageMenu() {
    const navigate = useNavigate();
    const [view, setView] = useState("select"); // "select" | "edit" | "add"
    const [categories, setCategories] = useState(initialCategories);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [saveMsg, setSaveMsg] = useState("");

    const currentCategory = categories.find(c => c.name === selectedCategory);

    const handleSelectCategory = (name) => {
        setSelectedCategory(name);
        setView("edit");
    };

    const handleItemChange = (itemId, field, value) => {
        setCategories(prev => prev.map(cat =>
            cat.name === selectedCategory
                ? { ...cat, items: cat.items.map(item =>
                    item.id === itemId ? { ...item, [field]: value } : item
                )}
                : cat
        ));
    };

    const handleDeleteItem = (itemId) => {
        setCategories(prev => prev.map(cat =>
            cat.name === selectedCategory
                ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
                : cat
        ));
    };

    const handleAddItem = () => {
        setCategories(prev => prev.map(cat =>
            cat.name === selectedCategory
                ? { ...cat, items: [...cat.items, { id: Date.now(), name: "", price: "" }] }
                : cat
        ));
    };

    const handleDeleteCategory = () => {
        setCategories(prev => prev.filter(c => c.name !== selectedCategory));
        setView("select");
        setSelectedCategory("");
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        setCategories(prev => [...prev, { name: newCategoryName.trim(), items: [] }]);
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
                                    key={cat.name}
                                    className="mm-category-btn"
                                    onClick={() => handleSelectCategory(cat.name)}>
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
                            <h2 className="mm-section-title">{selectedCategory}</h2>
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
                                        type="text"
                                        value={item.price}
                                        placeholder="0.00"
                                        onChange={(e) => handleItemChange(item.id, "price", e.target.value)}
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