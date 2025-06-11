import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE;
fetch(`${BASE_URL}/api/appointments`);

export const tokenKeyName = "token";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000",
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
});


export function getToken() {
    return sessionStorage.getItem(tokenKeyName);
}

export function setToken(token: string) {
    return sessionStorage.setItem(tokenKeyName, token);
}

export function clearToken() {
    sessionStorage.removeItem(tokenKeyName);
}