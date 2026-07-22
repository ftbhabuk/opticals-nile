import { useInView } from "@/hooks/use-in-view"
import { Tag } from "@/components/tag"
import { Link } from "react-router-dom"

const WHY_NILE = [
  { label: "Rooted in Pokhara", desc: "A trusted Newroad destination for families across the valley for over 15 years." },
  { label: "Expert styling guidance", desc: "Our team helps you choose frames that suit your face, lifestyle, and budget." },
  { label: "Lifetime aftercare", desc: "Free adjustments, cleaning, and minor repairs — whenever you need them." },
  { label: "Walk-ins welcome", desc: "No appointment needed. Drop by anytime during store hours." },
]

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

export function WhyNileSection() {
  return (
    <section id="why-nile" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-16">
          <Tag>WHY NILE OPTICALS</Tag>
          <h2 className="mt-5 text-4xl md:text-5xl font-serif tracking-tight leading-[1.05] text-balance">
            More than a shop — a place you return to.
          </h2>
        </FadeUp>

        {/* Quote */}
        <FadeUp delay={80} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl font-serif text-black/50 leading-relaxed italic">
            &ldquo;We believe great eyewear starts with listening — to your vision, your style, and how you live day to day.&rdquo;
          </p>
          <p className="text-xs text-black/30 tracking-widest uppercase mt-4">The Nile Opticals team · Pokhara</p>
        </FadeUp>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {WHY_NILE.map((item, i) => (
            <FadeUp key={item.label} delay={120 + i * 80}>
              <div className="rounded-xl border border-black/[0.07] p-6 transition-all duration-500 hover:border-black/[0.15] hover:bg-black/[0.02]">
                <span className="text-3xl font-serif text-black/10 block mb-2">{(i + 1).toString().padStart(2, "0")}</span>
                <h3 className="text-base font-serif mb-1">{item.label}</h3>
                <p className="text-sm text-black/40 leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA */}
        <FadeUp delay={300} className="text-center">
          <Link
            to="/journey"
            className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-black/50 hover:text-black transition-all duration-300 group"
          >
            See the full experience
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
