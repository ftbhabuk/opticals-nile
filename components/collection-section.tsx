import { ProductCard, type Product } from "@/components/product-card"
import { useInView } from "@/hooks/use-in-view"

const products: Product[] = [
  {
    id: "classic-acetate",
    name: "Classic Acetate Frames",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1711564354334-ee51baa830c2?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=800&auto=format&fit=crop",
    category: "Prescription",
  },
  {
    id: "aviator-sun",
    name: "Gold Aviator Sunglasses",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    category: "Sunglasses",
  },
  {
    id: "titanium-wire",
    name: "Titanium Wireframes",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?q=80&w=800&auto=format&fit=crop",
    category: "Lightweight",
  },
  {
    id: "blue-light",
    name: "Blue-Light Specs",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1741332528297-219f88563345?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=800&auto=format&fit=crop",
    category: "Computer",
  },
  {
    id: "tortoise-statement",
    name: "Tortoise Statement",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1747640730472-3070d5ed690d?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1614715838608-dd527c46231d?q=80&w=800&auto=format&fit=crop",
    category: "Fashion",
  },
  {
    id: "polarized-outdoor",
    name: "Polarized Outdoor",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop",
    category: "Sport",
  },
]

export function CollectionSection() {
  const { ref: headerRef, inView: headerInView } = useInView(0.15)
  const { ref: ctaRef, inView: ctaInView } = useInView(0.15)

  return (
    <section id="products" className="py-24 lg:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          ref={headerRef}
          className="text-center mb-16 lg:mb-24"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p className="text-[11px] tracking-[0.22em] uppercase text-black/35 mb-4">
            Our Collection
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4">
            Curated Selection
          </h2>
          <p className="text-sm text-black/45 leading-relaxed max-w-md mx-auto">
            Frames for every face, lifestyle, and prescription — tried on with care in store.
          </p>
        </div>

        {/* Asymmetrical product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:pt-12">
            <ProductCard {...products[0]} index={0} />
          </div>
          <div>
            <ProductCard {...products[1]} index={1} />
          </div>
          <div className="lg:pt-24">
            <ProductCard {...products[2]} index={2} />
          </div>

          <div>
            <ProductCard {...products[3]} index={3} />
          </div>
          <div className="lg:pt-16">
            <ProductCard {...products[4]} index={4} />
          </div>
          <div className="lg:-mt-8">
            <ProductCard {...products[5]} index={5} />
          </div>
        </div>

        <div
          ref={ctaRef}
          className="text-center mt-16 lg:mt-24"
          style={{
            opacity: ctaInView ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          <a
            href="#gallery"
            className="inline-flex items-center text-xs tracking-[0.2em] uppercase border-b border-black/80 pb-1 hover:border-transparent transition-colors duration-300"
          >
            Visit to Try On
          </a>
        </div>
      </div>
    </section>
  )
}
