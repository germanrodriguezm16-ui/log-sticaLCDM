import React, { useState, useEffect } from 'react'
import { Categoria } from '../pages/Categorias'
import { v4 as uuidv4 } from 'uuid'

export default function CategoriaForm({ initial, onCancel, onSave }: { initial: Categoria | null; onCancel: () => void; onSave: (c: Categoria) => void }) {
  const [name, setName] = useState(initial?.name || '')
  const [color, setColor] = useState(initial?.color || '#d1d5db')
  const [error, setError] = useState('')

  function normalizeColor(input: string | undefined) {
    if (!input) return undefined
    let c = input.trim()
    if (c.startsWith('#')) c = c.slice(1)
    if (/^[0-9a-fA-F]{3}$/.test(c)) {
      // expand shorthand: e.g. 'f0a' -> 'ff00aa'
      c = c.split('').map(ch => ch + ch).join('')
    }
    if (/^[0-9a-fA-F]{6}$/.test(c)) return '#' + c.toLowerCase()
    return undefined
  }

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

    const normalized = normalizeColor(color)
    const cat: Categoria = {
      id: initial?.id || uuidv4(),
      name: name.trim(),
      color: normalized
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
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
              <div style={{width:56,height:40,borderRadius:8,background:normalizeColor(color) || '#fff',border:'1px solid #e6eef8'}} aria-hidden />
              <div style={{fontSize:12,color:'#334155'}}>{normalizeColor(color) || '—'}</div>
            </div>
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
