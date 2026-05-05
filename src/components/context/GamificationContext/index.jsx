import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../../../lib/supabase';
import XPNotification from '../../XpNotification';

const GamificationContext = createContext({});

export function GamificationProvider({ children }) {
    const [user, setUser] = useState({
        name: '',
        level: 1,
        xp: 0,
        avatarUrl: '',
        completedActivities: [],
        watchedLessons: []
    });
    const [userId, setUserId] = useState(null);
    const [profileLoaded, setProfileLoaded] = useState(false);

    // Estado da Notificação
    const [notification, setNotification] = useState({ visible: false, xp: 0 });

    useEffect(() => {
        const loadProfile = async (id) => {
            if (!id) {
                setUser({
                    name: '',
                    level: 1,
                    xp: 0,
                    avatarUrl: '',
                    completedActivities: [],
                    watchedLessons: []
                });
                setProfileLoaded(true);
                return;
            }

            const { data, error } = await supabase
                .from('usuarios')
                .select('nome, nivel, xp, avatar_url, completed_activities, watched_lessons')
                .eq('user_id', id)
                .single();

            if (error) {
                console.error('Erro ao carregar perfil:', error.message);
                setProfileLoaded(true);
                return;
            }

            setUser({
                name: data?.nome ?? '',
                level: data?.nivel ?? 1,
                xp: data?.xp ?? 0,
                avatarUrl: data?.avatar_url ?? '',
                completedActivities: Array.isArray(data?.completed_activities) ? data.completed_activities : [],
                watchedLessons: Array.isArray(data?.watched_lessons) ? data.watched_lessons : []
            });
            setProfileLoaded(true);
        };

        const initialize = async () => {
            setProfileLoaded(false);
            const {
                data: { session }
            } = await supabase.auth.getSession();

            const id = session?.user?.id ?? null;
            setUserId(id);
            await loadProfile(id);
        };

        initialize();

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setProfileLoaded(false);
            const id = session?.user?.id ?? null;
            setUserId(id);
            await loadProfile(id);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Função auxiliar para mostrar o alerta
    const showToast = (amount) => {
        setNotification({ visible: true, xp: amount });
        
        // Esconde depois de 3 segundos (tempo da animação CSS)
        setTimeout(() => {
            setNotification({ visible: false, xp: 0 });
        }, 3000);
    };

    const addXp = async (amount, activityId) => {
        if (!userId || !profileLoaded) return;
        const currentXp = Number.isFinite(user.xp) ? user.xp : 0;
        const currentLevel = Number.isFinite(user.level) ? user.level : 1;
        const currentActivities = Array.isArray(user.completedActivities) ? user.completedActivities : [];

        if (currentActivities.includes(activityId)) {
            return;
        }

        showToast(amount);

        let newXp = currentXp + amount;
        let newLevel = currentLevel;
        const xpToNextLevel = 100;

        if (newXp >= xpToNextLevel) {
            const levelsGained = Math.floor(newXp / xpToNextLevel);
            newLevel += levelsGained;
            newXp = newXp % xpToNextLevel;
            setTimeout(() => alert(`🎉 PARABÉNS! Nível ${newLevel}!`), 500);
        }

        const updatedCompletedActivities = [...currentActivities, activityId];

        setUser((prevUser) => ({
            ...prevUser,
            level: newLevel,
            xp: newXp,
            completedActivities: updatedCompletedActivities
        }));

        const { error } = await supabase
            .from('usuarios')
            .update({ xp: newXp, nivel: newLevel, completed_activities: updatedCompletedActivities })
            .eq('user_id', userId);

        if (error) {
            console.error('Erro ao atualizar XP/Nível:', error.message);
        }
    };

    const getCourseProgress = (courseId, totalLessons) => { /* ... sua lógica antiga ... */ };

    const markLessonAsWatched = async (courseId, lessonId) => {
        if (!userId || !profileLoaded) return;

        const lessonKey = `${courseId}_${lessonId}`;
        const currentWatched = Array.isArray(user.watchedLessons) ? user.watchedLessons : [];
        if (currentWatched.includes(lessonKey)) {
            return;
        }

        const updatedWatchedLessons = [...currentWatched, lessonKey];
        setUser((prevUser) => ({
            ...prevUser,
            watchedLessons: updatedWatchedLessons
        }));

        const { error } = await supabase
            .from('usuarios')
            .update({ watched_lessons: updatedWatchedLessons })
            .eq('user_id', userId);

        if (error) {
            console.error('Erro ao salvar aulas assistidas:', error.message);
        }
    };

    const isLessonWatched = (courseId, lessonId) => {
        const lessonKey = `${courseId}_${lessonId}`;
        return Array.isArray(user?.watchedLessons) && user.watchedLessons.includes(lessonKey);
    };

    if (!profileLoaded) {
        return (
            <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
                Carregando dados do perfil...
            </div>
        );
    }

    return (
        <GamificationContext.Provider value={{ user, addXp, getCourseProgress, markLessonAsWatched, isLessonWatched }}>
            {children}
            {/* 2. O Alerta fica aqui, flutuando sobre o site todo */}
            <XPNotification visible={notification.visible} xpAmount={notification.xp} />
        </GamificationContext.Provider>
    );
}

export const useGamification = () => useContext(GamificationContext);