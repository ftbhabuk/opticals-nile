import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Footer } from "@/components/footer"
import { Seo, BreadcrumbJsonLd, FaqJsonLd } from "@/src/components/Seo"

const faqs = [
  {
    question: "Where can I buy luxury designer sunglasses in Pokhara?",
    answer: "At Nile Opticals on New Road, Pokhara. We carry 500+ premium frames from brands like Prada, Gucci, Burberry, Versace, Oakley, Dolce & Gabbana, and Emporio Armani — both sunglasses and prescription eyewear.",
  },
  {
    question: "What premium eyewear brands do you carry?",
    answer: "We stock designer frames from Prada, Gucci, Burberry, Versace, Dolce & Gabbana, Emporio Armani, Oakley, Ray-Ban, Cartier, and more. Every pair is 100% authentic with warranty.",
  },
  {
    question: "Do you sell polarized sunglasses in Pokhara?",
    answer: "Yes. Our polarized collection offers 99% UV protection with scratch-resistant lenses. Perfect for driving, trekking, and daily wear in Pokhara's bright conditions.",
  },
  {
    question: "What frame materials do you offer?",
    answer: "Italian acetate, brushed titanium, lightweight stainless steel, handcrafted metal alloys, and premium TR90. Each chosen for durability, comfort, and style.",
  },
  {
    question: "Can I get prescription lenses in designer frames?",
    answer: "Absolutely. Any frame in our shop can be fitted with prescription lenses — including progressive, blue-cut, and photochromic options. Most orders ready within 24–48 hours.",
  },
  {
    question: "How long does custom eyewear take?",
    answer: "Prescription glasses are typically ready in 24 to 48 hours. Custom or specialty lens orders may take 3–5 days. We'll keep you updated throughout the process.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "Cash, credit cards, UPI, and mobile banking. Visit us near Kumari Bank Ltd. on New Road, Pokhara.",
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-colors hover:border-black/[0.12]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-6 py-5 text-sm lg:text-base font-medium tracking-tight text-black/80 text-left"
      >
        {question}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-black/30 text-xs shrink-0 ml-4"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-black/45 leading-relaxed -mt-1">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqPage() {
  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <Seo
        title="Frequently Asked Questions — Nile Opticals Pokhara"
        description="Answers about luxury designer sunglasses, premium eyewear brands, polarized lenses, frame materials, and prescription services at Nile Opticals on New Road, Pokhara."
        canonicalPath="/faq"
        ogImage="/images/og-image.png"
        ogType="website"
        jsonLd={[BreadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "FAQ", href: "/faq" }]), FaqJsonLd(faqs)]}
      />

      <section className="py-28 lg:py-36 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.32em] uppercase text-black/30 mb-6 text-center">Frequently Asked</p>
          <h1 className="text-4xl lg:text-6xl font-serif text-center mb-4">Quick Answers</h1>
          <p className="text-black/45 text-center text-sm mb-16 max-w-lg mx-auto leading-relaxed">
            Everything about luxury eyewear, designer frames, and shopping with us on New Road, Pokhara.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
