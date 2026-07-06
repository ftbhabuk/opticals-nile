import React, { useRef, useEffect, useState, useCallback } from "react"

import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { StackingAgentCards } from "@/components/stacking-agent-cards"
import  Navigation  from "@/components/mobile-nav"
import { JourneySection } from "@/components/journey-section"

// ─── Intersection Observer hook ──────────────────────────────────────────────
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

// ─── Animated counter ────────────────────────────────────────────────────────
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

// ─── Bento card ──────────────────────────────────────────────────────────────
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
      {/* Hover glow spot */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 60%)" }}
      />
      {children}
    </div>
  )
}

// ─── Pill tag ─────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
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

      {/* ── STICKY NAV ────────────────────────────────────────────────────── */}
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen overflow-hidden">

        {/* 3D pattern background */}
        <img
          src="https://wallpaperaccess.com/full/358942.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            transform: "scale(1.05)",
          }}
        />

        {/* Progressive blur + light gradient rising from bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "65%", background: "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 18%, rgba(245,244,240,0.85) 35%, rgba(245,244,240,0.5) 55%, rgba(245,244,240,0.15) 75%, transparent 100%)" }} />
        {/* Backdrop blur layers — progressively lighter toward top */}
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "20%", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "38%", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "55%", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />

        {/* Spacer so hero content doesn't sit under the fixed nav */}
        <div className="h-20" />

        {/* Title + metrics — anchored to bottom left */}
        <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col px-6 md:px-12 pb-12 max-w-3xl">
          {/* Title */}
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
            Precision with<br />presence.
          </h1>

          {/* 3 metrics — staggered after title */}
          <div className="flex gap-8 sm:gap-12">
            {[
              { value: "15+", label: "Years" },
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Frame Styles" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  opacity: heroReady ? 1 : 0,
                  filter: heroReady ? "blur(0px)" : "blur(16px)",
                  transform: heroReady ? "translateY(0px)" : "translateY(20px)",
                  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${120 + i * 80}ms, filter 0.8s cubic-bezier(0.16,1,0.3,1) ${120 + i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${120 + i * 80}ms`,
                }}
              >
                <div className="text-3xl sm:text-4xl text-[#111] font-light tracking-tight" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>{stat.value}</div>
                <div className="text-xs text-black/40 tracking-widest uppercase mt-1" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT COLLECTION ──────────────────────────────────────────────── */}
      <section id="products" className="py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>OUR COLLECTION</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
              {"Frames for every\nfaceshape & lifestyle."}
            </RevealText>
          </div>

          <div className="grid grid-cols-12 grid-rows-auto gap-3" onMouseMove={handleMouse}>
            <BentoCard className="col-span-12 p-8 min-h-[200px] flex flex-col justify-between relative overflow-hidden" delay={0}>
              <img
                src="/images/spectacles-showcase.png"
                alt="Eyewear collection"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 70%" }}
              />
              <div className="absolute inset-0" style={{
                maskImage: "linear-gradient(to bottom, transparent 45%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 45%, black 100%)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }} />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 35%, rgba(245,244,240,0.3) 50%, rgba(245,244,240,0.75) 65%, rgba(245,244,240,0.95) 80%, rgb(245,244,240) 100%)",
                }}
              />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl border border-black/10 bg-white/60 flex items-center justify-center mb-6" style={{ backdropFilter: "blur(8px)" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="1"/><path d="M12 2c-2.5 3-8 4-8 9s5.5 7 8 10c2.5-3 8-5 8-10s-5.5-6-8-9z"/></svg>
                </div>
                <h3 className="text-xl font-light mb-3">Designer Collections</h3>
                <p className="text-sm text-black/45 leading-relaxed max-w-sm">
                  Curated eyewear from premium international brands. From classic elegance to modern innovation, find your perfect frame.
                </p>
              </div>
            </BentoCard>

            <BentoCard className="col-span-12 md:col-span-4 p-8 min-h-[200px]" delay={120}>
              <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h3 className="text-lg font-light mb-2">Vision Testing</h3>
              <p className="text-sm text-black/45 leading-relaxed">Professional eye exams with latest technology. Medical-grade precision for perfect prescriptions.</p>
            </BentoCard>

            <BentoCard className="col-span-12 md:col-span-4 p-8 min-h-[200px]" delay={160}>
              <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              </div>
              <h3 className="text-lg font-light mb-2">Custom Fittings</h3>
              <p className="text-sm text-black/45 leading-relaxed">Expert fitting and adjustments. Personalized comfort to suit your unique face shape.</p>
            </BentoCard>

            <BentoCard className="col-span-12 md:col-span-4 p-8 min-h-[200px]" delay={200}>
              <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
              <h3 className="text-lg font-light mb-2">Lifetime Support</h3>
              <p className="text-sm text-black/45 leading-relaxed">Free adjustments, cleaning, and maintenance. We care for your glasses as much as you do.</p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── EYEWEAR TYPES ───────────────────────────────────────────────────── */}
      <section id="types" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <PixelIcon type="agents" size={40} />
              <div className="mt-4"><Tag>EYEWEAR TYPES</Tag></div>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Every style for\nevery moment."}
              </RevealText>
            </div>
            <p className="text-sm text-black/45 leading-relaxed max-w-xs">
              From prescription glasses to sunglasses, premium frames to sports eyewear. Discover what suits your lifestyle best.
            </p>
          </div>

          <StackingAgentCards />
        </div>
      </section>

      {/* ── YOUR VISION JOURNEY ──────────────────────────────────────────────── */}
      <JourneySection />

      {/* ── BRANDS & EXPERTISE ──────────────────────────────────────────────── */}
      <section id="brands" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
            <div>
              <PixelIcon type="integrations" size={40} />
              <div className="mt-4"><Tag>TRUSTED BRANDS</Tag></div>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Premium brands.\nMedical expertise."}
              </RevealText>
            </div>
            <p className="text-sm text-black/45 leading-relaxed max-w-xs">
              We collect the world&apos;s finest eyewear manufacturers and Certified optometrists
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-black/[0.07] flex flex-col md:block md:relative" onMouseMove={handleMouse}>
            <div className="relative w-full h-[280px] md:h-[480px] shrink-0">
              <img
                src="/images/spectacles-showcase.png"
                alt="Premium eyewear collection"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col gap-3 p-4 md:absolute md:bottom-4 md:right-4 md:p-0 md:w-72">
              <div
                className="rounded-xl border border-white/50 p-6"
                style={{
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  background: "rgba(255,255,255,0.60)",
                }}
              >
                <Tag>CERTIFIED</Tag>
                <h3 className="mt-3 text-lg font-light mb-2">Medical expertise</h3>
                <p className="text-xs text-black/45 leading-relaxed">Licensed optometrists with 15+ years experience. ISO certified clinic with latest diagnostic technology.</p>
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
                  <span className="text-xs text-black/40 tracking-widest">QUALITY</span>
                </div>
                <p className="text-sm text-black/45">Premium lens coatings, scratch-resistant, anti-glare options. Only the best for your eyes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NILE OPTICALS ────────────────────────────────────────────────── */}
      <section id="why-nile" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>WHY NILE OPTICALS</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Trusted by thousands\nin Pokhara."}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-sm text-black/45 leading-relaxed">
                We&apos;ve been helping families see clearly and live better for over 15 years.
              </p>

              <div className="space-y-4">
                {[
                  { label: "Certified Optometrists", desc: "Medical-grade eye care with professional expertise" },
                  { label: "Premium Collections", desc: "500+ international brands and custom frames available" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-1 bg-black/10 rounded-full shrink-0" />
                    <div>
                      <h3 className="text-sm font-light mb-1">{item.label}</h3>
                      <p className="text-xs text-black/35">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR SHOP ──────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>OUR SPACE</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Visit us at\nPokhara, Newroad."}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:row-span-2 rounded-2xl overflow-hidden border border-black/[0.07] h-[300px] md:h-full">
              <img
                src="/images/shop-interior-1.png"
                alt="Nile Opticals shop interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="/images/shop-interior-2.png"
                alt="Frames display"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="/images/shop-interior-3.png"
                alt="Shop entrance"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <BentoCard className="p-8" delay={0}>
            <div className="space-y-6">
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
                    View in Map
                  </a>
                  <a
                    href="https://www.google.com/maps/dir//Pokhara+9,+Newroad,+18th+Street,+Purnima+Marga"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-light border border-black/20 rounded-lg hover:border-black/40 hover:bg-black/[0.02] transition-colors"
                  >
                    Directions
                  </a>
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-xs text-black/30 uppercase tracking-widest mb-1">Hours</p>
                  <p className="text-sm text-black/45">Mon - Sat: 10:00 AM - 8:00 PM<br />Sunday: 11:00 AM - 7:00 PM</p>
                </div>
                <div>
                  <p className="text-xs text-black/30 uppercase tracking-widest mb-1">Contact</p>
                  <p className="text-sm text-black/45">📞 061-520-XXXX<br />WhatsApp: +977-9841-XXXXX</p>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── FEATURED BRANDS ──────────────────────────────────────────────────── */}
      <section className="py-0 border-t border-black/[0.06] overflow-hidden select-none">
        <div className="flex border-b border-black/[0.06]" style={{ animation: "marqueeLeft 28s linear infinite" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex shrink-0">
              {["Prada", "Ray-Ban", "Gucci", "Oakley", "Tom Ford", "Burberry", "Versace", "Cartier", "Rolex", "Coach"].map((brand) => (
                <div key={brand} className="flex items-center gap-6 px-10 py-5 border-r border-black/[0.06] shrink-0">
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
                <div key={cap} className="flex items-center gap-6 px-10 py-5 border-r border-black/[0.06] shrink-0">
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
              Ready to see<br />the world clearly?
            </h2>
            <p className="text-sm text-black/45 leading-relaxed max-w-md mx-auto mb-10">
              Visit Nile Opticals on Newroad, Pokhara for your free eye consultation and find your perfect frames.
            </p>
            <div className="flex flex-col items-center gap-3 text-xs text-black/40">
              <div className="flex items-center gap-4">
                <a href="tel:061520XXXX" className="hover:text-black/70 transition-colors">
                  📞 061-520-XXXX
                </a>
                <span className="text-black/20">|</span>
                <a href="https://wa.me/9779841XXXXX" target="_blank" rel="noopener noreferrer" className="hover:text-black/70 transition-colors">
                  WhatsApp: +977-9841-XXXXX
                </a>
              </div>
              <p className="font-light">Mon - Sat: 10:00 AM - 8:00 PM</p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
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

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-10 border-t border-black/[0.06]">
            <span className="font-pixel text-xs tracking-[0.25em] text-black/50">NILE OPTICALS</span>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { label: "Collections",  href: "#products" },
                { label: "Eyewear",      href: "#types" },
                { label: "Journey",      href: "#journey" },
                { label: "Brands",       href: "#brands" },
                { label: "About",        href: "#why-nile" },
              ].map(l => (
                <a key={l.label} href={l.href} className="text-xs text-black/35 hover:text-black/70 transition-colors tracking-widest">{l.label}</a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-black/[0.04]">
            <span className="text-xs text-black/20">© 2009-{new Date().getFullYear()} Nile Opticals. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
