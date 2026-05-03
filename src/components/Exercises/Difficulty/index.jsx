import styles from './styles.module.css';

export default function DifficultyCircle({ difficulty }) {
    const difficultyMap = {
        "Iniciante": "#9ca3af",     
        "Amador": "#22c55e",        
        "Intermediário": "#3b82f6", 
        "Avançado": "#a855f7",      
        "Mestre": "#ef4444",        
        "Lendário": "#fbbf24"       
    };

    const color = difficultyMap[difficulty] || "#9ca3af";

    return (
        <div className={styles.difficultyContainer}>
            <div 
                className={styles.difficultyCircle} 
                style={{ backgroundColor: color }} 
            ></div>
            
            <p className={styles.difficultyText}>{difficulty}</p>
        </div>
    );
}