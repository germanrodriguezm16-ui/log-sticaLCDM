import { Categoria } from '../pages/Categorias'
import { supabase } from './supabase'

const KEY = 'ls:categorias'

export async function loadCategorias(): Promise<Categoria[]> {
  if (supabase) {
    const { data, error } = await supabase.from('categorias').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('supabase load error', error)
      return []
    }
    return (data as any[]).map((d) => ({ id: d.id, name: d.name, color: d.color }))
  }

  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as Categoria[]
  } catch (e) {
    console.error('loadCategorias error', e)
    return []
  }
}

export async function saveCategorias(cats: Categoria[]) {
  if (supabase) {
    // upsert each category (simple approach)
    for (const c of cats) {
      const { error } = await supabase.from('categorias').upsert({ id: c.id, name: c.name, color: c.color })
      if (error) console.error('supabase save error', error)
    }
    return
  }

  try {
    localStorage.setItem(KEY, JSON.stringify(cats))
  } catch (e) {
    console.error('saveCategorias error', e)
  }
}

export function importLocalToServerProgress(callback: (msg: string) => void) {
  return async function () {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    const items = JSON.parse(raw) as Categoria[]
    if (!supabase) return
    for (const it of items) {
      callback(`Importando ${it.name}`)
      const { error } = await supabase.from('categorias').upsert({ id: it.id, name: it.name, color: it.color })
      if (error) callback(`Error importando ${it.name}: ${error.message}`)
    }
    callback('Import complete')
  }
}
