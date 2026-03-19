import { Link } from "react-router-dom";
import styles from "../../css/landing.module.css"

const Hero = () => (
    <section id="hero" className={`containers ${styles.hero_section}`}>
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <div className={styles.hero_content}>
                        <h1 className={styles.hero_title}>Bienvenidos a Bestmilk</h1>
                        <p className={styles.hero_subtitle}>
                            La plataforma perfecta para gestionar tus proyectos de manera
                            eficiente y colaborativa
                        </p>

                        <div className={styles.hero_buttons_container}>
                            <Link
                                to="/signup"
                                className={`${styles.btn} ${styles.btn_hero} ${styles.btn_primary}`}
                            >
                                <i className={`material-icons ${styles.left}`}>rocket_launch</i>
                                Comenzar Ahora
                            </Link>

                            <Link
                                to="/demo"
                                className={`${styles.btn} ${styles.btn_hero} ${styles.btn_secondary}`}
                            >
                                <i className={`material-icons ${styles.left}`}>play_circle_outline</i>
                                Ver Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
