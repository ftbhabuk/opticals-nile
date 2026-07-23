import { motion } from "framer-motion"
import { StackingAgentCards } from "@/components/stacking-agent-cards"

export function EyewearTypesSection() {
  return (
    <section
      id="types"
      className="bg-black/[0.03] py-24 lg:py-32 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 lg:mb-24"
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
        </motion.div>

        <StackingAgentCards />
      </div>
    </section>
  )
}
