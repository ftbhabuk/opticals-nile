import Navigation from "@/components/mobile-nav"
import { HeroSection } from "@/components/hero-section"
import { CollectionSection } from "@/components/collection-section"
import { EyewearTypesSection } from "@/components/eyewear-types-section"
import { JourneySection } from "@/components/journey-section"
import { LensBrandSection } from "@/components/lens-brand-section"
import { WhyNileSection } from "@/components/why-nile-section"
import { VisitSection } from "@/components/visit-section"
import { BrandMarquee } from "@/components/brand-marquee"
import { Footer } from "@/components/footer"

export default function App() {
  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <Navigation />
      <HeroSection />
      <CollectionSection />
      <EyewearTypesSection />
      <JourneySection />
      <LensBrandSection />
      <WhyNileSection />
      <VisitSection />
      <BrandMarquee />
      <Footer />
    </div>
  )
}
