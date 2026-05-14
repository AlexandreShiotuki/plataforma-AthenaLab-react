import DifficultyCircle from '../Difficulty'
import styles from './styles.module.css'

export default function ChallengeCard({ challenge, onSelect }) {
  return (
    <button type="button" className={styles.challengeCard} onClick={onSelect}>
      <div className={styles.cardHeader}>
        <span className={styles.challengeIcon}>{challenge.icon}</span>
        <div className={styles.cardHeaderText}>
          <h3>{challenge.title}</h3>
          <div className={styles.cardMetaRow}>
            <DifficultyCircle difficulty={challenge.difficulty} />
            <span className={styles.duration}>{challenge.duration}</span>
          </div>
        </div>
      </div>
      <p className={styles.cardDescription}>{challenge.description}</p>
      <div className={styles.cardFooter}>
        <span className={styles.xpBadge}>+{challenge.xp} XP</span>
        <span className={styles.startAction}>Começar desafio →</span>
      </div>
    </button>
  )
}
