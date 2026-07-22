import { useInView } from "@/hooks/use-in-view"

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
  const { ref, inView } = useInView(0.12)
  const delay = index * 80

  return (
    <article
      ref={ref}
      className="group"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-black/[0.03] mb-5">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
          loading="lazy"
        />
        <img
          src={hoverImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          loading="lazy"
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.18em] uppercase text-black/35 mb-1.5">
            {category}
          </p>
          <h3 className="text-base font-light tracking-tight text-black/90">
            {name}
          </h3>
        </div>
        <p className="text-sm text-black/45 shrink-0 pt-0.5">
          From Rs.&nbsp;{price.toLocaleString("en-NP")}
        </p>
      </div>
    </article>
  )
}
