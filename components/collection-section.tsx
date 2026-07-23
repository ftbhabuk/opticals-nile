import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { featuredProducts } from "@/src/data/products"

const notes = ["Hand-fitted in Pokhara", "Prescription and sun", "500+ frames in-store"]

const showroomImages = [
  {
    src: "/images/spectacles-showcase.png",
    alt: "Premium eyewear display at Nile Opticals",
  },
  {
    src: "/images/shop-interior-2.png",
    alt: "Nile Opticals frame wall",
  },
  {
    src: "/images/shop-interior-3.png",
    alt: "Eyewear shelves at Nile Opticals",
  },
]

export function CollectionSection() {
  return (
    <section
      id="products"
      className="overflow-hidden bg-[#F6F1E8] px-6 py-24 text-[#14110D] md:px-12 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid gap-10 border-b border-[#C9A46A]/30 pb-12 lg:mb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
        >
          <div className="max-w-3xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.32em] text-[#8D7148]">
              Curated eyewear edit
            </p>
            <h2 className="font-serif text-4xl leading-[1.02] text-balance md:text-6xl lg:text-7xl">
              Frames chosen like wardrobe pieces.
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="mb-7 text-sm leading-relaxed text-black/52">
              A tighter edit from our shelves: optical, sun, titanium, acetate, and everyday
              computer frames selected for proportion, finish, and wearability.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 bg-[#14110D] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-[#2A2117]"
            >
              View full collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          <div className="grid min-h-[620px] grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[28px] bg-[#1B1712] sm:col-span-2 sm:min-h-[330px]"
            >
              <img
                src={showroomImages[0].src}
                alt={showroomImages[0].alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/8 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#E6C78E]">
                  In-store selection
                </p>
                <p className="max-w-sm font-serif text-3xl leading-tight text-balance">
                  Try the finish, weight, and fit before you decide.
                </p>
              </div>
            </motion.div>

            {showroomImages.slice(1).map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, delay: 0.08 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="min-h-[260px] overflow-hidden rounded-[28px] bg-[#1B1712]"
              >
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>

          <div>
            <div className="mb-8 grid grid-cols-1 border-y border-[#C9A46A]/25 sm:grid-cols-3">
              {notes.map((note) => (
                <div
                  key={note}
                  className="border-b border-[#C9A46A]/25 py-5 text-[10px] uppercase tracking-[0.22em] text-black/42 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  {note}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} {...product} index={i} variant="editorial" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
