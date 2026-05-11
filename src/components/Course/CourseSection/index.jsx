import CardCourse from '../CardCourse';
import CourseProgression from '../../CourseProgression';
import styles from './styles.module.css';

export default function CourseSection({ title, lessons }) {
  const courseId = lessons && lessons.length > 0 ? lessons[0].courseId : null;
  const totalLessons = lessons ? lessons.length : 0;

  if (!lessons || lessons.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        
        {courseId && (
          <CourseProgression courseId={courseId} totalLessons={totalLessons} />
        )}
      </div>

      <div className={styles.grid}>
        {lessons.map((lesson) => (
          <CardCourse
            key={lesson.id}
            {...lesson}
            to={`/curso/${lesson.courseId}/${lesson.id}`}
          />
        ))}
      </div>
    </section>
  );
}