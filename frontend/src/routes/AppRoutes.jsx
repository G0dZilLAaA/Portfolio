import { Route, Routes } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import PortfolioLayout from "../layouts/PortfolioLayout";

import Dashboard from "../pages/admin/Dashboard";
import ManageProjects from "../pages/admin/ManageProjects";

import About from "../pages/portfolio/About";
import Home from "../pages/portfolio/Home";
import Projects from "../pages/portfolio/Projects";

function AppRoutes() {
    return (
        <Routes>
            <Route element={<PortfolioLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<ManageProjects />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;