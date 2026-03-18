import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { toast } from 'react-toastify';

export const useAdminUsers = () => {
    
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPending = useCallback(async () => {
        setLoading(true);
        try {
            const data = await adminService.getPendingUsers();
            setPendingUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Could not load pending users");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPending();
    }, [fetchPending]);

    const approveUser = async (id) => {
        try {
            await adminService.approveUser(id);
            toast.success("User approved successfully");
            // Filtramos el usuario de la lista local para no recargar todo
            setPendingUsers(prev => prev.filter(user => user._id !== id));
        } catch (error) {
            toast.error("Failed to approve user");
        }
    };

    return { pendingUsers, loading, approveUser, refresh: fetchPending };
};