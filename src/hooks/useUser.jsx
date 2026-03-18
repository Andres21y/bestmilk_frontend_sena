import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { toast } from 'react-toastify';

export const useUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Función para cargar usuarios
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching personnel:", error.message);
            toast.error("Failed to retrieve personnel records");
        } finally {
            setLoading(false);
        }
    }, []);

    // Cargar al montar el componente
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Función para eliminar usuario
    const removeUser = async (id) => {
        try {
            await adminService.deleteUser(id);
            setUsers(prev => prev.filter(user => user._id !== id));
            toast.success("Personnel record deleted successfully");
        } catch (error) {
            const msg = error.response?.data?.msg || "Error deleting user";
            toast.error(msg);
        }
    };

    return { users, loading, removeUser, refresh: fetchUsers };
};