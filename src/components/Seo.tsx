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
const DEFAULT_OG_IMAGE = "/images/og-image.png"

function getSiteUrl(): string {
  // Check process.env first (Node.js/prerender), then import.meta.env (browser/Vite)
  return (typeof process !== 'undefined' && process.env?.VITE_SITE_URL) || import.meta.env?.VITE_SITE_URL || "http://localhost:5173"
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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

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
    description: "Premium designer eyewear boutique on New Road, Pokhara. Luxury frames and sunglasses from Prada, Gucci, Burberry, and more.",
    url,
    logo: `${url}/logo.svg`,
    image: `${url}/images/og-image.png`,
    telephone: "+977-984-674-3043",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Kumari Bank Ltd., New Road, Pokhara 33700",
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

export function BreadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${getSiteUrl()}${item.href}`,
    })),
  }
}

export function FaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function WebSiteJsonLd() {
  return {
    "@type": "WebSite",
    name: "Nile Opticals",
    url: getSiteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${getSiteUrl()}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}