// @vitest-environment node
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { build, createServer, preview } from "vite"
import { expect, it } from "vitest"

const root = fileURLToPath(new URL("./", import.meta.url))
const licencePath = path.join(root, "vendor/govuk-frontend/LICENSE.txt")

async function checkGovukAssets(origin: string, base: string) {
  const licence = await fetch(`${origin}${base}govuk/LICENSE.txt`)
  expect(licence.status).toBe(200)
  expect(licence.headers.get("content-type")).toContain("text/plain")
  expect(Buffer.from(await licence.arrayBuffer())).toEqual(await readFile(licencePath))
  const html = await (await fetch(`${origin}${base}`)).text()
  expect(html).not.toContain("__replica")
  const hrefs = [...html.matchAll(/<link\b[^>]*href="([^"]+)"/g)].map((match) => match[1])
  const cssHref = hrefs.find((href) => href.endsWith("/govuk-frontend.min.css"))
  expect(cssHref).toBe(`${base}govuk/govuk-frontend.min.css`)
  const cssUrl = new URL(cssHref!, `${origin}${base}`)
  const response = await fetch(cssUrl)
  expect(response.headers.get("content-type")).toContain("text/css")
  const css = await response.text()
  expect(css).toContain('--govuk-frontend-version:"6.6.0"')
  const assetUrls = [...css.matchAll(/url\(([^)]+)\)/g)]
    .map((match) => match[1].replace(/^["']|["']$/g, ""))
    .filter((url) => !url.startsWith("data:"))
  expect(assetUrls.length).toBeGreaterThan(0)
  for (const href of [
    ...hrefs.filter((href) => href !== cssHref),
    ...assetUrls.map((href) => new URL(href, cssUrl).href),
  ]) {
    const asset = await fetch(new URL(href, `${origin}${base}`))
    expect(asset.status).toBe(200)
    expect(asset.headers.get("content-type")).not.toContain("text/html")
  }
  const manifestUrl = `${origin}${base}govuk/assets/manifest.json`
  const manifest = (await (await fetch(manifestUrl)).json()) as { icons: { src: string }[] }
  for (const { src } of manifest.icons) {
    const asset = await fetch(new URL(src, manifestUrl))
    expect(Buffer.from(await asset.arrayBuffer())).toEqual(
      await readFile(path.join(root, "node_modules/govuk-frontend/dist/govuk/assets", src)),
    )
  }
}

it.each(["/", "/integration/"])(
  "serves the app and matching GOV.UK assets in dev and preview at %s",
  async (base) => {
    const outDir = await mkdtemp(path.join(tmpdir(), "replica-starter-build-"))
    const config = {
      configFile: path.join(root, "vite.config.ts"),
      base,
      logLevel: "silent" as const,
      build: { outDir, emptyOutDir: true },
    }
    try {
      const dev = await createServer({ ...config, server: { host: "127.0.0.1", port: 0 } })
      await dev.listen()
      try {
        const address = dev.httpServer?.address()
        if (!address || typeof address === "string") throw new Error("Missing Vite address")
        await checkGovukAssets(`http://127.0.0.1:${address.port}`, base)
      } finally {
        await dev.close()
      }
      await build(config)
      expect(await readFile(path.join(outDir, "govuk/LICENSE.txt"))).toEqual(
        await readFile(licencePath),
      )
      const server = await preview({ ...config, preview: { host: "127.0.0.1", port: 0 } })
      try {
        const address = server.httpServer?.address()
        if (!address || typeof address === "string") throw new Error("Missing Vite address")
        await checkGovukAssets(`http://127.0.0.1:${address.port}`, base)
      } finally {
        await server.close()
      }
    } finally {
      await rm(outDir, { recursive: true, force: true })
    }
  },
  30_000,
)
