import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const themes = [
    { id: "default", label: "Midnight" },
    { id: "sunny", label: "Sunny" },
    { id: "ocean", label: "Ocean" }
];

export default function AdminSettings() {
    const { user } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem("dashboardTheme") || "default");
    const [email, setEmail] = useState(user?.email || "");
    const [notifications, setNotifications] = useState(true);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        document.body.dataset.dashboardTheme = theme;
        localStorage.setItem("dashboardTheme", theme);
    }, [theme]);

    const handleAccountSave = (event) => {
        event.preventDefault();
        setStatus("Account settings are not adjustable with the current backend API.");
    };

    return (
        <div className="admin-section space-y-8">
            <div className="admin-page-heading">
                <div>
                    <p className="badge-pill">Settings</p>
                    <h1 className="type-heading">Workspace settings</h1>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="card-panel p-6">
                    <h2 className="type-card-title">Theme selector</h2>
                    <p className="type-copy text-muted-soft mb-6">Choose a dashboard appearance for your admin workspace.</p>
                    <div className="grid gap-4">
                        {themes.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                className={`admin-theme-card ${theme === option.id ? "active" : ""}`}
                                onClick={() => setTheme(option.id)}
                            >
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="card-panel p-6">
                    <h2 className="type-card-title">Account settings</h2>
                    <p className="type-copy text-muted-soft mb-6">Email and password are handled by authentication services.</p>
                    <form className="space-y-4" onSubmit={handleAccountSave}>
                        <label className="type-caption text-muted-soft">Email address</label>
                        <input
                            className="admin-input"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            readOnly
                        />
                        <label className="type-caption text-muted-soft">New password</label>
                        <input
                            className="admin-input"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Leave blank to keep current password"
                        />
                        <label className="admin-checkbox-label">
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(event) => setNotifications(event.target.checked)}
                            />
                            Receive admin notifications
                        </label>
                        <button className="btn btn-primary" type="submit">
                            Save settings
                        </button>
                        {status && <p className="type-copy text-muted-soft">{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
