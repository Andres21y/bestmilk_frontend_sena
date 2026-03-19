import { Link, NavLink } from 'react-router-dom';
import styles from '../css/sidenav.module.css';
import { FaPaw, FaUsers, FaChartLine, FaSignOutAlt, FaCog, FaChartPie, FaHatCowboy } from 'react-icons/fa';

const SideNav = ({ setIsMenuOpen, setter }) => {

    return (
        <nav className={styles.nav_menu}>
            <NavLink
                to="/admin/dashboard"
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                onClick={() => setIsMenuOpen(false)}
            >
                <FaChartPie className={styles.icon} /> DashBoard
            </NavLink>
            <NavLink
                to="/admin/users"
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                onClick={() => {
                    setIsMenuOpen(false);
                    setter({ title: 'Users' })
                }}
            >
                <FaUsers className={styles.icon} /> Personal
            </NavLink>
            <NavLink
                to="/admin/cattles"
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                onClick={() => {
                    setIsMenuOpen(false);
                    setter({ title: 'cattles' })
                }}
            >
                <FaHatCowboy className={styles.icon} /> Ganado
            </NavLink>
            <NavLink
                to="/admin/production"
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                onClick={() => setIsMenuOpen(false)}
            >
                <FaChartPie className={styles.icon} /> Producción
            </NavLink>
            <NavLink
                to="/admin/health"
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                onClick={() => setIsMenuOpen(false)}
            >
                <FaHatCowboy className={styles.icon} /> Salud
            </NavLink>
            <NavLink
                to="/admin/vaccine"
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                onClick={() => setIsMenuOpen(false)}
            >
                <FaHatCowboy className={styles.icon} /> Vacunas
            </NavLink>

            <NavLink
                to="/admin/setting"
                className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}
                onClick={() => setIsMenuOpen(false)}
            >
                <FaHatCowboy className={styles.icon} /> Configuración
            </NavLink>
        </nav >
    );
};
export default SideNav;