import axios from "axios";

export const tokenKeyName = "token";

export const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if(token) {
        config.headers.set("Authoriztion", `Bearer ${token}`);
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