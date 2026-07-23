import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"

import { Tag } from "@/components/tag"
import { Footer } from "@/components/footer"

const timeline = [
  {
    step: "01",
    title: "Step Inside",
    description:
      "Walk into our warm, welcoming shop on Newroad, Pokhara. Browse freely, ask questions, and feel at home from the moment you arrive.",
  },
  {
    step: "02",
    title: "Expert Consultation",
    description:
      "Sit down with our experienced opticians who take the time to understand your lifestyle, visual needs, and preferences — no rush, no pressure.",
  },
  {
    step: "03",
    title: "Precision Exam",
    description:
      "Professional vision testing with the latest diagnostic equipment. Every prescription is crafted with exacting accuracy for your clearest vision.",
  },
  {
    step: "04",
    title: "Curated Selection",
    description:
      "Explore 500+ frames from leading global brands. Our team guides you to styles that complement your face shape, skin tone, and personality.",
  },
  {
    step: "05",
    title: "Perfect Fit",
    description:
      "Custom adjustments ensure your eyewear sits comfortably all day. We fine-tune every pair until it feels like it was made for you — because it was.",
  },
  {
    step: "06",
    title: "Lasting Care",
    description:
      "Your journey doesn't end at the counter. We offer free adjustments, cleaning, and after-sales support to keep your vision clear and your frames perfect.",
  },
]

const values = [
  {
    title: "Certified Expertise",
    description:
      "Our team brings years of certified optical experience, ensuring every prescription is accurate and every recommendation is informed.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Curated Selection",
    description:
      "500+ frames from the world's leading brands, displayed in a browsable, well-lit space designed for discovery.",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Community Roots",
    description:
      "Proud to serve Pokhara from our Newroad shop. We're your neighbors, and your eye health is our commitment.",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1400&auto=format&fit=crop",
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

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
        transform: inView ? "translateY(0)" : "translateY(30px)",
        filter: inView ? "blur(0px)" : "blur(4px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function TimelineItem({
  item,
  index,
  isLeft,
}: {
  item: (typeof timeline)[number]
  index: number
  isLeft: boolean
}) {
  const delay = index * 0.1

  return (
    <div
      className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16 mb-16 lg:mb-20 last:mb-0 ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className={`flex-1 ${isLeft ? "lg:text-right" : "lg:text-left"}`}>
        <motion.h3
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: delay + 0.05, ease: EASE }}
          className="text-xl lg:text-2xl font-serif mb-3"
        >
          {item.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: delay + 0.13, ease: EASE }}
          className="text-black/45 leading-relaxed text-sm lg:text-base max-w-md inline-block"
        >
          {item.description}
        </motion.p>
      </div>

      <div className="hidden lg:flex relative z-10 shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay, type: "spring", stiffness: 260, damping: 20 }}
          className="w-11 h-11 rounded-full border border-black/15 bg-white flex items-center justify-center"
        >
          <span className="font-serif text-sm text-black/50">{item.step}</span>
        </motion.div>
      </div>

      <div className="hidden lg:block flex-1" />
    </div>
  )
}

