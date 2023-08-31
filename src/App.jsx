import { Routes, Route } from 'react-router-dom'
import './App.css'
import Articles from "./pages/Articles"
import HomePage from './pages/HomePage'

function App() {

  return (

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:articleId" element={<Articles />} />
    </Routes>

  )
}

export default App
