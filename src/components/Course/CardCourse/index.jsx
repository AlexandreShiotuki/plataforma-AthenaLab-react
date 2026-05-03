import { Link } from 'react-router-dom';
import { useGamification } from '../../context/GamificationContext';
import styles from './styles.module.css'
import logo from '../../../assets/logo.png'
import clock from '../../../assets/icons/clock-solid-full.svg'

export default function CourseCard({ id, courseId, lessonId, to, thumbnail, title, desc, duration }) {
    const { isLessonWatched } = useGamification();
    const watched = courseId && lessonId ? isLessonWatched(courseId, lessonId) : false;

    return (
        <Link to={to ?? `/curso/${id}`} className={styles.card}>
            <div className={styles.watchIndicator} style={{
                backgroundColor: watched ? '#10b981' : '#cbd5e1'
            }} />
            
            <div className={styles.thumbnail}>
                <img src={thumbnail} alt={title} />
            </div>

            <div className={styles.info}>
                <div className={styles.text}>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                </div>
                
                <div className={styles.footer}>
                    <img src={logo} alt="Logo" className={styles.logoIcon} />
                    
                    <div className={styles.duration}>
                        <img src={clock} alt="Relógio" />
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}