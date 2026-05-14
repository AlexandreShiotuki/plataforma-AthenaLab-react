import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import UserProfile from '../User Profile'
import { useLabStore } from '../../components/lab/Store/useLabStore'
import styles from './styles.module.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLabDropdownOpen, setIsLabDropdownOpen] = useState(false)
    const openTool = useLabStore((state) => state.openTool)

    const dropdownRef = useRef(null)
    const mobileDropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)
            ) {
                setIsLabDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen((current) => !current)
        setIsLabDropdownOpen(false)
    }

    const handleOpenTool = (toolId) => {
        openTool(toolId)
        setIsLabDropdownOpen(false)
        setIsMenuOpen(false)
    }

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
                    
                    <div className={styles.dropdownContainer} ref={dropdownRef}>
                        <button 
                            className={`${styles.anchors} ${styles.dropdownButton}`}
                            onClick={() => setIsLabDropdownOpen(!isLabDropdownOpen)}
                        >
                            Lab {isLabDropdownOpen ? '▴' : '▾'}
                        </button>
                        
                        {isLabDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                <button 
                                    className={styles.dropdownItem}
                                    onClick={() => handleOpenTool('ohm')}
                                >
                                    Lei de Ohm
                                </button>
                                <button 
                                    className={styles.dropdownItem}
                                    onClick={() => handleOpenTool('resistor')}
                                >
                                    Cores de Resistor
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                <UserProfile />
            </header>

            {isMenuOpen && (
                <div className={`${styles.mobileMenu} ${styles.open}`}>
                    <div className={styles.mobileLogoWrapper}>
                        <img src={logo} alt="Logo Athena" className={styles.mobileLogo} />
                    </div>
                    <Link to="/" className={styles.mobileAnchor} onClick={toggleMenu}>Home</Link>
                    <a href="#!" className={styles.mobileAnchor} onClick={(e) => { e.preventDefault(); toggleMenu() }}>Cursos</a>
                    <Link to="/exercicios" className={styles.mobileAnchor} onClick={toggleMenu}>Exercícios</Link>
                    <Link to="/impressoes" className={styles.mobileAnchor} onClick={toggleMenu}>Impressões 3D</Link>
                    
                    <div ref={mobileDropdownRef} style={{ display: 'flex', flexDirection: 'column' }}>
                        <button 
                            className={styles.mobileAnchor} 
                            style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                            onClick={() => setIsLabDropdownOpen(!isLabDropdownOpen)}
                        >
                            Lab {isLabDropdownOpen ? '▴' : '▾'}
                        </button>
                        
                        {isLabDropdownOpen && (
                            <div className={styles.mobileDropdownMenu}>
                                <button 
                                    className={styles.mobileDropdownItem}
                                    onClick={() => handleOpenTool('ohm')}
                                >
                                    Lei de Ohm
                                </button>
                                <button 
                                    className={styles.mobileDropdownItem}
                                    onClick={() => handleOpenTool('resistor')}
                                >
                                    Cores de Resistor
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}