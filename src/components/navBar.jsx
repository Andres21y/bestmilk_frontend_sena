import { Link, useLocation } from "react-router-dom";
import styles from "../css/nav.module.css";
import logo from '../assets/best_milk_main.png';
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { useState } from "react";

const NavBar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navConfig = {
    "/": [
      { type: "link", to: "/about", label: "¿Quienes somos?" },
      { type: "link", to: "/benefits", label: "Beneficios" },
      { type: "link", to: "/login", label: "Iniciar" },
      { type: "link", to: "/signup", label: "Registrar" }
    ],
    "/login": [
      { type: "link", to: "/signup", label: "Registrarse" },
      { type: "link", to: "/", icon: <FaHome size={24} /> }
    ],
    "/signup": [
      { type: "link", to: "/login", label: "Iniciar sesión" },
      { type: "link", to: "/", icon: <FaHome size={24} /> }
    ],
    "/dashboard": [
      { type: "button", onClick: logout, label: "Cerrar Sesión" }
    ]
  };

  const currentButtons = navConfig[location.pathname] || [];
  return (
    <nav className={styles.container}>
      <Link to="/">
        <img src={logo} style={{ height: "30px" }} alt="logo" />
      </Link>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className={`${styles.btns} ${menuOpen ? styles.open : ""}`}>
        {currentButtons.map((btn, index) =>
          btn.type === "link" ? (
            <Link key={index} to={btn.to} onClick={() => setMenuOpen(false)}>
              {btn.icon || btn.label}
            </Link>
          ) : (
            <button key={index} onClick={btn.onClick}>
              {btn.icon || btn.label}
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default NavBar;