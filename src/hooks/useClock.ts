import { useEffect, useState } from 'react'

const fmt = (tz: string) =>
  new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz })

export function useClock(timeZone: string) {
  const [time, setTime] = useState(() => fmt(timeZone).format(new Date()))
  useEffect(() => {
    const f = fmt(timeZone)
    const id = window.setInterval(() => setTime(f.format(new Date())), 15_000)
    return () => window.clearInterval(id)
  }, [timeZone])
  return time
}
