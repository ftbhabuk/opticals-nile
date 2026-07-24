import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { HelmetProvider } from "react-helmet-async"
import { StaticRouter } from "react-router"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, "../dist")
const siteUrl = process.env.VITE_SITE_URL || "https://nileopticals.com"

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8")

interface RouteConfig {
  path: string
  componentPath: string
  outFile: string
}

const routes: RouteConfig[] = [
  { path: "/", componentPath: "@/src/App", outFile: "index.html" },
  { path: "/shop", componentPath: "@/src/pages/shop", outFile: "shop/index.html" },
  { path: "/journey", componentPath: "@/src/pages/journey", outFile: "journey/index.html" },
]

function injectIntoTemplate(template: string, bodyHtml: string, helmet: any): string {
  const headTags =
    (helmet?.title?.toString() || "") +
    (helmet?.meta?.toString() || "") +
    (helmet?.link?.toString() || "") +
    (helmet?.script?.toString() || "") +
    (helmet?.noscript?.toString() || "")

  let html = template
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
    .replace("</head>", `${headTags}</head>`)

  return html
}

async function prerenderRoute(route: RouteConfig) {
  console.log(`🔄 Prerendering ${route.path}...`)

  const module = await import(route.componentPath)
  const Component = module.default

  const helmetContext: any = {}

  const app = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={route.path}>
        <Component />
      </StaticRouter>
    </HelmetProvider>
  )

  const bodyHtml = renderToStaticMarkup(app)
  const helmet = helmetContext.helmet

  const html = injectIntoTemplate(template, bodyHtml, helmet)

  const outDir = path.join(distDir, path.dirname(route.outFile))
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const outPath = path.join(distDir, route.outFile)
  fs.writeFileSync(outPath, html)

  console.log(`  ✅ Written to ${route.outFile} (${html.length} chars)`)

  const hasContent = html.includes("Nile Opticals") || html.includes("Nile Collection") || html.includes("Your Journey")
  if (!hasContent) {
    console.log("  ⚠️  Warning: Prerendered HTML may be empty (no expected content found)")
  }
}

async function main() {
  console.log("🚀 Starting ReactDOMServer prerender...")
  console.log(`📁 Output directory: ${distDir}`)
  console.log(`🌐 Site URL: ${siteUrl}`)

  for (const route of routes) {
    await prerenderRoute(route)
  }

  console.log("🎉 Prerendering complete!")
}

main().catch((err) => {
  console.error("❌ Prerendering failed:", err)
  process.exit(1)
})