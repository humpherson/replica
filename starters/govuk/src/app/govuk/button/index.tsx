import { useLayoutEffect, useRef } from "react"
import { enhance } from "../enhance"
import type { ButtonProps } from "./types"

export function GovukButton({ children }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => {
    if (!ref.current) throw new Error("Expected the GOV.UK button.")
    enhance(ref.current, "button")
  }, [])
  return (
    <button ref={ref} type="submit" className="govuk-button" data-module="govuk-button">
      {children}
    </button>
  )
}
