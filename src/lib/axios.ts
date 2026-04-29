import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = Cookies.get("auth-token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de respuesta para manejar errores globales como 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        
        // Evitar bucle infinito o redirecciones si el 401 viene del intento de login
        if (
            error.response && 
            error.response.status === 401 && 
            originalRequest.url !== "/auth/login"
        ) {
            // Manejar token expirado o inválido: borrar cookies y redirigir
            Cookies.remove("auth-token");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userType");
            
            if (typeof window !== "undefined" && window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
