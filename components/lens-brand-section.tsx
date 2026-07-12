"use client"
import React from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { Tag } from "@/components/tag"

function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
  el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
}

export function LensBrandSection() {
  return (
    <section id="brands" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <PixelIcon type="integrations" size={40} />
            <div className="mt-4"><Tag>LENSES & BRANDS</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Quality you can\nsee and feel."}
            </RevealText>
          </div>
          <p className="text-sm text-black/45 leading-relaxed max-w-xs">
            Authentic international frames paired with lens options matched to your prescription and daily needs.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-black/[0.07] flex flex-col md:block md:relative" onMouseMove={handleMouse}>
          <div className="relative w-full h-[280px] md:h-[480px] shrink-0">
            <img
              src="/images/landing.png"
              alt="Premium lens and frame options"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col gap-3 p-4 md:absolute md:bottom-4 md:right-4 md:p-0 md:w-80">
            <div
              className="rounded-xl border border-white/50 p-6"
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                background: "rgba(255,255,255,0.60)",
              }}
            >
              <Tag>LENS OPTIONS</Tag>
              <h3 className="mt-3 text-lg font-light mb-2">Built for your eyes</h3>
              <p className="text-xs text-black/45 leading-relaxed">
                Progressive, blue-cut, photochromic, polarized, and anti-reflective coatings — we help you pick what fits your routine.
              </p>
            </div>

            <div
              className="rounded-xl border border-white/50 p-6"
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                background: "rgba(255,255,255,0.60)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="text-xs text-black/40 tracking-widest">AUTHENTIC</span>
              </div>
              <p className="text-sm text-black/45">
                Genuine frames from trusted global brands — sourced and verified, never replicas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
