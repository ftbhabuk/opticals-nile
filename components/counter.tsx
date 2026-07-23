import { useState, useEffect, useRef } from "react"

interface CounterProps {
  to: number
  suffix?: string
  duration?: number
  delay?: number
  className?: string
}

export function Counter({ to, suffix = "", duration = 2000, delay = 0, className = "" }: CounterProps) {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    let timeout: ReturnType<typeof setTimeout>

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3)
    }

    function tick() {
      if (startTime.current === null) startTime.current = performance.now()
      const elapsed = performance.now() - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      setValue(Math.round(eased * to))

      if (progress >= 1) {
        clearInterval(interval)
      }
    }

    timeout = setTimeout(() => {
      startTime.current = null
      interval = setInterval(tick, 16)
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [to, duration, delay])

  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  )
}
