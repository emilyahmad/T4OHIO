import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { asset } from "../../../utils/asset.js";
import { useSiteContent, saveSiteContent, MAX_PROMOTION_IMAGES } from "../../../data/siteContent.js";
import { useEditHistory } from "./useEditHistory.js";
import { SaveBar, Toggle, ImageField, MoveButtons } from "./AdminParts.jsx";
import { moveInList, shortId, useReportDirty } from "./adminUtils.js";
import { PromotionsGrid } from "../../Promotions/Promotions.jsx";

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

    return <FrontPageEditor initial={{ hero: content.hero, seasonal: content.seasonal, promotions: content.promotions, reviews: content.reviews }} updatedAt={updatedAt} />;
}

function FrontPageEditor({ initial, updatedAt }) {
    const { notify } = useOutletContext();
    const history = useEditHistory(initial);
    const { draft, update, undo, markSaved } = history;
    const { hero, seasonal, promotions, reviews } = draft;
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

    const setPromotions = (changes, mergeKey) => update(d => ({ ...d, promotions: { ...d.promotions, ...changes } }), mergeKey);
    const setPromoImages = (fn) => update(d => ({ ...d, promotions: { ...d.promotions, images: fn(d.promotions.images) } }));
    const setPromoImage = (id, changes, mergeKey) => update(d => ({
        ...d,
        promotions: { ...d.promotions, images: d.promotions.images.map(p => p.id === id ? { ...p, ...changes } : p) },
    }), mergeKey);

    const addPromoImage = () => setPromoImages(images => [...images, { id: `promo-${shortId()}`, image: null, alt: "" }]);
    const removePromoImage = (promo) => {
        setPromoImages(images => images.filter(p => p.id !== promo.id));
        notify("Image removed", { action: { label: "Undo", onClick: undo } });
    };

    const setReviews = (changes, mergeKey) => update(d => ({ ...d, reviews: { ...d.reviews, ...changes } }), mergeKey);
    const setReviewList = (fn) => update(d => ({ ...d, reviews: { ...d.reviews, reviews: fn(d.reviews.reviews) } }));
    const setReview = (id, changes, mergeKey) => update(d => ({
        ...d,
        reviews: { ...d.reviews, reviews: d.reviews.reviews.map(r => r.id === id ? { ...r, ...changes } : r) },
    }), mergeKey);

    const addReview = () => setReviewList(list => [...list, { id: `review-${shortId()}`, name: "", rating: 5, text: "", visible: true }]);
    const removeReview = (review) => {
        setReviewList(list => list.filter(r => r.id !== review.id));
        notify("Review removed", { action: { label: "Undo", onClick: undo } });
    };

    const addCard = () => setCards(cards => [...cards, { id: `card-${shortId()}`, image: null, alt: "", visible: true }]);
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
        if (reviews.reviews.some(r => r.visible && !r.text.trim())) {
            notify("Every shown review needs some text. Fill it in, or hide the review.", { type: "error" });
            return;
        }
        if (promotions.images.some(p => !p.image)) {
            notify("Every promotion needs an image. Add one, or remove it.", { type: "error" });
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
                        Edit the banner at the top of the home page and the Promotions, Seasonal and Reviews sections.
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

            {/* ── PROMOTIONS ── */}
            <section className="adm-panel">
                <h2 className="adm-panel-title">Promotions section</h2>
                <div className="fp-seasonal-text">
                    <label className="adm-field">
                        <span className="adm-label">Heading</span>
                        <input className="adm-input" value={promotions.title} onChange={(e) => setPromotions({ title: e.target.value }, "promotions:title")} />
                    </label>
                </div>

                <h3 className="fp-cards-title">
                    Images <span className="adm-hint">
                        {promotions.images.length} of {MAX_PROMOTION_IMAGES}. The layout adjusts to the images' shapes so nothing gets cropped.
                    </span>
                </h3>
                <div className="fp-cards">
                    {promotions.images.map((promo, index) => (
                        <div className="fp-card" key={promo.id}>
                            <div className="fp-card-top">
                                <MoveButtons index={index} count={promotions.images.length} label="image"
                                    onMove={(d) => setPromoImages(images => moveInList(images, index, d))} />
                                <button className="adm-icon-btn adm-icon-btn-danger" onClick={() => removePromoImage(promo)} title="Delete image">
                                    <i className="fa-regular fa-trash-can" />
                                </button>
                            </div>
                            <ImageField value={promo.image} folder="promotions" onChange={(image) => setPromoImage(promo.id, { image })} />
                            <label className="adm-field">
                                <span className="adm-label">Image description <span className="adm-hint">(for screen readers)</span></span>
                                <input className="adm-input" value={promo.alt}
                                    onChange={(e) => setPromoImage(promo.id, { alt: e.target.value }, `${promo.id}:alt`)} />
                            </label>
                        </div>
                    ))}
                    {promotions.images.length < MAX_PROMOTION_IMAGES && (
                        <button className="fp-add-card" onClick={addPromoImage}>
                            <i className="fa-solid fa-plus" />
                            Add an image
                        </button>
                    )}
                </div>

                <div className="fp-preview">
                    <span className="fp-preview-label">Preview</span>
                    <div className="fp-promotions-preview">
                        <h3>{promotions.title}</h3>
                        {promotions.images.length
                            ? <PromotionsGrid images={promotions.images} />
                            : <p className="fp-preview-empty">No images, so the section is hidden on the site.</p>}
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
                                <span className="adm-label">Image description <span className="adm-hint">(for screen readers)</span></span>
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
                        </div>
                        <div className="fp-seasonal-preview-cards">
                            {visibleCards.map(card => (
                                <div key={card.id}>
                                    {card.image ? <img src={asset(card.image)} alt="" /> : <div className="fp-missing-image">No image</div>}
                                </div>
                            ))}
                            {visibleCards.length === 0 && <p className="fp-preview-empty">No cards are shown.</p>}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── REVIEWS ── */}
            <section className="adm-panel">
                <h2 className="adm-panel-title">Reviews section</h2>
                <div className="fp-seasonal-text">
                    <label className="adm-field">
                        <span className="adm-label">Heading</span>
                        <input className="adm-input" value={reviews.title} onChange={(e) => setReviews({ title: e.target.value }, "reviews:title")} />
                    </label>
                </div>

                <h3 className="fp-cards-title">
                    Reviews <span className="adm-hint">
                        Copy in real reviews from customers (for example from Google). A "Read &amp; leave reviews on Google" button is always shown.
                    </span>
                </h3>
                <div className="fp-cards">
                    {reviews.reviews.map((review, index) => (
                        <div className={`fp-card${review.visible ? "" : " hidden-card"}`} key={review.id}>
                            <div className="fp-card-top">
                                <MoveButtons index={index} count={reviews.reviews.length} label="review"
                                    onMove={(d) => setReviewList(list => moveInList(list, index, d))} />
                                <Toggle checked={review.visible} onLabel="Shown" offLabel="Hidden"
                                    onChange={(visible) => setReview(review.id, { visible })} />
                                <button className="adm-icon-btn adm-icon-btn-danger" onClick={() => removeReview(review)} title="Delete review">
                                    <i className="fa-regular fa-trash-can" />
                                </button>
                            </div>
                            <label className="adm-field">
                                <span className="adm-label">Customer name</span>
                                <input className="adm-input" value={review.name}
                                    onChange={(e) => setReview(review.id, { name: e.target.value }, `${review.id}:name`)} />
                            </label>
                            <label className="adm-field">
                                <span className="adm-label">Stars</span>
                                <select className="adm-input" value={review.rating}
                                    onChange={(e) => setReview(review.id, { rating: Number(e.target.value) })}>
                                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}
                                </select>
                            </label>
                            <label className="adm-field">
                                <span className="adm-label">Review</span>
                                <textarea className="adm-input" rows={4} value={review.text}
                                    onChange={(e) => setReview(review.id, { text: e.target.value }, `${review.id}:text`)} />
                            </label>
                        </div>
                    ))}
                    <button className="fp-add-card" onClick={addReview}>
                        <i className="fa-solid fa-plus" />
                        Add a review
                    </button>
                </div>
            </section>

            <SaveBar history={history} saving={saving} onSave={handleSave} />
        </div>
    );
}

export default ManageFrontPage;
