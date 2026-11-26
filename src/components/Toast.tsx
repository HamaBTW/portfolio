import { useEffect, useState } from 'react'
import './Toast.css'

const EVT = 'toast:show'
export const toast = (message: string) => window.dispatchEvent(new CustomEvent(EVT, { detail: message }))

/**
 * Minimal Sonner-style toast. Uses a CSS transition (not keyframes) so repeated
 * triggers retarget smoothly instead of restarting.
 */
export function Toaster() {
  const [msg, setMsg] = useState('')
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let t = 0
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail)
      setShown(true)
      window.clearTimeout(t)
      t = window.setTimeout(() => setShown(false), 2200)
    }
    window.addEventListener(EVT, on)
    return () => {
      window.removeEventListener(EVT, on)
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div className="toast" data-shown={shown} role="status" aria-live="polite">
      <span className="toast__dot" aria-hidden />
      {msg}
    </div>
  )
}
