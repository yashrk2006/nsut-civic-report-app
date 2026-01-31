/// <reference types="vite/client" />
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api');

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
        const parsed = JSON.parse(token);
        if (parsed.state?.token) {
            config.headers.Authorization = `Bearer ${parsed.state.token}`;
        }
    }
    return config;
});

export default api;
