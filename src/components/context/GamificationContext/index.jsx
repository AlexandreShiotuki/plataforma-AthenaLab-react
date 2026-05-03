import { createContext, useState, useEffect, useContext } from 'react';
// 1. Importe o componente novo
import XPNotification from '../../XpNotification';

const GamificationContext = createContext({});

export function GamificationProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('athena_user_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return {
                    name: parsed.name ?? "Alexandre Shiotuki",
                    level: parsed.level ?? 1,
                    xp: parsed.xp ?? 0,
                    completedActivities: Array.isArray(parsed.completedActivities) ? parsed.completedActivities : [],
                    watchedLessons: Array.isArray(parsed.watchedLessons) ? parsed.watchedLessons : []
                };
            } catch {
                return {
                    name: "Alexandre Shiotuki",
                    level: 1,
                    xp: 0,
                    completedActivities: [],
                    watchedLessons: []
                };
            }
        }

        return {
            name: "Alexandre Shiotuki",
            level: 1,
            xp: 0,
            completedActivities: [],
            watchedLessons: []
        };
    });

    // Estado da Notificação
    const [notification, setNotification] = useState({ visible: false, xp: 0 });

    useEffect(() => {
        localStorage.setItem('athena_user_data', JSON.stringify(user));
    }, [user]);

    // Função auxiliar para mostrar o alerta
    const showToast = (amount) => {
        setNotification({ visible: true, xp: amount });
        
        // Esconde depois de 3 segundos (tempo da animação CSS)
        setTimeout(() => {
            setNotification({ visible: false, xp: 0 });
        }, 3000);
    };

    const addXp = (amount, activityId) => {
        // Verifica se já fez (para não ganhar infinito na mesma questão)
        if (user.completedActivities.includes(activityId)) {
            return; 
        }

        // Mostra o alerta visual
        showToast(amount);

        setUser(prevUser => {
            let newXp = prevUser.xp + amount;
            let newLevel = prevUser.level;
            const xpToNextLevel = 100;

            if (newXp >= xpToNextLevel) {
                newLevel += 1;
                newXp = newXp - xpToNextLevel;
                // Adicione um pequeno delay para não sobrepor o alerta de XP com o de Nível
                setTimeout(() => alert(`🎉 PARABÉNS! Nível ${newLevel}!`), 500);
            }

            return {
                ...prevUser,
                level: newLevel,
                xp: newXp,
                completedActivities: [...prevUser.completedActivities, activityId]
            };
        });
    };

    const getCourseProgress = (courseId, totalLessons) => { /* ... sua lógica antiga ... */ };

    const markLessonAsWatched = (courseId, lessonId) => {
        const lessonKey = `${courseId}_${lessonId}`;
        if (!user.watchedLessons.includes(lessonKey)) {
            setUser(prevUser => ({
                ...prevUser,
                watchedLessons: [...prevUser.watchedLessons, lessonKey]
            }));
        }
    };

    const isLessonWatched = (courseId, lessonId) => {
        const lessonKey = `${courseId}_${lessonId}`;
        return Array.isArray(user?.watchedLessons) && user.watchedLessons.includes(lessonKey);
    };

    return (
        <GamificationContext.Provider value={{ user, addXp, getCourseProgress, markLessonAsWatched, isLessonWatched }}>
            {children}
            {/* 2. O Alerta fica aqui, flutuando sobre o site todo */}
            <XPNotification visible={notification.visible} xpAmount={notification.xp} />
        </GamificationContext.Provider>
    );
}

export const useGamification = () => useContext(GamificationContext);