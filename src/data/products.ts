export type Product = {
  id: string
  name: string
  price: number
  image: string
  hoverImage: string
  category: string
  material: string
  fit: string
  badge?: string
}

export const products: Product[] = [
  {
    id: "classic-acetate",
    name: "Classic Acetate",
    price: 4500,
    image: "/images/products/classic-acetate-main.jpg",
    hoverImage: "/images/products/classic-acetate-hover.jpg",
    category: "Prescription",
    material: "Italian acetate",
    fit: "Medium fit",
    badge: "Signature",
  },
{
    id: "aviator-sun",
    name: "Gold Aviator Sun",
    price: 6200,
    image: "/images/products/aviator-sun-main.jpg",
    hoverImage: "/images/products/aviator-sun-hover.jpg",
    category: "Sunglasses",
    material: "Brushed metal",
    fit: "Adjustable pads",
  },
  {
    id: "titanium-wire",
    name: "Titanium Wireframe",
    price: 7800,
    image: "/images/products/titanium-wire-main.jpg",
    hoverImage: "/images/products/titanium-wire-hover.jpg",
    category: "Lightweight",
    material: "Titanium alloy",
    fit: "Featherweight",
    badge: "Lightest",
  },
  {
    id: "blue-light",
    name: "Blue-Cut Optical",
    price: 3900,
    image: "/images/products/blue-light-main.jpg",
    hoverImage: "/images/products/blue-light-hover.jpg",
    category: "Computer",
    material: "TR-flex frame",
    fit: "All-day comfort",
  },
  {
    id: "tortoise-statement",
    name: "Tortoise Statement",
    price: 9500,
    image: "/images/products/tortoise-statement-main.jpg",
    hoverImage: "/images/products/tortoise-statement-hover.jpg",
    category: "Fashion",
    material: "Layered acetate",
    fit: "Bold profile",
    badge: "Editorial",
  },
  {
    id: "polarized-outdoor",
    name: "Polarized Outdoor",
    price: 5500,
    image: "/images/products/polarized-outdoor-main.jpg",
    hoverImage: "/images/products/polarized-outdoor-hover.jpg",
    category: "Sport",
    material: "Polarized lenses",
    fit: "Secure grip",
  },
  {
    id: "retro-round",
    name: "Retro Round",
    price: 4100,
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?q=80&w=1000&auto=format&fit=crop",
    category: "Vintage",
    material: "Mixed acetate",
    fit: "Soft round",
  },
  {
    id: "slim-metal",
    name: "Slim Metal",
    price: 5300,
    image:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    category: "Minimal",
    material: "Fine metal",
    fit: "Low-profile",
  },
  {
    id: "cat-eye",
    name: "Cat-Eye Statement",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop",
    category: "Fashion",
    material: "Sculpted acetate",
    fit: "Lifted silhouette",
  },
  {
    id: "clip-on",
    name: "Clip-On Sun",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1625591339971-4c9a87a66871?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=1000&auto=format&fit=crop",
    category: "Convertible",
    material: "Magnetic clip",
    fit: "Two-in-one",
  },
  {
    id: "kids-safe",
    name: "Kids Safe",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000&auto=format&fit=crop",
    category: "Children",
    material: "Flexible polymer",
    fit: "Durable comfort",
  },
  {
    id: "premium-acetate",
    name: "Premium Acetate",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1000&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1711564354334-ee51baa830c2?q=80&w=1000&auto=format&fit=crop",
    category: "Premium",
    material: "Hand-finished acetate",
    fit: "Boutique fit",
    badge: "Premium",
  },
]

export const featuredProducts = products.slice(0, 6)

export const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))]
