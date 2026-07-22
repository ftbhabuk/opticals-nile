import React from "react"
import { useInView } from "@/hooks/use-in-view"
import { Tag } from "@/components/tag"
import { Link } from "react-router-dom"

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

export function LensBrandSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section id="brands" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            filter: inView ? "blur(0px)" : "blur(4px)",
            transition: `opacity 1s ${EASE}, transform 1s ${EASE}, filter 1s ${EASE}`,
          }}
        >
          <Tag>LENSES & FRAMES</Tag>
          <h2 className="mt-5 text-4xl md:text-5xl font-serif tracking-tight leading-[1.05] text-balance">
            Quality you can see and feel.
          </h2>
          <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-md mx-auto">
            Prescription lenses matched to your lifestyle, paired with frames that fit your face — not just your budget.
          </p>
        </div>

        {/* Banner with CTA */}
        <div
          className="rounded-2xl overflow-hidden border border-black/[0.07] relative"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1.2s ${EASE} 150ms, transform 1.2s ${EASE} 150ms`,
          }}
        >
          <div className="relative w-full h-[260px] md:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1400&auto=format&fit=crop"
              alt="Frame and lens options"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <p className="text-sm tracking-widest uppercase text-white/70">Every prescription, every style</p>
              <Link
                to="/shop"
                className="px-6 py-3 bg-white text-black text-xs tracking-wider uppercase hover:bg-white/90 transition-all duration-300"
              >
                Browse Frames →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
