import { readFileSync, readdirSync } from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import type { Plugin } from "vite"

const require = createRequire(import.meta.url)
const packageRoot = path.dirname(require.resolve("govuk-frontend/package.json"))
const govukRoot = path.join(packageRoot, "dist/govuk")

export function govukAssets(): Plugin {
  const assets = path.join(govukRoot, "assets")
  const files = new Map<string, Buffer>()
  const licencePath = fileURLToPath(
    new URL("../vendor/govuk-frontend/LICENSE.txt", import.meta.url),
  )
  try {
    files.set("govuk/LICENSE.txt", readFileSync(licencePath))
  } catch (cause) {
    throw new Error(`Cannot read the bundled GOV.UK Frontend licence: ${licencePath}`, {
      cause,
    })
  }
  for (const entry of readdirSync(assets, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue
    const filename = path.join(entry.parentPath, entry.name)
    files.set(
      `govuk/assets/${path.relative(assets, filename).split(path.sep).join("/")}`,
      readFileSync(filename),
    )
  }
  // Keep the pinned CSS intact apart from making its asset URLs deployment-relative.
  files.set(
    "govuk/govuk-frontend.min.css",
    Buffer.from(
      readFileSync(path.join(govukRoot, "govuk-frontend.min.css"), "utf8")
        .replaceAll("/assets/", "./assets/")
        .replace(/\/\*# sourceMappingURL=.*?\*\//g, ""),
    ),
  )
  let base = "/"
  return {
    name: "govuk-assets",
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml() {
      return [
        {
          tag: "link",
          attrs: { rel: "stylesheet", href: `${base}govuk/govuk-frontend.min.css` },
          injectTo: "head",
        },
        ...[
          { rel: "icon", sizes: "48x48", href: "images/favicon.ico" },
          { rel: "icon", sizes: "any", type: "image/svg+xml", href: "images/favicon.svg" },
          { rel: "mask-icon", color: "#1d70b8", href: "images/govuk-icon-mask.svg" },
          { rel: "apple-touch-icon", href: "images/govuk-icon-180.png" },
          { rel: "manifest", href: "manifest.json" },
        ].map((attrs) => ({
          tag: "link",
          attrs: { ...attrs, href: `${base}govuk/assets/${attrs.href}` },
          injectTo: "head" as const,
        })),
      ]
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url ?? "/", "http://localhost").pathname
        const prefix = base.startsWith("/") ? base : "/"
        const filename = pathname.startsWith(prefix)
          ? pathname.slice(prefix.length)
          : pathname.slice(1)
        const content = files.get(filename)
        if (!content) return next()
        const contentTypes: Record<string, string> = {
          ".css": "text/css",
          ".txt": "text/plain; charset=utf-8",
          ".json": "application/manifest+json",
          ".svg": "image/svg+xml",
          ".png": "image/png",
          ".ico": "image/x-icon",
          ".woff": "font/woff",
          ".woff2": "font/woff2",
        }
        res.setHeader(
          "Content-Type",
          contentTypes[path.extname(filename)] ?? "application/octet-stream",
        )
        res.end(content)
      })
    },
    generateBundle() {
      for (const [fileName, source] of files) {
        this.emitFile({ type: "asset", fileName, source })
      }
    },
  }
}
