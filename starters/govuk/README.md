# GOV.UK

A React, TypeScript and Vite starter with GOV.UK Frontend, TanStack hash routing and active design-system guidance. New projects contain a neutral welcome page and a missing-route fallback. No service journey, form, payment simulation or application storage is included.

## Create a project

From a Replica source checkout or archive containing this starter:

```sh
bash scripts/create-prototype-repo.sh --starter govuk ../my-govuk-prototype
```

This creates an independent repository with an initial local commit on main, no remote and nothing published. The upstream download installer only lists starters present in its downloaded source; local registration does not publish GOV.UK upstream. Start a fresh Copilot session in the created repository so its skills are discovered. Review .github/github-app.yml and REPLICA.md before accepting session setup: startup can install Copilot CLI, configure Replica and run npm ci.

## Run it

Use a Node.js version matching engines.node in [package.json](package.json):

```sh
npm ci
npm run dev
```

Open the URL printed by Vite at /#/. In Copilot, follow [canvas preflight](REPLICA.md#canvas-preflight) first. No Hub, Docker, GitHub repository or model-provider key inside the app is required. Configure your authoring provider in Copilot separately.

## Included integration

The root route supplies the GOV.UK page shell, fonts, assets, width container and single main landmark. Route pages render content inside it. The welcome page is at /; unknown hash routes show Back and Go to start within the same shell. These routes do not read or write application storage.

The exact provider dependency is pinned in package.json and the lockfile. The Vite asset plugin serves its compiled CSS and matching assets during development and emits them into dist for production. CSS asset URLs are deployment-relative. No Sass compiler, token processor or third-party React adapter is included.

Reusable wrappers live under src/app/govuk:

- GovukPage: used once by the root, with optional footerLinks list items and beforeContent.
- GovukButton: an enhanced submit button for future forms.
- GovukErrorSummary: supplied errors and a summaryRef; callers control focus after each failed submission and set/clear the document error title.

Enhancement records successful instances by DOM identity, including StrictMode effect replays and development reloads. The root updates the title and focuses route headings after pathname navigation without overriding query-only form changes. Skip and valid error-summary links preserve the router fragment. The implementation does not add a general lifecycle solution for every GOV.UK component: inspect each selected component's global listeners and DOM mutations before adding it.

## Routes and scaffolding

Use /#/route-name for routes. Other fragments, such as /#contents, represent sections on the root page; a nested section uses /#/route-name#section. Keep src/app/create-prototype-history wired into the router to preserve route queries and section fragments.

For a new route:

```sh
npm run scaffold -- --slug roadmap --name "Roadmap"
```

The scaffolder creates seven files: a JSON seed, loader, route, presentation page, props, CSS module and route adapter. It registers the route and changes .prototype to its start page. Generated content uses GOV.UK classes inside the root-owned shell. / is reserved; existing pages should be edited in place. Collision and partial-target errors are not permission to delete existing work.

Data examples are generated only when a route is scaffolded. They are generic placeholders, not researched service scenarios. Replace them using the current task brief. Keep pure data assembly in loaders and pass typed props into presentation pages.

## Validate changes

```sh
npm run check:starter
```

This runs formatting, type checking, Vitest and the production build. Focused commands are npm run typecheck, npm test, npm run format:check and npm run build. npm run preview builds first, then serves dist. The tests exercise routing, wrappers, asset delivery at root and subpath bases, and a generated route's rendering/build. They do not establish screen-reader, contrast, zoom, forced-colour or cross-browser accessibility.

Use the [shared browser workflow](.agents/skills/browser-canvas-validation/WORKFLOW.md) for rendered verification in the intended project. Keep browser evidence distinct from tests and build success. Inspect both development and built previews when changing asset or deployment behaviour.

## Guidance and attribution

Follow [AGENTS.md](AGENTS.md), [Replica workflows](REPLICA.md) and [setup troubleshooting](SETUP.md). Approved guidance under .agents/context covers the GOV.UK provider and this starter. Generic skills and context templates are supplied by Replica's shared bundle. This app does not bundle Minimal's production-site copying skill.

Official GOV.UK Sass and component contracts are authoritative. Community JSON tokens and supplementary Prototype Kit AI advice are references, not replacements for official values or React app conventions. Service requirements, user research, supported product environments and manual accessibility acceptance remain inputs for each prototype.

GOV.UK Frontend is distributed under the bundled [MIT licence](vendor/govuk-frontend/LICENSE.txt). [Attribution](NOTICE.md) records its pinned upstream source and SHA-256. The asset integration reads this file locally, serves it unchanged at the base-relative govuk/LICENSE.txt URL in development and includes it at dist/govuk/LICENSE.txt in production. Startup and builds fail explicitly if the bundled file cannot be read. No build-time download or licence file in the installed npm package is required. Preserve this distributed notice and any applicable font and asset terms. GOV.UK branding is for appropriate GOV.UK use. This starter displays an explicit prototype disclaimer and makes no claim to be a live government service.
