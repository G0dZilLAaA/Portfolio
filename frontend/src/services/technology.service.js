import api from "./api";

export async function getTechnologies() {
    const response = await api.get("/technologies");
    return response.data.data;
}

export async function createTechnology(name) {
    const response = await api.post("/technologies", { name });
    return response.data.data;
}

export async function deleteTechnology(id) {
    const response = await api.delete(`/technologies/${id}`);
    return response.data;
}
