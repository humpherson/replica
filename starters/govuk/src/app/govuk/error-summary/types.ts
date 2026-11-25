import type { RefObject } from "react"

export type ErrorSummaryProps = {
  errors: { id: string; message: string }[]
  summaryRef: RefObject<HTMLDivElement | null>
}
