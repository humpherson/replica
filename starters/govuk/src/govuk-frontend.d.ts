declare module "govuk-frontend" {
  export class Button {
    constructor(element: HTMLElement)
  }
  export class SkipLink {
    constructor(element: HTMLElement)
  }
  export class ErrorSummary {
    constructor(element: HTMLElement, config?: { disableAutoFocus?: boolean })
  }
}
