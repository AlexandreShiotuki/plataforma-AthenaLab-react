import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home/Home' 
import CoursePage from './components/Course/Course Page'
import { GamificationProvider } from './components/context/GamificationContext'
import ExercisesPage from './pages/Exercises'
import PrintPage from './pages/PrintingSession/PrintingSession'

function App() {
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