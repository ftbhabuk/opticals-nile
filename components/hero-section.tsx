"use client"
import { useState, useEffect } from "react"
import { Counter } from "@/components/counter"

export function HeroSection() {
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    setHeroReady(true)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden bg-[#1a1a1a]">
      <img
        src="https://wallpaperaccess.com/full/358942.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: "center 30%", transform: "scale(1.06)" }}
      />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: [
            "linear-gradient(to bottom,",
            "rgba(10,10,10,0.55) 0%,",
            "rgba(10,10,10,0.28) 18%,",
            "rgba(10,10,10,0.08) 38%,",
            "rgba(245,244,240,0.0) 52%,",
            "rgba(245,244,240,0.45) 68%,",
            "rgba(245,244,240,0.82) 82%,",
            "#F5F4F0 100%)",
          ].join(" "),
        }}
      />

      <div className="h-20" />

      <div
        className="absolute z-30 flex items-center gap-2"
        style={{
          right: "1rem",
          bottom: "3rem",
          opacity: heroReady ? 1 : 0,
          filter: heroReady ? "blur(0px)" : "blur(24px)",
          transform: heroReady ? "translateY(0px)" : "translateY(32px)",
          transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 400ms, filter 1s cubic-bezier(0.16,1,0.3,1) 400ms, transform 1s cubic-bezier(0.16,1,0.3,1) 400ms",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
        <span
          className="text-xs tracking-[0.2em] uppercase text-black whitespace-nowrap"
          style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
        >
          Pokhara's refined optical boutique
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-6 md:px-12 pb-12 max-w-3xl">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-light text-[#111] leading-[1.0] tracking-tight mb-10"
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            opacity: heroReady ? 1 : 0,
            filter: heroReady ? "blur(0px)" : "blur(24px)",
            transform: heroReady ? "translateY(0px)" : "translateY(32px)",
            transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0ms, filter 1s cubic-bezier(0.16,1,0.3,1) 0ms, transform 1s cubic-bezier(0.16,1,0.3,1) 0ms",
          }}
        >
          Precision<br/> with<br />presence.
        </h1>

        <div className="flex items-center gap-8 sm:gap-12">
          {[
            { end: 15, suffix: "+", label: "Years" },
            { end: 10000, suffix: "+", label: "Happy Customers" },
            { end: 500, suffix: "+", label: "Frame Styles" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                opacity: heroReady ? 1 : 0,
                filter: heroReady ? "blur(0px)" : "blur(16px)",
                transform: heroReady ? "translateY(0px)" : "translateY(20px)",
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${120 + i * 80}ms, filter 0.8s cubic-bezier(0.16,1,0.3,1) ${120 + i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${120 + i * 80}ms`,
              }}
            >
              <div className="text-3xl sm:text-4xl text-[#111] font-light tracking-tight" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                <Counter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-black/40 tracking-widest uppercase mt-1" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
