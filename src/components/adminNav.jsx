import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from '../assets/best_milk_main.png';
import styles from '../css/nav.module.css'

const AdminNav = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    };

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img src={logo} style={{ height: "30px" }} alt="logo" />
            </Link>
            <div className={styles.menu_icon} onClick={toggleMenu}>
                {open ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={`nav-links ${open ? 'active' : ''}`}>
                <li><a href="/">Inicio</a></li>
                <li><a href="/servicios">Servicios</a></li>
                <li><a href="/contacto">Contacto</a></li>
            </ul>
        </nav>
    )
}

export default AdminNav