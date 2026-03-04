import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../css/forgot.module.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const navigate = useNavigate();
    // Estado local para almacenar el correo electrónico ingresado por el usuario
    const [email, setEmail] = useState('');

    // Manejador del formulario
    const handleSubmit = async (e) => {

        e.preventDefault(); 
        
        try {
            // Relizaños la petición al backend
            await axios.post(`${import.meta.env.VITE_API_URL_FORGOT}`, { email });

            toast.success('Check your email');

        } catch (error) {
            toast.error('No se pudo enviar el correo');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <center>
                    <form onSubmit={handleSubmit}>
                        <h3>Recuperar Contraseña</h3>
                        <p>
                            Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu cuenta.
                        </p>

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className={styles.input}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Enviar enlace de recuperación
                        </button>

                        <a
                            className={styles.backToLogin}
                            onClick={() => navigate('/login')}
                        >
                            Volver al inicio de sesión
                        </a>
                    </form>
                </center>
            </div>
        </div>
    );
};

export default ForgotPassword;