import axios from 'axios';

const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) return token;
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        return userInfo.token || null;
    } catch {
        return null;
    }
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('token');
            const isAuthPage = ['/login', '/register'].includes(window.location.pathname);
            if (!isAuthPage) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
