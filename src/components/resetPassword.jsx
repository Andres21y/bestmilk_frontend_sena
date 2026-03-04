import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../css/reset.module.css';

const ResetPassword = () => {
    const { token } = useParams(); // Captura el token de la URL
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL_RESET}/${token}`, { password });
            toast.success('Éxito', 'Contraseña cambiada', 'success');

            navigate('/'); // Volver al login
        } catch (error) {
            toast.success('Error', 'Token expirado o inválido', 'error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <center>
                    <form onSubmit={handleSubmit}>
                        <h3>Nueva contraseña</h3>

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Ingresa tu nueva contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Actualizar Contraseña
                        </button>

                        <p className={styles.hint}>
                            Asegúrate de que sea una contraseña segura y difícil de adivinar.
                        </p>
                    </form>
                </center>
            </div>
        </div>
    );
};
export default ResetPassword;