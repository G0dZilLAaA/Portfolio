import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Home,
    FileText,
    Layers,
    MessageSquare,
    UserCircle,
    Settings,
    PlusCircle
} from "lucide-react";

const navItems = [
    { label: "Dashboard", to: "/admin", icon: Home },
    { label: "Projects", to: "/admin/projects", icon: FileText },
    { label: "Technologies", to: "/admin/technologies", icon: Layers },
    { label: "Messages", to: "/admin/messages", icon: MessageSquare },
    { label: "Profile", to: "/admin/profile", icon: UserCircle },
    { label: "Settings", to: "/admin/settings", icon: Settings }
];

export default function AdminSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <aside className={`admin-sidebar ${open ? "open" : ""}`}>
            <div className="admin-sidebar-brand">
                <div className="admin-brand-mark">CMS</div>
                <div>
                    <p className="type-card-title">Portfolio Admin</p>
                    <p className="type-copy text-muted-soft">Control panel</p>
                </div>
            </div>

            <nav className="admin-sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `admin-sidebar-item ${isActive ? "active" : ""}`
                            }
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="admin-sidebar-footer">
                <NavLink to="/admin/projects/new" className="btn btn-primary admin-sidebar-create">
                    <PlusCircle size={18} />
                    New project
                </NavLink>
            </div>
        </aside>
    );
}
