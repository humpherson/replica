# Repository

This GOV.UK starter uses React, TypeScript, Vite and TanStack hash routing. Follow [app instructions](../../AGENTS.md), [shared instructions](../../REPLICA-AGENTS.md) and [app guide](../../README.md) as the canonical command and authoring interfaces.

## Application boundaries

The [root route](../../src/app/root-route.tsx) supplies GovukPage around Outlet, with one main landmark. The [router](../../src/app/router.tsx) registers only the welcome route initially. New route pages render content, not a second shell/main. The missing-route presentation is in src/app/not-found-page; its adapter owns Back and Go to start. Presentation components receive typed props and do not import the router.

The [history adapter](../../src/app/create-prototype-history/index.ts) preserves hash-route queries, outer preview queries and section fragments. Keep it wired through createAppRouter. Read [.prototype](../../.prototype) for the current preview start page rather than assuming a route or port. Route transitions update document title and heading focus; query-only changes leave task-controlled focus intact.

The [asset plugin](../../scripts/govuk-assets.ts) serves and emits matching installed provider CSS, fonts, images and manifest. Its production output is under dist/govuk. Dependency declarations and the lockfile determine supported versions; do not infer installed APIs from remembered documentation. No backend, application storage or service rules are provided.

## Authoring

Use the app-owned scaffold interface in [README](../../README.md#routes-and-scaffolding) for new routes. It creates seven files, registers the route and rewrites start-page metadata. It refuses collisions and partial targets; inspect and reconcile an error without deleting user work. Preserve scaffold import/registration markers and generated route metadata. The root shell also wraps generated pages.

Keep loaders responsible for pure seed-to-view-model assembly. Use @app/, @routes/ and @data/ across top-level areas. Reusable wrappers are in src/app/govuk; inspect [design-system guidance](DESIGN-SYSTEM.md) before extending them. Product contracts belong to [PRODUCT-DESIGN](PRODUCT-DESIGN.md), data to [SEED-DATA](SEED-DATA.md), browser targets to [BROWSER-VALIDATION](BROWSER-VALIDATION.md).

## Commands and lifecycle

Read package.json before running commands. npm run check:starter runs format checks, types, tests and build. npm run format rewrites enumerated source/config/templates; npm run preview builds before serving dist. npm ci replaces the installed dependency tree. Existing task authority covers routine implementation and verification; additional dependencies and publishing follow the shared rules.

Use the smallest relevant tests while iterating and complete required checks once the change is coherent. Neither jsdom assertions nor a build establish rendered fidelity or accessibility. Report executed checks separately from declarations and remaining gaps. Preserve unrelated work. A local prototype task does not authorize a remote repository, push, Hub connection or publication.
