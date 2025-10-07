import React from 'react'
import { Categoria } from '../pages/Categorias'

export default function CategoriaCard({ categoria, onEdit, onDelete }: { categoria: Categoria; onEdit: () => void; onDelete: () => void }) {
  let color = categoria.color || '#d1d5db'
  // normalize simple hex like 'ff0000' -> '#ff0000'
  if (color && typeof color === 'string') {
    color = color.trim()
    if (/^[0-9a-fA-F]{3}$/.test(color)) color = '#' + color
    else if (/^[0-9a-fA-F]{6}$/.test(color)) color = '#' + color
  }
  const valid = !!color
  if (!valid) console.warn('CategoriaCard: invalid color for category', { id: categoria.id, name: categoria.name, color: categoria.color })
  return (
    <div className="categoria-card" data-color-present={valid ? '1' : '0'}>
      <div className="color-band" style={{ background: color }} />
      <div className="info">
        <div className="title"><strong title={categoria.name}>{categoria.name}</strong></div>
      </div>
      <div className="swatch-preview">
        <div className="color-swatch" style={{ background: color }} aria-hidden />
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
