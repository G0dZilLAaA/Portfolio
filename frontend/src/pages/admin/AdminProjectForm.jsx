import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProject, getProject } from "../../services/project.service.js";
import { getTechnologies } from "../../services/technology.service.js";

export default function AdminProjectForm() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const editMode = Boolean(slug);

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [featured, setFeatured] = useState(false);
    const [published, setPublished] = useState(false);
    const [technologyIds, setTechnologyIds] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        let active = true;

        Promise.all([getTechnologies(), editMode ? getProject(slug) : Promise.resolve(null)])
            .then(([techItems, project]) => {
                if (!active) return;
                setTechnologies(techItems);

                if (project) {
                    setTitle(project.title);
                    setShortDescription(project.shortDescription);
                    setDescription(project.description);
                    setThumbnail(project.thumbnail || "");
                    setGithubUrl(project.githubUrl || "");
                    setLiveUrl(project.liveUrl || "");
                    setFeatured(project.featured);
                    setPublished(project.published);
                    setTechnologyIds(project.technologies.map((item) => item.technology.id));
                }
            })
            .catch(() => {})
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [editMode, slug]);

    const handleTechnologyToggle = (id) => {
        setTechnologyIds((current) =>
            current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        );
    };

    const actionLabel = editMode ? "Update Project" : "Create Project";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatusMessage("");

        if (editMode) {
            setStatusMessage(
                "Editing existing projects is not supported by this backend API. Create a new project to publish updates."
            );
            return;
        }

        setSaving(true);

        try {
            await createProject({
                title,
                shortDescription,
                description,
                thumbnail,
                githubUrl,
                liveUrl,
                featured,
                published,
                technologyIds
            });

            setStatusMessage("Project created successfully.");
            navigate("/admin/projects");
        } catch (error) {
            setStatusMessage(error?.response?.data?.message || error?.message || "Unable to create project.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-section space-y-8">
            <div className="admin-page-heading">
                <div>
                    <p className="badge-pill">{editMode ? "Edit Project" : "Add Project"}</p>
                    <h1 className="type-heading">{editMode ? "Project details" : "Create a new project"}</h1>
                </div>
            </div>

            <div className="card-panel admin-form-grid">
                {loading ? (
                    <p className="type-copy">Loading project data...</p>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div>
                                <label className="type-caption text-muted-soft">Title</label>
                                <input
                                    className="admin-input"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="type-caption text-muted-soft">Short Description</label>
                                <input
                                    className="admin-input"
                                    value={shortDescription}
                                    onChange={(event) => setShortDescription(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="type-caption text-muted-soft">Full Description</label>
                            <textarea
                                className="admin-input admin-textarea"
                                rows={6}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div>
                                <label className="type-caption text-muted-soft">Thumbnail URL</label>
                                <input
                                    className="admin-input"
                                    value={thumbnail}
                                    onChange={(event) => setThumbnail(event.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="type-caption text-muted-soft">GitHub URL</label>
                                <input
                                    className="admin-input"
                                    value={githubUrl}
                                    onChange={(event) => setGithubUrl(event.target.value)}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <div>
                                <label className="type-caption text-muted-soft">Live URL</label>
                                <input
                                    className="admin-input"
                                    value={liveUrl}
                                    onChange={(event) => setLiveUrl(event.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="admin-checkbox-group">
                                <label>
                                    <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} />
                                    Featured project
                                </label>
                                <label>
                                    <input type="checkbox" checked={published} onChange={(event) => setPublished(event.target.checked)} />
                                    Published
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="type-caption text-muted-soft">Technologies</label>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3">
                                {technologies.map((tech) => (
                                    <button
                                        key={tech.id}
                                        type="button"
                                        className={`badge-pill admin-tech-toggle ${technologyIds.includes(tech.id) ? "active" : ""}`}
                                        onClick={() => handleTechnologyToggle(tech.id)}
                                    >
                                        {tech.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {statusMessage && <p className="type-copy text-primary">{statusMessage}</p>}

                        <div className="flex flex-wrap gap-4">
                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                {saving ? "Saving..." : actionLabel}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/projects")}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
