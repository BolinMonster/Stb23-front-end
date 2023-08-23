import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Help from './pages/Help'
import Stbs from './pages/Stbs'
import Stb from './pages/Stb'
import SearchStb from './pages/SearchStb'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/help" element={<Help />} />
      <Route path="/resume" element={<Stbs />} />
      <Route path="/stb/:id" element={<Stb />} />
      <Route path="/search" element={<SearchStb />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}