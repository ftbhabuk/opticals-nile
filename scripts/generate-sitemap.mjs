import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, "../dist")
const siteUrl = process.env.VITE_SITE_URL

if (!siteUrl) {
  console.error("❌ VITE_SITE_URL environment variable is required")
  console.error("   Set it in Vercel project settings or run: VITE_SITE_URL=https://yourdomain.com npm run build")
  process.exit(1)
}

const baseUrl = siteUrl.replace(/\/$/, "")

const routes = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/shop", changefreq: "daily", priority: 0.9 },
  { path: "/journey", changefreq: "monthly", priority: 0.8 },
]

function generateSitemap() {
  const today = new Date().toISOString().split("T")[0]

  const urlEntries = routes
    .map((route) => {
      const url = `${baseUrl}${route.path}`
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    })
    .join("\n")

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap)
  console.log("✅ Generated dist/sitemap.xml")
  console.log(`   URLs: ${routes.length} (${routes.map((r) => r.path).join(", ")})`)
}

function generateRobots() {
  const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`

  fs.writeFileSync(path.join(distDir, "robots.txt"), robots)
  console.log("✅ Generated dist/robots.txt")
}

generateSitemap()
generateRobots()