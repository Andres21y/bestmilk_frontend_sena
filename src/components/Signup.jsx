import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdPerson, MdEmail, MdPhone, MdLock, MdPersonOutline } from 'react-icons/md';
import { validateSignupForm } from '../utils/validation';
import { useAuth } from '../context/authContext';
import styles from '../css/Signup.module.css';

const Signup = () => {

    const navigate = useNavigate();
    const { signup } = useAuth();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        terms: false,
        newsletter: false,
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
        const { isValid, errors } = validateSignupForm(form);

        if (!isValid) {
            setForm(prev => ({ ...prev, errors }));
            return;
        }

        setForm(prev => ({ ...prev, isLoading: true }));

        try {
            // Invocamos la función del contexto
            await signup({
                name: `${form.firstName} ${form.lastName}`,
                email: form.email,
                password: form.password,
                phone: form.phone
            });

            toast.success("Registration successful! Welcome.");
            navigate('/home');

        } catch (error) {
            // Errores de API (ej. email ya registrado)
            const msg = error.response?.data?.msg || "Error en el servidor";
            toast.error(msg);
        } finally {
            setForm(prev => ({ ...prev, isLoading: false }));
        }
    };


    return (
        <section className={styles.signupContainer}>
            <div className={styles.signupCard}>
                <div className={styles.formSection}>
                    <h4 className={styles.title}>Crea tu cuenta</h4>
                    <p className={styles.subtitle}>Únete a nuestra comunidad</p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className={styles.row}>
                            {/* Columna 1 */}
                            <div className={styles.col}>
                                <div className={styles.inputField}>
                                    <MdPerson className={styles.icon} />
                                    <input id="firstName" type="text" placeholder="Nombre" value={form.firstName} onChange={handleChange} />
                                    {form.errors.firstName && <span className={styles.error}>{form.errors.firstName}</span>}
                                </div>

                                <div className={styles.inputField}>
                                    <MdEmail className={styles.icon} />
                                    <input id="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} />
                                    {form.errors.email && <span className={styles.error}>{form.errors.email}</span>}
                                </div>

                                <div className={styles.inputField}>
                                    <MdPhone className={styles.icon} />
                                    <input id="phone" type="tel" placeholder="Teléfono (Opcional)" value={form.phone} onChange={handleChange} />
                                    {form.errors.phone && <span className={styles.error}>{form.errors.phone}</span>}
                                </div>
                            </div>

                            {/* Columna 2 */}
                            <div className={styles.col}>
                                <div className={styles.inputField}>
                                    <MdPersonOutline className={styles.icon} />
                                    <input id="lastName" type="text" placeholder="Apellido" value={form.lastName} onChange={handleChange} />
                                    {form.errors.lastName && <span className={styles.error}>{form.errors.lastName}</span>}
                                </div>

                                <div className={styles.inputField}>
                                    <MdLock className={styles.icon} />
                                    <input id="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
                                    {form.errors.password && <span className={styles.error}>{form.errors.password}</span>}
                                </div>

                                <div className={styles.inputField}>
                                    <MdLock className={styles.icon} />
                                    <input id="confirmPassword" type="password" placeholder="Confirmar Contraseña" value={form.confirmPassword} onChange={handleChange} />
                                    {form.errors.confirmPassword && <span className={styles.error}>{form.errors.confirmPassword}</span>}
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkboxContainer}>
                            <label>
                                <input id="terms" type="checkbox" checked={form.terms} onChange={handleChange} />
                                <span>Acepto los términos y condiciones</span>
                            </label>
                            {form.errors.terms && <span className={styles.errorBlock}>{form.errors.terms}</span>}
                        </div>

                        <button type="submit" className={styles.signupBtn} disabled={form.isLoading}>
                            {form.isLoading ? "Procesando..." : "Crear Cuenta"}
                        </button>
                    </form>
                </div>

                {/* Sección lateral decorativa */}
                <div className={styles.imageSection}>
                    <h5>¡Bienvenido!</h5>
                    <p>Únete a miles de usuarios que ya disfrutan de nuestra plataforma.</p>
                    <svg className={styles.welcomeImage} viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.2)" />
                        <path d="M 70 120 Q 100 140 130 120" stroke="white" strokeWidth="4" fill="none" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Signup;