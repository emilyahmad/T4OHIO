import { supabase } from "./supabase.js";

// Anonymous usage events for the admin Insights page (see supabase/analytics.sql).
// Only a random per-tab id is sent: no IP address, account or cookie. Visitors who have turned on
// Do Not Track or Global Privacy Control are not recorded at all.

const SESSION_KEY = "t4-session";
const VISIT_KEY = "t4-visit-logged";

const optedOut = () => navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;

function sessionId() {
    try {
        let id = sessionStorage.getItem(SESSION_KEY);
        if (!id) {
            id = crypto.randomUUID();
            sessionStorage.setItem(SESSION_KEY, id);
        }
        return id;
    } catch {
        return "no-storage";
    }
}

// Phone, tablet or desktop, by the width of the browser window
function deviceType() {
    const width = window.innerWidth;
    return width < 768 ? "mobile" : width < 1100 ? "tablet" : "desktop";
}

// Fire and forget: a failed event must never get in the way of the page.
export function track(type, data = {}) {
    if (optedOut()) return;
    supabase.from("analytics_events")
        .insert({ session_id: sessionId(), type, device: deviceType(), data })
        .then(() => {}, () => {});
}

// Once per browser tab session, on the public pages only
export function trackVisit() {
    try {
        if (sessionStorage.getItem(VISIT_KEY)) return;
        sessionStorage.setItem(VISIT_KEY, "1");
    } catch { /* storage blocked: may log more than once, which is harmless */ }
    track("visit", {
        screen: `${screen.width}x${screen.height}`,
        viewport: window.innerWidth,
        landing: location.pathname,
    });
}
