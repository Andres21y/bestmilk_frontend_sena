import { useState } from 'react';
import axios from 'axios';
import styles from '../css/login.module.css'
import { MdEmail, MdLock } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import { validateLoginForm } from '../utils/validation';

const Login = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    // Estado para los inputs y carga
    const [form, setForm] = useState({
        email: '',
        password: '',
        isLoading: false,
        errors: {},
    });

    const { email, password, isLoading, errors } = form;

    const handleChange = (e) => {

        const { id, value } = e.target;

        setForm(prev => ({
            ...prev,
            [id]: value,
            // Limpiamos solo el error del campo que está cambiando
            errors: { ...prev.errors, [id]: null }
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validaciones Locales antes de llamar a la API
        const { isValid, errors: validationErrors } = validateLoginForm(form.email, form.password);

        if (!isValid) {
            setForm(prev => ({ ...prev, errors: validationErrors }));
            toast.error("Please, check error");
            return;
        }

        // Iniciamos carga
        setForm(prev => ({ ...prev, isLoading: true }));

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email: form.email,
                password: form.password
            });

            login(response.data);
            toast.success(`Welcome ${response.data.user.name}`);

            setTimeout(() => navigate('/home'), 1500);

        } catch (error) {
            const errorMsg = error.response?.data?.msg || "Error de conexión";
            toast.error(errorMsg);
        } finally {
            setForm(prev => ({ ...prev, isLoading: false }));
        }
    };

    return (
        <section className={styles['login_container']}>
            <div className={styles['login_card']}>

                <div className={styles['image_section']}>
                    <div className={styles['image_content']}>
                        <h3>Bienvenido</h3>
                        <p>Accede a tu cuenta para continuar con una experiencia personalizada y segura. </p>
                    </div>
                </div>

                <div className={styles['form_section']}>

                    <div className={styles['form_title']}>
                        <h4>Iniciar Sesión</h4>
                        <p>Ingresa tus credenciales para acceder</p>
                    </div>

                    <form id="loginForm" onSubmit={handleSubmit} noValidate>
                        <div className={styles['input_field']}>
                            <MdEmail size={32} />
                            <input
                                id="email"
                                type="email"
                                className={errors?.email ? styles.invalid : styles.validate}
                                value={email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Correo Electrónico</label>
                        </div>
                        {errors?.email && <span className={styles.error_text}>{errors.email}</span>}

                        <div className={styles['input_field']}>
                            <MdLock size={32} />
                            <input
                                id="password"
                                type="password"
                                className={errors?.password ? styles.invalid : styles.validate}
                                value={password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Contraseña</label>
                        </div>
                        {errors.password && <span className={styles.error_text}>{errors.password}</span>}

                        <div style={{ margin: '1.5rem 0' }}>
                            <label>
                                <input type="checkbox" id="rememberMe" />
                                <span>Recordarme</span>
                            </label>
                        </div>

                        <button
                            className={`${styles['btn']} ${styles['btn_login']}`}
                            type="submit"
                            disabled={isLoading}
                        >
                            <span className={styles['login-text']}>
                                Iniciar Sesión
                            </span>
                        </button>

                    </form>

                    <div className={styles['forgot-password']}>
                        <a onClick={() => navigate('/forgot-password')}>¿Olvidaste tu contraseña?</a>
                    </div>

                    <div className={`${styles["register-link"]} ${styles["grey-text"]} ${styles["darken-3"]}`}>
                        <p>
                            ¿No tienes una cuenta?{" "}
                            <Link to={'/signup'}>Regístrate aquí</Link>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};


export default Login;