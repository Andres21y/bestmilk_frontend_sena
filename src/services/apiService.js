import axios from 'axios';

// Creamos la URL base.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// inyectamos automáticamente el token de autenticación en los headers.
api.interceptors.request.use((config) => {

    // Buscamos el token en localStorage o en sessionStorage.
    // Esto permite que el usuario siga autenticado aunque cierre el navegador
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    // Si existe un token, lo añadimos al header Authorization con formato Bearer.
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Retornamos la configuración modificada para que la petición se ejecute.
    return config;
});

export default api;
