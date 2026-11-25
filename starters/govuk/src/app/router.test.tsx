import "@testing-library/jest-dom/vitest"
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { createMemoryHistory } from "@tanstack/history"
import { RouterProvider } from "@tanstack/react-router"
import { afterEach, beforeEach, describe, expect, it } from "vitest"

import { createAppRouter } from "./router"

const histories: ReturnType<typeof createMemoryHistory>[] = []

beforeEach(() => {
  document.body.classList.add("js-enabled", "govuk-frontend-supported")
})

afterEach(() => {
  cleanup()
  for (const history of histories.splice(0)) history.destroy()
  document.body.classList.remove("js-enabled", "govuk-frontend-supported")
})

function openRoute(path: string) {
  const history = createMemoryHistory({ initialEntries: [path] })
  histories.push(history)
  const router = createAppRouter(history)
  render(<RouterProvider router={router} />)
  return router
}

describe("GOV.UK starter routes", () => {
  it("opens a neutral welcome page with one main and no application form", async () => {
    openRoute("/")

    expect(
      await screen.findByRole("heading", { name: "GOV.UK prototype starter" }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("main")).toHaveLength(1)
    expect(screen.getByRole("banner")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
      "href",
      "#main-content",
    )
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: /submit|pay|continue|check answers/i }),
    ).not.toBeInTheDocument()
  })

  it.each(["/about", "/activity", "/fishing-licence", "/missing"])(
    "treats %s as an unavailable route and offers a return to the welcome page",
    async (path) => {
      openRoute(path)

      expect(
        await screen.findByRole("heading", { name: /page.*(not|isn't|couldn't)/i }),
      ).toBeInTheDocument()
      expect(screen.getAllByRole("main")).toHaveLength(1)
      expect(screen.getByRole("banner")).toBeInTheDocument()
      expect(screen.getByRole("contentinfo")).toBeInTheDocument()
      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument()

      fireEvent.click(screen.getByRole("link", { name: "Go to start" }))
      expect(
        await screen.findByRole("heading", { name: "GOV.UK prototype starter" }),
      ).toBeInTheDocument()
    },
  )

  it("returns from an unavailable route with Back", async () => {
    const router = openRoute("/")
    await screen.findByRole("heading", { name: "GOV.UK prototype starter" })

    await act(async () => router.navigate({ href: "/missing" }))
    await screen.findByRole("heading", { name: /page.*(not|isn't|couldn't)/i })
    fireEvent.click(screen.getByRole("button", { name: "Back" }))

    expect(await screen.findByRole("heading", { name: "GOV.UK prototype starter" })).toHaveFocus()
  })
})
