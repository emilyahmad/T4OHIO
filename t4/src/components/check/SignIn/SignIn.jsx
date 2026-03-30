import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [createData, setCreateData] = useState({ email: "", password: "", confirm: "" });
    const [showLoginPass, setShowLoginPass] = useState(false);
    const [showCreatePass, setShowCreatePass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleLoginChange = (e) => {
        setLoginError("");
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleCreateChange = (e) => {
        setCreateData({ ...createData, [e.target.name]: e.target.value });
        if (e.target.name === "confirm" || e.target.name === "password") {
            setPasswordError("");
        }
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.email === "admin" && loginData.password === "pass") {
            navigate("/admin");
        } else {
            setLoginError("Invalid email or password.");
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        if (createData.password !== createData.confirm) {
            setPasswordError("Passwords do not match.");
            return;
        }
        alert("Account created!");
    };

    return (
        <div className="signin-page">
            <h1 className="signin-page-title">Sign In</h1>
            <div className="signin-wrapper">

                <div className="signin-card">
                    <h2 className="signin-card-title">Log In</h2>
                    <form className="signin-form" onSubmit={handleLoginSubmit}>
                        <div className="signin-field">
                            <label htmlFor="login-email">Email</label>
                            <input type="text" id="login-email" name="email" required
                                placeholder="e.g. janedoe@gmail.com"
                                value={loginData.email} onChange={handleLoginChange} />
                        </div>
                        <div className="signin-field">
                            <label htmlFor="login-password">Password</label>
                            <div className="signin-password-wrapper">
                                <input type={showLoginPass ? "text" : "password"}
                                    id="login-password" name="password" required
                                    placeholder="Enter your password"
                                    value={loginData.password} onChange={handleLoginChange} />
                                <button type="button" className="signin-eye-btn"
                                    onClick={() => setShowLoginPass(p => !p)}>
                                    <i className={`fa-regular ${showLoginPass ? "fa-eye-slash" : "fa-eye"}`} />
                                </button>
                            </div>
                            {loginError && <span className="signin-error">{loginError}</span>}
                        </div>
                        <a href="/reset-password" className="signin-forgot">Forgot Password?</a>
                        <button className="signin-submit-btn" type="submit">Log In</button>
                    </form>
                </div>

                <div className="signin-divider"><span>OR</span></div>

                <div className="signin-card">
                    <h2 className="signin-card-title">Create an Account</h2>
                    <form className="signin-form" onSubmit={handleCreateSubmit}>
                        <div className="signin-field">
                            <label htmlFor="create-email">Email</label>
                            <input type="email" id="create-email" name="email" required
                                placeholder="e.g. janedoe@gmail.com"
                                value={createData.email} onChange={handleCreateChange} />
                        </div>
                        <div className="signin-field">
                            <label htmlFor="create-password">Password</label>
                            <div className="signin-password-wrapper">
                                <input type={showCreatePass ? "text" : "password"}
                                    id="create-password" name="password" required
                                    placeholder="Create a password"
                                    value={createData.password} onChange={handleCreateChange} />
                                <button type="button" className="signin-eye-btn"
                                    onClick={() => setShowCreatePass(p => !p)}>
                                    <i className={`fa-regular ${showCreatePass ? "fa-eye-slash" : "fa-eye"}`} />
                                </button>
                            </div>
                        </div>
                        <div className="signin-field">
                            <label htmlFor="confirm-password">Repeat Password</label>
                            <div className="signin-password-wrapper">
                                <input type={showConfirmPass ? "text" : "password"}
                                    id="confirm-password" name="confirm" required
                                    placeholder="Confirm your password"
                                    value={createData.confirm} onChange={handleCreateChange} />
                                <button type="button" className="signin-eye-btn"
                                    onClick={() => setShowConfirmPass(p => !p)}>
                                    <i className={`fa-regular ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`} />
                                </button>
                            </div>
                            {passwordError && <span className="signin-error">{passwordError}</span>}
                        </div>
                        <button className="signin-submit-btn" type="submit">Sign Up</button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default SignIn;