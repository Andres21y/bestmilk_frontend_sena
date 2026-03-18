import api from './apiService';

const failed = "The action has failed:";

export const adminService = {
    // Obtener todos los usuarios del sistema
    getAllUsers: async () => {
        try {
            const { data } = await api.get('/admin/users');
            return data;
        } catch (error) {
            console.error("GetAll error:", error);
            throw new Error(failed, error);
        }
    },

    // Eliminar un usuario permanentemente
    deleteUser: async (id) => {
        try {
            const { data } = await api.delete(`/admin/users/${id}`);
            return data;
        } catch (error) {
            console.error("Delete error:", error);
            throw new Error(failed, error);
        }
    }
};



