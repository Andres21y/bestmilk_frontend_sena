import { MdPerson, MdEmail, MdPhone, MdLock, MdPersonOutline } from "react-icons/md";
import styles from "../../css/signup.module.css";

const SignupForm = ({ form, handleChange, handleSubmit }) => {
    const { errors, isLoading } = form;

    return (
        <form className={styles.signup_form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
    
                <div className={styles.col}>
                    <div className="input_field">
                        <MdPerson size={25} />
                        <input id="nit" type="text" value={form.nit} onChange={handleChange} required />
                        <label htmlFor="nit">NIT</label>
                        {errors.nit && <span className="error">{errors.nit}</span>}
                    </div>

                    <div className="input_field">
                        <MdPerson size={25} />
                        <input id="firstName" type="text" value={form.firstName} onChange={handleChange} required />
                        <label htmlFor="firstName">Nombre</label>
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>

                    <div className="input_field">
                        <MdPersonOutline size={25} />
                        <input id="lastName" type="text" value={form.lastName} onChange={handleChange} required />
                        <label htmlFor="lastName">Apellido</label>
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>

                    <div className="input_field">
                        <MdEmail size={25} />
                        <input id="email" type="email" value={form.email} onChange={handleChange} required />
                        <label htmlFor="email">Email</label>
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                </div>


                <div className={styles.col}>
                    <div className="input_field">
                        <MdLock size={25} />
                        <input id="password" type="password" value={form.password} onChange={handleChange} required />
                        <label htmlFor="password">Contraseña</label>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    <div className="input_field">
                        <MdLock size={25} />
                        <input id="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required />
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>

                    <div className="input_field">
                        <MdPhone size={25} />
                        <input id="phone" type="tel" value={form.phone} onChange={handleChange} />
                        <label htmlFor="phone">Teléfono</label>
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>

                    <div className="input_field">
                        <MdPersonOutline size={25} />
                        <input id="address" type="text" value={form.address} onChange={handleChange} required />
                        <label htmlFor="address">Dirección</label>
                        {errors.address && <span className="error">{errors.address}</span>}
                    </div>
                </div>
            </div>

            <div className={styles.checkboxContainer}>
                <label>
                    <input id="terms" type="checkbox" checked={form.terms} onChange={handleChange} />
                    <span>Acepto los términos y condiciones</span>
                </label>
                {errors.terms && <span className={styles.alert}>{errors.terms}</span>}
            </div>

            <div>
                <button type="submit" className={styles.signup_btn} disabled={isLoading}>
                    {isLoading ? "Procesando..." : "Crear Cuenta"}
                </button>
            </div>
        </form>
    );
};

export default SignupForm;