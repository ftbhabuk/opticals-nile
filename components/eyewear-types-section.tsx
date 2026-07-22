import { StackingAgentCards } from "@/components/stacking-agent-cards"
import { useInView } from "@/hooks/use-in-view"

export function EyewearTypesSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.15)

  return (
    <section
      id="types"
      className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className="text-center mb-16 lg:mb-24"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-black/35 mb-4">
            Eyewear Types
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4">
            Every style for every moment
          </h2>
          <p className="text-sm text-black/45 leading-relaxed max-w-md mx-auto">
            Prescription, sun, specialty, and fashion — each category tailored to how you live and see.
          </p>
        </div>

        <StackingAgentCards />
      </div>
    </section>
  )
}
