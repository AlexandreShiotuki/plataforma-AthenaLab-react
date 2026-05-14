import { useState, useEffect } from 'react';
import FloatingWindow from '../FloatingWindow';
import styles from './styles.module.css';

export default function OhmCalculator() {
  const [mode, setMode] = useState('V');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  useEffect(() => {
    setVal1('');
    setVal2('');
  }, [mode]);

  const config = {
    V: {
      label1: 'Corrente (I) em Amperes',
      label2: 'Resistência (R) em Ohms',
      resultName: 'Tensão (V)',
      unit: 'Volts (V)',
    },
    I: {
      label1: 'Tensão (V) em Volts',
      label2: 'Resistência (R) em Ohms',
      resultName: 'Corrente (I)',
      unit: 'Amperes (A)',
    },
    R: {
      label1: 'Tensão (V) em Volts',
      label2: 'Corrente (I) em Amperes',
      resultName: 'Resistência (R)',
      unit: 'Ohms (Ω)',
    }
  };

  const currentConfig = config[mode];

  const calculateResult = () => {
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);

    if (isNaN(n1) || isNaN(n2)) return '---';

    if (mode === 'V') {
      return (n1 * n2).toFixed(2);
    } 
    
    if (n2 === 0) return 'Erro';

    return (n1 / n2).toFixed(2);
  };

  return (
    <FloatingWindow id="ohm" title="Lei de Ohm">
      <div className={styles.container}>
        
        <div className={styles.tabGroup}>
          <button 
            className={mode === 'V' ? styles.activeTab : styles.tab} 
            onClick={() => setMode('V')}
          >
            Achar V
          </button>
          <button 
            className={mode === 'I' ? styles.activeTab : styles.tab} 
            onClick={() => setMode('I')}
          >
            Achar I
          </button>
          <button 
            className={mode === 'R' ? styles.activeTab : styles.tab} 
            onClick={() => setMode('R')}
          >
            Achar R
          </button>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>{currentConfig.label1}</label>
          <input 
            type="number" 
            className={styles.input}
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            placeholder="Ex: 12"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>{currentConfig.label2}</label>
          <input 
            type="number" 
            className={styles.input}
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            placeholder="Ex: 2.5"
          />
        </div>

        <div className={styles.resultBox}>
          <span className={styles.resultLabel}>Resultado: {currentConfig.resultName}</span>
          <span className={styles.resultValue}>
            {calculateResult()} {calculateResult() !== '---' && calculateResult() !== 'Erro' ? currentConfig.unit : ''}
          </span>
        </div>

      </div>
    </FloatingWindow>
  );
}