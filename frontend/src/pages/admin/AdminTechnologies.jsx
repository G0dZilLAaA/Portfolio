import { useEffect, useState } from "react";
import { createTechnology, deleteTechnology, getTechnologies } from "../../services/technology.service.js";

export default function AdminTechnologies() {
    const [technologies, setTechnologies] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getTechnologies()
            .then((items) => setTechnologies(items))
            .finally(() => setLoading(false));
    }, []);

    const handleCreate = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const newTech = await createTechnology(name.trim());
            setTechnologies((current) => [newTech, ...current]);
            setName("");
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Unable to add technology");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        await deleteTechnology(id);
        setTechnologies((current) => current.filter((tech) => tech.id !== id));
    };

    const filteredItems = technologies.filter((tech) =>
        tech.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-section space-y-8">
            <div className="admin-page-heading">
                <div>
                    <p className="badge-pill">Technologies</p>
                    <h1 className="type-heading">Manage skill tags</h1>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <div className="card-panel p-6">
                    <div className="type-copy mb-4 text-muted-soft">Existing technologies are available for project metadata and filtering.</div>
                    <div className="admin-filter-panel">
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search technologies"
                            className="admin-input w-full"
                        />
                    </div>
                    {loading ? (
                        <p className="type-copy">Loading technologies...</p>
                    ) : !filteredItems.length ? (
                        <p className="type-copy">No technologies found.</p>
                    ) : (
                        <ul className="admin-technology-list">
                            {filteredItems.map((technology) => (
                                <li key={technology.id} className="admin-technology-item">
                                    <span>{technology.name}</span>
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-small"
                                        onClick={() => handleDelete(technology.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="card-panel p-6">
                    <h2 className="type-card-title">Add a technology</h2>
                    <p className="type-copy text-muted-soft mb-6">Create new tags for your project stack.</p>
                    <form className="space-y-4" onSubmit={handleCreate}>
                        <label className="type-caption text-muted-soft">Technology name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="admin-input"
                            required
                        />
                        {error && <p className="type-copy text-red-400">{error}</p>}
                        <button className="btn btn-primary" type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Create technology"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
