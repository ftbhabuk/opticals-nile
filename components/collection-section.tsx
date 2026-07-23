import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ProductCard, type Product } from "@/components/product-card"

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
  return (
    <section id="products" className="bg-black/[0.02] py-24 lg:py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24 pb-10 border-b border-black/[0.06]"
        >
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-black/30 mb-4">
              Pokhara — Prescription &amp; Sun
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#111]">
              Seen Clearly
            </h2>
          </div>
          <div className="max-w-xs lg:text-right">
            <p className="text-sm text-black/45 leading-relaxed mb-4">
              Six frames, fitted by hand at our Pokhara atelier — from correctives to statement sun.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-black/50 border-b border-black/20 pb-1 hover:border-black/60 hover:text-black/80 transition-colors duration-300"
            >
              View Full Collection →
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {products.map((product, i) => (
           <ProductCard key={product.id} {...product} index={i} variant="dark" />
          ))}
        </div>
      </div>
    </section>
  )
}