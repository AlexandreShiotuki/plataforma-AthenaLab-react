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

            try {
                const { data, error } = await supabase
                    .from('usuarios')
                    .select('nome, nivel, xp, avatar_url, completed_activities, watched_lessons')
                    .eq('user_id', id)
                    .maybeSingle();

                if (error) {
                    console.error('Erro ao carregar perfil:', error.message, error.code);
                    setProfileLoaded(true);
                    return;
                }

                if (!data) {
                    console.warn('Perfil não encontrado para user_id:', id);
                    console.log('Criando perfil padrão...');

                    const defaultProfile = {
                        user_id: id,
                        nome: 'Aluno Athena',
                        nivel: 1,
                        xp: 0,
                        avatar_url: '',
                        completed_activities: [],
                        watched_lessons: []
                    };

                    const { error: insertError } = await supabase
                        .from('usuarios')
                        .insert([defaultProfile]);

                    if (insertError) {
                        console.error('Erro ao criar perfil padrão:', insertError.message);
                    } else {
                        console.log('Perfil padrão criado com sucesso');
                    }

                    setUser({
                        name: defaultProfile.nome,
                        level: defaultProfile.nivel,
                        xp: defaultProfile.xp,
                        avatarUrl: defaultProfile.avatar_url,
                        completedActivities: defaultProfile.completed_activities,
                        watchedLessons: defaultProfile.watched_lessons
                    });
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
            } catch (err) {
                console.error('Erro inesperado ao carregar perfil:', err);
                setProfileLoaded(true);
            }
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

    // Calcula o XP necessário para passar do nível atual para o próximo
    const getXpRequiredForLevel = (level) => {
        return Math.ceil(100 * Math.pow(1.5, level - 1));
    };

    const addXp = async (amount, activityId) => {
        if (!userId || !profileLoaded) return;
        const currentXp = Number.isFinite(user.xp) ? user.xp : 0;
        let currentLevel = Number.isFinite(user.level) ? user.level : 1;
        const currentActivities = Array.isArray(user.completedActivities) ? user.completedActivities : [];

        if (currentActivities.includes(activityId)) {
            return;
        }

        showToast(amount);

        let newXp = currentXp + amount;
        let newLevel = currentLevel;

        // Loop para verificar se sobe múltiplos níveis
        let xpRequiredForCurrentLevel = getXpRequiredForLevel(newLevel);
        while (newXp >= xpRequiredForCurrentLevel) {
            newXp -= xpRequiredForCurrentLevel;
            newLevel += 1;
            xpRequiredForCurrentLevel = getXpRequiredForLevel(newLevel);
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
            <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', textAlign: 'center' }}>
                <div>
                    <p>Carregando dados do perfil...</p>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>Por favor, aguarde</p>
                </div>
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