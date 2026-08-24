import axios from "axios";

export function getStoredToken() {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = getStoredToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export function saveToken(token, remember) {
    if (remember) {
        localStorage.setItem("token", token);
        sessionStorage.removeItem("token");
    } else {
        sessionStorage.setItem("token", token);
        localStorage.removeItem("token");
    }
}

export function clearToken() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
}

export default api;