import { useEffect, useRef } from "react"
import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router"

import { GovukPage } from "./govuk/page"
import { NotFoundRoutePage } from "./not-found-route-page"

function RootRoutePage() {
  const { pathname, status } = useRouterState({
    select: (state) => ({ pathname: state.location.pathname, status: state.status }),
  })
  const previousPath = useRef<string | null>(null)
  useEffect(() => {
    if (status !== "idle" || previousPath.current === pathname) return
    const isNavigation = previousPath.current !== null
    previousPath.current = pathname
    const heading = document.querySelector<HTMLElement>("main h1")
    if (!heading) throw new Error("Expected the rendered route's main heading.")
    document.title = `${heading.textContent} - GOV.UK prototype`
    // Route changes move focus; initial loads and query-only updates keep it.
    if (isNavigation) {
      heading.tabIndex = -1
      heading.focus()
    }
  }, [pathname, status])
  return (
    <GovukPage>
      <Outlet />
    </GovukPage>
  )
}

export const rootRoute = createRootRoute({
  component: RootRoutePage,
  notFoundComponent: NotFoundRoutePage,
})
