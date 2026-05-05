import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import styles from './styles.module.css'

export default function Auth() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' })

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMensagem({ texto: '', tipo: '' })

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })
      if (error) setMensagem({ texto: 'Erro: ' + error.message, tipo: 'error' })
      else setMensagem({ texto: 'Login realizado com sucesso!', tipo: 'success' })
    } else {
      if (!nome.trim() || !photoUrl.trim()) {
        setMensagem({ texto: 'Informe seu nome e a URL da foto de perfil.', tipo: 'error' })
        setLoading(false)
        return
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
      })

      if (authError) {
        setMensagem({ texto: 'Erro: ' + authError.message, tipo: 'error' })
      } else if (authData.user) {
        const { error: dbError } = await supabase.from('usuarios').insert([
          {
            user_id: authData.user.id,
            nome,
            avatar_url: photoUrl,
            nivel: 1,
            xp: 0,
            completed_activities: [],
            watched_lessons: []
          }
        ])

        if (dbError) {
          setMensagem({ texto: 'Erro ao criar perfil: ' + dbError.message, tipo: 'error' })
        } else {
          setMensagem({ texto: 'Conta criada! Você já pode entrar.', tipo: 'success' })
          setIsLogin(true)
        }
      }
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{isLogin ? 'Entrar na Athena Lab' : 'Criar Conta'}</h2>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Seu nome completo"
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="URL da sua foto de perfil"
              className={styles.input}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Seu e-mail escolar"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          className={styles.input}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className={styles.buttonPrimary}
        >
          {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
        </button>
      </form>

      <div className={styles.divider}>ou</div>

      <button 
        type="button"
        onClick={() => alert('Em breve!')}
        className={styles.buttonGoogle}
      >
        <span>G</span> Entrar com Google
      </button>

      {mensagem.texto && (
        <p className={`${styles.message} ${mensagem.tipo === 'error' ? styles.error : styles.success}`}>
          {mensagem.texto}
        </p>
      )}

      <button 
        onClick={() => {
          setIsLogin(!isLogin)
          setMensagem({ texto: '', tipo: '' })
        }}
        className={styles.toggleButton}
      >
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre aqui'}
      </button>
    </div>
  )
}