import React, { useState, useEffect, useCallback, useRef } from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { AnimatedLensFocus } from "@/components/animated-lens-focus"

const JOURNEY_STEPS = [
  { title: "Consultation", desc: "Visit our store for a complimentary eye health consultation. Let's find what suits you." },
  { title: "Exam", desc: "Professional vision testing with latest diagnostic equipment. Precise prescription crafted for you." },
  { title: "Selection", desc: "Browse our full in-store collection with expert guidance. Try on styles until you find the one." },
  { title: "Perfect Fit", desc: "Custom adjustments and fitting. Leave with glasses made perfectly for you." },
]

/** Shared timing — card copy + ASCII animation stay phase-locked */
export const JOURNEY_TIMING = {
  /** Content fully visible; one ray sweep runs in this window */
  dwellMs: 4600,
  /** Fade-out before step swap */
  outMs: 300,
  /** Content / motion ease (CSS) */
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  contentInMs: 560,
  contentOutMs: 420,
} as const

const EASE = JOURNEY_TIMING.ease

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

export function JourneySection() {
  const [activeStep, setActiveStep] = useState(0)
  const [visible, setVisible] = useState(true)
  /** Bumps whenever a step becomes active — animation resets its cycle */
  const [cycleId, setCycleId] = useState(0)
  const outTimerRef = useRef<number | null>(null)

  const goToStep = useCallback((next: number) => {
    if (outTimerRef.current != null) {
      window.clearTimeout(outTimerRef.current)
      outTimerRef.current = null
    }

    setVisible(false)
    outTimerRef.current = window.setTimeout(() => {
      setActiveStep(next)
      setCycleId((id) => id + 1)
      setVisible(true)
      outTimerRef.current = null
    }, JOURNEY_TIMING.outMs)
  }, [])

  const selectStep = useCallback(
    (idx: number) => {
      if (idx === activeStep && visible) return
      goToStep(idx)
    },
    [activeStep, visible, goToStep]
  )

  // Autoplay: full dwell per step, timer restarts on every step change (manual or auto)
  useEffect(() => {
    const total = JOURNEY_TIMING.dwellMs + JOURNEY_TIMING.outMs
    const interval = window.setInterval(() => {
      goToStep((activeStep + 1) % JOURNEY_STEPS.length)
    }, total)
    return () => window.clearInterval(interval)
  }, [activeStep, goToStep])

  useEffect(() => {
    return () => {
      if (outTimerRef.current != null) window.clearTimeout(outTimerRef.current)
    }
  }, [])

  const currentStep = JOURNEY_STEPS[activeStep]
  const { contentInMs, contentOutMs } = JOURNEY_TIMING
  const fadeMs = visible ? contentInMs : contentOutMs

  const titleStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    filter: visible ? "blur(0px)" : "blur(10px)",
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity ${fadeMs}ms ${EASE}, filter ${fadeMs}ms ${EASE}, transform ${fadeMs}ms ${EASE}`,
  }

  const descStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    filter: visible ? "blur(0px)" : "blur(8px)",
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition: `opacity ${fadeMs}ms ${EASE} ${visible ? 70 : 0}ms, filter ${fadeMs}ms ${EASE} ${visible ? 70 : 0}ms, transform ${fadeMs}ms ${EASE} ${visible ? 70 : 0}ms`,
  }

  const numberStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    filter: visible ? "blur(0px)" : "blur(6px)",
    transform: visible ? "scale(1)" : "scale(0.96)",
    transition: `opacity ${Math.round(fadeMs * 0.85)}ms ${EASE} ${visible ? 100 : 0}ms, filter ${Math.round(fadeMs * 0.85)}ms ${EASE} ${visible ? 100 : 0}ms, transform ${Math.round(fadeMs * 0.85)}ms ${EASE} ${visible ? 100 : 0}ms`,
  }

  return (
    <section id="journey" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <PixelIcon type="workflow" size={40} />
          <div className="mt-4"><Tag>YOUR JOURNEY</Tag></div>
          <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
            {"From consultation\nto perfect vision."}
          </RevealText>
        </div>

        <div
          className="relative overflow-hidden min-h-[420px] md:min-h-[440px]"
          style={{
            borderRadius: "28px",
            border: "1px solid rgba(0,0,0,0.09)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 32px rgba(0,0,0,0.04)",
          }}
        >
          <div className="absolute inset-0 md:translate-x-[28%]">
            <AnimatedLensFocus
              activeStep={activeStep}
              cycleId={cycleId}
              cycleMs={JOURNEY_TIMING.dwellMs}
              contentVisible={visible}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(245,244,240,0.55) 50%, rgba(255,255,255,0.38) 100%)",
              backdropFilter: "blur(0.2px)",
            }}
          />

          <div className="relative z-10 flex flex-col justify-between min-h-[420px] md:min-h-[440px] p-10 md:p-14">
            <div className="max-w-lg">
              <h3
                className="text-3xl md:text-5xl font-light tracking-tight leading-[1.08] mb-5"
                style={titleStyle}
              >
                {currentStep.title}
              </h3>
              <p
                className="text-base md:text-lg text-black/45 leading-relaxed"
                style={descStyle}
              >
                {currentStep.desc}
              </p>
            </div>

            <div className="flex items-end justify-between pt-12">
              <div className="flex items-center gap-5">
                <div
                  className="text-5xl md:text-6xl font-light text-black/10 tabular-nums"
                  style={numberStyle}
                >
                  {(activeStep + 1).toString().padStart(2, "0")}
                </div>
                <div
                  className="h-20 w-px"
                  style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.22), transparent)",
                    opacity: visible ? 1 : 0,
                    transition: `opacity ${Math.round(fadeMs * 0.85)}ms ${EASE} ${visible ? 140 : 0}ms`,
                  }}
                />
              </div>

              <div className="flex items-center gap-3">
                {JOURNEY_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectStep(idx)}
                    aria-label={`Go to step ${idx + 1}`}
                    aria-current={idx === activeStep ? "step" : undefined}
                    className="cursor-pointer rounded-full transition-all duration-500"
                    style={{
                      width: idx === activeStep ? 28 : 6,
                      height: 6,
                      background: idx === activeStep ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.14)",
                      transitionTimingFunction: EASE,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
