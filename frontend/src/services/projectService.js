const PROJECTS_API_URL = "/api/projects";

const getProjects = async () => {
    const response = await fetch(PROJECTS_API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
};
const createProject = async (project) => {
    const response = await fetch("/api/projects", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(project),
    });

    if (!response.ok) {
        throw new Error("Failed to create project");
    }

    return response.json();
};

export {
    getProjects,
    createProject,
};