import styles from './styles.module.css';
import defaultAvatar from '../../assets/may-icon.webp';
import { useGamification } from '../context/GamificationContext'; 

// Remova as props que ele recebia antes, agora ele pega direto do contexto
export default function UserProfile() { 
    const { user } = useGamification(); // <--- Pega os dados reais

    return (
        <div className={styles.profileContainer}>
            <div className={styles.info}>
                <span className={styles.name}>{user.name}</span>
                
                <div className={styles.levelRow}>
                    <span className={styles.levelBadge}>Lvl. {user.level}</span>
                    
                    <div className={styles.xpTrack}>
                        <div 
                            className={styles.xpFill} 
                            // O XP vai de 0 a 100, então cabe perfeito na porcentagem
                            style={{ width: `${user.xp}%` }} 
                        ></div>
                    </div>
                </div>
            </div>
            
            <img 
                src={defaultAvatar} 
                alt="Perfil" 
                className={styles.avatar} 
            />
        </div>
    );
}