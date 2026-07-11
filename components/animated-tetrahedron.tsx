import { useEffect, useRef } from "react"

interface AnimatedLensFocusProps {
  activeStep?: number
}

export function AnimatedLensFocus({ activeStep = 0 }: AnimatedLensFocusProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const chars = " .:-=+*#%@"
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const rayCount = 11 + activeStep
    const focalX = 0.48 + activeStep * 0.035

    const rayPath = (yOffset: number, t: number) => {
      if (t < 0.5) {
        const localT = t / 0.5
        return { x: -1 + localT, y: yOffset }
      }

      const localT = (t - 0.5) / 0.5
      const targetX = focalX + (1 - focalX) * Math.max(0, (localT - 0.4) / 0.6)
      const x = targetX * localT
      const y = yOffset * Math.max(0, 1 - localT / 0.4)
      return { x, y }
    }

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const scale = Math.min(rect.width, rect.height) * 0.42

      ctx.font = "16px Courier Prime, monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const cycle = (time % 3.2) / 3.2
      const wavefront = cycle < 0.75 ? cycle / 0.75 : 1
      const flashBoost = cycle > 0.72 && cycle < 0.85 ? 1 : 0

      for (let i = 0; i < rayCount; i++) {
        const yOffset = (i / (rayCount - 1) - 0.5) * (0.74 + activeStep * 0.05)

        for (let s = 0; s <= 40; s++) {
          const t = s / 40
          const { x, y } = rayPath(yOffset, t)
          const brightness = Math.max(0, 1 - Math.abs(t - wavefront) * 3.5)
          if (brightness < 0.03) continue

          const charIndex = Math.floor(brightness * (chars.length - 1))
          const char = chars[Math.min(charIndex, chars.length - 1)]
          if (char === " ") continue

          ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.85, 0.1 + brightness * 0.7)})`
          ctx.fillText(char, centerX + x * scale, centerY - y * scale)
        }
      }

      ctx.strokeStyle = `rgba(0, 0, 0, ${0.23 + flashBoost * 0.3})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, scale * 0.08, scale * 0.55, 0, 0, Math.PI * 2)
      ctx.stroke()

      if (flashBoost > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.5 * flashBoost})`
        ctx.beginPath()
        ctx.arc(centerX + focalX * scale, centerY, 2.5, 0, Math.PI * 2)
        ctx.fill()
      }

      time += 0.012
      frameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [activeStep])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  )
}
