import { useState, useEffect, useCallback } from 'react';
import { breedService } from '../services/breedService';
import { toast } from 'react-toastify';

export const useBreeds = () => {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBreeds = useCallback(async () => {
        setLoading(true);
        try {
            const data = await breedService.getAll();
            setBreeds(data);
        } catch (error) {
            console.error("Breed fetch error:", error.message);
            toast.error("Failed to load breed catalog");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBreeds();
    }, [fetchBreeds]);

    return { breeds, loading, refreshBreeds: fetchBreeds };
};