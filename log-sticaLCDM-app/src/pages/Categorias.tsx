import React, { useState, useEffect } from 'react'
import CategoriaCard from '../components/CategoriaCard'
import CategoriaForm from '../components/CategoriaForm'
import { loadCategorias, saveCategorias, importLocalToServerProgress } from '../lib/storage'

export type Categoria = {
  id: string
  name: string
  color?: string
}

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [editing, setEditing] = useState<Categoria | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const data = await loadCategorias()
      if (mounted) setCategorias(data)
    })()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    ;(async () => { await saveCategorias(categorias) })()
  }, [categorias])

  function handleCreate() {
    setEditing(null)
    setShowForm(true)
  }

  function handleSave(c: Categoria) {
    setCategorias((prev) => {
      const exists = prev.find((p) => p.id === c.id)
      if (exists) {
        return prev.map((p) => (p.id === c.id ? c : p))
      }
      return [c, ...prev]
    })
    setShowForm(false)
  }

  function handleEdit(c: Categoria) {
    setEditing(c)
    setShowForm(true)
  }

  function handleDelete(id: string) {
    if (!confirm('¿Eliminar categoría? Esta acción no se puede deshacer.')) return
    setCategorias((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="page-head">
        <h2>Categorías de socios</h2>
        <div>
          <button className="btn large" onClick={handleCreate} aria-label="Crear nueva categoría">Nueva categoría</button>
          <button className="btn secondary" style={{marginLeft:12}} onClick={async () => {
            const cb = (m: string) => alert(m)
            const fn = importLocalToServerProgress(cb)
            await fn()
          }}>Importar local → servidor</button>
        </div>
      </div>

      <div className="grid-categorias" role="list" aria-label="Listado de categorías" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:18}}>
        {categorias.length === 0 && <div>No hay categorías aún. Crea la primera.</div>}
        {categorias.map((c) => (
          <div role="listitem" key={c.id}>
            <CategoriaCard categoria={c} onEdit={() => handleEdit(c)} onDelete={() => handleDelete(c.id)} />
          </div>
        ))}
      </div>

      {showForm && (
        <CategoriaForm initial={editing} onCancel={() => setShowForm(false)} onSave={handleSave} />
      )}
    </div>
  )
}
