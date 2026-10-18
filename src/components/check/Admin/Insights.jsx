import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase.js";

const RANGES = [{ days: 7, label: "7 days" }, { days: 30, label: "30 days" }, { days: 90, label: "90 days" }];
const DEVICES = [
    { id: "mobile", label: "Phone", icon: "fa-mobile-screen" },
    { id: "tablet", label: "Tablet", icon: "fa-tablet-screen-button" },
    { id: "desktop", label: "Laptop / desktop", icon: "fa-laptop" },
];
const PAGE_SIZE = 1000; // the most rows Supabase returns per request
const MAX_PAGES = 20;   // so at most 20,000 events are read for one report

// Reads every event since `since`, a page at a time, newest first
async function loadEvents(since) {
    const events = [];
    for (let page = 0; page < MAX_PAGES; page++) {
        const { data, error } = await supabase.from("analytics_events")
            .select("session_id, type, device, data, created_at")
            .gte("created_at", since)
            .order("created_at", { ascending: false })
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
        if (error) throw error;
        events.push(...data);
        if (data.length < PAGE_SIZE) return { events, truncated: false };
    }
    return { events, truncated: true };
}

// [["Pearls", 12], ["Jelly", 5]] sorted by count, from a list of labels
function tally(labels) {
    const counts = new Map();
    for (const label of labels) if (label) counts.set(label, (counts.get(label) ?? 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(b[0]));
}

const percent = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);

function BarList({ rows, limit = 8, empty = "Nothing yet." }) {
    if (rows.length === 0) return <p className="adm-empty">{empty}</p>;
    const shown = rows.slice(0, limit);
    const max = shown[0][1];
    const total = rows.reduce((sum, [, count]) => sum + count, 0);
    return (
        <ul className="ins-bars">
            {shown.map(([label, count]) => (
                <li key={label}>
                    <span className="ins-bar-label" title={label}>{label}</span>
                    <span className="ins-bar-track"><span style={{ width: `${(count / max) * 100}%` }} /></span>
                    <span className="ins-bar-count">{count} <small>{percent(count, total)}%</small></span>
                </li>
            ))}
        </ul>
    );
}

function Panel({ title, note, children }) {
    return (
        <section className="adm-panel">
            <h3 className="adm-panel-title">{title}{note && <> <span className="adm-title-note">{note}</span></>}</h3>
            {children}
        </section>
    );
}

// A titled group of panels, so the report reads in separate parts
function Section({ title, hint, children }) {
    return (
        <section className="ins-section">
            <div className="ins-section-head">
                <h2>{title}</h2>
                {hint && <p className="adm-subtitle">{hint}</p>}
            </div>
            <div className="ins-grid">{children}</div>
        </section>
    );
}

