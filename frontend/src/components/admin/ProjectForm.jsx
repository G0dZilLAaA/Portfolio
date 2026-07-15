import { useState } from "react";

function ProjectForm({ onAddProject }) {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        status: "Offline",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onAddProject(formData);

        setFormData({
            title: "",
            category: "",
            status: "Offline",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Project Title</label>

                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="category">Category</label>

                <input
                    id="category"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="status">Status</label>

                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Offline">Offline</option>
                    <option value="Live">Live</option>
                </select>
            </div>

            <button type="submit">Add Project</button>
        </form>
    );
}

export default ProjectForm;