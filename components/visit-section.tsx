import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { Tag } from "@/components/tag"
import { BentoCard } from "@/components/bento-card"

export function VisitSection() {
  return (
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
  )
}