// Customer activity on the public site, counted anonymously (see src/lib/analytics.js)
function Insights() {
    const [days, setDays] = useState(30);
    const [state, setState] = useState({ loading: true, error: null, events: [], truncated: false });

    useEffect(() => {
        let ignore = false;
        const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
        loadEvents(since)
            .then(({ events, truncated }) => { if (!ignore) setState({ loading: false, error: null, events, truncated }); })
            .catch((error) => { if (!ignore) setState({ loading: false, error, events: [], truncated: false }); });
        return () => { ignore = true; };
    }, [days]);

    const changeRange = (next) => {
        if (next === days) return;
        setState(s => ({ ...s, loading: true }));
        setDays(next);
    };

    const { loading, error, events, truncated } = state;
    const ofType = (type) => events.filter(e => e.type === type);
    const visits = ofType("visit");
    const orders = ofType("order_add");
    const searches = ofType("search");

    const byDevice = Object.fromEntries(DEVICES.map(d => [d.id, visits.filter(v => v.device === d.id).length]));
    const phoneShare = percent(byDevice.mobile, visits.length);
    const screens = tally(visits.map(v => v.data.screen));

    const stats = [
        { label: "Visits", value: visits.length, icon: "fa-users" },
        { label: "On a phone", value: `${phoneShare}%`, icon: "fa-mobile-screen" },
        { label: "Searches", value: searches.length, icon: "fa-magnifying-glass" },
        { label: "Drinks customized", value: orders.length, icon: "fa-mug-hot" },
    ];

    const emptyNote = "No data in this period yet.";

    return (
        <div className="adm-page">
            <header className="adm-header">
                <div>
                    <h1 className="adm-title">Insights</h1>
                </div>
                <div className="ins-range" role="group" aria-label="Time period">
                    {RANGES.map(range => (
                        <button key={range.days} type="button" aria-pressed={range.days === days}
                            className={range.days === days ? "is-active" : undefined}
                            onClick={() => changeRange(range.days)}>
                            {range.label}
                        </button>
                    ))}
                </div>
            </header>

            {error && <div className="adm-panel adm-empty">
                Couldn't load the insights ({error.message}). If this is the first time, run supabase/analytics.sql in the Supabase SQL Editor.
            </div>}
            {truncated && <div className="adm-panel adm-empty">
                <i className="fa-solid fa-triangle-exclamation" /> This period has more activity than can be shown, so only the newest {(PAGE_SIZE * MAX_PAGES).toLocaleString()} events are counted. Try a shorter period.
            </div>}

            <div className="dash-stats">
                {stats.map(stat => (
                    <div key={stat.label} className="dash-stat">
                        <i className={`fa-solid ${stat.icon}`} />
                        <span className="dash-stat-value">{loading ? "–" : stat.value}</span>
                        <span className="dash-stat-label">{stat.label}</span>
                    </div>
                ))}
            </div>

            {loading ? (
                <p className="adm-empty"><i className="fa-solid fa-spinner fa-spin" /> Loading…</p>
            ) : (
                <>
                    <Section title="Visitors" hint="Who is visiting and on what">
                        <Panel title="Phone or laptop?" note="(by visit)">
                            {visits.length === 0 ? <p className="adm-empty">{emptyNote}</p> : (
                                <div className="ins-devices">
                                    {DEVICES.map(device => (
                                        <div key={device.id} className="ins-device">
                                            <i className={`fa-solid ${device.icon}`} />
                                            <span className="ins-device-value">{percent(byDevice[device.id], visits.length)}%</span>
                                            <span className="dash-stat-label">{device.label}</span>
                                            <span className="adm-hint">{byDevice[device.id]} visits</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Panel>
                        <Panel title="Common screen sizes" note="(width × height)">
                            <BarList rows={screens} limit={6} empty={emptyNote} />
                        </Panel>
                    </Section>

                    <Section title="Search &amp; filters" hint="How people look for something">
                        <Panel title="Filters used" note="(times turned on)">
                            <BarList rows={tally(ofType("filter").map(e => e.data.name))} empty={emptyNote} />
                        </Panel>
                        <Panel title="What people search for">
                            <BarList rows={tally(searches.map(e => e.data.query))} empty={emptyNote} />
                            {searches.some(e => e.data.results === 0) && (
                                <>
                                    <h3 className="ins-subtitle">Searches with no results</h3>
                                    <BarList rows={tally(searches.filter(e => e.data.results === 0).map(e => e.data.query))} limit={5} />
                                </>
                            )}
                        </Panel>
                    </Section>

                    <Section title="Drink choices" hint="What people pick when they customize a drink">
                        <Panel title="Sweetness" note="(when adding a drink)">
                            <BarList rows={tally(orders.map(e => e.data.sweetness))} empty={emptyNote} />
                        </Panel>
                        <Panel title="Iced or hot">
                            <BarList rows={tally(orders.map(e => e.data.ice))} empty={emptyNote} />
                        </Panel>
                        <Panel title="Toppings">
                            <BarList rows={tally(orders.flatMap(e => e.data.toppings ?? []))} empty={emptyNote} />
                        </Panel>
                        <Panel title="Add-ons &amp; size-ups">
                            <BarList rows={tally(orders.flatMap(e => e.data.extras ?? []))} empty={emptyNote} />
                        </Panel>
                    </Section>

                    <Section title="Menu favorites" hint="Which drinks get the most attention">
                        <Panel title="Most opened drinks">
                            <BarList rows={tally(ofType("item_view").map(e => e.data.item))} empty={emptyNote} />
                        </Panel>
                        <Panel title="Most added drinks">
                            <BarList rows={tally(orders.map(e => e.data.item))} empty={emptyNote} />
                        </Panel>
                        <Panel title="Boba quiz results">
                            <BarList rows={tally(ofType("quiz").map(e => e.data.result))} empty={emptyNote} />
                        </Panel>
                    </Section>
                </>
            )}
        </div>
    );
}

export default Insights;
