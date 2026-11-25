import { useLayoutEffect, useRef } from "react"
import { enhance } from "../enhance"
import { GovukLogo } from "../logo"
import type { GovukPageProps } from "./types"

export function GovukPage({ children, footerLinks, beforeContent }: GovukPageProps) {
  const skipRef = useRef<HTMLAnchorElement>(null)
  useLayoutEffect(() => {
    if (!skipRef.current) throw new Error("Expected the GOV.UK skip link.")
    enhance(skipRef.current, "skip-link")
  }, [])
  return (
    <>
      <a
        ref={skipRef}
        href="#main-content"
        className="govuk-skip-link"
        data-module="govuk-skip-link"
        onClick={(event) => event.preventDefault()}
      >
        Skip to main content
      </a>
      <header className="govuk-template__header">
        <div className="govuk-header">
          <div className="govuk-header__container govuk-width-container">
            <div className="govuk-header__logo">
              <a className="govuk-header__homepage-link" href="https://www.gov.uk/">
                <GovukLogo />
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="govuk-width-container">
        {beforeContent}
        <main
          id="main-content"
          className={`govuk-main-wrapper${beforeContent ? "" : " govuk-main-wrapper--auto-spacing"}`}
        >
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">{children}</div>
          </div>
        </main>
      </div>
      <footer className="govuk-template__footer">
        <div className="govuk-footer">
          <div className="govuk-width-container">
            <GovukLogo crownOnly />
            <div className="govuk-footer__meta">
              <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
                {footerLinks && <ul className="govuk-footer__inline-list">{footerLinks}</ul>}
                <span className="govuk-footer__licence-description">
                  GOV.UK Frontend is available under the{" "}
                  <a
                    className="govuk-footer__link"
                    href="https://github.com/alphagov/govuk-frontend/blob/v6.6.0/LICENSE.txt"
                  >
                    MIT licence
                  </a>
                  . This is a prototype, not a government service.
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
