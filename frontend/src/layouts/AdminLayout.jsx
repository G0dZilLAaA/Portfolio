import { Outlet } from "react-router-dom";

import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

function AdminLayout() {
    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="admin-content">
                <Navbar />

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;