export default function JourneyPage() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      {/* HERO */}
      <section className="relative h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop"
            alt="Nile Opticals shop"
            className="w-full h-full object-cover"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: 16, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-6">
            Your Experience
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] text-balance">
            Your Journey to
            <br />
            Perfect Vision
          </h1>
          <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
            From the moment you step in, every detail is designed for your comfort and clarity.
          </p>
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <p className="text-xs tracking-[0.4em] uppercase text-black/30 mb-6">Welcome</p>
            <p className="text-lg lg:text-xl text-black/50 leading-relaxed">
              At Nile Opticals, we believe choosing eyewear should be a pleasure, not a chore.
              Our shop on Newroad is designed to make you feel at ease — with expert guidance,
              a vast selection, and a commitment to quality that makes us a welcoming name on
              Newroad, Pokhara.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 lg:py-32 bg-black/[0.03]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeUp className="text-center mb-16 lg:mb-24">
            <span className="text-xs tracking-[0.4em] uppercase text-black/30 mb-4 block">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif">The Nile Experience</h2>
          </FadeUp>

          <div ref={timelineRef} className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px overflow-hidden">
              <div className="absolute inset-0 bg-black/[0.06]" />
              <motion.div
                className="absolute inset-0 bg-black/25 origin-top"
                style={{ scaleY: scrollYProgress }}
              />
            </div>

            {timeline.map((item, index) => (
              <TimelineItem key={item.step} item={item} index={index} isLeft={index % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16 lg:mb-24">
            <span className="text-xs tracking-[0.4em] uppercase text-black/30 mb-4 block">
              Why Nile
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif">What Sets Us Apart</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <FadeUp key={value.title} delay={index * 100} className="group">
                <div className="aspect-[5/6] overflow-hidden mb-6 relative rounded-2xl border border-black/[0.07] transition-colors duration-500 group-hover:border-black/[0.14]">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl lg:text-2xl font-serif mb-3">{value.title}</h3>
                <p className="text-black/45 leading-relaxed text-sm lg:text-base">
                  {value.description}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative py-20 lg:py-32 px-6 lg:px-8 bg-black/[0.03] overflow-hidden">
        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 font-serif text-[220px] leading-none text-black/[0.04] select-none">
          &ldquo;
        </span>
        <div className="relative max-w-4xl mx-auto text-center">
          <FadeUp>
            <blockquote>
              <p className="text-2xl lg:text-4xl font-serif leading-relaxed mb-8 text-balance text-black/80">
                &ldquo;Great vision is a right, not a luxury. Every pair we sell is backed by
                expertise, care, and a promise to see you clearly.&rdquo;
              </p>
              <cite className="not-italic">
                <span className="block text-sm tracking-[0.2em] uppercase text-black/30">
                  — Nile Opticals, Pokhara
                </span>
              </cite>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* VISIT US */}
      <section id="gallery" className="py-20 lg:py-32 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <div className="mb-4">
              <Tag>VISIT US</Tag>
            </div>
            <h2 className="text-3xl lg:text-5xl font-serif text-balance">
              Come see us on Newroad, Pokhara.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="md:row-span-3 rounded-2xl overflow-hidden border border-black/[0.07] h-[300px] md:h-full">
              <img
                src="https://images.unsplash.com/photo-1776950227879-6e3b44cbe830?q=80&w=1400&auto=format&fit=crop"
                alt="Nile Opticals shop interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="https://images.unsplash.com/photo-1641810780759-2e5cd4569da3?q=80&w=987&auto=format&fit=crop"
                alt="Frames display"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="https://plus.unsplash.com/premium_photo-1700822899973-6ca101047daa?q=80&w=987&auto=format&fit=crop"
                alt="Shop entrance"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/[0.07] h-[250px]">
              <img
                src="https://plus.unsplash.com/premium_photo-1661299306807-d93a1b0d3a2d?q=80&w=2600&auto=format&fit=crop"
                alt="Optical shop display"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-black/[0.07] bg-white p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-light mb-2">Location</h3>
                <p className="text-sm text-black/45 leading-relaxed mb-4">
                  Pokhara 9, Newroad, 18th Street
                  <br />
                  Purnima Marga
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
                  Mon – Sat: 10:00 AM – 8:00 PM
                  <br />
                  Sunday: 11:00 AM – 7:00 PM
                </p>
              </div>
              <div>
                <p className="text-xs text-black/30 uppercase tracking-widest mb-2">Contact</p>
                <p className="text-sm text-black/45 leading-relaxed">
                  <a href="tel:061520XXXX" className="hover:text-black/70 transition-colors">
                    061-520-XXXX
                  </a>
                  <br />
                  <a
                    href="https://wa.me/9779841XXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black/70 transition-colors"
                  >
                    WhatsApp: +977-9841-XXXXX
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer reveal />
    </div>
  )
}
