import { useEffect, useRef, useState } from "react"

const EYEWEAR_TYPES = [
  {
    label: "PRESCRIPTION",
    title: "Medical Eyeglasses",
    desc: "Corrective lenses for nearsightedness, farsightedness, and astigmatism — cut to your exact prescription with premium coatings.",
    stats: [{ v: "Same-day", l: "service" }, { v: "100%", l: "precision" }],
    accent: "linear-gradient(135deg, #e8e6e1 0%, #f5f4f0 100%)",
  },
  {
    label: "SUNGLASSES",
    title: "Premium Sunglasses",
    desc: "UV protection with designer frames. Polarized lenses reduce glare for driving, travel, and outdoor life in Pokhara.",
    stats: [{ v: "99%", l: "UV blocking" }, { v: "Polarized", l: "options" }],
    accent: "linear-gradient(135deg, #ddd9d0 0%, #f0eeea 100%)",
  },
  {
    label: "SPECIALTY",
    title: "Sports & Computer Glasses",
    desc: "Blue-cut coatings for long screen hours and impact-resistant frames for active lifestyles. Performance without compromise.",
    stats: [{ v: "Blue-cut", l: "available" }, { v: "Lightweight", l: "frames" }],
    accent: "linear-gradient(135deg, #d8dce3 0%, #eef0f4 100%)",
  },
  {
    label: "FASHION",
    title: "Luxury Fashion Frames",
    desc: "Statement pieces from world-renowned houses. Premium acetate, titanium, and handcrafted details for those who lead with style.",
    stats: [{ v: "100%", l: "authentic" }, { v: "New", l: "arrivals" }],
    accent: "linear-gradient(135deg, #e5e0d8 0%, #f7f5f1 100%)",
  },
]

const STICKY_TOP   = 80
const STICKY_STEP  = 16
const SCALE_STEP   = 0.04
const OFFSET_STEP  = 8

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

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
    <div className="flex flex-col" style={{ perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
      {EYEWEAR_TYPES.map((item, i) => {
        const d = depth[i]
        const scale = 1 - d * SCALE_STEP
        const translateY = d * OFFSET_STEP

        return (
          <div
            key={item.label}
            ref={el => { cardRefs.current[i] = el }}
            className="sticky mb-4"
            style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: 10 + i }}
          >
            <div
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "top center",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                willChange: "transform",
              }}
            >
              <div
                className="group relative rounded-2xl border border-black/[0.07] overflow-hidden"
                style={{ background: item.accent }}
              >
                <div className="relative z-10 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <Tag>{item.label}</Tag>
                  </div>
                  <h3 className="text-xl font-light mb-3">{item.title}</h3>
                  <p className="text-sm text-black/45 leading-relaxed mb-8 max-w-lg">{item.desc}</p>
                  <div className="flex gap-8 pt-6 border-t border-black/[0.06]">
                    {item.stats.map(s => (
                      <div key={s.l}>
                        <div className="text-2xl font-light">{s.v}</div>
                        <div className="text-[11px] text-black/35 tracking-widest mt-0.5">{s.l}</div>
                      </div>
                    ))}
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
