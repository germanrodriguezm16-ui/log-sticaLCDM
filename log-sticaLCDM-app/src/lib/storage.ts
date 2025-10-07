import { Categoria } from '../pages/Categorias'

const KEY = 'ls:categorias'

export function loadCategorias(): Categoria[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw) as Categoria[]
  } catch (e) {
    console.error('loadCategorias error', e)
    return []
  }
}

export function saveCategorias(cats: Categoria[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cats))
  } catch (e) {
    console.error('saveCategorias error', e)
  }
}
