export function Footer() {
  return (
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
  )
}
