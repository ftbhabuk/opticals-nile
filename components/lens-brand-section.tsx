import { motion } from "framer-motion"
import { CircleDot, Feather, Layers, Monitor, ShieldCheck, Sparkles, Sun, Waves } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

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

const serviceNotes = [
  "Prescription mapping",
  "Coating guidance",
  "Frame-lens matching",
]

export function LensBrandSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section
      id="brands"
      className="relative overflow-hidden bg-white px-6 py-18 text-[#111] md:px-12 lg:px-20 lg:py-24"
    >
      <div className="absolute inset-0">
        <img
          src="/images/footer.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/12 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div
          ref={ref}
          className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            filter: inView ? "blur(0px)" : "blur(4px)",
            transition: `opacity 1s ${EASE_CSS}, transform 1s ${EASE_CSS}, filter 1s ${EASE_CSS}`,
          }}
        >
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-black/45">
              Lens studio
            </p>
            <h2 className="font-serif text-4xl leading-[1.03] text-balance md:text-6xl">
              Precision lenses, finished for real life.
            </h2>
          </div>
          <div className="max-w-lg lg:justify-self-end">
            <p className="text-sm leading-relaxed text-black/55">
              We pair every frame with the correct prescription design, coating, thickness, and
              daily-use protection so the final pair feels clear, light, and considered.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] border border-white/55 bg-white/22 p-7 shadow-[0_24px_80px_rgba(120,135,160,0.16),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl md:p-9"
          >
            <img
              src="/images/footer.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-white/16 backdrop-blur-md" />
            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-3 text-black/55">
                <Sparkles className="h-4 w-4 stroke-[1.5]" />
                <span className="text-[10px] uppercase tracking-[0.24em]">Coatings & optics</span>
              </div>
              <p className="mb-10 font-serif text-3xl leading-tight text-balance">
                Clearer vision starts with the lens architecture, not only the frame.
              </p>
              <div className="grid gap-4">
                {serviceNotes.map((note) => (
                  <div key={note} className="flex items-center gap-3 border-t border-white/55 pt-4">
                    <CircleDot className="h-3.5 w-3.5 text-black/45 stroke-[1.7]" />
                    <span className="text-sm text-black/62">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 content-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lensOptions.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -8,
                  scale: 1.025,
                  transition: { type: "spring", stiffness: 260, damping: 22 },
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.055,
                  ease: EASE,
                }}
                className="rounded-[28px] border border-white/55 bg-white/24 p-5 shadow-[0_18px_55px_rgba(120,135,160,0.14),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-2xl transition-colors duration-500 hover:bg-white/32"
              >
                <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/55 bg-white/26 text-black/58 backdrop-blur-xl">
                  <Icon className="h-4 w-4 stroke-[1.5]" />
                </div>
                <h3 className="mb-2 font-serif text-lg">{title}</h3>
                <p className="text-xs leading-relaxed text-black/55">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
