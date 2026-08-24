import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ProjectDetails from "../pages/ProjectDetails";
import AdminLayout from "../components/admin/AdminLayout";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminProjectForm from "../pages/admin/AdminProjectForm";
import AdminTechnologies from "../pages/admin/AdminTechnologies";
import AdminProfile from "../pages/admin/AdminProfile";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminSettings from "../pages/admin/AdminSettings";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectDetails />} />
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="projects" element={<AdminProjects />} />
                        <Route path="projects/new" element={<AdminProjectForm />} />
                        <Route path="projects/:slug/edit" element={<AdminProjectForm />} />
                        <Route path="technologies" element={<AdminTechnologies />} />
                        <Route path="profile" element={<AdminProfile />} />
                        <Route path="messages" element={<AdminMessages />} />
                        <Route path="settings" element={<AdminSettings />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
