# Integration and lifecycle

Read for imports, first integration, wrappers, enhancement, route changes or mounting problems. These are provider contracts and implementation constraints, not a claim that every GOV.UK component supports React. Common authority and gaps remain in [DESIGN-SYSTEM.md](../../DESIGN-SYSTEM.md).

## CSS, assets and supported imports

The exact installed package's `package.json` resolves its root ES-module import to `dist/govuk/all.mjs`; that barrel re-exports definitions from `components/` and `init.mjs`. Supported examples:

```js
import { Button, ErrorSummary, createAll, initAll } from "govuk-frontend"
```

These are DOM-enhancing classes/functions, **not JSX components**. HTML-only components such as input/label/fieldset, details, table and breadcrumbs do not need invented JavaScript exports. Use the [official HTML examples](https://design-system.service.gov.uk/components/); macro names/parameters are not React APIs.

Without adding Sass, serve/copy `node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css` and include it once in the document head, using the actual deployed stylesheet URL. Serve/copy the matching `dist/govuk/assets/images`, `assets/fonts` and `assets/manifest.json`; the supplied CSS expects `/assets/` URLs. Do not assume a development node_modules URL works in the built preview or a subpath deployment. Fonts, icons, manifest and CSS URLs require integration verification together. The official Express asset-serving example does not apply to this Vite app.

If Sass is needed, check current tooling and obtain approval for any new dependency before installation. Use the 6.6.0 `@use` API, not deprecated deep component `_<name>.scss` imports. The documented full entry is `@use "node_modules/govuk-frontend/dist/govuk" as *`; `.../base` exposes the API without all component CSS. Resolve the import path for the actual build. Configure asset paths through documented Sass settings if needed, not a community theme or speculative token processor.

Sources: [CSS](https://frontend.design-system.service.gov.uk/include-css/), [assets](https://frontend.design-system.service.gov.uk/import-font-and-images-assets/), [pinned package](https://github.com/alphagov/govuk-frontend/blob/v6.6.0/packages/govuk-frontend/package.json).

## Enhancement timing and scope

Follow [Import JavaScript](https://frontend.design-system.service.gov.uk/import-javascript/): the bundle must run as a module, and before enhancement the body needs the official support setup:

```html
<script>
  document.body.className += ' js-enabled' + ('noModule' in HTMLScriptElement.prototype ? ' govuk-frontend-supported' : '');
</script>
```

This is the documented body snippet, not permission to weaken a CSP. If blocked, follow the guide's hash/nonce guidance under the application's security policy. The support class alone does not prove the CSS or component JS loaded.

Initialise **after** the relevant HTML is committed and styles needed for breakpoint detection are available. Library-call examples, not React hooks:

```js
initAll({
  scope: container,
  onError(error, context) {
    // Route to the application's deliberate error handling.
    console.error(error, context)
  },
})

// Alternatively select only the required component:
const instances = createAll(Button, undefined, { scope: container })

// For a component root itself:
const summary = new ErrorSummary(summaryElement)
```

Choose one initialisation owner, not both wrapper constructors and an overlapping global initAll. `container` must be a real Element/Document; null is an error. `createAll` searches **descendants** with the matching data-module, excluding its scope root. `initAll` delegates to those searches and returns no instance collection. `createAll` returns successful instances and reports errors through onError or console. Imports/constructors can require browser globals; do not treat them as server-render-safe React imports.

Data attributes on the component root override constructor config. They are read on initialisation; later changing an attribute is not a reactive update API. Keep the supported markup/config in sync when a route changes. See [configuration](https://frontend.design-system.service.gov.uk/configure-components/) and [pinned init source](https://github.com/alphagov/govuk-frontend/blob/v6.6.0/packages/govuk-frontend/src/govuk/init.mjs).

## Repeated initialisation, StrictMode and unmount

Pinned [Component](https://github.com/alphagov/govuk-frontend/blob/v6.6.0/packages/govuk-frontend/src/govuk/component.mjs) sets `data-<moduleName>-init` (for example `data-govuk-button-init`) and throws InitError on repeat construction. `initAll`/`createAll` do not silently skip already initialised descendants. The marker is set before subclass setup finishes, so it is not proof that setup succeeded.

Consequences for the user's small-wrapper approach:

- Track successful initialisation by actual DOM identity; a React effect running
  again on the same node must not construct another instance. Do not put an
  unconditional initAll on every render, hashchange or StrictMode effect setup.
- A simple “has marker” check avoids a duplicate call but cannot distinguish
  partial failure. Surface the original error and repair the markup/lifecycle;
  do not remove the marker and retry blindly on mutated DOM.
- Provider code mutates DOM: accordion inserts controls/replaces headings;
  radios/checkboxes rewrite data attributes; tabs add ARIA and hide panels.
  Wrappers must establish which subtree/attributes React owns. Re-rendering
  children/config beneath a retained instance is not verified safe.
- No general `destroy`, `dispose` or instance-registry API was found in 6.6.0.
  Dropping refs/removing DOM does not prove disposal: global listeners can retain
  instances. Never invent an effect cleanup calling `instance.destroy()`.
- Source-inspected long-lived listeners include media-query changes (Tabs and
  ServiceNavigation), window pageshow (Radios, Checkboxes, CharacterCount,
  PasswordInput and ExitThisPage), document beforematch (Accordion), and document
  drag listeners (enhanced FileUpload). Button also has a debounce timer.
- Tabs `teardown()` reverses desktop-tab mode and removes some handlers; it is
  **not** a complete unmount API. Its media-query callback remains registered.

A wrapper implementation must account for the selected component's actual lifetime, mounted DOM changes and cleanup limitations before route-local enhancement is treated as supported. Persistent-shell placement can avoid some remounts but is not a universal fix for route-local components. Verify relevant StrictMode, listener/memory, HMR and repeated-navigation behavior for the actual implementation; static contracts are not evidence that those checks passed.

## Hash router and focus coordination

Keep TanStack hash routing; installing GOV.UK does not resolve shared fragment use.

| Provider behavior | Integration implication |
| --- | --- |
| Tabs writes `window.location.hash = panelId` and listens to hashchange | Competes directly with route hash. Do not enable unchanged tabs and claim router compatibility; an explicit coordination design within the authorized task and back/forward tests are required. Any custom replacement still follows repository approval rules. |
| SkipLink sets focus but does not prevent native anchor navigation | `href="#main-content"` can replace the route hash. Coordinate skip behavior without losing its focus/scroll/accessibility semantics. |
| ErrorSummary intercepts valid target links, scrolls label/legend and focuses input | Ensure target and associated labels/legends exist after rendering; missing targets can fall through to native fragment navigation. |
| Accordion IDs key session-expanded state across the domain | IDs must not collide across routes/scenarios. Session persistence here is provider disclosure state, not saved application answers. |
| Summary and alert banner auto-focus on construction | Route effects must not immediately overwrite their focus. Reusing an instance does not automatically refocus on a later validation attempt. |

Also check ordinary in-page anchors and history entries, not only Tabs. Actual destinations, route title/focus orchestration and local wrapper locations belong to the route/app conventions in REPOSITORY.md; do not adopt Nunjucks/Express.

Before affected work is ready, verify cold load, client route entry, return, back/forward, repeated error submission, keyboard operation, narrow breakpoint changes and non-enhanced content. Report lifecycle or hash incompatibility as a specific blocker, not as an accessibility pass from having called initAll.

Source: installed 6.6.0 modules traced from all.mjs, especially [Tabs](https://github.com/alphagov/govuk-frontend/blob/v6.6.0/packages/govuk-frontend/src/govuk/components/tabs/tabs.mjs), [SkipLink](https://github.com/alphagov/govuk-frontend/blob/v6.6.0/packages/govuk-frontend/src/govuk/components/skip-link/skip-link.mjs) and [ErrorSummary](https://github.com/alphagov/govuk-frontend/blob/v6.6.0/packages/govuk-frontend/src/govuk/components/error-summary/error-summary.mjs).

## This starter's implementation

The root route owns GovukPage and the only main landmark. Child pages provide content only. The asset plugin in scripts/govuk-assets.ts serves and emits the installed CSS/assets, rewriting stylesheet asset paths to deployment-relative URLs. See [app guide](../../../../README.md#included-integration).

Existing wrappers enhance only Button, SkipLink and ErrorSummary through a DOM-identity WeakMap. SkipLink prevents native fragment navigation while retaining provider focus. ErrorSummary disables provider auto-focus so callers can coordinate repeated validation focus and title updates. Root navigation focus applies to pathname changes, not query-only updates. Reuse these behaviours without overlapping initAll. Other components' global listeners and mutation lifetimes still need a task-specific design and evidence.
