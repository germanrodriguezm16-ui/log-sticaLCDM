import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/pedidos', label: 'Pedidos' },
  { to: '/seguimiento', label: 'Seguimiento' },
  { to: '/devoluciones', label: 'Devoluciones' },
  { to: '/inventario', label: 'Inventario' },
  { to: '/transacciones', label: 'Transacciones' },
  { to: '/socios', label: 'Socios' }
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Log-sticaLCDM</div>
      <nav>
        <ul>
          {items.map((it) => (
            <li key={it.to}>
              <NavLink to={it.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {it.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
