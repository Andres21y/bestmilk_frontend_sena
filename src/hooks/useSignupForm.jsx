import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/authService'; 
import { validateSignupForm } from '../utils/validation'; 

export const useSignupForm = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nit: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        terms: false,
        isLoading: false,
        errors: {}
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value,
            errors: { ...prev.errors, [id]: null }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //  Validación local del formulario
        const { isValid, errors } = validateSignupForm(form);
        if (!isValid) {
            setForm(prev => ({ ...prev, errors }));
            toast.error("Please, check the errors in the form");
            return;
        }

        setForm(prev => ({ ...prev, isLoading: true }));

        try {
            //  Mapeo de datos (Front -> Backend)
            const userData = {
                nit: form.nit,
                name: form.firstName,
                last_name: form.lastName,
                email: form.email,
                password: form.password,
                phone: form.phone,
                address: form.address
            };

            // Llamada al servicio
            const response = await authService.signup(userData);


            if (response.msg || response.user) {
                toast.success("Registration successful! Your account is pending administrator approval.");
                
                // Limpiamos el formulario antes de irnos
                setForm(prev => ({ ...prev, isLoading: false }));
                
                // Redirigimos al Login (Ya que no puede entrar al Home todavía)
                navigate('/login');
            }

        } catch (error) {
            // Manejo de errores de la API (ej: NIT o Email duplicado)
            const errorMsg = error.response?.data?.msg || "An error occurred during registration";
            toast.error(errorMsg);
            setForm(prev => ({ ...prev, isLoading: false }));
        }
    };

    return { 
        form, 
        handleChange, 
        handleSubmit 
    };
};