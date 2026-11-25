import "@testing-library/jest-dom/vitest"
import { StrictMode, useRef } from "react"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { GovukButton } from "./button"
import { GovukErrorSummary } from "./error-summary"
import { GovukPage } from "./page"

const scrollDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scrollIntoView")

beforeEach(() => {
  document.body.classList.add("js-enabled", "govuk-frontend-supported")
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  if (scrollDescriptor)
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", scrollDescriptor)
  else Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView")
  document.body.classList.remove("js-enabled", "govuk-frontend-supported")
  window.history.replaceState({}, "", "/")
})

function WrapperFixture({ onSubmit }: { onSubmit: () => void }) {
  const summaryRef = useRef<HTMLDivElement>(null)
  return (
    <GovukPage>
      <h1 className="govuk-heading-l">Wrapper test</h1>
      <GovukErrorSummary
        errors={[{ id: "test-name", message: "Enter a name" }]}
        summaryRef={summaryRef}
      />
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <label htmlFor="test-name">Name</label>
        <input id="test-name" name="name" />
        <GovukButton>Continue</GovukButton>
      </form>
    </GovukPage>
  )
}

describe("GOV.UK wrappers", () => {
  it("keeps skip links and error links on their route through StrictMode and remounts", () => {
    window.history.replaceState({}, "", "/?preview=local#/example?from=check")
    const onSubmit = vi.fn()
    const view = render(
      <StrictMode>
        <WrapperFixture onSubmit={onSubmit} />
      </StrictMode>,
    )
    const expectedLocation = window.location.search + window.location.hash

    fireEvent.click(screen.getByRole("link", { name: "Skip to main content" }))
    expect(screen.getByRole("main")).toHaveFocus()
    expect(window.location.search + window.location.hash).toBe(expectedLocation)

    fireEvent.click(screen.getByRole("link", { name: "Enter a name" }))
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus()
    expect(window.location.search + window.location.hash).toBe(expectedLocation)

    view.rerender(
      <StrictMode>
        <WrapperFixture onSubmit={onSubmit} />
      </StrictMode>,
    )
    fireEvent.click(screen.getByRole("button", { name: "Continue" }))
    expect(onSubmit).toHaveBeenCalledTimes(1)

    const oldSkip = screen.getByRole("link", { name: "Skip to main content" })
    view.unmount()
    render(
      <StrictMode>
        <WrapperFixture onSubmit={onSubmit} />
      </StrictMode>,
    )
    expect(screen.getByRole("link", { name: "Skip to main content" })).not.toBe(oldSkip)
    fireEvent.click(screen.getByRole("link", { name: "Enter a name" }))
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus()
    expect(window.location.search + window.location.hash).toBe(expectedLocation)
  })
})
