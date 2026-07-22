import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import Navigation from "@/components/mobile-nav"
import { ProductCard, type Product } from "@/components/product-card"
import { Footer } from "@/components/footer"

const products: Product[] = [
  {
    id: "classic-acetate",
    name: "Classic Acetate Frames",
    price: 4500,
    image: "https://images.unsplash.com/photo-1711564354334-ee51baa830c2?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop",
    category: "Prescription",
  },
  {
    id: "aviator-sun",
    name: "Gold Aviator Sunglasses",
    price: 6200,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    category: "Sunglasses",
  },
  {
    id: "titanium-wire",
    name: "Titanium Wireframes",
    price: 7800,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?q=80&w=800&auto=format&fit=crop",
    category: "Lightweight",
  },
  {
    id: "blue-light",
    name: "Blue-Light Specs",
    price: 3900,
    image: "https://images.unsplash.com/photo-1741332528297-219f88563345?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop",
    category: "Computer",
  },
  {
    id: "tortoise-statement",
    name: "Tortoise Statement",
    price: 9500,
    image: "https://images.unsplash.com/photo-1747640730472-3070d5ed690d?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1614715838608-dd527c46231d?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
  },
  {
    id: "polarized-outdoor",
    name: "Polarized Outdoor",
    price: 5500,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
    category: "Sport",
  },
  {
    id: "retro-round",
    name: "Retro Round Frames",
    price: 4100,
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?q=80&w=800&auto=format&fit=crop",
    category: "Vintage",
  },
  {
    id: "slim-metal",
    name: "Slim Metal Frame",
    price: 5300,
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    category: "Minimal",
  },
  {
    id: "cat-eye",
    name: "Cat-Eye Statement",
    price: 6800,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
  },
  {
    id: "clip-on",
    name: "Clip-On Sunglasses",
    price: 3200,
    image: "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop",
    category: "Convertible",
  },
  {
    id: "kids-safe",
    name: "Kids Safe Frames",
    price: 2800,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop",
    category: "Children",
  },
  {
    id: "premium-acetate",
    name: "Premium Acetate",
    price: 12000,
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1711564354334-ee51baa830c2?q=80&w=800&auto=format&fit=crop",
    category: "Premium",
  },
]

const categories = ["All", ...new Set(products.map((p) => p.category))]

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <Navigation />

      {/* HERO */}
      <section className="relative h-[50vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1613323596828-e32ce27e52b3?q=80&w=2000&auto=format&fit=crop"
            alt="The Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
          style={{
            opacity: 1,
            transform: "translateY(0)",
            transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
          }}
        >
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-6">Collection</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] text-balance">
            Browse Our Frames
          </h1>
          <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
            Timeless pieces crafted with intention. 500+ styles in-store.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-xs tracking-widest uppercase transition-all duration-300 pb-1 border-b-2 ${
                  activeCategory === category
                    ? "border-black text-black"
                    : "border-transparent text-black/30 hover:text-black/60"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM ORDER */}
      <section className="border-t border-black/[0.06] py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-black/30 mb-4">Custom Order</p>
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-balance">
            Want something different?
          </h2>
          <p className="text-black/45 leading-relaxed max-w-lg mx-auto mb-8">
            Don&rsquo;t see what you&rsquo;re looking for? We can source specific frames, lenses, and
            prescription types. Just give us a call.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:061520XXXX"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase border-b border-black/80 pb-1 hover:gap-4 transition-all duration-300"
            >
              Call 061-520-XXXX
            </a>
            <span className="hidden sm:inline text-black/20">/</span>
            <a
              href="https://wa.me/9779841XXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase border-b border-black/80 pb-1 hover:gap-4 transition-all duration-300"
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
