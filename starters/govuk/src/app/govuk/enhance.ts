import { Button, ErrorSummary, SkipLink } from "govuk-frontend"

const previousInstances: unknown = import.meta.hot?.data?.govukInstances
const instances: WeakMap<HTMLElement, object> =
  previousInstances instanceof WeakMap ? previousInstances : new WeakMap()
if (import.meta.hot?.data) import.meta.hot.data.govukInstances = instances

export function enhance(element: HTMLElement, kind: "button" | "error-summary" | "skip-link") {
  if (instances.has(element)) return
  const instance =
    kind === "button"
      ? new Button(element)
      : kind === "skip-link"
        ? new SkipLink(element)
        : new ErrorSummary(element, { disableAutoFocus: true })
  // Only successful construction is cached. Provider exceptions remain visible.
  instances.set(element, instance)
}
