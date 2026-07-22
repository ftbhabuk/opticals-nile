import { useEffect, useRef, useState } from "react"

const EYEWEAR_TYPES = [
  {
    index: "01",
    label: "PRESCRIPTION",
    title: "Medical Eyeglasses",
    desc: "Corrective lenses for nearsightedness, farsightedness, and astigmatism — cut to your exact prescription with premium coatings.",
    stats: [
      { v: "Same-day", l: "service" },
      { v: "100%", l: "precision" },
    ],
    image:
      "https://images.unsplash.com/photo-1711564354334-ee51baa830c2?q=80&w=988&auto=format&fit=crop",
    imageAlt: "Premium medical eyeglasses",
  },
  {
    index: "02",
    label: "SUNGLASSES",
    title: "Premium Sunglasses",
    desc: "UV protection with designer frames. Polarized lenses reduce glare for driving, travel, and outdoor life in Pokhara.",
    stats: [
      { v: "99%", l: "UV blocking" },
      { v: "Polarized", l: "options" },
    ],
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1180&auto=format&fit=crop",
    imageAlt: "Premium sunglasses",
  },
  {
    index: "03",
    label: "SPECIALTY",
    title: "Sports & Computer Glasses",
    desc: "Blue-cut coatings for long screen hours and impact-resistant frames for active lifestyles. Performance without compromise.",
    stats: [
      { v: "Blue-cut", l: "available" },
      { v: "Lightweight", l: "frames" },
    ],
    image:
      "https://images.unsplash.com/photo-1741332528297-219f88563345?q=80&w=774&auto=format&fit=crop",
    imageAlt: "Sports and computer glasses",
  },
  {
    index: "04",
    label: "FASHION",
    title: "Luxury Fashion Frames",
    desc: "Statement pieces from world-renowned houses. Premium acetate, titanium, and handcrafted details for those who lead with style.",
    stats: [
      { v: "100%", l: "authentic" },
      { v: "New", l: "arrivals" },
    ],
    image:
      "https://images.unsplash.com/photo-1747640730472-3070d5ed690d?q=80&w=1035&auto=format&fit=crop",
    imageAlt: "Luxury fashion frames",
  },
]

const FALLBACK_IMAGE = "/images/spectacles-showcase.png"

const STICKY_TOP = 88
const STICKY_STEP = 18
const SCALE_STEP = 0.035
const OFFSET_STEP = 6

export function StackingAgentCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [depth, setDepth] = useState<number[]>(EYEWEAR_TYPES.map(() => 0))

  useEffect(() => {
    function onScroll() {
      const nextDepth = EYEWEAR_TYPES.map((_, i) => {
        let count = 0
        for (let j = i + 1; j < EYEWEAR_TYPES.length; j++) {
          const el = cardRefs.current[j]
          if (!el) continue
          const rect = el.getBoundingClientRect()
          const stickyTopJ = STICKY_TOP + j * STICKY_STEP
          if (rect.top <= stickyTopJ + 2) count++
        }
        return count
      })
      setDepth(nextDepth)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="flex flex-col"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 0%" }}
    >
      {EYEWEAR_TYPES.map((item, i) => {
        const d = depth[i]
        const scale = 1 - d * SCALE_STEP
        const translateY = d * OFFSET_STEP

        return (
          <div
            key={item.label}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="sticky mb-5 last:mb-0"
            style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: 10 + i }}
          >
            <div
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "top center",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                willChange: "transform",
              }}
            >
              <div
                className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-500 hover:border-black/[0.12] hover:shadow-[0_16px_48px_rgba(0,0,0,0.06)]"
              >
                <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_minmax(280px,38%)] md:items-stretch md:gap-10 md:p-8 lg:p-10">
                  {/* Copy */}
                  <div className="flex min-h-[240px] flex-col justify-between">
                    <div>
                      <div className="mb-6 flex items-center gap-3">
                        <span className="text-[11px] tracking-[0.22em] text-black/30">
                          {item.index}
                        </span>
                        <span className="h-px w-6 bg-black/10" />
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-[0.18em] text-black/45 bg-black/[0.035]">
                          {item.label}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl lg:text-[1.65rem] font-light tracking-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-sm text-black/45 leading-relaxed max-w-lg">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex gap-8 sm:gap-10 pt-6 mt-8 border-t border-black/[0.06]">
                      {item.stats.map((s) => (
                        <div key={s.l}>
                          <div className="text-2xl font-light tracking-tight">
                            {s.v}
                          </div>
                          <div className="text-[11px] text-black/35 tracking-[0.16em] uppercase mt-1">
                            {s.l}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative min-h-[220px] overflow-hidden rounded-xl bg-black/[0.03] md:min-h-full">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      onError={(event) => {
                        const image = event.currentTarget
                        if (image.src.endsWith(FALLBACK_IMAGE)) return
                        image.src = FALLBACK_IMAGE
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(255,255,255,0.12) 0%, transparent 40%)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
