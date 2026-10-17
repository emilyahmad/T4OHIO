import "../check/Modal.css";
import { useEffect, useRef, useState } from "react";
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

// A single-choice group as a slider with one stop per option; the labels underneath can be tapped too
function OptionSlider({ id, label, options, value, onChange }) {
    const index = Math.max(0, options.findIndex(opt => opt.label === value));
    const last = options.length - 1;

    return (
        <div className="item-modal-slider" id={id} style={{ "--fill": `${(index / last) * 100}%` }}>
            <input type="range" min={0} max={last} step={1} value={index}
                aria-label={label} aria-valuetext={options[index].label}
                onChange={(e) => onChange(options[Number(e.target.value)].label)} />
            <div className="item-modal-slider-stops">
                {options.map((opt, i) => (
                    <button type="button" key={opt.label} tabIndex={-1}
                        className={i === index ? "is-selected" : undefined}
                        style={{ "--at": i / last }}
                        onClick={() => onChange(opt.label)}>
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function ItemModal({ item, onClose, onAdd }) {
    const [quantity, setQuantity] = useState(1);
    const [selections, setSelections] = useState(() => initialSelections(item));
    const [showInstructions, setShowInstructions] = useState(false);
    // Optional groups (add-ons, toppings) start collapsed; required ones are always open
    const [openGroups, setOpenGroups] = useState(() => new Set());
    const toggleGroup = (groupId) => setOpenGroups(prev => {
        const next = new Set(prev);
        if (next.has(groupId)) next.delete(groupId);
        else next.add(groupId);
        return next;
    });
    const [instructions, setInstructions] = useState("");
    const closeRef = useRef(null);
    // Kept in a ref so the effect below runs once on open, not on every re-render
    // (re-running it would pull focus back to the close button while someone types)
    const onCloseRef = useRef(onClose);
    useEffect(() => { onCloseRef.current = onClose; });

    // Escape closes; the page behind stops scrolling; focus starts inside the dialog
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onCloseRef.current(); };
        window.addEventListener("keydown", onKey);
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = overflow;
        };
    }, []);

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
    const soldOut = item.available === false;

    const handleAdd = () => {
        onAdd({ itemId: item.id, name: item.name, unitPrice, quantity, selections, instructions: instructions.trim() });
    };

    const titleId = `item-modal-title-${item.id}`;

    return (
        <div className="item-modal-backdrop" onClick={onClose}>
            <div className="item-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}
                onClick={(e) => e.stopPropagation()}>

                <button ref={closeRef} className="item-modal-close" onClick={onClose} aria-label="Close">
                    <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>

                <div className={item.image ? "item-modal-image" : "item-modal-image is-logo"}>
                    <img src={itemImage(item)} alt={item.alt || item.name} />
                </div>

                <div className="item-modal-body">
                    <div className="item-modal-scroll">
                        <header className="item-modal-header">
                            <h2 id={titleId}>{item.name}</h2>
                            <div className="item-modal-meta">
                                <span className="item-modal-price">{formatPrice(item.price)}</span>
                                {item.badge && <span className="item-modal-tag is-badge">{item.badge}</span>}
                                {item.tags.map(tag => <span className="item-modal-tag" key={tag}>{tag}</span>)}
                            </div>
                        </header>

                        {item.modifiers.map(groupId => {
                            const group = modifierGroups[groupId];
                            const options = availableOptions(group, item);
                            const chosen = selections[groupId];
                            const required = group.min > 0;
                            // Free single-choice groups (ice, sweetness) are quick-pick chips; add-ons are rows with prices
                            const asChips = group.max === 1 && options.every(opt => opt.price === 0);
                            const atMax = chosen.length >= group.max;
                            const open = required || openGroups.has(groupId);
                            const contentId = `${item.id}-${groupId}-options`;

                            return (
                                <fieldset className={open ? "item-modal-group" : "item-modal-group is-collapsed"} key={groupId}>
                                    {required ? (
                                        <legend className="item-modal-group-header">
                                            <span className="item-modal-group-title">{group.title}</span>
                                            <span className="item-modal-pill is-required">
                                                {chosen.length >= group.min && <i className="fa-solid fa-check" aria-hidden="true" />} Required
                                            </span>
                                        </legend>
                                    ) : (
                                        <legend className="item-modal-group-header">
                                            <button type="button" className="item-modal-group-toggle"
                                                aria-expanded={open} aria-controls={contentId}
                                                onClick={() => toggleGroup(groupId)}>
                                                <span className="item-modal-group-heading">
                                                    <span className="item-modal-group-title">{group.title}</span>
                                                    {/* While collapsed, show what's picked so choices are never hidden */}
                                                    {!open && chosen.length > 0 && (
                                                        <span className="item-modal-group-summary">{chosen.join(", ")}</span>
                                                    )}
                                                </span>
                                                <span className="item-modal-pill">
                                                    {group.max > 1 && chosen.length > 0 ? `${chosen.length} of ${group.max}` : `Optional${group.max > 1 ? ` · up to ${group.max}` : ""}`}
                                                </span>
                                                <i className={open ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"} aria-hidden="true" />
                                            </button>
                                        </legend>
                                    )}

                                    {!open ? null : group.display === "slider" ? (
                                        <OptionSlider id={contentId} label={group.title} options={options}
                                            value={chosen[0]} onChange={(label) => toggleOption(groupId, label)} />
                                    ) : asChips ? (
                                        <div className="item-modal-chips" id={contentId}>
                                            {options.map(opt => {
                                                const checked = chosen.includes(opt.label);
                                                return (
                                                    <label className={checked ? "item-modal-chip is-selected" : "item-modal-chip"} key={opt.label}>
                                                        <input type="radio" name={`${item.id}-${groupId}`} checked={checked}
                                                            onChange={() => toggleOption(groupId, opt.label)} />
                                                        {opt.label}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="item-modal-options" id={contentId}>
                                            {options.map(opt => {
                                                const checked = chosen.includes(opt.label);
                                                // Multi-pick groups lock the rest once the limit is reached; single-pick groups swap instead
                                                const disabled = !checked && atMax && group.max > 1;
                                                const classes = ["item-modal-option", checked && "is-selected", disabled && "is-disabled"].filter(Boolean).join(" ");
                                                return (
                                                    <label className={classes} key={opt.label}>
                                                        <input type={required && group.max === 1 ? "radio" : "checkbox"}
                                                            name={`${item.id}-${groupId}`}
                                                            checked={checked}
                                                            disabled={disabled}
                                                            onChange={() => toggleOption(groupId, opt.label)} />
                                                        <span className="item-modal-check" aria-hidden="true">
                                                            <i className="fa-solid fa-check" />
                                                        </span>
                                                        <span className="item-modal-option-label">{opt.label}</span>
                                                        {opt.price > 0 && <span className="item-modal-option-price">+{formatPrice(opt.price)}</span>}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </fieldset>
                            );
                        })}

                        {/* SPECIAL INSTRUCTIONS */}
                        <div className="item-modal-group">
                            <button type="button" className="item-modal-instructions-toggle"
                                aria-expanded={showInstructions}
                                onClick={() => setShowInstructions(s => !s)}>
                                <i className={`fa-solid ${showInstructions ? "fa-minus" : "fa-plus"}`} aria-hidden="true" />
                                Special instructions
                            </button>
                            {showInstructions && (
                                <textarea className="item-modal-instructions"
                                    placeholder="e.g. less ice, extra napkins"
                                    maxLength={200}
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)} />
                            )}
                        </div>
                    </div>

                    {/* STICKY FOOTER */}
                    <div className="item-modal-footer">
                        <div className="item-modal-quantity">
                            <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                disabled={quantity === 1} aria-label="One less">
                                <i className="fa-solid fa-minus" aria-hidden="true" />
                            </button>
                            <span aria-live="polite" aria-label={`Quantity ${quantity}`}>{quantity}</span>
                            <button type="button" onClick={() => setQuantity(q => q + 1)} aria-label="One more">
                                <i className="fa-solid fa-plus" aria-hidden="true" />
                            </button>
                        </div>
                        <button type="button" className="item-modal-add" onClick={handleAdd} disabled={soldOut}>
                            {soldOut ? <span>Sold out</span> : (
                                <>
                                    <span>Add to order</span>
                                    <span>{formatPrice(unitPrice * quantity)}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;
