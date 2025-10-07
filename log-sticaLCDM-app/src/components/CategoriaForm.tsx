import React, { useState, useEffect } from 'react'
import { Categoria } from '../pages/Categorias'
import { v4 as uuidv4 } from 'uuid'

export default function CategoriaForm({ initial, onCancel, onSave }: { initial: Categoria | null; onCancel: () => void; onSave: (c: Categoria) => void }) {
  const [name, setName] = useState(initial?.name || '')
  const [color, setColor] = useState(initial?.color || '#d1d5db')
  const [error, setError] = useState('')

  useEffect(() => setError(''), [name, color])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('El nombre es requerido')
      return
    }
    if (name.length > 60) {
      setError('El nombre es muy largo (máx 60)')
      return
    }

    const cat: Categoria = {
      id: initial?.id || uuidv4(),
      name: name.trim(),
      color: color || undefined
    }

    onSave(cat)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initial ? 'Editar categoría' : 'Nueva categoría'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:12}}>
            <label>Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{marginBottom:12,display:'flex',alignItems:'center',gap:12}}>
            <div style={{flex:1}}>
              <label>Color (opcional)</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div style={{width:56,height:40,borderRadius:8,background:color,border:'1px solid #e6eef8'}} />
          </div>
          {error && <div style={{color:'red',marginBottom:8}}>{error}</div>}
          <div className="controls">
            <button type="button" className="btn secondary" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="btn">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
