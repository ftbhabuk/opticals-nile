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
    image:
      "https://images.unsplash.com/photo-1764737707504-f1ce82f76a16?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1752486268262-6ce6b339a8de?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Prescription",
    material: "Italian acetate",
    fit: "Medium fit",
    badge: "Signature",
  },
{
    id: "aviator-sun",
    name: "Gold Aviator Sun",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1589642380614-4a8c2147b857?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://images.unsplash.com/photo-1552958791-a034dec52705?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Sunglasses",
    material: "Brushed metal",
    fit: "Adjustable pads",
  },
  {
    id: "titanium-wire",
    name: "Titanium Wireframe",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1606357100116-f787c70ea04f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://plus.unsplash.com/premium_photo-1669704098858-8cd103f4ac2e?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Lightweight",
    material: "Titanium alloy",
    fit: "Featherweight",
    badge: "Lightest",
  },
  {
    id: "blue-light",
    name: "Blue-Cut Optical",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1661525244755-3dc7926c347a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://plus.unsplash.com/premium_photo-1661319147577-fe52598a037a?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Computer",
    material: "TR-flex frame",
    fit: "All-day comfort",
  },
  {
    id: "tortoise-statement",
    name: "Tortoise Statement",
    price: 9500,
    image:
      "https://thefoschini.vtexassets.com/arquivos/ids/221456937-1200-1600?v=638968942656930000&width=1200&height=1600&aspect=true",
    hoverImage:
      "https://www.net-a-porter.com/variants/images/1647597334165801/ou/w2000_q60.jpg",
    category: "Fashion",
    material: "Layered acetate",
    fit: "Bold profile",
    badge: "Editorial",
  },
  {
    id: "polarized-outdoor",
    name: "Polarized Outdoor",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1606196480588-43eaeb825006?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hoverImage:
      "https://plus.unsplash.com/premium_photo-1752192844608-9e4be077452d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
