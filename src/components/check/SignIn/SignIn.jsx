import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase.js";
import { useAuth } from "../../../auth/AuthContext.js";
import "./SignIn.css";

// Admin accounts are created by the owner in the Supabase dashboard, so there's no sign-up form.
function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAdmin, loading } = useAuth();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showLoginPass, setShowLoginPass] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [infoMsg, setInfoMsg] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Where to go after signing in: the admin page they were sent here from, or the dashboard
    const destination = location.state?.from ?? "/admin";

    if (!loading && isAdmin) return <Navigate to={destination} replace />;

    const handleLoginChange = (e) => {
        setLoginError("");
        setInfoMsg("");
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const { error } = await supabase.auth.signInWithPassword(loginData);
        setSubmitting(false);
        if (error) {
            setLoginError(error.message === "Invalid login credentials" ? "Invalid email or password." : error.message);
        } else {
            navigate(destination, { replace: true });
        }
    };

    const handleForgotPassword = async () => {
        setLoginError("");
        if (!loginData.email) {
            setLoginError("Enter your email above, then click Forgot Password.");
            return;
        }
        const { error } = await supabase.auth.resetPasswordForEmail(loginData.email, {
            redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}reset-password`,
        });
        if (error) {
            setLoginError(error.message);
        } else {
            setInfoMsg("If that email has an admin account, a reset link is on its way.");
        }
    };

    return (
        <div className="signin-page">
            <div className="signin-wrapper">

                <div className="signin-card">
                    <h2 className="signin-card-title">Log In</h2>
                    <form className="signin-form" onSubmit={handleLoginSubmit}>
                        <div className="signin-field">
                            <label htmlFor="login-email">Email</label>
                            <input type="email" id="login-email" name="email" required
                                autoComplete="email"
                                placeholder="Enter your email"
                                value={loginData.email} onChange={handleLoginChange} />
                        </div>
                        <div className="signin-field">
                            <label htmlFor="login-password">Password</label>
                            <div className="signin-password-wrapper">
                                <input type={showLoginPass ? "text" : "password"}
                                    id="login-password" name="password" required
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    value={loginData.password} onChange={handleLoginChange} />
                                <button type="button" className="signin-eye-btn"
                                    onClick={() => setShowLoginPass(p => !p)}>
                                    <i className={`fa-regular ${showLoginPass ? "fa-eye-slash" : "fa-eye"}`} />
                                </button>
                            </div>
                            {loginError && <span className="signin-error">{loginError}</span>}
                            {infoMsg && <span className="signin-info">{infoMsg}</span>}
                        </div>
                        <button type="button" className="signin-forgot" onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                        <button className="signin-submit-btn" type="submit" disabled={submitting}>
                            {submitting ? "Logging In…" : "Log In"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default SignIn;
