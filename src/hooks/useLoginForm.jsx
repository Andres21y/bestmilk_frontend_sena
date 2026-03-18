import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import { authService } from '../services/authService';
import { validateLoginForm } from '../utils/validation';

export const useLoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    // Estado inicial del formulario
    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberMe: false,
        isLoading: false,
        errors: {},
    });

    const { email, password, rememberMe, isLoading, errors } = form;

    // Manejador de cambios en los inputs
    const handleChange = (e) => {

        const { id, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
            errors: { ...prev.errors, [id]: null } // Limpiamos el error del campo cuando el usuario empieza a escribir
        }));
    };

    // Manejador del envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validamos errores
        const { isValid, errors: validationErrors } = validateLoginForm(email, password);

        if (!isValid) {
            setForm(prev => ({ ...prev, errors: validationErrors }));
            toast.error("Please, fix the errors in the form");
            return;
        }

        setForm(prev => ({ ...prev, isLoading: true }));

        try {
            // Llamada al servicio de autenticación 
            const data = await authService.login({ email, password });

            if (data.user.state !== 'ACTIVE') {
                console.warn(`Access denied: User ${email} is not active yet.`);
                toast.warning("Your account is pending administrator approval. Please wait.");
                return;
            }

            login(data, rememberMe);

            toast.success(`Welcome back, ${data.user.name}!`);

            setTimeout(() => navigate('/admin'), 1000);

        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Connection error, try again later";
            console.error("Login attempt failed:", errorMsg);
            toast.error(errorMsg);
        } finally {
            setForm(prev => ({ ...prev, isLoading: false }));
        }
    };

    return {
        email,
        password,
        rememberMe,
        isLoading,
        errors,
        handleChange,
        handleSubmit
    };
};