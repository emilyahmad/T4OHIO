import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
    const navigate = useNavigate();

    return (
        <div className="admin-page">
            {/* <h1 className="admin-page-title">Admin</h1> */}
            <div className="admin-card">
                <h2 className="admin-welcome">Welcome back, Admin!</h2>
                <p className="admin-subtitle">What would you like to manage today?</p>
                <div className="admin-buttons">
                    <div className="admin-btn" onClick={() => navigate("/admin/manage-menu")}>
                        <div className="admin-btn-icon">
                            <i className="fa-solid fa-utensils" />
                        </div>
                        <h3>Manage Menu</h3>
                        <p>Add, edit, or remove menu items and categories</p>
                    </div>
                    <div className="admin-btn">
                        <div className="admin-btn-icon">
                            <i className="fa-solid fa-sliders" />
                        </div>
                        <h3>Manage Front Page</h3>
                        <p>Update hero content and featured items</p>
                    </div>
                </div>
                <button className="admin-signout-btn" onClick={() => navigate("/sign-in")}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default Admin;