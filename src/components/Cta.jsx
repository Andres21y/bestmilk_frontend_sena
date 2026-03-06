
import styles from '../css/cta.module.css';

const Cta = () => {

    const images = [
        { src: "iTurn0image121", alt: "Vacas en pradera" },
        { src: "iTurn0image124", alt: "Ganado pastando" },
        { src: "iTurn0image129", alt: "Rebaño de vacas" },
        { src: "iTurn0image132", alt: "Ganado en pradera alpina" },
        { src: "iTurn0image140", alt: "Vacas en campo verde" }
    ];

    return (
        <section className={`${styles.cta_section} ${styles.white}`}>
            <div className={styles.carousel}>
                {images.map((img, index) => (
                    <a key={index} href={`#${index + 1}`} className={styles.carousel_item}>
                        <img src={img.src} alt={img.alt} />
                    </a>
                ))}
            </div>
        </section>

    )
}

export default Cta