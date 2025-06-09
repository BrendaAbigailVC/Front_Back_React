import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CancionesPage from './pages/CancionesPage'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NuevaCancionPage from './pages/NuevaCancionPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CancionesPage />} />
        <Route path="/nuevaCancion" element={<NuevaCancionPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
