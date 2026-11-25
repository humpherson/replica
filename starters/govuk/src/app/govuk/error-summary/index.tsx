import { useLayoutEffect } from "react"
import { enhance } from "../enhance"
import type { ErrorSummaryProps } from "./types"

export function GovukErrorSummary({ errors, summaryRef }: ErrorSummaryProps) {
  useLayoutEffect(() => {
    if (!summaryRef.current) throw new Error("Expected the GOV.UK error summary.")
    enhance(summaryRef.current, "error-summary")
  }, [summaryRef])
  return (
    <div
      ref={summaryRef}
      className="govuk-error-summary"
      data-module="govuk-error-summary"
      tabIndex={-1}
    >
      <div role="alert">
        <h2 className="govuk-error-summary__title">There is a problem</h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            {errors.map(({ id, message }) => (
              <li key={id}>
                <a href={`#${id}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
