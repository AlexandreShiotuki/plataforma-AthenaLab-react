import CourseCard from '../CardCourse/index'
import styles from './styles.module.css'

export default function CourseSection({ title, lessons }) {
  return (
    <section className={styles.courseSection}>
      <h2>{title}</h2>
      <div className={styles.carouselContainer}>
        {lessons.map((lesson) => (
          <CourseCard
            key={`${lesson.courseId}-${lesson.id}`}
            to={`/curso/${lesson.courseId}/${lesson.id}`}
            id={lesson.courseId}
            courseId={lesson.courseId}
            lessonId={lesson.id}
            title={`${lesson.courseTitle} — ${lesson.title}`}
            desc={lesson.desc}
            duration={lesson.duration}
            thumbnail={lesson.thumbnail}
          />
        ))}
      </div>
    </section>
  )
}
