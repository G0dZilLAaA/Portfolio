import { useEffect, useState } from "react";

import ProjectForm from "../../components/admin/ProjectForm";
import ProjectRow from "../../components/admin/ProjectRow";
import { getProjects } from "../../services/projectService";

function ManageProjects() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectData = await getProjects();

                setProjects(projectData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjects();
    }, []);
    const handleDeleteProject = (projectId) => {
        const updatedProjects = projects.filter(
            (project) => project.id !== projectId
        );

        setProjects(updatedProjects);
    };

    const handleAddProject = (projectData) => {
        const newProject = {
            id: Date.now(),
            ...projectData,
        };

        setProjects((currentProjects) => [
            ...currentProjects,
            newProject,
        ]);
    };

    return (
        <div>
            <h1>Manage Projects</h1>
            <ProjectForm onAddProject={handleAddProject} />
            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((project) => (
                        <ProjectRow
                            key={project.id}
                            project={project}
                            onDelete={handleDeleteProject}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageProjects;