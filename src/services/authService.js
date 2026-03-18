import api from './apiService';

export const authService = {

    // Método de registro de login
    // Recibe datos del nuevo usuario y los envía al backend.
    login: async (credentials) => {
        try {
            const { data } = await api.post(import.meta.env.VITE_LOGIN, credentials);
            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw new Error("The action has failed");
        }
    },

    // Método de registro de usuario
    // Recibe datos del nuevo usuario y los envía al backend.
    signup: async (userData) => {
        try {
            const { data } = await api.post(import.meta.env.VITE_SIGNUP, userData);
            return data;
        } catch (error) {
            console.error("Signup error:", error);
            throw new Error("The action has failed");
        }
    }
};