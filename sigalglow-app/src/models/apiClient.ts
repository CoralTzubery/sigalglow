import axios from "axios";

const BASE_URL = "https://sigalglow.onrender.com";
fetch(`${BASE_URL}/api/about`);

export const tokenKeyName = "token";

export const apiClient = axios.create({
    baseURL: BASE_URL,
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