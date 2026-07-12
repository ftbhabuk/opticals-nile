import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { Tag } from "@/components/tag"
import { StackingAgentCards } from "@/components/stacking-agent-cards"

export function EyewearTypesSection() {
  return (
    <section id="types" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <PixelIcon type="pricing" size={40} />
            <div className="mt-4"><Tag>EYEWEAR TYPES</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Every style for\nevery moment."}
            </RevealText>
          </div>
          <p className="text-sm text-black/45 leading-relaxed max-w-xs">
            Prescription, sunglasses, sports, and fashion — each category tailored to how you actually live and see.
          </p>
        </div>

        <StackingAgentCards />
      </div>
    </section>
  )
}
