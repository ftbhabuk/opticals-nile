
import { HeroSection } from "@/components/hero-section"
import { CollectionSection } from "@/components/collection-section"
import { EyewearTypesSection } from "@/components/eyewear-types-section"
import { LensBrandSection } from "@/components/lens-brand-section"
import { BrandMarquee } from "@/components/brand-marquee"
import { Footer } from "@/components/footer"
import { Seo, LocalBusinessJsonLd, WebSiteJsonLd, BreadcrumbJsonLd } from "@/src/components/Seo"

export default function App() {
  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <Seo
        title="Nile Opticals — Luxury Designer Eyewear in Pokhara"
        description="Premium designer frames and sunglasses from Prada, Gucci, Burberry, and more. 500+ authentic styles on New Road, Pokhara."
        canonicalPath="/"
        ogImage="/images/og-image.png"
        ogType="website"
        jsonLd={[LocalBusinessJsonLd(), WebSiteJsonLd(), BreadcrumbJsonLd([{ label: "Home", href: "/" }])]}
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
