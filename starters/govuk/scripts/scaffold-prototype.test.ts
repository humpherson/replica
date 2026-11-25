// @vitest-environment node
import { execFileSync } from "node:child_process"
import {
  cpSync,
  copyFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "vite"
import { expect, it } from "vitest"

const root = fileURLToPath(new URL("../", import.meta.url))

it("scaffolds a seeded route that renders within the GOV.UK shell and builds", async () => {
  const project = realpathSync(mkdtempSync(path.join(tmpdir(), "replica-govuk-scaffold-")))
  try {
    for (const directory of ["src", "scripts", "scaffold-templates", "vendor"]) {
      cpSync(path.join(root, directory), path.join(project, directory), {
        recursive: true,
        filter: (source) => !/\.test\.[cm]?[jt]sx?$/.test(source),
      })
    }
    for (const filename of [
      "package.json",
      "index.html",
      "vite.config.ts",
      "vite-aliases.ts",
      "vitest.config.ts",
      "prototype-scaffold.config.mjs",
    ]) {
      copyFileSync(path.join(root, filename), path.join(project, filename))
    }
    symlinkSync(path.join(root, "node_modules"), path.join(project, "node_modules"), "dir")
    execFileSync(
      process.execPath,
      [
        path.join(project, "scripts/scaffold-prototype.mjs"),
        "--slug",
        "example",
        "--name",
        "Example generated page",
        "--description",
        "A generated prototype route",
      ],
      { cwd: project },
    )
    expect(JSON.parse(readFileSync(path.join(project, ".prototype"), "utf8"))).toEqual({
      startPage: "/#/example",
    })
    const seed = path.join(project, "src/data/seeds/example.json")
    writeFileSync(
      seed,
      JSON.stringify({
        title: "Authored example page",
        description: "Content comes from the generated seed",
        items: [
          { id: "test-item", title: "Authored item", summary: "A synthetic item description" },
        ],
      }),
    )
    writeFileSync(
      path.join(project, "src/generated-page.test.tsx"),
      `
import "@testing-library/jest-dom/vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { createMemoryHistory } from "@tanstack/history"
import { RouterProvider } from "@tanstack/react-router"
import { expect, it } from "vitest"
import { createAppRouter } from "./app/router"

it("renders the authored generated route", async () => {
  document.body.classList.add("js-enabled", "govuk-frontend-supported")
  const history = createMemoryHistory({ initialEntries: ["/example"] })
  const router = createAppRouter(history)
  try {
    render(<RouterProvider router={router} />)
    expect(await screen.findByRole("heading", { name: "Authored example page" })).toBeInTheDocument()
    expect(screen.getByText("Content comes from the generated seed")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Authored item" })).toBeInTheDocument()
    expect(screen.getByText("A synthetic item description")).toBeInTheDocument()
    expect(screen.getAllByRole("main")).toHaveLength(1)
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  } finally {
    cleanup()
    history.destroy()
    document.body.classList.remove("js-enabled", "govuk-frontend-supported")
  }
})
`,
    )
    execFileSync(
      process.execPath,
      [path.join(root, "node_modules/vitest/vitest.mjs"), "run", "src/generated-page.test.tsx"],
      {
        cwd: project,
        stdio: "pipe",
        timeout: 30_000,
      },
    )
    await build({ configFile: path.join(project, "vite.config.ts"), logLevel: "silent" })
    expect(existsSync(path.join(project, "dist/index.html"))).toBe(true)
  } finally {
    rmSync(project, { recursive: true, force: true })
  }
}, 45_000)
