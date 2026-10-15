import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase.js";
import { useAuth } from "../../../auth/AuthContext.js";
import "./SignIn.css";

// Landing page for the "reset your password" email link. The link signs the admin in,
// so all that's left is choosing a new password.
function ResetPassword() {
    const navigate = useNavigate();
    const { session, loading } = useAuth();
    const [form, setForm] = useState({ password: "", confirm: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setError("");
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password.length < 8) return setError("Use at least 8 characters.");
        if (form.password !== form.confirm) return setError("Passwords do not match.");
        setSubmitting(true);
        const { error } = await supabase.auth.updateUser({ password: form.password });
        setSubmitting(false);
        if (error) setError(error.message);
        else navigate("/admin", { replace: true });
    };

    return (
        <div className="signin-page">
            <div className="signin-wrapper">
                <div className="signin-card">
                    <h2 className="signin-card-title">Choose a New Password</h2>

                    {loading ? (
                        <p>Checking your reset link…</p>
                    ) : !session ? (
                        <p>
                            This reset link is invalid or has expired.{" "}
                            <Link to="/sign-in" className="signin-forgot">Request a new one</Link>
                        </p>
                    ) : (
                        <form className="signin-form" onSubmit={handleSubmit}>
                            <div className="signin-field">
                                <label htmlFor="new-password">New Password</label>
                                <input type="password" id="new-password" name="password" required
                                    autoComplete="new-password"
                                    value={form.password} onChange={handleChange} />
                            </div>
                            <div className="signin-field">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input type="password" id="confirm-password" name="confirm" required
                                    autoComplete="new-password"
                                    value={form.confirm} onChange={handleChange} />
                                {error && <span className="signin-error">{error}</span>}
                            </div>
                            <button className="signin-submit-btn" type="submit" disabled={submitting}>
                                {submitting ? "Saving…" : "Save Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
