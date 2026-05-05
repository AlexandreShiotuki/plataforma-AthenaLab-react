import CourseSection from '../../components/Course/CourseSection'
import { courses } from '../../data/courses'
import styles from './styles.module.css'

export default function Home() {
  const getCourseLessons = (courseId) => {
    const course = courses.find(c => c.id === courseId)
    if (!course || !course.lessons) return []
    
    return course.lessons.map((lesson) => ({
      ...lesson,
      courseId: course.id,
      courseTitle: course.title,
      thumbnail: lesson.thumbnail || course.thumbnail,
      duration: lesson.duration || course.duration || ''
    }))
  }

  return (
    <div className={styles.homePage}>
      <CourseSection 
        title="Curso Preparatório para OBR" 
        lessons={getCourseLessons(1)} 
      />
    </div>
  )
}