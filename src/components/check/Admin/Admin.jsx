import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { supabase } from "../../../lib/supabase.js";
import { useAuth } from "../../../auth/AuthContext.js";
import { useMenu } from "../../../data/useMenu.js";
import { useSiteContent } from "../../../data/siteContent.js";
import { itemImage } from "../../../data/menu.js";

const formatDate = (date) => date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

function Admin() {
    const { session } = useAuth();
    const { notify } = useOutletContext();
    const { menu, loading, error } = useMenu();
    const site = useSiteContent();
    const [restocked, setRestocked] = useState([]); // ids put back in stock from this page

    const items = menu.flatMap(c => c.items);
    const soldOut = items.filter(i => !i.available && !restocked.includes(i.id));
    const noPhoto = items.filter(i => !i.image);
    const frontPageDates = Object.values(site.updatedAt);
    const frontPageUpdated = frontPageDates.length ? new Date(Math.max(...frontPageDates)) : null;

    const markAvailable = async (item) => {
        const { error } = await supabase.from("menu_items").update({ available: true }).eq("id", item.id);
        if (error) {
            notify(`Couldn't update “${item.name}”: ${error.message}`, { type: "error" });
        } else {
            setRestocked(ids => [...ids, item.id]);
            notify(`“${item.name}” is back on the menu`);
        }
    };

    const stats = [
        { label: "Categories", value: menu.length, icon: "fa-layer-group" },
        { label: "Menu items", value: items.length, icon: "fa-mug-hot" },
        { label: "Sold out", value: soldOut.length, icon: "fa-ban", warn: soldOut.length > 0 },
        { label: "Missing photos", value: noPhoto.length, icon: "fa-image" },
    ];

    return (
        <div className="adm-page">
            <header className="adm-header">
                <div>
                    <h1 className="adm-title">Welcome back!</h1>
                    <p className="adm-subtitle">Signed in as {session?.user.email}</p>
                </div>
            </header>

            {error && <div className="adm-panel adm-empty">Couldn't load the menu. Refresh the page to try again.</div>}

            <div className="dash-stats">
                {stats.map(stat => (
                    <div key={stat.label} className={`dash-stat${stat.warn ? " warn" : ""}`}>
                        <i className={`fa-solid ${stat.icon}`} />
                        <span className="dash-stat-value">{loading ? "–" : stat.value}</span>
                        <span className="dash-stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>

            <div className="dash-grid">
                <Link to="/admin/menu" className="adm-panel dash-link">
                    <i className="fa-solid fa-utensils" />
                    <div>
                        <h2>Manage menu</h2>
                        <p>Add, edit, reorder or remove items and categories. Change prices, photos and tags, and mark items sold out.</p>
                    </div>
                    <i className="fa-solid fa-arrow-right dash-link-arrow" />
                </Link>
                <Link to="/admin/front-page" className="adm-panel dash-link">
                    <i className="fa-solid fa-house" />
                    <div>
                        <h2>Front page</h2>
                        <p>Update the home page banner and the seasonal drinks &amp; promotions cards.</p>
                        {frontPageUpdated && <span className="adm-hint">Last updated {formatDate(frontPageUpdated)}</span>}
                    </div>
                    <i className="fa-solid fa-arrow-right dash-link-arrow" />
                </Link>
            </div>

            <section className="adm-panel">
                <h2 className="adm-panel-title">
                    Sold out right now{" "}
                    <span className="adm-title-note">(Not currently shown on the menu page, but appeared on the menu in the past)</span>
                </h2>
                {loading ? (
                    <p className="adm-empty"><i className="fa-solid fa-spinner fa-spin" /> Loading…</p>
                ) : soldOut.length === 0 ? (
                    <p className="adm-empty"><i className="fa-solid fa-circle-check" /> Everything on the menu is available.</p>
                ) : (
                    <ul className="dash-soldout">
                        {soldOut.map(item => (
                            <li key={item.id}>
                                <img src={itemImage(item)} alt="" />
                                <span>{item.name}</span>
                                <button className="adm-btn adm-btn-small" onClick={() => markAvailable(item)}>
                                    Back in stock
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default Admin;
