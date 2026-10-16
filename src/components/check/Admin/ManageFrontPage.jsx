import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { asset } from "../../../utils/asset.js";
import { useSiteContent, saveSiteContent } from "../../../data/siteContent.js";
import { useEditHistory } from "./useEditHistory.js";
import { SaveBar, Toggle, ImageField, MoveButtons } from "./AdminParts.jsx";
import { moveInList, shortId, useReportDirty } from "./adminUtils.js";

function ManageFrontPage() {
    const { content, updatedAt, loading, error } = useSiteContent();

    if (loading || error) {
        return (
            <div className="adm-page">
                <h1 className="adm-title">Front Page</h1>
                <div className="adm-panel adm-empty">
                    {error ? "Couldn't load the front page content. If you haven't yet, run supabase/admin.sql in the Supabase SQL editor, then refresh."
                        : <><i className="fa-solid fa-spinner fa-spin" /> Loading…</>}
                </div>
            </div>
        );
    }

    return <FrontPageEditor initial={{ hero: content.hero, seasonal: content.seasonal }} updatedAt={updatedAt} />;
}

function FrontPageEditor({ initial, updatedAt }) {
    const { notify } = useOutletContext();
    const history = useEditHistory(initial);
    const { draft, update, undo, markSaved } = history;
    const { hero, seasonal } = draft;
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(() => {
        const dates = Object.values(updatedAt);
        return dates.length ? new Date(Math.max(...dates)) : null;
    });

    useReportDirty(history.dirty);

    const setHero = (changes, mergeKey) => update(d => ({ ...d, hero: { ...d.hero, ...changes } }), mergeKey);
    const setSeasonal = (changes, mergeKey) => update(d => ({ ...d, seasonal: { ...d.seasonal, ...changes } }), mergeKey);
    const setCards = (fn) => update(d => ({ ...d, seasonal: { ...d.seasonal, cards: fn(d.seasonal.cards) } }));
    const setCard = (id, changes, mergeKey) => update(d => ({
        ...d,
        seasonal: { ...d.seasonal, cards: d.seasonal.cards.map(c => c.id === id ? { ...c, ...changes } : c) },
    }), mergeKey);

    const addCard = () => setCards(cards => [...cards, { id: `card-${shortId()}`, image: null, alt: "", description: "", visible: true }]);
    const removeCard = (card) => {
        setCards(cards => cards.filter(c => c.id !== card.id));
        notify("Card removed", { action: { label: "Undo", onClick: undo } });
    };

    const handleSave = async () => {
        if (!hero.title.trim()) {
            notify("The hero needs a title.", { type: "error" });
            return;
        }
        if (seasonal.cards.some(c => c.visible && !c.image)) {
            notify("Every visible seasonal card needs an image. Add one, or hide the card.", { type: "error" });
            return;
        }
        const snapshot = draft;
        setSaving(true);
        const error = await saveSiteContent(snapshot);
        setSaving(false);
        if (error) {
            console.error("Failed to save front page", error);
            notify(error.code === "42P01" || error.code === "PGRST205"
                ? "The database isn't set up for this yet. Run supabase/admin.sql in the Supabase SQL editor."
                : `Couldn't save: ${error.message}`, { type: "error" });
        } else {
            markSaved(snapshot);
            setLastSaved(new Date());
            notify("Front page saved. It's live now.");
        }
    };

    const visibleCards = seasonal.cards.filter(c => c.visible);

    return (
        <div className="adm-page">
            <header className="adm-header">
                <div>
                    <h1 className="adm-title">Front Page</h1>
                    <p className="adm-subtitle">
                        Edit the banner at the top of the home page and the Seasonal section.
                        {lastSaved && <> Last saved {lastSaved.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}.</>}
                    </p>
                </div>
            </header>

            {/* ── HERO ── */}
            <section className="adm-panel fp-section">
                <div className="fp-form">
                    <h2 className="adm-panel-title">Hero banner</h2>
                    <label className="adm-field">
                        <span className="adm-label">Title</span>
                        <input className="adm-input" value={hero.title} onChange={(e) => setHero({ title: e.target.value }, "hero:title")} />
                    </label>
                    <label className="adm-field">
                        <span className="adm-label">Subtitle</span>
                        <input className="adm-input" value={hero.subtitle1} onChange={(e) => setHero({ subtitle1: e.target.value }, "hero:subtitle1")} />
                    </label>
                    <label className="adm-field">
                        <span className="adm-label">Second subtitle <span className="adm-hint">(optional)</span></span>
                        <input className="adm-input" value={hero.subtitle2} onChange={(e) => setHero({ subtitle2: e.target.value }, "hero:subtitle2")} />
                    </label>
                    <div className="adm-field">
                        <span className="adm-label">Image</span>
                        <ImageField value={hero.image} folder="hero" allowEmpty={false} onChange={(image) => setHero({ image })} />
                    </div>
                    <label className="adm-field">
                        <span className="adm-label">Image description <span className="adm-hint">(for screen readers)</span></span>
                        <input className="adm-input" value={hero.alt} onChange={(e) => setHero({ alt: e.target.value }, "hero:alt")} />
                    </label>
                </div>
                <div className="fp-preview">
                    <span className="fp-preview-label">Preview</span>
                    <div className="fp-hero-preview">
                        <div>
                            <h3>{hero.title || "Title"}</h3>
                            {hero.subtitle1 && <p>{hero.subtitle1}</p>}
                            {hero.subtitle2 && <p>{hero.subtitle2}</p>}
                        </div>
                        {hero.image && <img src={asset(hero.image)} alt="" />}
                    </div>
                </div>
            </section>

            {/* ── SEASONAL ── */}
            <section className="adm-panel">
                <h2 className="adm-panel-title">Seasonal section</h2>
                <div className="fp-seasonal-text">
                    <label className="adm-field">
                        <span className="adm-label">Heading</span>
                        <input className="adm-input" value={seasonal.title} onChange={(e) => setSeasonal({ title: e.target.value }, "seasonal:title")} />
                    </label>
                    <label className="adm-field">
                        <span className="adm-label">Subheading</span>
                        <input className="adm-input" value={seasonal.subtitle} onChange={(e) => setSeasonal({ subtitle: e.target.value }, "seasonal:subtitle")} />
                    </label>
                </div>

                <h3 className="fp-cards-title">
                    Cards <span className="adm-hint">{visibleCards.length} shown on the site</span>
                </h3>
                <div className="fp-cards">
                    {seasonal.cards.map((card, index) => (
                        <div className={`fp-card${card.visible ? "" : " hidden-card"}`} key={card.id}>
                            <div className="fp-card-top">
                                <MoveButtons index={index} count={seasonal.cards.length} label="card"
                                    onMove={(d) => setCards(cards => moveInList(cards, index, d))} />
                                <Toggle checked={card.visible} onLabel="Shown" offLabel="Hidden"
                                    onChange={(visible) => setCard(card.id, { visible })} />
                                <button className="adm-icon-btn adm-icon-btn-danger" onClick={() => removeCard(card)} title="Delete card">
                                    <i className="fa-regular fa-trash-can" />
                                </button>
                            </div>
                            <ImageField value={card.image} folder="seasonal" onChange={(image) => setCard(card.id, { image })} />
                            <label className="adm-field">
                                <span className="adm-label">Description</span>
                                <textarea className="adm-input" rows={3} value={card.description}
                                    onChange={(e) => setCard(card.id, { description: e.target.value }, `${card.id}:description`)} />
                            </label>
                            <label className="adm-field">
                                <span className="adm-label">Image description</span>
                                <input className="adm-input" value={card.alt}
                                    onChange={(e) => setCard(card.id, { alt: e.target.value }, `${card.id}:alt`)} />
                            </label>
                        </div>
                    ))}
                    <button className="fp-add-card" onClick={addCard}>
                        <i className="fa-solid fa-plus" />
                        Add a card
                    </button>
                </div>

                <div className="fp-preview">
                    <span className="fp-preview-label">Preview</span>
                    <div className="fp-seasonal-preview">
                        <div className="fp-seasonal-preview-header">
                            <h3>{seasonal.title}</h3>
                            <p>{seasonal.subtitle}</p>
                        </div>
                        <div className="fp-seasonal-preview-cards">
                            {visibleCards.map(card => (
                                <div key={card.id}>
                                    {card.image ? <img src={asset(card.image)} alt="" /> : <div className="fp-missing-image">No image</div>}
                                    <p>{card.description}</p>
                                </div>
                            ))}
                            {visibleCards.length === 0 && <p className="fp-preview-empty">No cards are shown.</p>}
                        </div>
                    </div>
                </div>
            </section>

            <SaveBar history={history} saving={saving} onSave={handleSave} />
        </div>
    );
}

export default ManageFrontPage;
