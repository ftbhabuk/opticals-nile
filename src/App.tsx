
import { HeroSection } from "@/components/hero-section"
import { CollectionSection } from "@/components/collection-section"
import { EyewearTypesSection } from "@/components/eyewear-types-section"
import { LensBrandSection } from "@/components/lens-brand-section"
import { BrandMarquee } from "@/components/brand-marquee"
import { Footer } from "@/components/footer"
import { Seo, LocalBusinessJsonLd } from "@/src/components/Seo"

export default function App() {
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://nileopticals.com"

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <Seo
        title="Nile Opticals — Premium Eyewear & Medical Eye Care in Pokhara"
        description="Crystal clear vision for everyone. Premium eyeglasses, designer sunglasses, and certified eye care on Newroad, Pokhara. 15+ years trusted service with 500+ frame styles."
        canonicalPath="/"
        ogImage="/images/landing.png"
        ogType="website"
        jsonLd={LocalBusinessJsonLd(siteUrl)}
      />
      <HeroSection />
      <CollectionSection />
      <EyewearTypesSection />
      <LensBrandSection />
      <BrandMarquee />
      <Footer />
    </div>
  )
}
