import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import styles from '../css/dashboard.module.css';
import { FaBars, FaChartPie, FaHatCowboy, FaSignOutAlt, FaTimes, FaUsers } from "react-icons/fa";
import logo from '../assets/best_milk_main.png';
import SideNav from '../components/sideNav';


const Admin = () => {
    /*const { userData, logout } = useAuth();*/
    const { logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [stateAdmin, setStateAdmin] = useState({});

    const navigate = useNavigate();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const userData = {
        user: {
            name: 'Andres',
            email: 'andres@bestmilk.com',
            rol: "ADMIN"
        }
    }

    return (
        <section className={styles.admin_container}>

            <aside className={`${styles.side_bar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.sidebar_header}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            {userData?.user.name.charAt(0)}
                        </div>
                        <div className={styles.userDetails}>
                            <p className={styles.userName}>{userData?.user.name}</p>
                            <p className={styles.userEmail}>{userData?.user.email}</p>
                            <span className={styles.roleTag}>{userData?.user.rol}</span>
                        </div>
                    </div>
                    <button className={styles.closeMenu} onClick={toggleMenu}>
                        <FaTimes />
                    </button>
                </div>

                <SideNav setIsMenuOpen={setIsMenuOpen} />

                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <FaSignOutAlt className={styles.icon} /> Logout
                </button>
            </aside>

            <div className={styles.main_content}>

                <header className={styles.mobile_header}>
                    <Link to="/">
                        <img src={logo} style={{ height: "30px" }} alt="logo" />
                    </Link>
                    <button className={styles.hamburger} onClick={toggleMenu}>
                        <FaBars />
                    </button>
                </header>

                <section className={styles.view_container}>
                    <Outlet />
                </section>
            </div>

            {isMenuOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
        </section>
    );
};

export default Admin;