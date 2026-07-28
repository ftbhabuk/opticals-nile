import { Footer } from "@/components/footer"
import { Seo, BreadcrumbJsonLd } from "@/src/components/Seo"

export default function TermsPage() {
  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <Seo
        title="Terms & Conditions — Nile Opticals Pokhara"
        description="Terms and conditions for Nile Opticals, New Road, Pokhara. Information about our eyewear products, services, and store policies."
        canonicalPath="/terms"
        ogImage="/images/og-image.png"
        ogType="website"
        jsonLd={BreadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Terms", href: "/terms" }])}
      />

      <section className="py-28 lg:py-36 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.32em] uppercase text-black/30 mb-6 text-center">Legal</p>
          <h1 className="text-4xl lg:text-6xl font-serif text-center mb-4">Terms & Conditions</h1>
          <p className="text-black/45 text-center text-sm mb-16 max-w-lg mx-auto leading-relaxed">
            By visiting or making a purchase from Nile Opticals, you agree to the following terms.
          </p>

          <div className="space-y-10 text-sm text-black/60 leading-relaxed">
            <div>
              <h2 className="text-lg font-medium text-black mb-3">Products & Pricing</h2>
              <p>All prices are listed in Nepalese Rupees (NPR) and are subject to change without notice. We make every effort to ensure accuracy, but in the event of a pricing error we reserve the right to cancel or adjust the order.</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-black mb-3">Prescriptions</h2>
              <p>A valid prescription from a licensed optometrist or ophthalmologist is required for corrective lenses. Nile Opticals offers in-store eye exams for your convenience.</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-black mb-3">Returns & Exchanges</h2>
              <p>Prescription eyewear is custom-made and cannot be returned or exchanged unless there is a manufacturing defect. Non-prescription sunglasses and frames may be exchanged within 7 days of purchase with original receipt.</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-black mb-3">Warranty</h2>
              <p>All frames come with a manufacturer's warranty against defects in materials and workmanship. Lens coatings carry a 6-month warranty. Damage due to misuse, accidents, or normal wear is not covered.</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-black mb-3">Privacy</h2>
              <p>Your personal and medical information is kept confidential and will not be shared with third parties without your consent, except as required by law.</p>
            </div>
            <div>
              <h2 className="text-lg font-medium text-black mb-3">Contact</h2>
              <p>For questions about these terms, visit us at our shop near Kumari Bank Ltd., New Road, Pokhara, or reach us by phone or WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
