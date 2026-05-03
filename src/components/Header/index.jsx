import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import UserProfile from '../User Profile'
import styles from './styles.module.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((current) => !current);
    };

    return (
        <div className={styles.headerWrapper}>
            <header className={styles.header}>
                <button
                    type="button"
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>

                <Link to="/" className={styles.logoLink}>
                    <img src={logo} alt="Logo Athena" className={`${styles.logo} ${isMenuOpen ? styles.logoHidden : ''}`} />
                </Link>

                <nav className={styles.anchor}>
                    <Link to="/" className={styles.anchors}>Home</Link>
                    <a href="#!" className={styles.anchors} onClick={(e) => e.preventDefault()}>Cursos</a>
                    <Link to="/exercicios" className={styles.anchors}>Exercícios</Link>
                    <Link to="/impressoes" className={styles.anchors}>Impressões 3D</Link>
                </nav>

                <UserProfile />
            </header>

            {isMenuOpen && (
                <div className={`${styles.mobileMenu} ${styles.open}`}>
                    <div className={styles.mobileLogoWrapper}>
                        <img src={logo} alt="Logo Athena" className={styles.mobileLogo} />
                    </div>
                    <Link to="/" className={styles.mobileAnchor} onClick={toggleMenu}>Home</Link>
                    <a href="#!" className={styles.mobileAnchor} onClick={(e) => { e.preventDefault(); toggleMenu(); }}>Cursos</a>
                    <Link to="/exercicios" className={styles.mobileAnchor} onClick={toggleMenu}>Exercícios</Link>
                    <Link to="/impressoes" className={styles.mobileAnchor} onClick={toggleMenu}>Impressões 3D</Link>
                </div>
            )}
        </div>
    )
}