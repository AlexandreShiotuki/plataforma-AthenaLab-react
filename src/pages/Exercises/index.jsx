import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import ChallengeCard from '../../components/Exercises/ChallengeCard'
import DifficultyCircle from '../../components/Exercises/Difficulty'

const difficultyOptions = [
  'Iniciante',
  'Amador',
  'Intermediário',
  'Avançado',
  'Mestre',
  'Lendário'
]

const challenges = [
  {
    id: 'inverse-kinematics',
    icon: 'IK',
    title: 'Inverse Kinematics Solver',
    difficulty: 'Avançado',
    duration: '3h 45m',
    xp: 420,
    description: 'Ajuste articulações e resolva movimentos complexos em tempo real para um robô altamente responsivo.'
  },
  {
    id: 'lidar-slam',
    icon: 'LIDAR',
    title: 'LiDAR Mapping & SLAM',
    difficulty: 'Mestre',
    duration: '5h 00m',
    xp: 600,
    description: 'Combine sensores e algoritmos de localização para construir mapas robustos e confiáveis.'
  },
  {
    id: 'pid-tuning',
    icon: 'PID',
    title: 'PID Controller Tuning',
    difficulty: 'Intermediário',
    duration: '1h 15m',
    xp: 280,
    description: 'Otimize os ganhos do controlador para garantir estabilidade e resposta rápida em sistemas dinâmicos.'
  },
  {
    id: 'torque-optimization',
    icon: 'TQ',
    title: 'Torque Optimization Logic',
    difficulty: 'Avançado',
    duration: '2h 30m',
    xp: 340,
    description: 'Ajuste curvas de torque e eficiência para alcançar o melhor desempenho com menor consumo.'
  },
  {
    id: 'distributed-systems',
    icon: 'DS',
    title: 'Distributed Systems Basics',
    difficulty: 'Iniciante',
    duration: '45m',
    xp: 180,
    description: 'Entenda replicação, consistência e tolerância a falhas em arquiteturas distribuídas.'
  },
  {
    id: 'legendary-design',
    icon: 'LD',
    title: 'Legendary Design Sprint',
    difficulty: 'Lendário',
    duration: '4h 20m',
    xp: 720,
    description: 'Enfrente um desafio épico integrando planejamento, execução e validação de ponta a ponta.'
  }
]

export default function ExercisesPage() {
  const navigate = useNavigate()
  const { challengeId } = useParams()
  const [search, setSearch] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos')

  const selectedChallenge = useMemo(
    () => challenges.find((challenge) => challenge.id === challengeId),
    [challengeId]
  )

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(search.toLowerCase()) ||
        challenge.difficulty.toLowerCase().includes(search.toLowerCase())

      const matchesDifficulty =
        selectedDifficulty === 'Todos' || challenge.difficulty === selectedDifficulty

      return matchesSearch && matchesDifficulty
    })
  }, [search, selectedDifficulty])

  const handleSelectChallenge = (id) => {
    navigate(`/exercicios/${id}`)
  }

  const renderHeader = () => (
    <div className={styles.headerSection}>
      <div>
        <p className={styles.label}>SYSTEM MODULES</p>
        <h1 className={styles.title}>Advanced Challenges</h1>
        <p className={styles.subtitle}>
          Selecione um protocolo profundo para testar sua lógica de sistemas autônomos.
          Completion requires &gt;95% efficiency rating.
        </p>
      </div>
      <div className={styles.scorePanel}>
        <p className={styles.scoreLabel}>XP disponível</p>
        <p className={styles.scoreValue}>+2.540 XP</p>
      </div>
    </div>
  )

  if (selectedChallenge) {
    return (
      <div className={styles.exercisesPage}>
        <div className={styles.contentShell}>
          {renderHeader()}
          <button className={styles.backButton} onClick={() => navigate('/exercicios')}>
            Voltar para desafios
          </button>
          <div className={styles.detailCard}>
            <div className={styles.detailTop}>
              <span className={styles.detailIcon}>{selectedChallenge.icon}</span>
              <div>
                <h2 className={styles.detailTitle}>{selectedChallenge.title}</h2>
                <div className={styles.detailMetaRow}>
                  <DifficultyCircle difficulty={selectedChallenge.difficulty} />
                  <span className={styles.detailTag}>{selectedChallenge.duration}</span>
                </div>
              </div>
            </div>
            <p className={styles.detailDescription}>{selectedChallenge.description}</p>
            <div className={styles.detailFooter}>
              <div>
                <p className={styles.detailFooterLabel}>Recompensa</p>
                <p className={styles.detailFooterValue}>{selectedChallenge.xp} XP</p>
              </div>
              <button
                className={styles.primaryButton}
                onClick={() => handleSelectChallenge(selectedChallenge.id)}
              >
                Começar desafio
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridBackground}></div>
      </div>
    )
  }

  return (
    <div className={styles.exercisesPage}>
      <div className={styles.contentShell}>
        {renderHeader()}

        <section className={styles.filterSection}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={styles.searchInput}
              placeholder="Buscar protocolo ID, título ou dificuldade..."
            />
          </div>

          <div className={styles.filterRow}>
            <button
              className={`${styles.filterButton} ${selectedDifficulty === 'Todos' ? styles.activeFilter : ''}`}
              onClick={() => setSelectedDifficulty('Todos')}
            >
              Todos
            </button>
            {difficultyOptions.map((difficulty) => (
              <button
                key={difficulty}
                className={`${styles.filterButton} ${selectedDifficulty === difficulty ? styles.activeFilter : ''}`}
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </section>

        <section>
          <div className={styles.listHeading}>
            <div>
              <h2>Protocolos disponíveis</h2>
              <p>{filteredChallenges.length} desafios encontrados</p>
            </div>
          </div>

          {filteredChallenges.length === 0 ? (
            <div className={styles.emptyState}>
              Nenhum desafio encontrado com esses filtros.
            </div>
          ) : (
            <div className={styles.challengeGrid}>
              {filteredChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onSelect={() => handleSelectChallenge(challenge.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
      <div className={styles.gridBackground}></div>
    </div>
  )
}
