import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Categorias from './pages/Categorias'
import Diagnostico from './pages/Diagnostico'
import ConnectionStatus from './components/ConnectionStatus'

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <div style={{display:'flex',justifyContent:'flex-end',padding:12}}><ConnectionStatus /></div>
        <Routes>
          <Route path="/" element={<h2>Bienvenido a Log-sticaLCDM</h2>} />
          <Route path="/pedidos" element={<h2>Pedidos</h2>} />
          <Route path="/seguimiento" element={<h2>Seguimiento</h2>} />
          <Route path="/devoluciones" element={<h2>Devoluciones</h2>} />
          <Route path="/inventario" element={<h2>Inventario</h2>} />
          <Route path="/transacciones" element={<h2>Transacciones</h2>} />
          <Route path="/socios" element={<Categorias />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
        </Routes>
      </main>
    </div>
  )
}
