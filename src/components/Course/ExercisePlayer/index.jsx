import { useState } from 'react';
import { useGamification } from '../../context/GamificationContext';
import styles from './styles.module.css';

export default function ExercisePlayer({ questions, onPass, onFail }) {
    const { addXp } = useGamification();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // Proteção caso não cheguem questões
    if (!questions || questions.length === 0) return <div>Carregando exercícios...</div>;

    const currentQuestion = questions[currentQuestionIndex];

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowResult(false);
    };

    const handleOptionClick = (index) => {
        if (isAnswered) return; // Bloqueia clique duplo

        setSelectedOption(index);
        setIsAnswered(true);

        if (index === currentQuestion.correctAnswer) {
            setScore((prevScore) => prevScore + 1);
            addXp(15, `question_${currentQuestion.id}`);
        }
    };

    const handleNext = () => {
        // Se ainda tem perguntas, avança
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // Acabaram as perguntas, mostra resultado
            setShowResult(true);
        }
    };

    // TELA DE RESULTADO
    if (showResult) {
        // Regra: Precisa acertar 2 de 3 (mais da metade)
        const passed = score >= 2;

        return (
            <div className={styles.container}>
                <h2 className={passed ? styles.pass : styles.fail}>
                    {passed ? "Parabéns! 🎉" : "Não foi dessa vez... 😕"}
                </h2>
                
                <p className={styles.resultScore}>
                    Você acertou {score} de {questions.length} questões.
                </p>

                <div className={styles.actionButtons}>
                    {!passed && (
                        <button type="button" onClick={onFail} className={styles.retryButton}>
                            Rever Aula
                        </button>
                    )}
                    
                    {/* Se passou, botão de próxima aula. Se não, botão de tentar dnv */}
                    <button 
                        type="button"
                        className={styles.nextButton}
                        onClick={() => passed ? onPass() : resetQuiz()}
                    >
                        {passed ? "Próxima Aula ➔" : "Tentar Novamente"}
                    </button>
                </div>
            </div>
        );
    }

    // TELA DO QUIZ
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Questão {currentQuestionIndex + 1} de {questions.length}
            </div>

            <div className={styles.questionText}>
                {currentQuestion.question}
            </div>

            <div className={styles.optionsGrid}>
                {currentQuestion.options.map((option, index) => {
                    // Lógica das Cores
                    let btnClass = styles.optionButton;
                    if (isAnswered) {
                        if (index === currentQuestion.correctAnswer) {
                            btnClass = `${styles.optionButton} ${styles.correct}`; // Mostra a certa
                        } else if (index === selectedOption) {
                            btnClass = `${styles.optionButton} ${styles.wrong}`; // Mostra que errou
                        }
                    }

                    return (
                        <button
                            type="button"
                            key={index}
                            className={btnClass}
                            onClick={() => handleOptionClick(index)}
                            disabled={isAnswered}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {/* Só mostra o botão "Próximo" se já tiver respondido */}
            {isAnswered && (
                <button type="button" className={styles.nextButton} onClick={handleNext}>
                    {currentQuestionIndex === questions.length - 1 ? "Ver Resultado" : "Próxima Questão"}
                </button>
            )}
        </div>
    );
}