import api from './apiService'; // Nuestra instancia de Axios configurada con el token

const failed = "The action has failed";

export const breedService = {
    // Obtener todas las razas registradas en el sistema.
    getAll: async () => {
        try {
            const { data } = await api.get('/breed');
            return data;
        } catch (error) {
            console.error("GetAll error:", error);
            throw new Error(failed, error);
        }
    },

    //Registrar una o varias razas nuevas.
    create: async (breedData) => {
        try {
            const { data } = await api.post('/breed', breedData);
            return data;
        } catch (error) {
            console.error("Create error:", error);
            throw new Error(failed, error);
        }
    },

    // Actualizar la información de una raza existente.
    update: async (id, breedData) => {
        try {
            const { data } = await api.put(`/breed/${id}`, breedData);
            return data;
        } catch (error) {
            console.error("update error:", error);
            throw new Error(failed, error);
        }
    },

    // Eliminar una raza

    delete: async (id) => {
        try {
            const { data } = await api.delete(`/breed/${id}`);
            return data;
        } catch (error) {
            console.error("delete error:", error);
            throw new Error(failed, error);
        }
    }
};