import { Link, useRouter } from "@tanstack/react-router"

import { NotFoundPage } from "../not-found-page"

export function NotFoundRoutePage() {
  const router = useRouter()

  return (
    <NotFoundPage
      onBack={() => router.history.back()}
      startLink={
        <Link className="govuk-link" to="/">
          Go to start
        </Link>
      }
    />
  )
}
