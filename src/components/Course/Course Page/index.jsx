import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses } from '../../../data/courses';
import { useGamification } from '../../context/GamificationContext';
import ExercisePlayer from '../ExercisePlayer'; 
import styles from './styles.module.css';

export default function CoursePage() {
    const { addXp } = useGamification();
    const { markLessonAsWatched } = useGamification();
    const params = useParams();
    const navigate = useNavigate(); // Hook para navegar via código
    const courseId = Number(params.courseId ?? params.id);
    const lessonId = params.lessonId ? Number(params.lessonId) : undefined;
    const curso = Number.isNaN(courseId) ? undefined : courses.find(c => c.id === courseId);

    const [aulaAtual, setAulaAtual] = useState(null);
    const [mode, setMode] = useState('video'); // 'video' ou 'exercise'
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    useEffect(() => {
    if (curso && curso.lessons && curso.lessons.length > 0) {
        const lessonFromParams = lessonId ? curso.lessons.find(l => l.id === lessonId) : undefined;
        const newLesson = lessonFromParams || curso.lessons[0];
        
        // Só atualiza se a aula atual for nula ou se o ID dela for diferente da nova
        if (!aulaAtual || aulaAtual.id !== newLesson.id) {
            setAulaAtual(newLesson);
            setMode('video'); 
            markLessonAsWatched(courseId, newLesson.id);
        }
    }
}, [curso, lessonId, courseId, markLessonAsWatched, aulaAtual]);

    const getYouTubeId = (url) => {
        if (!url) return null;
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v');
        } catch (e) { return null; }
    };

    const getExercisesForLesson = () => {
        if (!curso || !aulaAtual) return [];
        const lessonIndex = curso.lessons.findIndex(l => l.id === aulaAtual.id);
        const start = lessonIndex * 3;
        const end = start + 3;
        return curso.exercises.slice(start, end);
    };

    const getNextLesson = () => {
        if (!curso || !aulaAtual) return null;
        const currentIndex = curso.lessons.findIndex(l => l.id === aulaAtual.id);
        return currentIndex < curso.lessons.length - 1 ? curso.lessons[currentIndex + 1] : null;
    };

    const nextLesson = getNextLesson();

    const handleStartExercises = () => {
        const videoId = `video_${aulaAtual.id}`;
        addXp(20, videoId);
        setMode('exercise');
    };

    const handleLessonPassed = () => {
        const exerciseId = `exercise_${aulaAtual.id}`;
        addXp(50, exerciseId);

        if (nextLesson) {
            navigate(`/curso/${curso.id}/${nextLesson.id}`);
        } else {
            setShowCompletionModal(true);
        }
    };

    const handleRetryLesson = () => {
        setMode('video');
    };

    const handleWatchNextLesson = () => {
        if (nextLesson) {
            navigate(`/curso/${curso.id}/${nextLesson.id}`);
        }
    };

    if (!curso) return <h2>Curso não encontrado!</h2>;
    if (!aulaAtual) return <div className={styles.pageContainer}><h2>Sem aulas.</h2></div>;

    const videoId = getYouTubeId(aulaAtual.videoUrl);

    return (
        <div className={styles.pageContainer}>
            {showCompletionModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '32px 24px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
                        textAlign: 'center',
                        maxWidth: '90vw'
                    }}>
                        <h2>Parabéns! 🎉</h2>
                        <p>Você concluiu todas as aulas do curso!</p>
                        <button
                            style={{
                                marginTop: '20px',
                                padding: '10px 24px',
                                background: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={() => {
                                setShowCompletionModal(false);
                                navigate('/');
                            }}
                        >
                            Voltar para Home
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.contentArea}>
                <div className={styles.playerSection}>
                    <h1>{aulaAtual.title}</h1>

                    <div className={styles.videoWrapper}>
                        {mode === 'video' ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={aulaAtual.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0 }}
                            ></iframe>
                        ) : (
                            <ExercisePlayer 
                                questions={getExercisesForLesson()}
                                onPass={handleLessonPassed}
                                onFail={handleRetryLesson}
                            />
                        )}
                    </div>

                    {mode === 'video' && (
                        <div style={{marginTop: '15px', display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap'}}>
                            <button 
                                onClick={handleStartExercises}
                                style={{
                                    padding: '10px 20px', 
                                    background: '#6366f1', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                Ir para Exercícios 📝
                            </button>

                            {nextLesson && (
                                <button 
                                    onClick={handleWatchNextLesson}
                                    style={{
                                        padding: '10px 20px', 
                                        background: '#10b981', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Assistir próxima aula ➔
                                </button>
                            )}
                        </div>
                    )}

                    <p className={styles.description}>{aulaAtual.desc}</p>
                </div>
            </div>
        </div>
    );
}      