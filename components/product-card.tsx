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

type Variant = "light" | "dark"

const THEME: Record<Variant, {
  placeholder: string
  reticle: string
  hairline: string
  eyebrow: string
  eyebrowFont: string
  name: string
  price: string
  rounded: string
}> = {
  light: {
    placeholder: "bg-black/[0.03]",
    reticle: "border-black/30",
    hairline: "border-black/[0.08]",
    eyebrow: "text-black/35",
    eyebrowFont: "font-sans",
    name: "text-[#111]",
    price: "text-black/45",
    rounded: "rounded-xl",
  },
  dark: {
    placeholder: "bg-[#EAE4D6]/10",
    reticle: "border-[#B8935B]",
    hairline: "border-[#B8935B]/25",
    eyebrow: "text-[#B8935B]/80",
    eyebrowFont: "font-mono",
    name: "text-[#EAE4D6]",
    price: "text-[#EAE4D6]/60",
    rounded: "",
  },
}

export function ProductCard({
  name,
  price,
  image,
  category,
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
        <div className={`relative aspect-[4/5] overflow-hidden ${t.rounded} ${t.placeholder}`}>
          <img
            src={image}
            alt={name}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
              isHovered ? "blur-0 saturate-100 scale-100" : "blur-[3px] saturate-[0.85] scale-[1.04]"
            }`}
            loading="lazy"
          />

          <span className={`pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 border-l-2 border-t-2 ${t.reticle} transition-all duration-500 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
          <span className={`pointer-events-none absolute right-3.5 top-3.5 h-5 w-5 border-r-2 border-t-2 ${t.reticle} transition-all duration-500 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
          <span className={`pointer-events-none absolute left-3.5 bottom-3.5 h-5 w-5 border-l-2 border-b-2 ${t.reticle} transition-all duration-500 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
          <span className={`pointer-events-none absolute right-3.5 bottom-3.5 h-5 w-5 border-r-2 border-b-2 ${t.reticle} transition-all duration-500 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
        </div>

        <div className={`mt-5 pt-5 border-t ${t.hairline}`}>
          <p className={`${t.eyebrowFont} text-[11px] tracking-[0.22em] uppercase ${t.eyebrow} mb-2`}>
            {variant === "dark" ? "No. " : ""}
            {String(index + 1).padStart(2, "0")} — {category}
          </p>
          <div className="flex items-start justify-between gap-4">
            <h3 className={`font-serif text-lg lg:text-xl ${t.name}`}>{name}</h3>
            <p className={`text-sm ${t.price} shrink-0 pt-0.5`}>
              Rs.&nbsp;{price.toLocaleString("en-NP")}
            </p>
          </div>
        </div>
      </article>
    </motion.div>
  )
}