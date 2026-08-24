import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../../services/project.service.js";

const PAGE_SIZE = 6;

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let active = true;
        getProjects()
            .then((items) => {
                if (!active) return;
                setProjects(items);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const query = search.toLowerCase();
            return (
                project.title.toLowerCase().includes(query) ||
                project.shortDescription.toLowerCase().includes(query) ||
                project.technologies.some((item) =>
                    item.technology.name.toLowerCase().includes(query)
                )
            );
        });
    }, [projects, search]);

    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE));
    const currentItems = filteredProjects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="admin-section space-y-8">
            <div className="admin-page-heading">
                <div>
                    <p className="badge-pill">Projects</p>
                    <h1 className="type-heading">Manage project library</h1>
                </div>
                <button className="btn btn-primary" onClick={() => navigate("new")}>Create Project</button>
            </div>

            <div className="card-panel admin-filter-panel">
                <input
                    type="search"
                    placeholder="Search projects, technologies, descriptions..."
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(1);
                    }}
                    className="admin-input w-full"
                />
            </div>

            <div className="card-panel admin-table-panel overflow-x-auto">
                {loading ? (
                    <p className="type-copy">Loading projects...</p>
                ) : !filteredProjects.length ? (
                    <p className="type-copy">No matching projects. Create a new one to get started.</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Featured</th>
                                <th>Published</th>
                                <th>Technologies</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((project) => (
                                <tr key={project.slug}>
                                    <td>
                                        <Link to={`/projects/${project.slug}`} className="admin-table-link">
                                            {project.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <span className="badge-pill">Live</span>
                                    </td>
                                    <td>
                                        <span className={`badge-pill ${project.featured ? "badge-primary" : "badge-muted"}`}>
                                            {project.featured ? "Featured" : "Standard"}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge-pill ${project.published ? "badge-primary" : "badge-muted"}`}>
                                            {project.published ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((item) => (
                                                <span key={item.technology.id} className="tag-pill">
                                                    {item.technology.name}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="admin-table-actions">
                                        <Link className="btn btn-secondary" to={`/admin/projects/${project.slug}/edit`}>
                                            Edit
                                        </Link>
                                        <button className="btn btn-secondary" disabled>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="admin-pagination">
                <button
                    className="btn btn-secondary"
                    disabled={page === 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                    Previous
                </button>
                <span className="type-copy text-muted-soft">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="btn btn-secondary"
                    disabled={page === totalPages}
                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
