import React from 'react'
import { Categoria } from '../pages/Categorias'

export default function CategoriaCard({ categoria, onEdit, onDelete }: { categoria: Categoria; onEdit: () => void; onDelete: () => void }) {
  const color = categoria.color || '#d1d5db'
  return (
    <div className="categoria-card">
      <div className="color-band" style={{background:color}} />
      <div className="info">
        <strong>{categoria.name}</strong>
      </div>
      <div className="actions">
        <button className="btn secondary" onClick={onEdit}>Editar</button>
        <button className="btn" onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  )
}
