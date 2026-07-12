import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { Tag } from "@/components/tag"

const WHY_NILE = [
  { label: "Rooted in Pokhara", desc: "A trusted Newroad destination for families across the valley." },
  { label: "Expert styling guidance", desc: "Our team helps you choose frames that suit your face, lifestyle, and budget." },
  { label: "Lifetime aftercare", desc: "Free adjustments, cleaning, and minor repairs — whenever you need them." },
  { label: "Walk-ins welcome", desc: "No appointment needed. Drop by anytime during store hours." },
]

export function WhyNileSection() {
  return (
    <section id="why-nile" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <PixelIcon type="platform" size={40} />
          <div className="mt-4"><Tag>WHY NILE OPTICALS</Tag></div>
          <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
            {"More than a shop —\na place you return to."}
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            {WHY_NILE.map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-1 bg-black/10 rounded-full shrink-0" />
                <div>
                  <h3 className="text-sm font-light mb-1">{item.label}</h3>
                  <p className="text-xs text-black/35 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-black/[0.07] bg-white/50 p-8">
            <p className="text-lg font-light leading-relaxed mb-6">
              &ldquo;We believe great eyewear starts with listening — to your vision, your style, and how you live day to day.&rdquo;
            </p>
            <p className="text-xs text-black/35 tracking-widest uppercase">The Nile Opticals team · Pokhara</p>
          </div>
        </div>
      </div>
    </section>
  )
}
