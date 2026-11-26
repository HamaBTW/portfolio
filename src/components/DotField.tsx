import { useEffect, useRef } from 'react'

/**
 * Interactive dot grid behind the hero. Dots near the pointer are pushed away and
 * warm up toward the signal color. The pointer itself is smoothed (lerp) so the field
 * has momentum instead of snapping. Pauses when off-screen / tab hidden; static under
 * reduced motion or coarse pointers.
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const interactive = !reduce && fine

    const GAP = 26
    const RADIUS = 150
    const PUSH = 18
    const base = [58, 57, 52] // --line-strong
    const hot = [255, 90, 31] // --signal

    let w = 0
    let h = 0
    let dpr = 1
    let dots: { x: number; y: number; ox: number; oy: number }[] = []
    const target = { x: -9999, y: -9999 }
    const pointer = { x: -9999, y: -9999 }
    let raf = 0
    let visible = true
    let running = false

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const cols = Math.ceil(w / GAP)
      const rows = Math.ceil(h / GAP)
      const offX = (w - (cols - 1) * GAP) / 2
      const offY = (h - (rows - 1) * GAP) / 2
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < cols; x++) dots.push({ x: offX + x * GAP, y: offY + y * GAP, ox: 0, oy: 0 })
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      // Soft vignette fade toward the bottom so the field doesn't fight the copy.
      for (const d of dots) {
        const dx = d.x - pointer.x
        const dy = d.y - pointer.y
        const dist = Math.hypot(dx, dy)
        let tx = 0
        let ty = 0
        let heat = 0
        if (dist < RADIUS) {
          const f = 1 - dist / RADIUS
          const ease = f * f
          tx = (dx / (dist || 1)) * PUSH * ease
          ty = (dy / (dist || 1)) * PUSH * ease
          heat = ease
        }
        d.ox += (tx - d.ox) * 0.14
        d.oy += (ty - d.oy) * 0.14
        const fade = Math.max(0, 1 - d.y / h) * 0.85 + 0.15
        const r = base[0] + (hot[0] - base[0]) * heat
        const g = base[1] + (hot[1] - base[1]) * heat
        const b = base[2] + (hot[2] - base[2]) * heat
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${Math.min(1, fade + heat)})`
        const size = 1.1 + heat * 1.4
        ctx.fillRect(d.x + d.ox - size / 2, d.y + d.oy - size / 2, size, size)
      }
    }

    const tick = () => {
      pointer.x += (target.x - pointer.x) * 0.12
      pointer.y += (target.y - pointer.y) * 0.12
      draw()
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || !interactive || !visible || document.hidden) return
      running = true
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      target.x = e.clientX - r.left
      target.y = e.clientY - r.top
      if (pointer.x < -1000) {
        pointer.x = target.x
        pointer.y = target.y
      }
    }
    const onLeave = () => {
      target.x = -9999
      target.y = -9999
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const onVis = () => (document.hidden ? stop() : start())

    resize()
    if (interactive) {
      const host = canvas.parentElement ?? window
      host.addEventListener('pointermove', onMove as EventListener)
      host.addEventListener('pointerleave', onLeave)
      document.addEventListener('visibilitychange', onVis)
      start()
    }

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      const host = canvas.parentElement ?? window
      host.removeEventListener('pointermove', onMove as EventListener)
      host.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="dotfield" aria-hidden />
}
