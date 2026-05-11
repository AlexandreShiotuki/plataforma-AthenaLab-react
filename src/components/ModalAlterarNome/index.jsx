import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './styles.module.css'

export default function ModalAlterarNome({ userId, nomeAtual, dataUltimaAlteracao, onClose }) {
  const [novoNome, setNovoNome] = useState(nomeAtual)
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' })
  const [loading, setLoading] = useState(false)

  async function handleSalvar(e) {
    e.preventDefault()
    setLoading(true)
    setMensagem({ texto: '', tipo: '' })

    if (dataUltimaAlteracao) {
      const dataUltima = new Date(dataUltimaAlteracao)
      const dataHoje = new Date()
      const diferencaTempo = dataHoje.getTime() - dataUltima.getTime()
      const diferencaDias = diferencaTempo / (1000 * 3600 * 24)

      if (diferencaDias < 10) {
        const diasFaltantes = Math.ceil(10 - diferencaDias)
        setMensagem({ texto: `Aguarde mais ${diasFaltantes} dias para alterar o nome novamente.`, tipo: 'error' })
        setLoading(false)
        return
      }
    }

    const { error } = await supabase
      .from('usuarios')
      .update({ 
        nome: novoNome, 
        ultima_alteracao_nome: new Date().toISOString() 
      })
      .eq('user_id', userId)

    if (error) {
      setMensagem({ texto: 'Erro ao alterar nome: ' + error.message, tipo: 'error' })
    } else {
      setMensagem({ texto: 'Nome atualizado com sucesso!', tipo: 'success' })
      setTimeout(() => {
        onClose()
      }, 2000)
    }
    setLoading(false)
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Alterar Nome</h3>
        
        <form onSubmit={handleSalvar} className={styles.form}>
          <input
            type="text"
            className={styles.input}
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            required
          />
          
          {mensagem.texto && (
            <p className={`${styles.message} ${mensagem.tipo === 'error' ? styles.error : styles.success}`}>
              {mensagem.texto}
            </p>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.buttonCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || novoNome === nomeAtual}
              className={styles.buttonSave}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}