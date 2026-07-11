"use client"
import React, { useRef, useEffect, useState } from "react"

import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { StackingAgentCards } from "@/components/stacking-agent-cards"
import Navigation from "@/components/mobile-nav"
import { JourneySection } from "@/components/journey-section"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView()
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = end / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-all duration-700 hover:border-black/[0.15] hover:bg-[#fafaf8] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)" }}
      />
      {children}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

const WHY_NILE = [
  { label: "Rooted in Pokhara", desc: "A trusted Newroad destination for families across the valley." },
  { label: "Expert styling guidance", desc: "Our team helps you choose frames that suit your face, lifestyle, and budget." },
  { label: "Lifetime aftercare", desc: "Free adjustments, cleaning, and minor repairs — whenever you need them." },
  { label: "Walk-ins welcome", desc: "No appointment needed. Drop by anytime during store hours." },
]

const COLLECTION_DETAILS = [
  { index: "01", label: "Verified houses", desc: "Ray-Ban, Oakley, Gucci, and other international labels sourced with care." },
  { index: "02", label: "Unhurried try-ons", desc: "Compare shape, weight, lens tint, and face fit with hands-on guidance." },
  { index: "03", label: "Clear lens pairing", desc: "Frames, coatings, and prescriptions explained before the final selection." },
]

export default function App() {
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    setHeroReady(true)
  }, [])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">

      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden bg-[#1a1a1a]">
        <img
          src="https://wallpaperaccess.com/full/358942.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ objectPosition: "center 30%", transform: "scale(1.06)" }}
        />

        {/* Single smooth overlay — dark top for nav, seamless fade to page bg at bottom */}
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

      {/* ── OUR COLLECTION ──────────────────────────────────────────────────── */}
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

      {/* ── EYEWEAR TYPES ───────────────────────────────────────────────────── */}
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

      <JourneySection />

      {/* ── LENS & BRAND EXPERTISE ──────────────────────────────────────────── */}
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

      {/* ── WHY NILE OPTICALS ──────────��───────────────────────────���─────────── */}
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

      {/* ── VISIT US ──────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>VISIT US</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Come see us on\nNewroad, Pokhara."}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:row-span-3 rounded-2xl overflow-hidden border border-black/[0.07] h-[300px] md:h-full">
              <img
                src="https://images.unsplash.com/photo-1776950227879-6e3b44cbe830?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Nile Opticals shop interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="https://images.unsplash.com/photo-1641810780759-2e5cd4569da3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Frames display"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="https://plus.unsplash.com/premium_photo-1700822899973-6ca101047daa?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Shop entrance"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="https://plus.unsplash.com/premium_photo-1661299306807-d93a1b0d3a2d?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Optical shop display"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <BentoCard className="p-8" delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-light mb-2">Location</h3>
                <p className="text-sm text-black/45 leading-relaxed mb-4">
                  Pokhara 9, Newroad, 18th Street<br />Purnima Marga
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://www.google.com/maps/search/Pokhara+9,+Newroad,+18th+Street,+Purnima+Marga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-light border border-black/20 rounded-lg hover:border-black/40 hover:bg-black/[0.02] transition-colors"
                  >
                    View on Map
                  </a>
                  <a
                    href="https://www.google.com/maps/dir//Pokhara+9,+Newroad,+18th+Street,+Purnima+Marga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-light border border-black/20 rounded-lg hover:border-black/40 hover:bg-black/[0.02] transition-colors"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs text-black/30 uppercase tracking-widest mb-2">Hours</p>
                <p className="text-sm text-black/45 leading-relaxed">
                  Mon – Sat: 10:00 AM – 8:00 PM<br />
                  Sunday: 11:00 AM – 7:00 PM
                </p>
              </div>
              <div>
                <p className="text-xs text-black/30 uppercase tracking-widest mb-2">Contact</p>
                <p className="text-sm text-black/45 leading-relaxed">
                  <a href="tel:061520XXXX" className="hover:text-black/70 transition-colors">📞 061-520-XXXX</a><br />
                  <a href="https://wa.me/9779841XXXXX" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors">
                    WhatsApp: +977-9841-XXXXX
                  </a>
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── BRAND & LENS MARQUEE ─────────────────────────────────────────────── */}
      <section className="py-0 border-t border-black/[0.06] overflow-hidden select-none">
        <div className="flex border-b border-black/[0.06]" style={{ animation: "marqueeLeft 28s linear infinite" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex shrink-0">
              {["Ray-Ban", "Oakley", "Gucci", "Prada", "Tom Ford", "Burberry", "Versace", "Cartier", "Coach", "Persol"].map((brand) => (
                <div key={`${rep}-${brand}`} className="flex items-center gap-6 px-10 py-5 border-r border-black/[0.06] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/20 shrink-0" />
                  <span className="text-sm text-black/45 whitespace-nowrap tracking-wide">{brand}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex" style={{ animation: "marqueeRight 22s linear infinite" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex shrink-0">
              {["Progressive Lenses", "Blue-Cut", "Photochromic", "Polarized", "Anti-Reflective", "High-Index", "Bifocal", "Trivex", "Polycarbonate", "Aspheric"].map((cap) => (
                <div key={`${rep}-${cap}`} className="flex items-center gap-6 px-10 py-5 border-r border-black/[0.06] shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/12 shrink-0" />
                  <span className="text-sm text-black/30 whitespace-nowrap tracking-wide">{cap}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="relative pt-32 pb-10 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden">
        <img
          src="/images/footer.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full object-cover object-bottom pointer-events-none select-none"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgb(245,244,240) 0%, rgba(245,244,240,0.92) 18%, rgba(245,244,240,0.55) 35%, transparent 55%)",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-6">
              Ready to find<br />your perfect pair?
            </h2>
            <p className="text-sm text-black/45 leading-relaxed max-w-md mx-auto mb-10">
              Walk in anytime — our team is ready to help you see clearly and look great.
            </p>
            <a
              href="#gallery"
              className="inline-block text-xs px-6 py-3 rounded-xl bg-black text-white hover:bg-black/80 transition-colors tracking-wide mb-8"
            >
              Plan Your Visit
            </a>
            <div className="flex items-center justify-center gap-4">
              <a href="https://www.instagram.com/nileopticals" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 hover:border-black/20 hover:bg-black/[0.03] transition-all" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </a>
              <a href="https://www.facebook.com/nileopticals" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-lg border border-black/10 hover:border-black/20 hover:bg-black/[0.03] transition-all" title="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-8 pt-10 border-t border-black/[0.06]">
            <span className="font-pixel text-xs tracking-[0.25em] text-black/50">NILE OPTICALS</span>

            <div className="grid w-full grid-cols-3 gap-x-6 gap-y-4 text-center md:flex md:w-auto md:flex-wrap md:items-center md:gap-x-8 md:gap-y-3 md:text-left">
              {[
                { label: "Collections", href: "#products" },
                { label: "Eyewear", href: "#types" },
                { label: "Journey", href: "#journey" },
                { label: "Brands", href: "#brands" },
                { label: "About", href: "#why-nile" },
                { label: "Visit", href: "#gallery" },
              ].map(l => (
                <a key={l.label} href={l.href} className="text-xs text-black/35 hover:text-black/70 transition-colors tracking-widest">{l.label}</a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-black/[0.04]">
            <span className="text-xs text-black/20">© {new Date().getFullYear()} Nile Opticals. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
