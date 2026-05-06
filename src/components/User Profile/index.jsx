import styles from './styles.module.css';
import defaultAvatar from '../../assets/may-icon.webp';
import { useGamification } from '../context/GamificationContext'; 

// Remova as props que ele recebia antes, agora ele pega direto do contexto
export default function UserProfile() { 
    const { user } = useGamification();

    // Calcula o XP necessário para passar do nível atual para o próximo
    const getXpRequiredForLevel = (level) => {
        return Math.ceil(100 * Math.pow(1.5, level - 1));
    };

    const xpRequired = getXpRequiredForLevel(user.level);
    const progressPercentage = Math.min((user.xp / xpRequired) * 100, 100);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.info}>
                <span className={styles.name}>{user.name || 'Aluno Athena'}</span>
                
                <div className={styles.levelRow}>
                    <span className={styles.levelBadge}>Lvl. {user.level}</span>
                    
                    <div className={styles.xpTrack}>
                        <div 
                            className={styles.xpFill} 
                            style={{ width: `${progressPercentage}%` }} 
                        ></div>
                    </div>
                </div>
            </div>
            
            <img 
                src={user.avatarUrl || defaultAvatar} 
                alt="Perfil" 
                className={styles.avatar} 
            />
        </div>
    );
}