import { motion } from "framer-motion"
import { ArrowRight, Layers, Monitor, Sun, Waves, ShieldCheck, Feather } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { Tag } from "@/components/tag"
import { Link } from "react-router-dom"

const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)"
const EASE = [0.16, 1, 0.3, 1] as const

const lensOptions = [
  {
    icon: Layers,
    title: "Progressive",
    description:
      "Seamless transition between near, intermediate, and distance vision — no visible lines.",
  },
  {
    icon: Monitor,
    title: "Blue-Cut",
    description:
      "Filters high-energy blue light from screens to ease long hours of digital eye strain.",
  },
  {
    icon: Sun,
    title: "Photochromic",
    description:
      "Darkens automatically in sunlight and clears back up the moment you're indoors.",
  },
  {
    icon: Waves,
    title: "Polarized",
    description:
      "Cuts glare from water, roads, and glass for sharper, more comfortable outdoor vision.",
  },
  {
    icon: ShieldCheck,
    title: "Anti-Reflective",
    description:
      "Removes reflections and halos — especially useful for driving after dark.",
  },
  {
    icon: Feather,
    title: "High-Index",
    description:
      "Thinner, lighter lenses for stronger prescriptions, without the added bulk.",
  },
]

export function LensBrandSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section id="brands" className="py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            filter: inView ? "blur(0px)" : "blur(4px)",
            transition: `opacity 1s ${EASE_CSS}, transform 1s ${EASE_CSS}, filter 1s ${EASE_CSS}`,
          }}
        >
          <Tag>LENSES & FRAMES</Tag>
          <h2 className="mt-5 text-4xl md:text-5xl font-serif tracking-tight leading-[1.05] text-balance">
            Every lens, matched to how you see.
          </h2>
          <p className="mt-4 text-sm text-black/45 leading-relaxed max-w-md mx-auto">
            Six coatings and lens types, all available on any frame in the shop — our opticians
            will help you pick the right one.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lensOptions.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
              className="rounded-2xl border border-black/[0.07] p-8 transition-colors duration-500 hover:border-black/[0.14]"
            >
              <div className="w-10 h-10 rounded-full bg-black/[0.04] flex items-center justify-center mb-5">
                <Icon className="h-4 w-4 text-black/50 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-lg mb-2">{title}</h3>
              <p className="text-sm text-black/45 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase border-b border-black/80 pb-1 hover:gap-4 transition-all duration-300 group"
          >
            Browse All Frames
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}