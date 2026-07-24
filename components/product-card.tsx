import { motion } from "framer-motion"
import type { Product } from "@/src/data/products"

export type { Product }

type Variant = "light" | "dark" | "editorial"

const ROUNDED = "rounded-2xl"

const THEME: Record<Variant, {
  placeholder: string
  border: string
  hairline: string
  eyebrow: string
  name: string
  price: string
  badge: string
  meta: string
  labelBorder: string
  labelText: string
}> = {
  light: {
    placeholder: "bg-[#F4F0E8]",
    border: "border-black/[0.06]",
    hairline: "border-black/[0.08]",
    eyebrow: "text-black/40",
    name: "text-[#111]",
    price: "text-black/55",
    badge: "bg-white/85 text-black/60 ring-black/[0.06]",
    meta: "text-black/38",
    labelBorder: "border-white/50",
    labelText: "text-white",
  },
  dark: {
    placeholder: "bg-[#191714]",
    border: "border-white/10",
    hairline: "border-white/12",
    eyebrow: "text-white/45",
    name: "text-white",
    price: "text-white/58",
    badge: "bg-[#C9A46A]/95 text-[#17120C] ring-white/10",
    meta: "text-white/38",
    labelBorder: "border-white/25",
    labelText: "text-white/75",
  },
  editorial: {
    placeholder: "bg-[#F2EEE6]",
    border: "border-[#C9A46A]/20",
    hairline: "border-[#C9A46A]/30",
    eyebrow: "text-[#8D7148]",
    name: "text-[#111]",
    price: "text-black/45",
    badge: "bg-[#18130D] text-white ring-black/10",
    meta: "text-black/36",
    labelBorder: "border-white/50",
    labelText: "text-white",
  },
}

export function ProductCard({
  name,
  price,
  image,
  hoverImage,
  category,
  material,
  fit,
  badge,
  index = 0,
  variant = "light",
}: Product & { index?: number; variant?: Variant }) {
  const t = THEME[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <article className="group block">
        <div className={`relative aspect-[4/5] overflow-hidden border ${t.border} ${ROUNDED} ${t.placeholder}`}>
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
            loading="lazy"
          />
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
            loading="lazy"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {badge ? (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] ring-1 ${t.badge}`}
            >
              {badge}
            </span>
          ) : null}

          <span
            className={`pointer-events-none absolute bottom-4 left-4 right-4 translate-y-2 border-t pt-3 text-[10px] uppercase tracking-[0.2em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 ${t.labelBorder} ${t.labelText}`}
          >
            Fitted in-store
          </span>
        </div>

        <div className={`mt-5 border-t ${t.hairline} pt-5`}>
          <p className={`mb-2 text-[10px] uppercase tracking-[0.28em] ${t.eyebrow}`}>
            {String(index + 1).padStart(2, "0")} — {category}
          </p>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className={`min-w-0 truncate font-serif text-xl leading-tight ${t.name}`}>
              {name}
            </h3>
            <p className={`shrink-0 text-sm ${t.price}`}>
              Rs.&nbsp;{price.toLocaleString("en-NP")}
            </p>
          </div>
          <div className={`mt-4 flex items-center justify-between gap-4 text-xs ${t.meta}`}>
            <span className="min-w-0 truncate">{material}</span>
            <span className="shrink-0">{fit}</span>
          </div>
        </div>
      </article>
    </motion.div>
  )
}