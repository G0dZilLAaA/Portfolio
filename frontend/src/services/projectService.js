const PROJECTS_API_URL = "/api/projects";

const getProjects = async () => {
    const response = await fetch(PROJECTS_API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
};

export { getProjects };