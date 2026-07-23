import { useState } from "react"
import { motion } from "framer-motion"
import type { Product } from "@/src/data/products"

export type { Product }

type Variant = "light" | "dark" | "editorial"

const THEME: Record<Variant, {
  placeholder: string
  hairline: string
  eyebrow: string
  name: string
  price: string
  rounded: string
  badge: string
  meta: string
}> = {
  light: {
    placeholder: "bg-[#F4F0E8]",
    hairline: "border-black/[0.08]",
    eyebrow: "text-black/40",
    name: "text-[#111]",
    price: "text-black/55",
    rounded: "rounded-lg",
    badge: "bg-white/85 text-black/60 ring-black/[0.06]",
    meta: "text-black/38",
  },
  dark: {
    placeholder: "bg-[#191714]",
    hairline: "border-white/12",
    eyebrow: "text-white/45",
    name: "text-white",
    price: "text-white/58",
    rounded: "rounded-lg",
    badge: "bg-[#C9A46A]/95 text-[#17120C] ring-white/10",
    meta: "text-white/38",
  },
  editorial: {
    placeholder: "bg-[#F2EEE6]",
    hairline: "border-[#C9A46A]/30",
    eyebrow: "text-[#8D7148]",
    name: "text-[#111]",
    price: "text-black/45",
    rounded: "rounded-lg",
    badge: "bg-[#18130D] text-white ring-black/10",
    meta: "text-black/36",
  },
}

export function ProductCard({
  name,
  price,
  image,
  category,
  material,
  fit,
  badge,
  index = 0,
  variant = "light",
}: Product & { index?: number; variant?: Variant }) {
  const [isHovered, setIsHovered] = useState(false)
  const t = THEME[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <article
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`relative aspect-[4/5] overflow-hidden border ${
            variant === "dark" ? "border-white/10" : "border-black/[0.06]"
          } ${t.rounded} ${t.placeholder}`}
        >
          <img
            src={image}
            alt={name}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {badge ? (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] ring-1 ${t.badge}`}
            >
              {badge}
            </span>
          ) : null}
          <span
            className={`absolute bottom-4 left-4 right-4 translate-y-2 border-t pt-3 text-[10px] uppercase tracking-[0.2em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 ${
              variant === "dark" ? "border-white/25 text-white/75" : "border-white/50 text-white"
            }`}
          >
            Fitted in-store
          </span>
        </div>

        <div className={`mt-5 border-t ${t.hairline} pt-5`}>
          <p className={`mb-2 text-[10px] uppercase tracking-[0.24em] ${t.eyebrow}`}>
            {String(index + 1).padStart(2, "0")} — {category}
          </p>
          <div className="flex min-h-14 items-start justify-between gap-4">
            <h3 className={`font-serif text-xl leading-tight ${t.name}`}>{name}</h3>
            <p className={`shrink-0 pt-1 text-sm ${t.price}`}>
              Rs.&nbsp;{price.toLocaleString("en-NP")}
            </p>
          </div>
          <div className={`mt-4 flex items-center justify-between gap-4 text-xs ${t.meta}`}>
            <span>{material}</span>
            <span>{fit}</span>
          </div>
        </div>
      </article>
    </motion.div>
  )
}
