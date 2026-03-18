import api from "./apiService";

const failed = "The action has failed:";

export const cattleService = {
    getAll: async () => {
        try {
            const { data } = await api.get('/cattle');
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw new Error(failed, error);
        }
    },
    getById: async (id) => {
        try {
            const { data } = await api.get(`/cattle/${id}`);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw new Error(failed, error);
        }
    },
    create: async (cattleData) => {
        try {
            const { data } = await api.post('/cattle', cattleData);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw new Error(failed, error);
        }
    },
    update: async (id, cattleData) => {
        try {
            const { data } = await api.put(`/cattle/${id}`, cattleData);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw new Error(failed, error);
        }
    },
    delete: async (id) => {
        try {
            const { data } = await api.delete(`/cattle/${id}`);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw new Error(failed, error);
        }
    }
};