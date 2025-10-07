import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { importLocalToServerProgress } from '../lib/storage'

export default function Diagnostico() {
  const [status, setStatus] = useState<string | null>(null)
  const [testRows, setTestRows] = useState<any[]>([])

  function envStatus() {
    const url = (import.meta as any).env.VITE_SUPABASE_URL
    const key = (import.meta as any).env.VITE_SUPABASE_ANON_KEY
    return { url: !!url, key: !!key, urlVal: url || null }
  }

  async function runTestQuery() {
    setStatus('Probando conexión...')
    if (!supabase) {
      setStatus('Cliente Supabase no configurado (faltan variables de entorno)')
      return
    }
    const { data, error } = await supabase.from('categorias').select('*').limit(5)
    if (error) {
      setStatus(`Error en consulta: ${error.message}`)
      setTestRows([])
      return
    }
    setStatus('Consulta OK')
    setTestRows(data as any[])
  }

  function exportDiagnostico() {
    const diag: any = {
      env: envStatus(),
      localStorageSample: null
    }
    try {
      diag.localStorageSample = JSON.parse(localStorage.getItem('ls:categorias') || 'null')
    } catch (e) {
      diag.localStorageSample = `Error parseando localStorage: ${String(e)}`
    }
    const blob = new Blob([JSON.stringify(diag, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'diagnostico.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2>Panel de diagnóstico</h2>
      <p>Estado de variables de entorno para Supabase:</p>
      <pre>{JSON.stringify(envStatus(), null, 2)}</pre>

      <div style={{marginTop:12}}>
        <button className="btn" onClick={runTestQuery}>Probar consulta a tabla `categorias`</button>
        <button className="btn secondary" style={{marginLeft:12}} onClick={exportDiagnostico}>Exportar diagnóstico (JSON)</button>
        <button className="btn" style={{marginLeft:12}} onClick={async () => {
          const cb = (m: string) => setStatus(m)
          const fn = importLocalToServerProgress(cb)
          await fn()
        }}>Sincronizar local → servidor</button>
      </div>

      <div style={{marginTop:16}}>
        <strong>Estado:</strong>
        <div>{status}</div>
      </div>

      <div style={{marginTop:12}}>
        <h3>Filas devueltas (máx 5)</h3>
        <pre>{JSON.stringify(testRows, null, 2)}</pre>
      </div>
    </div>
  )
}
