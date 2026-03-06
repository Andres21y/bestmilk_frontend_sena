import styles from '../css/stats.module.css';

const Stats = ({ config = {} }) => {
    const {
        stats = [
            { number: "10K+", label: "Usuarios Activos" },
            { number: "99.9%", label: "Tiempo de Actividad" },
            { number: "24/7", label: "Soporte Técnico" },
            { number: "5★", label: "Calificación Promedio" }
        ]
    } = config;

    return (
        <section className={styles.stats_section}>
            <header>
                <h1 className={styles.main_title}>
                    Gestiona tu Ganado como un{" "}
                    <span className={styles.highlight}>Profesional</span>
                </h1>
                <p className={styles.subtitle}>
                    La aplicación más completa para administrar tu ganado lechero. Controla
                    inventario, salud, producción, finanzas y genealogía desde cualquier
                    dispositivo. Aumenta tu productividad hasta un 60%.
                </p>
            </header>

            <ul className={styles.stats_list}>
                {stats.map((stat, index) => (
                    <li key={index} className={styles.stat_item}>
                        <span className={styles.stat_number}>{stat.number}</span>
                        <span className={styles.stat_label}>{stat.label}</span>
                    </li>
                ))}

                {/* Stats fijos */}
                <li className={styles.stat_item}>
                    <span className={styles.stat_number}>60%</span>
                    <span className={styles.stat_label}>Más Productividad</span>
                </li>
                <li className={styles.stat_item}>
                    <span className={styles.stat_number}>1,200+</span>
                    <span className={styles.stat_label}>Ganaderos Activos</span>
                </li>
                <li className={styles.stat_item}>
                    <span className={styles.stat_number}>50K+</span>
                    <span className={styles.stat_label}>Animales Gestionados</span>
                </li>
                <li className={styles.stat_item}>
                    <span className={styles.stat_number}>99.9%</span>
                    <span className={styles.stat_label}>Tiempo Activo</span>
                </li>
            </ul>
        </section>

    )
}

export default Stats;