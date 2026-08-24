import { useAuth } from "../../context/AuthContext";
import { LogOut, Search } from "lucide-react";

export default function AdminNavbar() {
    const { user, logout } = useAuth();

    return (
        <header className="admin-navbar">
            <div className="admin-navbar-left">
                <div className="admin-navbar-search">
                    <Search size={16} />
                    <input type="search" placeholder="Search admin panels" aria-label="Search" />
                </div>
            </div>
            <div className="admin-navbar-right">
                <div className="admin-user-card">
                    <div>
                        <p className="type-caption text-muted-soft">Signed in as</p>
                        <p className="type-body-semibold">{user?.username || user?.email}</p>
                    </div>
                </div>
                <button type="button" className="btn btn-secondary admin-logout" onClick={logout}>
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </header>
    );
}
