import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Counter } from "@/components/counter"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#111]">
      {/* Main panel */}
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1687333621846-01628cae8300?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Premium eyewear at Nile Opticals"
            className="h-full w-full object-cover scale-x-[-1]"
            style={{ objectPosition: "center 23%" }}
          />
          <div className="absolute inset-0 bg-foreground/20" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(17,17,17,0.25) 45%, rgba(17, 17, 17, 0.71) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full min-h-screen flex flex-col justify-end pt-8 md:pt-12 lg:pt-16 pr-8 md:pr-12 lg:pr-16 pb-8 lg:pb-10 pl-4 md:pl-6 lg:pl-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.08] tracking-tight mb-5">
              The Art of
              <br />
              Looking, Refined.
            </h1>
            <p className="text-white/70 text-sm md:text-base tracking-wide mb-5 max-w-md leading-relaxed">
              Premium frames, precise lenses, and unhurried guidance — crafted for
              how you live in Pokhara.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mb-5">
              <a
                href="#products"
                className="inline-flex items-center gap-3 bg-white text-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-colors group"
              >
                Explore Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-8 sm:gap-12 mb-5"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight tabular-nums leading-none">
                <Counter to={10} suffix="k+" />
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/45 mt-1">
                Customers
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/10" />

            <div>
              <div className="text-2xl sm:text-3xl font-light text-white tracking-tight tabular-nums leading-none">
                <Counter to={500} suffix="+" delay={250} />
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/45 mt-1">
                Frames
              </div>
            </div>
          </motion.div>
        </div>

        {/* Label - far right */}
        <div className="absolute bottom-8 right-8 z-10 flex-col items-end hidden lg:flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="text-white/50 text-[11px] tracking-[0.35em] uppercase whitespace-nowrap">
              Pokhara&apos;s Refined Optical Boutique
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-3"
          >
            <span className="text-[11px] tracking-[0.35em] uppercase text-white/70 flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Nile Opticals
            </span>
          </motion.div>
          <div className="flex flex-col items-end gap-[3px] overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-white/40 origin-right w-16"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-white/40 origin-right w-10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
