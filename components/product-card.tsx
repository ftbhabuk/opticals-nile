import { useState } from "react"
import { motion } from "framer-motion"

export type Product = {
  id: string
  name: string
  price: number
  image: string
  hoverImage: string
  category: string
}

export function ProductCard({
  name,
  price,
  image,
  hoverImage,
  category,
  index = 0,
}: Product & { index?: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <article
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-5">
          <img
            src={image}
            alt={name}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]"
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
              {category}
            </p>
            <h3 className="font-serif text-lg">
              {name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground shrink-0 pt-0.5">
            From Rs.&nbsp;{price.toLocaleString("en-NP")}
          </p>
        </div>
      </article>
    </motion.div>
  )
}
