import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { featuredProducts } from "@/src/data/products"
import type { Product } from "@/src/data/products"

const testImages: Record<string, { image: string; hoverImage: string }> = {
  "classic-acetate": {
    image:
      "https://images.unsplash.com/photo-1752486268262-6ce6b339a8de?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1764737707504-f1ce82f76a16?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  "aviator-sun": {
    image:
      "https://images.unsplash.com/photo-1552958791-a034dec52705?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  "titanium-wire": {
    image:
      "https://plus.unsplash.com/premium_photo-1669704098858-8cd103f4ac2e?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1606357100116-f787c70ea04f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  "blue-light": {
    image:
      "https://plus.unsplash.com/premium_photo-1661319147577-fe52598a037a?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1661525244755-3dc7926c347a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  "tortoise-statement": {
    image:
      "https://www.net-a-porter.com/variants/images/1647597334165801/ou/w2000_q60.jpg",
    hoverImage:
      "https://thefoschini.vtexassets.com/arquivos/ids/221456937-1200-1600?v=638968942656930000&width=1200&height=1600&aspect=true",
  },
  "polarized-outdoor": {
    image:
      "https://plus.unsplash.com/premium_photo-1752192844608-9e4be077452d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1606196480588-43eaeb825006?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
}

const p: (Product & { testImage: string; testHover: string })[] = featuredProducts.map((product) => ({
  ...product,
  testImage: testImages[product.id]?.image ?? product.image,
  testHover: testImages[product.id]?.hoverImage ?? product.hoverImage,
}))

const spring = { type: "spring" as const, stiffness: 120, damping: 22, mass: 0.8 }
const smooth = [0.16, 1, 0.3, 1] as const

export function CollectionSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll-driven active index detection.
    // Finds the [data-index] item closest to viewport center on each scroll.
    // Uses document listener + rAF throttling for cross-browser reliability
    // (Chromium and Firefox both confirmed working).
    //
    // If this breaks: check that [data-index] attributes are intact on product
    // divs, and that scrollRef targets the correct container. The sticky image
    // column depends on p[activeIndex] — verify AnimatePresence key matches.
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const el = scrollRef.current
        if (!el) return
        const items = el.querySelectorAll<HTMLElement>("[data-index]")
        const mid = window.innerHeight / 2
        let closest = 0
        let minDist = Infinity
        items.forEach((item) => {
          const rect = item.getBoundingClientRect()
          const itemMid = rect.top + rect.height / 2
          const dist = Math.abs(itemMid - mid)
          if (dist < minDist) {
            minDist = dist
            closest = Number(item.getAttribute("data-index"))
          }
        })
        setActiveIndex(closest)
        ticking = false
      })
    }
    document.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => document.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <section className="bg-[#F6F1E8] px-6 pb-8 pt-24 text-[#14110D] md:px-12 lg:px-20 lg:pb-4 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-10 border-b border-[#C9A46A]/30 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
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
        </div>
      </section>

      <section id="products" className="hidden bg-[#F6F1E8] lg:block">
  <div className="flex">
    <div ref={scrollRef} className="w-[42%] px-6 pl-16 pr-10 xl:pl-20 xl:pr-12">
            <div className="h-[15vh]" />

            {p.map((product, i) => {
              const isActive = i === activeIndex
              return (
                <div
                  key={product.id}
                  data-index={i}
                  className="flex min-h-[65vh] items-center border-t border-[#C9A46A]/15 py-10 last:border-b"
                >
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.2,
                      x: isActive ? 0 : -16,
                    }}
                    transition={{ ...spring, stiffness: isActive ? 140 : 100 }}
                    className="w-full"
                  >
                    <AnimatePresence mode="popLayout">
                      {isActive && (
                        <motion.div
                          key="bar"
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 48, opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: smooth }}
                          className="mb-5 h-px bg-[#C9A46A]"
                        />
                      )}
                    </AnimatePresence>
                    <p
                      className={`mb-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-500 ${
                        isActive ? "text-[#C9A46A]" : "text-[#8D7148]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} — {product.category}
                    </p>
                    <motion.h3
                      layout
                      animate={{
                        fontSize: isActive ? "2.25rem" : "1.75rem",
                      }}
                      transition={spring}
                      className={`font-serif leading-tight text-balance transition-colors duration-500 ${
                        isActive ? "text-[#14110D]" : "text-[#14110D]/50"
                      }`}
                    >
                      {product.name}
                    </motion.h3>
                    <motion.p
                      animate={{ opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 mt-4 text-sm text-black/45"
                    >
                      Rs.&nbsp;{product.price.toLocaleString("en-NP")}
                    </motion.p>
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0.2 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-black/42"
                    >
                      <span>{product.material}</span>
                      <span className="text-[#C9A46A]/50">|</span>
                      <span>{product.fit}</span>
                    </motion.div>
                  </motion.div>
                </div>
              )
            })}

            <div className="h-[15vh]" />
          </div>

          <div className="sticky top-0 flex h-screen w-[58%] items-center justify-center px-10 xl:px-16">
            <div className="relative w-full max-w-lg">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={p[activeIndex].id}
                  initial={{ opacity: 0, scale: 0.9, rotateZ: -2 }}
                  animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateZ: 2 }}
                  transition={{ ...spring, stiffness: 140, damping: 26 }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-[28px] shadow-2xl">
                    <motion.img
                      key={`main-${p[activeIndex].id}`}
                      src={p[activeIndex].testImage}
                      alt={p[activeIndex].name}
                      className="w-full object-cover aspect-[4/5]"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: smooth }}
                    />
                    <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-black/6" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ ...spring, delay: 0.15, stiffness: 130 }}
                    className="absolute -bottom-4 -right-4 w-[55%] overflow-hidden rounded-2xl shadow-2xl"
                  >
                    <div className="relative overflow-hidden rounded-2xl">
                      <motion.img
                        key={`hover-${p[activeIndex].id}`}
                        src={p[activeIndex].testHover}
                        alt={p[activeIndex].name}
                        className="w-full object-cover aspect-[3/4]"
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, ease: smooth }}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/6" />
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -left-8 top-1/2 -translate-y-1/2"
              >
                <p className="text-[10px] uppercase tracking-[0.32em] text-[#C9A46A] [writing-mode:vertical-rl]">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(p.length).padStart(2, "0")}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F1E8] px-6 pb-24 text-[#14110D] md:px-12 lg:hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} {...product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
