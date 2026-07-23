import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { categories, products } from "@/src/data/products"

const EASE = [0.16, 1, 0.3, 1] as const
const shopCategories = categories.filter((category) =>
  ["All", "Prescription", "Sunglasses", "Lightweight", "Computer", "Fashion", "Premium"].includes(category)
)

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [catalogReady, setCatalogReady] = useState(false)

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)

  useEffect(() => {
    setCatalogReady(false)

    const handle = window.setTimeout(() => {
      setCatalogReady(true)
    }, 420)

    return () => window.clearTimeout(handle)
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-[#F8F4ED] text-[#111] antialiased">
      {/* HERO */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden lg:h-[80vh]">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1615468822882-4828d2602857?q=80&w=2000&auto=format&fit=crop"
            alt="The Nile Collection"
            className="h-full w-full object-cover"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: 16, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/60">Collection</p>
          <h1 className="mb-6 font-serif text-4xl leading-[1.1] text-white text-balance md:text-6xl lg:text-7xl">
            The Nile Collection
          </h1>
          <p className="text-lg leading-relaxed text-white/70 lg:text-xl">
            Timeless pieces crafted with intention. 500+ styles in-store.
          </p>
        </motion.div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="sticky top-0 z-30 border-b border-black/[0.08] bg-[#F8F4ED]/92 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <nav className="mx-auto flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full border border-black/[0.08] bg-white/58 p-1 shadow-[0_12px_40px_rgba(20,17,13,0.06)] backdrop-blur-xl">
            {shopCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#111] text-white shadow-sm"
                    : "text-black/45 hover:bg-white/70 hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* FEATURED EDIT */}
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 border-b border-black/[0.08] pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#8D7148]">
              Current edit
            </p>
            <h2 className="font-serif text-4xl leading-[1.05] text-balance md:text-5xl">
              A focused selection from 500+ in-store frames.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["12", "online highlights"],
              ["500+", "frames in-store"],
              ["6", "lens families"],
            ].map(([value, label]) => (
              <div key={label} className="border-t border-[#C9A46A]/35 pt-4">
                <p className="font-serif text-3xl">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-black/38">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section id="catalog" className="px-6 pb-20 md:px-12 lg:px-20 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-[11px] uppercase tracking-[0.22em] text-black/38">
              {filteredProducts.length} {filteredProducts.length === 1 ? "style" : "styles"} shown
            </p>
            <p className="text-sm text-black/45">
              Prices shown are starting prices. Final lens pricing depends on prescription.
            </p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {!catalogReady ? (
              <motion.div
                key="catalog-skeleton"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-black/[0.06] bg-white/70 p-4 shadow-[0_12px_32px_rgba(20,17,13,0.04)]">
                      <Skeleton className="h-full w-full rounded-[14px] bg-black/[0.05]" />
                      <div className="absolute left-4 top-4">
                        <Skeleton className="h-6 w-20 rounded-full bg-black/[0.05]" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Skeleton className="mb-3 h-4 w-24 rounded-full bg-black/[0.05]" />
                        <Skeleton className="mb-2 h-6 w-3/4 rounded-full bg-black/[0.05]" />
                        <Skeleton className="h-4 w-1/2 rounded-full bg-black/[0.05]" />
                      </div>
                    </div>
                    <div className="mt-5 border-t border-black/[0.08] pt-5">
                      <Skeleton className="mb-3 h-3 w-28 rounded-full bg-black/[0.05]" />
                      <div className="flex items-start justify-between gap-4">
                        <Skeleton className="h-7 w-40 rounded-full bg-black/[0.05]" />
                        <Skeleton className="mt-1 h-4 w-16 rounded-full bg-black/[0.05]" />
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <Skeleton className="h-3 w-24 rounded-full bg-black/[0.05]" />
                        <Skeleton className="h-3 w-20 rounded-full bg-black/[0.05]" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="catalog-products"
                layout
                className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      <ProductCard {...product} index={index} variant="light" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CUSTOM ORDER */}
      <section id="custom" className="border-t border-black/[0.06] bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-black/30">Custom Order</p>
          <h2 className="mb-6 font-serif text-3xl text-balance md:text-4xl">
            Want something different?
          </h2>
          <p className="mx-auto mb-8 max-w-lg leading-relaxed text-black/45">
            Don&rsquo;t see what you&rsquo;re looking for? We can source specific frames, lenses, and
            prescription types. Just give us a call.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:061520XXXX"
              className="inline-flex items-center gap-2 border-b border-black/80 pb-1 text-sm uppercase tracking-widest transition-all duration-300 hover:gap-4"
            >
              Call 061-520-XXXX
            </a>
            <span className="hidden text-black/20 sm:inline">/</span>
            <a
              href="https://wa.me/9779841XXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-black/80 pb-1 text-sm uppercase tracking-widest transition-all duration-300 hover:gap-4"
            >
              Message on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-xs text-black/30">
            Walk-ins welcome &middot; Pokhara 9, Newroad, 18th Street
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
