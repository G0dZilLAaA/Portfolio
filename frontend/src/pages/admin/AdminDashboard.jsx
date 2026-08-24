import { useEffect, useState } from "react";
import { getProjects } from "../../services/project.service.js";
import { getTechnologies } from "../../services/technology.service.js";

const sampleMessages = [
    { id: "m1", subject: "New collaboration request", from: "design@studio.com", unread: true, date: "Today" },
    { id: "m2", subject: "Question about the portfolio", from: "hello@client.com", unread: false, date: "Yesterday" }
];

export default function AdminDashboard() {
    const [projects, setProjects] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        Promise.all([getProjects(), getTechnologies()])
            .then(([projectList, techList]) => {
                if (!active) return;
                setProjects(projectList);
                setTechnologies(techList);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const featuredCount = projects.filter((item) => item.featured).length;
    const publishedCount = projects.filter((item) => item.published).length;
    const unreadCount = sampleMessages.filter((item) => item.unread).length;

    return (
        <div className="admin-dashboard space-y-8">
            <div className="admin-dashboard-header">
                <div>
                    <p className="badge-pill">Dashboard</p>
                    <h1 className="type-heading">Admin overview</h1>
                </div>
            </div>

            <div className="admin-stat-grid">
                <article className="card-panel admin-stat-card">
                    <p className="type-caption text-muted-soft">Total Projects</p>
                    <p className="type-card-title mt-3">{projects.length}</p>
                </article>
                <article className="card-panel admin-stat-card">
                    <p className="type-caption text-muted-soft">Featured Projects</p>
                    <p className="type-card-title mt-3">{featuredCount}</p>
                </article>
                <article className="card-panel admin-stat-card">
                    <p className="type-caption text-muted-soft">Published Projects</p>
                    <p className="type-card-title mt-3">{publishedCount}</p>
                </article>
                <article className="card-panel admin-stat-card">
                    <p className="type-caption text-muted-soft">Technologies</p>
                    <p className="type-card-title mt-3">{technologies.length}</p>
                </article>
                <article className="card-panel admin-stat-card">
                    <p className="type-caption text-muted-soft">Unread Messages</p>
                    <p className="type-card-title mt-3">{unreadCount}</p>
                </article>
                <article className="card-panel admin-stat-card">
                    <p className="type-caption text-muted-soft">Recent Activity</p>
                    <p className="type-card-title mt-3">{projects.length ? "Project sync complete" : "Loading data"}</p>
                </article>
            </div>

            <div className="card-panel admin-activity-panel">
                <div className="section-heading">
                    <h2 className="type-card-title">Recent project activity</h2>
                    <p className="section-copy">Quick access to the latest published work.</p>
                </div>
                {loading ? (
                    <p className="type-copy">Loading projects...</p>
                ) : projects.length ? (
                    <div className="admin-activity-list">
                        {projects.slice(0, 4).map((project) => (
                            <article key={project.slug} className="admin-activity-item">
                                <div>
                                    <p className="type-card-title">{project.title}</p>
                                    <p className="type-copy text-muted-soft">{project.shortDescription}</p>
                                </div>
                                <div className="badge-pill">{new Date(project.createdAt).toLocaleDateString()}</div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="type-copy">No published projects available yet.</p>
                )}
            </div>
        </div>
    );
}
