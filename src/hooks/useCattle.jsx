import { useState, useEffect, useCallback } from 'react';
import { cattleService } from '../services/cattleService';
import { toast } from 'react-toastify';

export const useCattle = () => {
    const [cattles, setCattle] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCattle = useCallback(async () => {
        setLoading(true);
        try {
            const data = await cattleService.getAll();
            setCattle(data);
        } catch (error) {
            console.error("Error fetching cattle:", error.message);
            toast.error("Could not load cattle list");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCattle();
    }, [fetchCattle]);


    const addCattle = async (formData) => {
        try {
            await cattleService.create(formData);
            toast.success("Process has been  successful");
            fetchCattle();
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error creating record");
        }
    };

    const removeCattle = async (id) => {
        try {
            await cattleService.delete(id);
            setCattle(prev => prev.filter(item => item._id !== id));
            toast.success("Process has been  successful");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Action denied");
        }
    };

    return {
        cattles,
        loading,
        addCattle,
        removeCattle,
        refresh: fetchCattle
    };
};