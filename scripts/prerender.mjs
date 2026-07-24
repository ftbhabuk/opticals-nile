import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { spawn } from "child_process"
import puppeteer from "puppeteer"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, "../dist")
const previewPort = 4173
const baseUrl = `http://localhost:${previewPort}`

const routes = [
  { path: "/", outDir: distDir },
  { path: "/shop", outDir: path.join(distDir, "shop") },
  { path: "/journey", outDir: path.join(distDir, "journey") },
]

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function serveDist() {
  return new Promise((resolve, reject) => {
    const server = spawn("npx", ["vite", "preview", "--port", String(previewPort), "--host", "0.0.0.0"], {
      cwd: path.resolve(__dirname, ".."),
      stdio: "ignore",
      detached: true,
    })

    server.unref()

    setTimeout(() => resolve(server), 3000)
  })
}

async function prerenderRoute(page, route, outDir) {
  const url = `${baseUrl}${route.path}`
  console.log(`🔄 Prerendering ${url}...`)

  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 })

  await page.waitForSelector("#root", { timeout: 15000 })

  await sleep(2000)

  const html = await page.content()

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  fs.writeFileSync(path.join(outDir, "index.html"), html)
  console.log(`  ✅ Written to ${path.relative(distDir, outDir)}/index.html (${html.length} chars)`)

  const hasContent = html.includes("Nile Opticals") || html.includes("Nile Collection") || html.includes("Your Journey")
  if (!hasContent) {
    console.log("  ⚠️  Warning: Prerendered HTML may be empty (no expected content found)")
  }
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error("❌ dist/ directory not found. Run 'npm run build' first.")
    process.exit(1)
  }

  console.log("🚀 Starting prerender process...")
  console.log(`📁 Output directory: ${distDir}`)

  let server
  let browser
  try {
    server = await serveDist()
    console.log(`🌐 Preview server started on ${baseUrl}`)
    await sleep(2000)

    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 720 })
    await page.setUserAgent("Mozilla/5.0 (compatible; NileOpticalsBot/1.0; +https://nileopticals.com)")

    for (const route of routes) {
      await prerenderRoute(page, route, route.outDir)
    }

    await browser.close()
    console.log("🎉 Prerendering complete!")
  } catch (error) {
    console.error("❌ Prerendering failed:", error)
    process.exit(1)
  } finally {
    if (server) {
      server.kill()
      console.log("🛑 Preview server stopped")
    }
    if (browser && browser.connected) {
      await browser.close()
    }
  }
}

main()