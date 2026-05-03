import styles from './styles.module.css';

// Agora recebe 'title' também
export default function XPNotification({ visible, xpAmount, title }) {
    if (!visible) return null;

    return (
        <div className={styles.notification}>
            <span className={styles.icon}>✨</span>
            <div className={styles.content}>
                {/* Se vier título usa ele, se não usa o padrão */}
                <span className={styles.title}>{title || "Resposta Correta!"}</span>
                <span className={styles.xp}>+{xpAmount} XP</span>
            </div>
        </div>
    );
}