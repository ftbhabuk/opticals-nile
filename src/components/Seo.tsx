import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import type { Product } from "@/src/data/products"

interface SeoProps {
  title: string
  description: string
  canonicalPath?: string
  ogImage?: string
  ogType?: "website" | "article"
  jsonLd?: object | object[]
}

const SITE_NAME = "Nile Opticals"
const DEFAULT_OG_IMAGE = "/og-default.png"

function getSiteUrl(): string {
  return import.meta.env.VITE_SITE_URL || "http://localhost:5173"
}

function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "")
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function Seo({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
}: SeoProps) {
  const location = useLocation()
  const canonical = canonicalPath ? absoluteUrl(canonicalPath) : absoluteUrl(location.pathname)
  const fullOgImage = absoluteUrl(ogImage)
  const fullTitle = `${title} | ${SITE_NAME}`

  const structuredData = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((item) => ({
        "@context": "https://schema.org",
        ...item,
      }))
    : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={fullOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData) }}
        />
      )}
    </Helmet>
  )
}

export function LocalBusinessJsonLd() {
  const url = getSiteUrl()
  return {
    "@type": "Optician",
    "@id": `${url}#organization`,
    name: "Nile Opticals",
    description: "Premium eyewear boutique and optical clinic on Newroad, Pokhara. Prescription eyeglasses, designer sunglasses, contact lenses, and comprehensive eye exams.",
    url,
    telephone: "+977-61-520-XXXX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pokhara 9, Newroad, 18th Street, Purnima Marga",
      addressLocality: "Pokhara",
      addressRegion: "Gandaki Province",
      postalCode: "33700",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.2096,
      longitude: 83.9856,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/nileopticals",
      "https://www.facebook.com/nileopticals",
    ],
    priceRange: "₨3,900 - ₨9,500",
    currenciesAccepted: "NPR",
    paymentAccepted: "Cash, Credit Card, UPI, Mobile Banking",
  }
}

export function ProductJsonLd(products: Product[]) {
  return {
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${getSiteUrl()}/shop#${product.id}`,
        name: product.name,
        description: `${product.category} frames in ${product.material}, ${product.fit}.`,
        image: [product.image, product.hoverImage].map((img) => (img.startsWith("http") ? img : getSiteUrl() + img)),
        sku: product.id,
        brand: {
          "@type": "Brand",
          name: "Nile Opticals",
        },
        offers: {
          "@type": "Offer",
          url: `${getSiteUrl()}/shop#${product.id}`,
          priceCurrency: "NPR",
          price: product.price.toString(),
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "Nile Opticals",
          },
        },
        category: product.category,
      },
    })),
  }
}