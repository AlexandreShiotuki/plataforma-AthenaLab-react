import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import profile from '../../assets/may-icon.webp'
import UserProfile from '../User Profile'
import styles from './styles.module.css'

export default function Header() {
    return (
        <>
            <div className={styles.header}>
                <Link to="/">
                    <img src={logo} alt="" className={styles.logo} />
                </Link>

                <div className={styles.anchor}>
                    <Link to="/" className={styles.anchors}>Home</Link>
                    <a href="" className={styles.anchors}>Cursos</a>
                    <Link to="/exercicios" className={styles.anchors}>Exercícios</Link>
                    <Link to="/impressoes" className={styles.anchors}>Impressões 3D</Link>
                </div>

                <UserProfile 
                name='Alexandre Shiotuki'
                level={1}
                xp={0}
                avatar={profile}/>
                
            </div>
        </>
    )
}