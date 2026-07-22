import React from "react"
import { useInView } from "@/hooks/use-in-view"
import { Tag } from "@/components/tag"

const LENS_TECH = [
  { label: "Progressive", desc: "Seamless near-to-distance in one lens — no line, no compromise." },
  { label: "Blue-Cut", desc: "Reduce digital eye strain from screens, block harmful blue light." },
  { label: "Photochromic", desc: "Lenses that adapt indoors to outdoors — clear to dark automatically." },
  { label: "Polarized", desc: "Cut glare from roads, water, and snow for crisp, comfortable vision." },
  { label: "Anti-Reflective", desc: "Eliminate reflections for clearer vision and a cleaner look." },
]

const STYLE_TAGS = ["Classic", "Modern", "Bold", "Minimal", "Vintage", "Sport"]

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView(0.15)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        filter: inView ? "blur(0px)" : "blur(4px)",
        transition: `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms, filter 0.7s ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function LensBrandSection() {
  return (
    <section id="brands" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <Tag>LENSES & FRAMES</Tag>
          <h2 className="mt-5 text-4xl md:text-5xl font-serif tracking-tight leading-[1.05] text-balance">
            Quality you can see and feel.
          </h2>
          <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-md mx-auto">
            Prescription lenses matched to your lifestyle, paired with frames that fit your face — not just your budget.
          </p>
        </FadeUp>

        {/* Hero banner */}
        <FadeUp delay={100} className="rounded-2xl overflow-hidden border border-black/[0.07] mb-12">
          <div className="relative w-full h-[260px] md:h-[400px]">
            <img
              src="/images/landing.png"
              alt="Frame and lens options"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-sm tracking-widest uppercase text-white/70">Every prescription, every style</p>
            </div>
          </div>
        </FadeUp>

        {/* Lens technology grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {LENS_TECH.map((lens, i) => (
            <FadeUp key={lens.label} delay={120 + i * 60} className="group">
              <div className="rounded-xl border border-black/[0.07] p-5 h-full transition-all duration-500 hover:border-black/[0.15] hover:bg-black/[0.02]">
                <h3 className="text-sm font-serif mb-2">{lens.label}</h3>
                <p className="text-xs text-black/40 leading-relaxed">{lens.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Style strip */}
        <FadeUp delay={300} className="text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-black/30 mb-4">Frame styles</p>
          <div className="flex flex-wrap justify-center gap-3">
            {STYLE_TAGS.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full text-xs text-black/50 bg-black/[0.04] border border-black/[0.06]"
              >
                {s}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
