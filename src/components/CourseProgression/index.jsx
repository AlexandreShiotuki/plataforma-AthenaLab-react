import { useGamification } from '../context/GamificationContext';
import styles from './styles.module.css';

export default function CourseProgress({ courseId, totalLessons }) {
  const { getCourseProgress } = useGamification();
  const progress = getCourseProgress(courseId, totalLessons);

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelGroup}>
        <span className={styles.text}>Progresso do curso</span>
        <span className={styles.percentage}>{progress}%</span>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.fill} 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}