import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const from = location.state?.from?.pathname || "/admin";

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, from, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login({ email, password, remember });
            navigate(from, { replace: true });
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Unable to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-shell section-block">
            <div className="card-panel admin-login-panel mx-auto max-w-md p-10">
                <div className="section-heading text-center">
                    <p className="badge-pill">Admin Access</p>
                    <h2>Sign in to portfolio CMS</h2>
                    <p className="section-copy">Enter your credentials to open the admin dashboard.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-group">
                        <label htmlFor="email" className="type-caption text-muted-soft">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="admin-input"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="type-caption text-muted-soft">
                            Password
                        </label>
                        <div className="admin-input-group">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="admin-input"
                                placeholder="Enter password"
                                required
                            />
                            <button
                                type="button"
                                className="admin-password-toggle"
                                onClick={() => setShowPassword((current) => !current)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <label className="admin-checkbox-label">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(event) => setRemember(event.target.checked)}
                            />
                            Remember Me
                        </label>
                        <span className="type-copy text-muted-soft">Secure session</span>
                    </div>
                    {error && <div className="type-body text-red-400">{error}</div>}
                    <button className="btn btn-primary w-full" type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
