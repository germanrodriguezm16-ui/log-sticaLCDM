import React from 'react'
import { Categoria } from '../pages/Categorias'

export default function CategoriaCard({ categoria, onEdit, onDelete }: { categoria: Categoria; onEdit: () => void; onDelete: () => void }) {
  const color = categoria.color || '#d1d5db'
  return (
    <div className="categoria-card">
      <div className="color-band" style={{ background: color }} />
      <div className="info">
        <div className="title"><strong title={categoria.name}>{categoria.name}</strong></div>
      </div>
      <div className="actions" role="group" aria-label={`Acciones para ${categoria.name}`}>
        <button className="icon-btn" onClick={onEdit} aria-label={`Editar ${categoria.name}`} title="Editar">
          <span aria-hidden>✏️</span>
        </button>
        <button className="icon-btn" onClick={onDelete} aria-label={`Eliminar ${categoria.name}`} title="Eliminar">
          <span aria-hidden>🗑️</span>
        </button>
      </div>
    </div>
  )
}
