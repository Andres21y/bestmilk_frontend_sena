import { useSignupForm } from "../hooks/useSignupForm";
import SignupForm from "../components/forms/signupForm";
import styles from "../css/signup.module.css";

const Signup = () => {
    const { form, handleChange, handleSubmit } = useSignupForm();

    return (
        <section className={styles.signup_container}>
            <div className={styles.signup_card}>
                <h3 className={styles.title}>Crea tu cuenta</h3>
                <p className={styles.subtitle}>Únete a nuestra comunidad</p>
                <center>
                    <SignupForm
                        form={form}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </center>
            </div>
        </section>
    );
};

export default Signup;
