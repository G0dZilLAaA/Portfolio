import api from "./api";

export async function getProjects() {
    const response = await api.get("/projects");
    return response.data.data;
}

export async function getProject(slug) {
    const response = await api.get(`/projects/${slug}`);
    return response.data.data;
}

export async function createProject(project) {
    const response = await api.post("/projects", project);
    return response.data.data;
}