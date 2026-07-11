import { useEffect, useRef } from "react"

interface AnimatedLensFocusProps {
  activeStep?: number
  /** Increments when a new step becomes active — resets the ray cycle */
  cycleId?: number
  /** One full sweep duration, matched to journey dwell (ms) */
  cycleMs?: number
  /** Card copy visibility — animation eases with content crossfade */
  contentVisible?: boolean
}

/** Soft midtone ramp under frosted card */
const CHARS = " ·:-=+*#@"

/** Warm ink — reads as black on cream, avoids cold pure RGB(0,0,0) */
const INK = { r: 22, g: 18, b: 14 }
/** Soft amber only at focus — a hint of light, not a rainbow */
const WARM = { r: 48, g: 36, b: 22 }

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeInOut = (t: number) => t * t * (3 - 2 * t)
const easeOut = (t: number) => 1 - (1 - t) * (1 - t)

const ink = (a: number, warm = 0) => {
  const r = Math.round(lerp(INK.r, WARM.r, warm))
  const g = Math.round(lerp(INK.g, WARM.g, warm))
  const b = Math.round(lerp(INK.b, WARM.b, warm))
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

/**
 * Optical layout (normalized x, origin at diagram center):
 *   incident parallel rays  →  optical plane (bend)  →  focus  →  soft post
 *
 * No floating lens ellipse — bend is defined only by ray geometry so
 * "where rays come together" always matches the physics. Perfect Fit
 * adds a brief focus bloom at the true focus point.
 */
export function AnimatedLensFocus({
  activeStep = 0,
  cycleId = 0,
  cycleMs = 4600,
  contentVisible = true,
}: AnimatedLensFocusProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const stepTargetRef = useRef(activeStep)
  const stepSmoothRef = useRef(activeStep)
  const cycleIdRef = useRef(cycleId)
  const cycleStartRef = useRef(0)
  const cycleMsRef = useRef(cycleMs)
  const contentVisibleRef = useRef(contentVisible)
  const contentAlphaRef = useRef(contentVisible ? 1 : 0)

  useEffect(() => {
    stepTargetRef.current = activeStep
  }, [activeStep])

  useEffect(() => {
    cycleMsRef.current = cycleMs
  }, [cycleMs])

  useEffect(() => {
    contentVisibleRef.current = contentVisible
  }, [contentVisible])

  // Hard reset phase when journey advances (or mounts)
  useEffect(() => {
    cycleIdRef.current = cycleId
    cycleStartRef.current = performance.now()
  }, [cycleId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let running = true
    let lastTs = performance.now()
    if (cycleStartRef.current === 0) {
      cycleStartRef.current = lastTs
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    /**
     * Geometry driven by x, not arbitrary t-warp:
     * parallel until planeX, then converge to focusX on axis.
     * focusQuality: 0 soft / incomplete converge · 1 crisp point.
     */
    const sampleRay = (
      y0: number,
      t: number,
      planeX: number,
      focusX: number,
      xStart: number,
      xEnd: number,
      focusQuality: number
    ) => {
      // Map t so ~42% of the path is pre-plane (reads as long parallel beam)
      const planeT = 0.42
      const focusT = 0.72
      let x: number
      if (t <= planeT) {
        x = lerp(xStart, planeX, t / planeT)
      } else if (t <= focusT) {
        x = lerp(planeX, focusX, (t - planeT) / (focusT - planeT))
      } else {
        x = lerp(focusX, xEnd, (t - focusT) / (1 - focusT))
      }

      const converge = lerp(0.48, 1, focusQuality)

      let y: number
      if (x <= planeX) {
        // Strictly parallel incident field
        y = y0
      } else if (x <= focusX) {
        const u = easeInOut((x - planeX) / Math.max(0.001, focusX - planeX))
        // Soft steps never fully collapse; crisp hits the axis
        y = y0 * (1 - u * converge)
        y += y0 * (1 - focusQuality) * 0.1 * (1 - u)
      } else {
        const u = easeOut((x - focusX) / Math.max(0.001, xEnd - focusX))
        const residual = y0 * (1 - converge) * 0.4
        const diverge = y0 * lerp(0.22, 0.04, focusQuality) * u
        y = residual + diverge
      }

      return { x, y, planeT, focusT }
    }

    const render = (ts: number) => {
      if (!running) return
      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      ctx.clearRect(0, 0, w, h)

      // Smooth quality morph between steps (not the cycle clock)
      stepSmoothRef.current = lerp(stepSmoothRef.current, stepTargetRef.current, 1 - Math.pow(0.001, dt))
      const step = stepSmoothRef.current
      const focusQuality = clamp(step / 3, 0, 1)

      // Content crossfade alpha — tracks card copy
      const contentTarget = contentVisibleRef.current ? 1 : 0
      const contentSpeed = contentVisibleRef.current ? 3.2 : 4.5
      contentAlphaRef.current = lerp(
        contentAlphaRef.current,
        contentTarget,
        1 - Math.exp(-contentSpeed * dt)
      )
      const contentA = contentAlphaRef.current

      // Phase-locked cycle from journey dwell
      const elapsed = ts - cycleStartRef.current
      const cMs = Math.max(1200, cycleMsRef.current)
      // Slight head start so rays begin as title fades in
      const phase = clamp(elapsed / cMs, 0, 1)

      // Timeline within one dwell:
      // 0–8%   intro fade
      // 8–68%  wavefront travels (hits plane ~ mid, focus ~ 72% path)
      // 68–84% focus dwell / bloom
      // 84–100% soft settle (card still visible until dwell ends)
      let wavefront: number
      let focusGlow = 0
      let cycleFade = 1

      if (phase < 0.06) {
        wavefront = 0
        cycleFade = easeOut(phase / 0.06)
      } else if (phase < 0.68) {
        const u = (phase - 0.06) / 0.62
        wavefront = easeInOut(u)
        cycleFade = 1
      } else if (phase < 0.84) {
        wavefront = 1
        const p = (phase - 0.68) / 0.16
        focusGlow = Math.sin(p * Math.PI) * lerp(0.2, 0.95, focusQuality)
        cycleFade = 1
      } else {
        wavefront = 1
        const p = (phase - 0.84) / 0.16
        focusGlow = (1 - easeOut(p)) * 0.18 * focusQuality
        cycleFade = lerp(1, 0.55, easeOut(p))
      }

      if (prefersReduced) {
        wavefront = 0.85
        focusGlow = 0.15 * focusQuality
        cycleFade = 0.75
      }

      const globalA = cycleFade * contentA

      // Optical constants — fixed plane; focus distance tightens with quality
      const planeX = -0.02
      const focusX = lerp(0.38, 0.52, focusQuality)
      const xStart = -1.05
      const xEnd = 0.95
      const beamHalf = lerp(0.68, 0.52, focusQuality)
      const rayCount = Math.round(lerp(7, 11, focusQuality))
      const samples = Math.round(lerp(38, 52, focusQuality))
      // Wider trail early (soft), tighter when focused
      const trailWidth = lerp(0.26, 0.11, focusQuality)

      // Match original composition: centered in canvas (parent handles md:translate-x)
      const breath = Math.sin(ts * 0.0011) * 0.5 + 0.5
      const scale = Math.min(w, h) * (0.42 + breath * 0.006)
      const originX = w * 0.5
      const originY = h * 0.5

      const fontSize = Math.max(11, Math.min(14, scale * 0.04))
      ctx.font = `${fontSize}px "Courier Prime", monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // ---- Rays ----
      for (let i = 0; i < rayCount; i++) {
        const u = rayCount <= 1 ? 0.5 : i / (rayCount - 1)
        const y0 = (u - 0.5) * 2 * beamHalf
        // Outer rays slightly delayed — soft envelope
        const stagger = Math.abs(u - 0.5) * 0.045

        for (let s = 0; s <= samples; s++) {
          const t = s / samples
          const { x, y, planeT, focusT } = sampleRay(
            y0,
            t,
            planeX,
            focusX,
            xStart,
            xEnd,
            focusQuality
          )

          const dist = t - (wavefront - stagger)
          let brightness =
            dist <= 0
              ? Math.exp(dist / trailWidth)
              : Math.exp(-dist / (trailWidth * 0.28))

          // Emphasize plane crossing + focus without drawing a lens body
          const nearPlane = Math.exp(-(((t - planeT) / 0.055) ** 2)) * 0.38
          const nearFocus =
            Math.exp(-(((t - focusT) / 0.07) ** 2)) * lerp(0.14, 0.5, focusQuality)

          // Pre-plane: slightly quieter so parallel field is airy
          const prePlane = t < planeT ? 0.92 : 1

          brightness = clamp(
            brightness * (0.82 + nearPlane + nearFocus) * prePlane * globalA,
            0,
            1
          )
          if (brightness < 0.035) continue

          const charIndex = Math.min(
            CHARS.length - 1,
            Math.floor(brightness * (CHARS.length - 1))
          )
          const char = CHARS[charIndex]
          if (char === " ") continue

          // Brighter under frost; tiny warm lift near focus only
          const alpha = Math.min(
            0.78,
            0.08 + brightness * lerp(0.48, 0.68, focusQuality)
          )
          const warm = nearFocus * 0.35 * focusQuality
          ctx.fillStyle = ink(alpha, warm)
          ctx.fillText(char, originX + x * scale, originY - y * scale)
        }
      }

      // Soft optical-plane caustic: only while wavefront crosses it — not a lens outline
      const planeScreenX = originX + planeX * scale
      const planePhase = 1 - Math.min(1, Math.abs(wavefront - 0.42) / 0.14)
      if (planePhase > 0.05 && globalA > 0.2) {
        const causticH = beamHalf * scale * lerp(1.05, 0.9, focusQuality)
        const ticks = 9
        for (let k = 0; k < ticks; k++) {
          const v = (k / (ticks - 1) - 0.5) * 2
          const py = originY - v * causticH
          const fall = 1 - Math.abs(v) * 0.55
          const a = 0.11 * planePhase * fall * globalA * lerp(0.55, 1, focusQuality)
          ctx.fillStyle = ink(a, 0.08)
          ctx.fillText(Math.abs(v) < 0.15 ? ":" : "·", planeScreenX, py)
        }
      }

      // Focus bloom — true focus point; strong only late in journey
      if (focusGlow > 0.02 && globalA > 0.15) {
        const fx = originX + focusX * scale
        const fy = originY
        const bloomR = lerp(2.5, 9, focusQuality) * focusGlow

        for (let layer = 4; layer >= 1; layer--) {
          const r = bloomR * (layer / 4) * 1.7
          const a =
            focusGlow * 0.14 * (1 / layer) * lerp(0.35, 1, focusQuality) * globalA
          // Outer layers slightly warmer — reads as light, not neon
          ctx.fillStyle = ink(a, 0.25 + focusQuality * 0.2)
          ctx.beginPath()
          ctx.arc(fx, fy, r, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = ink(
          0.48 * focusGlow * lerp(0.4, 1, focusQuality) * globalA,
          0.45 * focusQuality
        )
        ctx.beginPath()
        ctx.arc(fx, fy, 1.5 + focusQuality, 0, Math.PI * 2)
        ctx.fill()

        // Perfect Fit: crisp mark at the focus
        if (focusQuality > 0.72) {
          ctx.font = `${fontSize}px "Courier Prime", monospace`
          ctx.fillStyle = ink(
            0.62 * focusGlow * focusQuality * globalA,
            0.55
          )
          ctx.fillText("+", fx, fy)
        }
      }

      // Ambient dust — right field only, very light
      if (!prefersReduced && globalA > 0.2) {
        for (let d = 0; d < 8; d++) {
          const seed = d * 17.13
          const px = (Math.sin(seed + ts * 0.00014) * 0.5 + 0.5) * w
          const py = (Math.cos(seed * 1.31 + ts * 0.0001) * 0.5 + 0.5) * h
          if (px < w * 0.3) continue
          const side = clamp((px / w - 0.3) / 0.35, 0, 1)
          const a =
            (0.04 + 0.03 * Math.sin(ts * 0.0007 + seed)) * globalA * side
          ctx.fillStyle = ink(a, 0.05)
          ctx.fillText("·", px, py)
        }
      }

      frameRef.current = requestAnimationFrame(render)
    }

    frameRef.current = requestAnimationFrame(render)

    return () => {
      running = false
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  )
}
