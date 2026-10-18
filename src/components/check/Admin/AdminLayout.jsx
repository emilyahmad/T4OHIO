import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext.js";
import "./Admin.css";

const LEAVE_WARNING = "You have unsaved changes. Leave without saving?";

const NAV = [
    { to: "/admin", end: true, icon: "fa-gauge", label: "Dashboard" },
    { to: "/admin/menu", icon: "fa-utensils", label: "Menu" },
    { to: "/admin/front-page", icon: "fa-house", label: "Front Page" },
    { to: "/admin/insights", icon: "fa-chart-simple", label: "Insights" },
];

// Shell around every admin page. Pages get { setDirty, notify } through useOutletContext().
function AdminLayout() {
    const navigate = useNavigate();
    const { session, signOut } = useAuth();
    const [dirty, setDirty] = useState(false);
    const [toast, setToast] = useState(null);
    const toastTimer = useRef(null);

    // notify("Saved!") or notify("Couldn't save", { type: "error" }) or with { action: { label, onClick } }
    const notify = useCallback((message, { type = "success", action = null } = {}) => {
        clearTimeout(toastTimer.current);
        setToast({ message, type, action, id: Date.now() });
        toastTimer.current = setTimeout(() => setToast(null), action ? 6000 : 3500);
    }, []);

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    // With unsaved changes: warn before closing/reloading the tab, and before following any link on the page
    // (the capture-phase listener runs before React Router handles the click).
    useEffect(() => {
        if (!dirty) return;
        const onBeforeUnload = (e) => { e.preventDefault(); };
        const onClick = (e) => {
            const link = e.target.closest("a[href]");
            if (!link || link.target === "_blank" || e.defaultPrevented) return;
            if (!window.confirm(LEAVE_WARNING)) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        window.addEventListener("beforeunload", onBeforeUnload);
        document.addEventListener("click", onClick, true);
        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
            document.removeEventListener("click", onClick, true);
        };
    }, [dirty]);

    const handleSignOut = async () => {
        if (dirty && !window.confirm(LEAVE_WARNING)) return;
        setDirty(false);
        await signOut();
        navigate("/sign-in");
    };

    return (
        <div className="adm-shell">
            <aside className="adm-sidebar">
                <div className="adm-sidebar-title">
                    <i className="fa-solid fa-mug-hot" /> T4 Admin
                </div>
                <nav className="adm-nav">
                    {NAV.map(link => (
                        <NavLink key={link.to} to={link.to} end={link.end}
                            className={({ isActive }) => `adm-nav-link${isActive ? " active" : ""}`}>
                            <i className={`fa-solid ${link.icon}`} />
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                    <a className="adm-nav-link" href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer">
                        <i className="fa-solid fa-arrow-up-right-from-square" />
                        <span>View Site</span>
                    </a>
                </nav>
                <div className="adm-sidebar-footer">
                    <span className="adm-signed-in" title={session?.user.email}>{session?.user.email}</span>
                    <button className="adm-btn adm-btn-ghost adm-btn-small" onClick={handleSignOut}>
                        <i className="fa-solid fa-right-from-bracket" /> Sign Out
                    </button>
                </div>
            </aside>

            <main className="adm-main">
                <Outlet context={{ setDirty, notify }} />
            </main>

            {toast && (
                <div key={toast.id} className={`adm-toast adm-toast-${toast.type}`} role="status">
                    <i className={`fa-solid ${toast.type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}`} />
                    <span>{toast.message}</span>
                    {toast.action && (
                        <button className="adm-toast-action" onClick={() => { toast.action.onClick(); setToast(null); }}>
                            {toast.action.label}
                        </button>
                    )}
                    <button className="adm-toast-close" aria-label="Dismiss" onClick={() => setToast(null)}>✕</button>
                </div>
            )}
        </div>
    );
}

export default AdminLayout;
