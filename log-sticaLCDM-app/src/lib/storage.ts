import { Categoria } from '../pages/Categorias'
import { supabase } from './supabase'

const KEY = 'ls:categorias'

function normalizeColor(orig?: string | null) {
  if (!orig) return undefined
  let c = String(orig).trim()
  // strip surrounding quotes
  c = c.replace(/^['"]|['"]$/g, '')
  // short hex like 'f00' -> 'ff0000'
  if (/^[0-9a-fA-F]{3}$/.test(c)) c = c.split('').map(ch => ch + ch).join('')
  if (/^[0-9a-fA-F]{6}$/.test(c)) return '#' + c.toLowerCase()
  if (/^#[0-9a-fA-F]{6}$/.test(c)) return c.toLowerCase()
  return undefined
}

export async function loadCategorias(): Promise<Categoria[]> {
  if (supabase) {
    const { data, error } = await supabase.from('categorias').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('supabase load error', error)
      return []
    }
    return (data as any[]).map((d) => ({ id: d.id, name: d.name, color: normalizeColor(d.color) }))
  }

  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const arr = JSON.parse(raw) as Categoria[]
    return arr.map(a => ({ ...a, color: normalizeColor(a.color) }))
  } catch (e) {
    console.error('loadCategorias error', e)
    return []
  }
}

export async function saveCategorias(cats: Categoria[]) {
  if (supabase) {
    // upsert each category (simple approach)
    for (const c of cats) {
      const { error } = await supabase.from('categorias').upsert({ id: c.id, name: c.name, color: normalizeColor(c.color) })
      if (error) console.error('supabase save error', error)
    }
    return
  }

  try {
    const normalized = cats.map(c => ({ ...c, color: normalizeColor(c.color) }))
    localStorage.setItem(KEY, JSON.stringify(normalized))
  } catch (e) {
    console.error('saveCategorias error', e)
  }
}

export function importLocalToServerProgress(callback: (msg: string) => void) {
  return async function () {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    const items = (JSON.parse(raw) as Categoria[]).map(i => ({ ...i, color: normalizeColor(i.color) }))
    if (!supabase) return
    for (const it of items) {
      callback(`Importando ${it.name}`)
      const { error } = await supabase.from('categorias').upsert({ id: it.id, name: it.name, color: normalizeColor(it.color) })
      if (error) callback(`Error importando ${it.name}: ${error.message}`)
    }
    callback('Import complete')
  }
}
