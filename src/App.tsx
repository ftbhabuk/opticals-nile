
import { HeroSection } from "@/components/hero-section"
import { CollectionSection } from "@/components/collection-section"
import { EyewearTypesSection } from "@/components/eyewear-types-section"
import { LensBrandSection } from "@/components/lens-brand-section"
import { BrandMarquee } from "@/components/brand-marquee"
import { Footer } from "@/components/footer"

export default function App() {
  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <HeroSection />
      <CollectionSection />
      <EyewearTypesSection />
      <LensBrandSection />
      <BrandMarquee />
      <Footer />
    </div>
  )
}
