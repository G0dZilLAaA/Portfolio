import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminProfile() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.username || "");
    const [role, setRole] = useState(user?.role || "");
    const [email, setEmail] = useState(user?.email || "");
    const [about, setAbout] = useState("");
    const [social, setSocial] = useState({ linkedin: "", github: "" });
    const [resume, setResume] = useState("");
    const [location, setLocation] = useState("");
    const [availability, setAvailability] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        setName(user?.username || "");
        setRole(user?.role || "");
        setEmail(user?.email || "");
    }, [user]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus(
            "Profile management is read-only with the current backend API. These values are shown for review only."
        );
    };

    return (
        <div className="admin-section space-y-8">
            <div className="admin-page-heading">
                <div>
                    <p className="badge-pill">Profile</p>
                    <h1 className="type-heading">Manage admin profile</h1>
                </div>
            </div>

            <div className="card-panel admin-form-grid p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                            <label className="type-caption text-muted-soft">Name</label>
                            <input className="admin-input" value={name} onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div>
                            <label className="type-caption text-muted-soft">Role</label>
                            <input className="admin-input" value={role} readOnly />
                        </div>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                            <label className="type-caption text-muted-soft">Email</label>
                            <input className="admin-input" value={email} readOnly />
                        </div>
                        <div>
                            <label className="type-caption text-muted-soft">Availability</label>
                            <input
                                className="admin-input"
                                value={availability}
                                onChange={(event) => setAvailability(event.target.value)}
                                placeholder="Available for projects"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="type-caption text-muted-soft">About</label>
                        <textarea
                            className="admin-input admin-textarea"
                            value={about}
                            onChange={(event) => setAbout(event.target.value)}
                            rows={4}
                            placeholder="A short bio for your admin profile"
                        />
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                            <label className="type-caption text-muted-soft">LinkedIn</label>
                            <input
                                className="admin-input"
                                value={social.linkedin}
                                onChange={(event) => setSocial((current) => ({ ...current, linkedin: event.target.value }))}
                                placeholder="https://linkedin.com/..."
                            />
                        </div>
                        <div>
                            <label className="type-caption text-muted-soft">GitHub</label>
                            <input
                                className="admin-input"
                                value={social.github}
                                onChange={(event) => setSocial((current) => ({ ...current, github: event.target.value }))}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                            <label className="type-caption text-muted-soft">Resume URL</label>
                            <input
                                className="admin-input"
                                value={resume}
                                onChange={(event) => setResume(event.target.value)}
                                placeholder="Resume link"
                            />
                        </div>
                        <div>
                            <label className="type-caption text-muted-soft">Location</label>
                            <input
                                className="admin-input"
                                value={location}
                                onChange={(event) => setLocation(event.target.value)}
                                placeholder="City, Country"
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Save profile
                    </button>
                    {status && <p className="type-copy text-muted-soft">{status}</p>}
                </form>
            </div>
        </div>
    );
}
