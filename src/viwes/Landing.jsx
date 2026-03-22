import styles from '../css/landing.module.css'
import Stats from "../components/landing/stats";
import Feature from "../components/landing/feature";
import Footer from "../components/landing/footer";
import Hero from "../components/landing/hero";

const Landing = () => {
    return (
        <div className={styles.landing_container}>
            <Hero />
            <Stats />
            <Feature />
            <Footer />
        </div>
    )
}

export default Landing;