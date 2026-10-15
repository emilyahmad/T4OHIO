import "../check/Modal.css";
import { useState } from "react";
import { modifierGroups, itemImage } from "../../data/menu.js";

// Options of a group this item can actually use (e.g. iced-only drinks don't offer HOT).
function availableOptions(group, item) {
    return group.options.filter(opt => !opt.onlyForTag || item.tags.includes(opt.onlyForTag));
}

// Required groups start on their default (or first) option; optional groups start empty.
function initialSelections(item) {
    const selections = {};
    for (const groupId of item.modifiers) {
        const group = modifierGroups[groupId];
        const options = availableOptions(group, item);
        const preset = options.find(opt => opt.label === group.default) ?? options[0];
        selections[groupId] = group.min > 0 && preset ? [preset.label] : [];
    }
    return selections;
}

const formatPrice = (n) => `$${n.toFixed(2)}`;

function ItemModal({ item, onClose, onAdd }) {
    const [quantity, setQuantity] = useState(1);
    const [selections, setSelections] = useState(() => initialSelections(item));
    const [showInstructions, setShowInstructions] = useState(false);
    const [instructions, setInstructions] = useState("");

    const toggleOption = (groupId, label) => {
        const group = modifierGroups[groupId];
        setSelections(prev => {
            const current = prev[groupId];
            if (current.includes(label)) {
                // Required single-choice groups (ice, sweetness) can't be cleared
                return group.min > 0 && group.max === 1 ? prev : { ...prev, [groupId]: current.filter(l => l !== label) };
            }
            if (group.max === 1) return { ...prev, [groupId]: [label] };
            if (current.length >= group.max) return prev;
            return { ...prev, [groupId]: [...current, label] };
        });
    };

    const addOnTotal = item.modifiers.reduce((sum, groupId) => {
        const group = modifierGroups[groupId];
        return sum + group.options
            .filter(opt => selections[groupId].includes(opt.label))
            .reduce((groupSum, opt) => groupSum + opt.price, 0);
    }, 0);
    const unitPrice = item.price + addOnTotal;

    const handleAdd = () => {
        onAdd({ itemId: item.id, name: item.name, unitPrice, quantity, selections, instructions: instructions.trim() });
    };

    return (
        <div className="modal-container" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

                {/* LEFT COLUMN */}
                <div className="modal-left-column">
                    <div className="modal-scrollable">
                        <h2 className="modal-drink-name">{item.name}</h2>

                        {item.modifiers.map(groupId => {
                            const group = modifierGroups[groupId];
                            const isSingleRequired = group.min > 0 && group.max === 1;
                            const atMax = selections[groupId].length >= group.max;
                            return (
                                <div className="modal-section" key={groupId}>
                                    <div className="modal-section-header">
                                        <span className="modal-section-title">{group.title}</span>
                                        {group.min > 0
                                            ? <span className="modal-section-badge badge-required">{group.min} required</span>
                                            : <span className="modal-section-badge badge-optional">Up to {group.max}</span>}
                                    </div>
                                    {availableOptions(group, item).map(opt => {
                                        const checked = selections[groupId].includes(opt.label);
                                        // Multi-pick groups lock the rest once the limit is reached; single-pick groups swap instead
                                        const disabled = !checked && atMax && group.max > 1;
                                        return (
                                            <label className={`modal-option${disabled ? " modal-option-disabled" : ""}`} key={opt.label}>
                                                <div className="modal-option-left">
                                                    <input type={isSingleRequired ? "radio" : "checkbox"}
                                                        name={`${item.id}-${groupId}`}
                                                        checked={checked}
                                                        disabled={disabled}
                                                        onChange={() => toggleOption(groupId, opt.label)} />
                                                    <span className="modal-option-label">{opt.label}</span>
                                                </div>
                                                <span className="modal-option-price">+{formatPrice(opt.price)}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            );
                        })}

                        {/* SPECIAL INSTRUCTIONS */}
                        <button type="button" className="modal-instructions" onClick={() => setShowInstructions(s => !s)}>
                            <i className={`fa-regular ${showInstructions ? "fa-minus" : "fa-plus"}`} />
                            Special instructions
                        </button>
                        {showInstructions && (
                            <textarea className="modal-instructions-input"
                                placeholder="e.g. less ice, extra napkins"
                                maxLength={200}
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)} />
                        )}
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
                        <button className="modal-add-btn" onClick={handleAdd}>
                            <span>Add to order</span>
                            <span>{formatPrice(unitPrice * quantity)}</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN — image */}
                <div className="modal-image-column">
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                    <img src={itemImage(item)} alt={item.alt || item.name} />
                </div>

            </div>
        </div>
    );
}

export default ItemModal;
