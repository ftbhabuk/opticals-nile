import { Instagram, Facebook } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import type { ReactNode, FormEvent } from "react"

const footerLinks = {
  explore: [
    { label: "Collections", href: "#products" },
    { label: "Eyewear Types", href: "#types" },
    { label: "Lenses & Brands", href: "#brands" },
    { label: "Prescription Frames", href: "#types" },
    { label: "Sunglasses", href: "#types" },
  ],
  about: [
    { label: "Our Journey", href: "#journey" },
    { label: "Why Nile", href: "#why-nile" },
    { label: "Visit the Shop", href: "#gallery" },
    { label: "Newroad, Pokhara", href: "#gallery" },
  ],
  visit: [
    { label: "Location & Hours", href: "#gallery" },
    { label: "Call Us", href: "tel:061520XXXX" },
    {
      label: "WhatsApp",
      href: "https://wa.me/9779841XXXXX",
      external: true,
    },
    {
      label: "Get Directions",
      href: "https://www.google.com/maps/dir//Pokhara+9,+Newroad,+18th+Street,+Purnima+Marga",
      external: true,
    },
  ],
}

function FooterColumn({
  title,
  links,
  delay = 0,
}: {
  title: string
  links: { label: string; href: string; external?: boolean }[]
  delay?: number
}) {
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <h4 className="text-xs tracking-[0.2em] uppercase mb-6 text-white/50">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-sm text-white/75 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function Footer() {
  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Newsletter */}
          <FadeIn className="lg:col-span-1">
            <h3 className="text-xl font-light tracking-tight mb-4">Stay Connected</h3>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Subscribe for new frame arrivals, lens tips, and updates from our Newroad shop.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full bg-transparent border-0 border-b border-white/25 py-3 pr-24 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-xs tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </FadeIn>

          <FooterColumn title="Explore" links={footerLinks.explore} delay={100} />
          <FooterColumn title="About" links={footerLinks.about} delay={200} />
          <FooterColumn title="Visit" links={footerLinks.visit} delay={300} />
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="font-pixel text-xs tracking-[0.3em] uppercase text-white/90 hover:text-white transition-colors"
            >
              Nile Opticals
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/nileopticals"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 stroke-[1.5]" />
              </a>
              <a
                href="https://www.facebook.com/nileopticals"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/40">
            <span>Pokhara 9 · Newroad · 18th Street</span>
            <span>© {new Date().getFullYear()} Nile Opticals. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
