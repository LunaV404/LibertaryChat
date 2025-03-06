import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
    
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Ou récupère ton token d'une autre manière
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
