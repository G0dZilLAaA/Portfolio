import api from "./api";

export async function getProjects() {
    const response = await api.get("/projects");
    return response.data.data;
}

export async function getProject(slug) {
    const response = await api.get(`/projects/${slug}`);
    return response.data.data;
}