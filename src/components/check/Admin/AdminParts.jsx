// Small pieces shared by the admin editors.
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { asset } from "../../../utils/asset.js";
import { uploadImage } from "../../../lib/uploadImage.js";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
const MOD = isMac ? "⌘" : "Ctrl+";

// Sticky bar with Undo / Redo / Discard / Save, plus ⌘Z, ⇧⌘Z (or Ctrl+Y) and ⌘S shortcuts.
export function SaveBar({ history, saving, onSave }) {
    const { dirty, canUndo, canRedo, undo, redo, discard } = history;

    // Keep the latest handlers in a ref so the key listener is attached once
    const handlers = useRef();
    useEffect(() => {
        handlers.current = { undo, redo, onSave, dirty, saving };
    });

    useEffect(() => {
        const onKeyDown = (e) => {
            if (!(e.metaKey || e.ctrlKey)) return;
            const key = e.key.toLowerCase();
            const h = handlers.current;
            if (key === "z" && !e.shiftKey) { e.preventDefault(); h.undo(); }
            else if ((key === "z" && e.shiftKey) || key === "y") { e.preventDefault(); h.redo(); }
            else if (key === "s") { e.preventDefault(); if (h.dirty && !h.saving) h.onSave(); }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <div className={`adm-savebar${dirty ? " is-dirty" : ""}`}>
            <span className="adm-savebar-status">
                {saving ? (
                    <><i className="fa-solid fa-spinner fa-spin" /> Saving…</>
                ) : dirty ? (
                    <><span className="adm-dot" /> Unsaved changes. Customers won't see them until you save.</>
                ) : (
                    <><i className="fa-solid fa-circle-check" /> All changes are live</>
                )}
            </span>
            <div className="adm-savebar-actions">
                <button className="adm-icon-btn" onClick={undo} disabled={!canUndo || saving} title={`Undo (${MOD}Z)`} aria-label="Undo">
                    <i className="fa-solid fa-rotate-left" />
                </button>
                <button className="adm-icon-btn" onClick={redo} disabled={!canRedo || saving} title={`Redo (${isMac ? "⇧⌘Z" : "Ctrl+Y"})`} aria-label="Redo">
                    <i className="fa-solid fa-rotate-right" />
                </button>
                <button className="adm-btn adm-btn-ghost" onClick={discard} disabled={!dirty || saving}
                    title="Go back to the last saved version (you can undo this)">
                    Discard changes
                </button>
                <button className="adm-btn adm-btn-primary" onClick={onSave} disabled={!dirty || saving} title={`Save (${MOD}S)`}>
                    {saving ? "Saving…" : "Save changes"}
                </button>
            </div>
        </div>
    );
}

// An on/off switch.
export function Toggle({ checked, onChange, label, onLabel, offLabel }) {
    return (
        <label className="adm-toggle">
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <span className="adm-toggle-track"><span className="adm-toggle-thumb" /></span>
            <span className="adm-toggle-label">{label ?? (checked ? onLabel : offLabel)}</span>
        </label>
    );
}

// Image picker: upload a file or paste a link. `value` is a URL, a path in /public, or null.
export function ImageField({ value, onChange, folder, fallback, allowEmpty = true }) {
    const { notify } = useOutletContext();
    const [uploading, setUploading] = useState(false);
    const [showUrl, setShowUrl] = useState(false);
    const fileInput = useRef();

    const handleFile = async (e) => {
        const file = e.target.files[0];
        e.target.value = "";
        if (!file) return;
        setUploading(true);
        const { url, error } = await uploadImage(file, folder);
        setUploading(false);
        if (error) notify(`Upload failed: ${error}`, { type: "error" });
        else onChange(url);
    };

    const preview = value ? asset(value) : fallback;

    return (
        <div className="adm-image-field">
            <div className="adm-image-preview">
                {preview ? <img src={preview} alt="" /> : <i className="fa-regular fa-image" />}
                {uploading && <div className="adm-image-uploading"><i className="fa-solid fa-spinner fa-spin" /></div>}
            </div>
            <div className="adm-image-controls">
                <div className="adm-image-buttons">
                    <button type="button" className="adm-btn adm-btn-small" onClick={() => fileInput.current.click()} disabled={uploading}>
                        <i className="fa-solid fa-upload" /> {value ? "Replace" : "Upload"}
                    </button>
                    <button type="button" className="adm-btn adm-btn-ghost adm-btn-small" onClick={() => setShowUrl(s => !s)}>
                        <i className="fa-solid fa-link" /> Link
                    </button>
                    {allowEmpty && value && (
                        <button type="button" className="adm-btn adm-btn-ghost adm-btn-small" onClick={() => onChange(null)}>
                            Remove
                        </button>
                    )}
                </div>
                {showUrl && (
                    <input className="adm-input adm-input-small" type="url" placeholder="https://…"
                        value={value ?? ""} onChange={(e) => onChange(e.target.value || null)} />
                )}
                {!value && fallback && <span className="adm-hint">No photo, so the T4 logo is shown.</span>}
                <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={handleFile} />
            </div>
        </div>
    );
}

// Up / down buttons for reordering a list.
export function MoveButtons({ index, count, onMove, label = "item" }) {
    return (
        <div className="adm-move">
            <button type="button" className="adm-icon-btn adm-icon-btn-small" disabled={index === 0}
                onClick={() => onMove(-1)} aria-label={`Move ${label} up`} title="Move up">
                <i className="fa-solid fa-chevron-up" />
            </button>
            <button type="button" className="adm-icon-btn adm-icon-btn-small" disabled={index === count - 1}
                onClick={() => onMove(1)} aria-label={`Move ${label} down`} title="Move down">
                <i className="fa-solid fa-chevron-down" />
            </button>
        </div>
    );
}

// A panel whose body folds away under its title. Each panel remembers whether it was open (per browser),
// keyed by `id`. The body stays mounted while closed, so nothing typed in it is lost.
export function CollapsiblePanel({ id, title, children }) {
    const storageKey = `adm-panel-open:${id}`;
    const [open, setOpen] = useState(() => {
        try { return localStorage.getItem(storageKey) !== "false"; } catch { return true; }
    });

    const toggle = () => {
        setOpen(!open);
        try { localStorage.setItem(storageKey, String(!open)); } catch { /* not saved; still toggles */ }
    };

    return (
        <section className={open ? "adm-panel adm-collapsible open" : "adm-panel adm-collapsible"}>
            <h2 className="adm-panel-title">
                <button type="button" className="adm-collapsible-toggle" aria-expanded={open}
                    aria-controls={`${id}-body`} onClick={toggle}>
                    <span>{title}</span>
                    <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                </button>
            </h2>
            <div id={`${id}-body`} hidden={!open}>{children}</div>
        </section>
    );
}
