// @vitest-environment node
import { readFileSync } from "node:fs"
import { expect, it, vi } from "vitest"

import { govukAssets } from "./govuk-assets"

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>()
  return { ...actual, readFileSync: vi.fn(actual.readFileSync) }
})

it("refuses to provide assets when the bundled licence is missing", () => {
  vi.mocked(readFileSync).mockImplementationOnce(() => {
    throw new Error("ENOENT: no such file or directory")
  })

  expect(() => govukAssets()).toThrow(
    /Cannot read the bundled GOV.UK Frontend licence: .*vendor[/\\]govuk-frontend[/\\]LICENSE\.txt/,
  )
})
