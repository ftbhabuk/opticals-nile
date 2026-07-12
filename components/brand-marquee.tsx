export function BrandMarquee() {
  return (
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
  )
}
