"use client"
import React from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { Tag } from "@/components/tag"
import { BentoCard } from "@/components/bento-card"

const COLLECTION_DETAILS = [
  { index: "01", label: "Verified houses", desc: "Ray-Ban, Oakley, Gucci, and other international labels sourced with care." },
  { index: "02", label: "Unhurried try-ons", desc: "Compare shape, weight, lens tint, and face fit with hands-on guidance." },
  { index: "03", label: "Clear lens pairing", desc: "Frames, coatings, and prescriptions explained before the final selection." },
]

function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
  el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
}

export function CollectionSection() {
  return (
    <section id="products" className="py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <PixelIcon type="platform" size={40} />
          <div className="mt-4"><Tag>OUR COLLECTION</Tag></div>
          <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            {"Frames for every\nface shape & lifestyle."}
          </RevealText>
        </div>

        <div className="grid grid-cols-12 gap-3" onMouseMove={handleMouse}>
          <BentoCard className="col-span-12 p-8 min-h-[240px] flex flex-col justify-end relative overflow-hidden" delay={0}>
            <img
              src="https://images.unsplash.com/photo-1648025231307-c7e665c5d184?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Eyewear collection at Nile Opticals"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 58%" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 20%, rgba(245,244,240,0.55) 55%, rgba(245,244,240,0.95) 80%, rgb(245,244,240) 100%)",
              }}
            />
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl font-light mb-3 text-black">The Nile Opticals Collection</h3>
              <p className="text-sm text-black leading-relaxed">
                From everyday classics to statement designer pieces — explore our full in-store range with expert help at every step.
              </p>
            </div>
          </BentoCard>

          <BentoCard className="col-span-12 p-0" delay={120}>
            <div className="grid divide-y divide-black/[0.06] md:grid-cols-3 md:divide-x md:divide-y-0 md:divide-black/[0.06]">
              {COLLECTION_DETAILS.map((item) => (
                <div key={item.index} className="flex min-h-[150px] flex-col justify-between p-6 md:p-7">
                  <div className="mb-8 flex items-center justify-between gap-6">
                    <span className="text-[11px] tracking-[0.22em] text-black/30">{item.index}</span>
                    <span className="h-px flex-1 bg-black/[0.08]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light tracking-tight mb-2">{item.label}</h3>
                    <p className="text-sm text-black/42 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
