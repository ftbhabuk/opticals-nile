import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className="relative min-h-screen flex bg-[#111]">
      {/* Left rail — vertical label */}
      <div className="hidden lg:flex w-[18%] xl:w-[20%] shrink-0 items-center justify-center border-r border-white/10">
        <div
          className="text-white/70 -rotate-90 whitespace-nowrap"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          <span className="text-[11px] tracking-[0.35em] uppercase">
            Nile Opticals
          </span>
        </div>
      </div>

      {/* Main visual panel */}
      <div className="flex-1 relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop"
            alt="Premium eyewear at Nile Opticals"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 25%" }}
          />
          <div className="absolute inset-0 bg-[#111]/45" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.25) 45%, rgba(17,17,17,0.15) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full min-h-screen flex flex-col justify-end p-8 md:p-12 lg:p-16 pb-28 lg:pb-32">
          <div
            className="max-w-2xl"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "translateY(0)" : "translateY(36px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <p className="text-[11px] tracking-[0.28em] uppercase text-white/55 mb-5">
              Nile Opticals
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08] tracking-tight mb-6">
              See clearly.
              <br />
              Look refined.
            </h1>
            <p className="text-white/70 text-sm md:text-base tracking-wide mb-10 max-w-md leading-relaxed">
              Premium frames, precise lenses, and unhurried guidance — crafted for
              how you live in Pokhara.
            </p>
            <a
              href="#products"
              className="inline-flex items-center gap-3 bg-white text-[#111] px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white/90 transition-colors group"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Compact stats */}
          <div
            className="mt-12 flex flex-wrap gap-8 sm:gap-12"
            style={{
              opacity: ready ? 1 : 0,
              transition: "opacity 0.8s ease 0.55s",
            }}
          >
            {[
              { value: "10k+", label: "Customers" },
              { value: "500+", label: "Frames" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/45 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 1s ease 1s",
          }}
        >
          <div
            className="w-px h-12 bg-white/40 origin-top"
            style={{ animation: "hero-scroll-line 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  )
}
