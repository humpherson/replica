import type { NotFoundPageProps } from "./types"

export function NotFoundPage({ onBack, startLink }: NotFoundPageProps) {
  return (
    <>
      <h1 className="govuk-heading-l">This page isn't built in the prototype yet</h1>
      <p className="govuk-body">Go back or return to the start of this prototype.</p>
      <div className="govuk-button-group">
        <button type="button" className="govuk-button" onClick={onBack}>
          Back
        </button>
        {startLink}
      </div>
    </>
  )
}
