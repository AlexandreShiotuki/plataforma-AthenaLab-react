import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home/Home' 
import CoursePage from './components/Course/Course Page'
import { GamificationProvider } from './components/context/GamificationContext'
import ExercisesPage from './pages/Exercises'
import PrintPage from './pages/PrintingSession/PrintingSession'
import { supabase } from './lib/supabase'
import Auth from './pages/Auth'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <Auth />
  }

  return (
    <GamificationProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curso/:id" element={<CoursePage />} />
          <Route path="/curso/:courseId/:lessonId" element={<CoursePage />} />
          <Route path="/exercicios" element={<ExercisesPage />} />
          <Route path="/impressoes" element={<PrintPage />} />
        </Routes>
      </BrowserRouter>
    </GamificationProvider>
  )
}

export default App