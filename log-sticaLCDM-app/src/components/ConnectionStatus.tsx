import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ConnectionStatus() {
  const [status, setStatus] = useState<'unknown'|'ok'|'no-client'|'error'>('unknown')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!supabase) {
        if (mounted) setStatus('no-client')
        return
      }
      try {
        const { data, error } = await supabase.from('categorias').select('id').limit(1)
        if (error) {
          if (mounted) { setStatus('error'); setMessage(error.message) }
          return
        }
        if (mounted) setStatus('ok')
      } catch (e: any) {
        if (mounted) { setStatus('error'); setMessage(String(e)) }
      }
    })()
    return () => { mounted = false }
  }, [])

  if (status === 'unknown') return <div style={{fontSize:12,color:'#64748b'}}>Comprobando conexión...</div>
  if (status === 'no-client') return <div style={{fontSize:12,color:'#ef4444'}}>Supabase no configurado</div>
  if (status === 'error') return <div style={{fontSize:12,color:'#f59e0b'}}>Error: {message}</div>
  return <div style={{fontSize:12,color:'#10b981'}}>Conectado a Supabase</div>
}
