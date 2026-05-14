import { useState } from 'react'
import FloatingWindow from '../FloatingWindow'
import styles from './styles.module.css'

export default function ResistorDecoder() {
  const [band1, setBand1] = useState(1)
  const [band2, setBand2] = useState(0)
  const [multiplier, setMultiplier] = useState(2)
  const [tolerance, setTolerance] = useState(5)

  const colors = [
    { name: 'Preto', val: 0, hex: '#000000', text: '#fff' },
    { name: 'Marrom', val: 1, hex: '#8B4513', text: '#fff' },
    { name: 'Vermelho', val: 2, hex: '#FF0000', text: '#fff' },
    { name: 'Laranja', val: 3, hex: '#FF8C00', text: '#000' },
    { name: 'Amarelo', val: 4, hex: '#FFD700', text: '#000' },
    { name: 'Verde', val: 5, hex: '#008000', text: '#fff' },
    { name: 'Azul', val: 6, hex: '#0000FF', text: '#fff' },
    { name: 'Violeta', val: 7, hex: '#8A2BE2', text: '#fff' },
    { name: 'Cinza', val: 8, hex: '#808080', text: '#fff' },
    { name: 'Branco', val: 9, hex: '#FFFFFF', text: '#000' }
  ]

  const multColors = [
    ...colors,
    { name: 'Dourado', val: -1, hex: '#DAA520', text: '#000' },
    { name: 'Prateado', val: -2, hex: '#C0C0C0', text: '#000' }
  ]

  const tolColors = [
    { name: 'Marrom (±1%)', val: 1, hex: '#8B4513', text: '#fff' },
    { name: 'Vermelho (±2%)', val: 2, hex: '#FF0000', text: '#fff' },
    { name: 'Dourado (±5%)', val: 5, hex: '#DAA520', text: '#000' },
    { name: 'Prateado (±10%)', val: 10, hex: '#C0C0C0', text: '#000' }
  ]

  const calculateResistance = () => {
    const baseValue = (band1 * 10) + band2
    let finalValue = baseValue * Math.pow(10, multiplier)
    
    let unit = 'Ω'
    if (finalValue >= 1000000) {
      finalValue = finalValue / 1000000
      unit = 'MΩ'
    } else if (finalValue >= 1000) {
      finalValue = finalValue / 1000
      unit = 'kΩ'
    } else if (finalValue < 1 && finalValue > 0) {
      finalValue = finalValue.toFixed(2)
    }

    return { value: finalValue, unit }
  }

  const result = calculateResistance()

  return (
    <FloatingWindow id="resistor" title="Código de Cores">
      <div className={styles.container}>
        
        <div className={styles.resistorBody}>
          <div className={styles.band} style={{ backgroundColor: colors.find(c => c.val === band1).hex }} />
          <div className={styles.band} style={{ backgroundColor: colors.find(c => c.val === band2).hex }} />
          <div className={styles.band} style={{ backgroundColor: multColors.find(c => c.val === multiplier).hex }} />
          <div className={styles.band} style={{ backgroundColor: tolColors.find(c => c.val === tolerance).hex, marginLeft: '10px' }} />
        </div>

        <div className={styles.resultBox}>
          <span className={styles.resultValue}>{result.value} {result.unit}</span>
          <span className={styles.resultTolerance}>Tolerância: ±{tolerance}%</span>
        </div>

        <div className={styles.selectors}>
          <div className={styles.selectGroup}>
            <span className={styles.label}>1ª Faixa</span>
            <select 
              className={styles.select} 
              value={band1} 
              onChange={(e) => setBand1(Number(e.target.value))}
              style={{ 
                backgroundColor: colors.find(c => c.val === band1).hex,
                color: colors.find(c => c.val === band1).text
              }}
            >
              {colors.map(c => <option key={c.val} value={c.val}>{c.name}</option>)}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <span className={styles.label}>2ª Faixa</span>
            <select 
              className={styles.select} 
              value={band2} 
              onChange={(e) => setBand2(Number(e.target.value))}
              style={{ 
                backgroundColor: colors.find(c => c.val === band2).hex,
                color: colors.find(c => c.val === band2).text
              }}
            >
              {colors.map(c => <option key={c.val} value={c.val}>{c.name}</option>)}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <span className={styles.label}>Multiplicador</span>
            <select 
              className={styles.select} 
              value={multiplier} 
              onChange={(e) => setMultiplier(Number(e.target.value))}
              style={{ 
                backgroundColor: multColors.find(c => c.val === multiplier).hex,
                color: multColors.find(c => c.val === multiplier).text
              }}
            >
              {multColors.map(c => <option key={c.val} value={c.val}>{c.name}</option>)}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <span className={styles.label}>Tolerância</span>
            <select 
              className={styles.select} 
              value={tolerance} 
              onChange={(e) => setTolerance(Number(e.target.value))}
              style={{ 
                backgroundColor: tolColors.find(c => c.val === tolerance).hex,
                color: tolColors.find(c => c.val === tolerance).text
              }}
            >
              {tolColors.map(c => <option key={c.val} value={c.val}>{c.name}</option>)}
            </select>
          </div>
        </div>

      </div>
    </FloatingWindow>
  )
}