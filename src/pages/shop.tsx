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

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)"

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView(0.15)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        filter: inView ? "blur(0px)" : "blur(4px)",
        transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.8s ${EASE} ${delay}ms, filter 0.8s ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="bg-white text-[#111] min-h-screen font-sans antialiased">
      <Navigation />

      {/* HERO */}
      <section className="relative h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=2000&auto=format&fit=crop"
            alt="Our frames collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-white/60 mb-6">Collection</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-[1.1] text-balance">
            Browse Our Frames
          </h1>
          <p className="text-white/70 text-lg lg:text-xl leading-relaxed">
            500+ styles in-store. Every frame fitted with care.
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="py-20 lg:py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-[11px] tracking-[0.22em] uppercase text-black/35 mb-4">Selection</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight mb-4">
              Find your fit
            </h2>
            <p className="text-sm text-black/45 leading-relaxed max-w-md mx-auto">
              Browse below, then visit our shop to try them on in person.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} {...product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM ORDER */}
      <section id="custom" className="py-20 lg:py-32 px-6 lg:px-8 bg-black/[0.03]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="rounded-2xl border border-black/[0.07] bg-white p-10 md:p-14">
              <p className="text-xs tracking-[0.4em] uppercase text-black/30 mb-4">Custom Order</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-balance">
                Want something different?
              </h2>
              <p className="text-black/45 leading-relaxed text-base md:text-lg max-w-lg mx-auto mb-10">
                Don&rsquo;t see what you&rsquo;re looking for? We can source specific frames, lenses, and
                prescription types. Just give us a call or drop by the shop.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:061520XXXX"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black text-white text-xs tracking-wider uppercase hover:bg-black/80 transition-all duration-300"
                >
                  Call 061-520-XXXX
                </a>
                <a
                  href="https://wa.me/9779841XXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-black/20 text-black text-xs tracking-wider uppercase hover:bg-black/[0.03] transition-all duration-300"
                >
                  Message on WhatsApp
                </a>
              </div>
              <p className="mt-6 text-xs text-black/30">
                Walk-ins welcome &middot; Pokhara 9, Newroad, 18th Street
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  )
}
