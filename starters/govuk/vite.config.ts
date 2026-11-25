import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { viteAliases } from "./vite-aliases.ts"
import { govukAssets } from "./scripts/govuk-assets.ts"

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root,
  plugins: [react(), govukAssets()],
  resolve: { alias: viteAliases },
})
