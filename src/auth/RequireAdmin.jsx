import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.js";
import "../components/check/Admin/Admin.css";

// Wraps admin pages: signed-out visitors go to Sign In and come back here afterwards.
function RequireAdmin({ children }) {
    const { session, isAdmin, loading, signOut } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="admin-page">
                <p className="admin-subtitle">Checking your sign-in…</p>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
    }

    if (!isAdmin) {
        return (
            <div className="admin-page">
                <div className="admin-card">
                    <h2 className="admin-welcome">No admin access</h2>
                    <p className="admin-subtitle">This account isn't set up as a store admin.</p>
                    <button className="admin-signout-btn" onClick={signOut}>Sign Out</button>
                </div>
            </div>
        );
    }

    return children;
}

export default RequireAdmin;
