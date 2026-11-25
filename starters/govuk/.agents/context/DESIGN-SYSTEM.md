# GOV.UK design system

Authority: **GOV.UK Frontend 6.6.0**, standard GOV.UK theme. Websites are rolling, so verify changed APIs against the installed pin and [v6.6.0 source](https://github.com/alphagov/govuk-frontend/tree/v6.6.0/packages/govuk-frontend/src/govuk). The [release](https://github.com/alphagov/govuk-frontend/releases/tag/v6.6.0) identifies commit `24bde7283766754254275ff27d09e78ff2bfa85d`.

## Scope and task selection

This owns provider components, composition, tokens, focus contracts and evidence. Product tasks/policies belong in [PRODUCT-DESIGN.md](./PRODUCT-DESIGN.md), local wrapper locations and commands in [REPOSITORY.md](./REPOSITORY.md), product viewport requirements in [RESPONSIVE-DESIGN.md](./RESPONSIVE-DESIGN.md), acceptance environments/manual evidence in [ACCESSIBILITY.md](./ACCESSIBILITY.md), and preview operation in [BROWSER-VALIDATION.md](./BROWSER-VALIDATION.md).

Read the applicable complete topic before normal selection/composition as well as troubleshooting; these are not failure-only references:

| When the task concerns | Read |
| --- | --- |
| First integration, imports/assets, JS enhancement, mounting or route changes | [Integration and lifecycle](./topics/DESIGN-SYSTEM/integration.md) |
| Fields, labels, legends, choices, validation or form submission | [Forms](./topics/DESIGN-SYSTEM/forms.md) |
| Links, actions, navigation, tabs, details or accordions | [Navigation and disclosure](./topics/DESIGN-SYSTEM/navigation-and-disclosure.md) |
| Notices, pending/empty/error states, confirmation, tables, charts or images | [Feedback and data](./topics/DESIGN-SYSTEM/feedback-and-data.md) |
| Styling, spacing/type/colour decisions, custom CSS or token references | [Tokens](./topics/DESIGN-SYSTEM/tokens.md) |

Inspect current entry points, styles, assets and wrappers before changing integration; package installation alone does not establish a working GOV.UK interface. This document describes provider contracts, not completed UI or passing checks. The root already supplies the page shell and main landmark. Keep React/Vite/TanStack hash routing. Use the existing small local React wrappers preserving official HTML; no third-party adapter, Nunjucks or Express. Check the current toolchain before Sass work. New dependencies need separate approval; routine work within an authorized task does not need setup reapproval.

## Common composition rules

Use official component **HTML examples**, not macro options as imagined React props. Preserve native elements, IDs, classes, relationships, `data-module`, documented data attributes and enhancement markup. JSX translates `class` to `className` and `for` to `htmlFor`; it does not generate labels, errors or ARIA associations automatically. Keep IDs unique across mounted content. Use native semantic HTML for the documented markup; a styled div is not an input/button.

Prefer the documented component and existing override classes. For small modifications, retain the base class and add an `app-`-prefixed modifier. Avoid global overrides of `govuk-*` selectors or editing installed source. A large structural/user-need change is not a small modifier: official guidance describes a fully renamed fork, with ongoing maintenance and accessibility responsibility. This is not approval to create one. See [extending and modifying](https://design-system.service.gov.uk/get-started/extending-and-modifying-components/).

Icons are not a required general UI language. Official [images guidance](https://design-system.service.gov.uk/styles/images/) says to avoid them in most cases; repeat-use caseworking may justify them, usually with a visible label. Preserve the supplied component SVG semantics, such as the start button's decorative `aria-hidden="true" focusable="false"` icon. Do not add an external-link icon.

## Page shell, layout and hierarchy

Follow the [page template](https://design-system.service.gov.uk/styles/page-template/) and [layout guidance](https://design-system.service.gov.uk/styles/layout/):

- HTML `lang`, viewport metadata, `govuk-template` on html,
  `govuk-template__body` on body; header/footer and page metadata belong to the
  shell, not duplicated inside each React route.
- Include a skip link to main content before navigation, after a cookie banner
  if one exists. Do not wrap the skip link in nav or the header. The provider
  explicitly exempts it from “not inside a landmark” audit warnings; this is
  not a general landmark exemption.
- `govuk-width-container` owns horizontal width/margins; it does not provide
  vertical spacing. Put back link/breadcrumbs before main, inside this container.
  `main.govuk-main-wrapper` supplies responsive vertical padding. Without
  before-content components use `govuk-main-wrapper--auto-spacing`, or `--l`
  if auto-spacing does not work for the service.
- Start with one column on small screens. Use `govuk-grid-row` with
  `govuk-grid-column-*` children, not tables for layout. The provider recommends
  two-thirds main content, with an optional one-third secondary column, to
  constrain readable line length (usually no more than 75 characters). Other
  documented widths exist for content needing them; product hierarchy is not
  determined by a grid class.
- Standard grid fractions apply from tablet; `*-from-desktop` variants defer
  the split. Do not force a narrow two-column layout or visual order different
  from reading order. Button groups use `govuk-button-group`, not ad hoc gaps.
- **Version qualification:** live layout prose says 1020px maximum page width.
  Pinned Sass and compiled CSS set the content container to **960px**;
  1020px is the viewport width at which its 30px side gutters fit and it centres.
  Use the pinned classes, not an extra 1020px content-width override.

There is no evidenced provider React Stack/Grid responsive-prop API. Use the documented HTML classes and responsive spacing utilities, retaining component defaults rather than imposing a new density mode. Provider breakpoints are not the product's viewport/support matrix.

Use semantic headings separately from their visual classes. For question pages or long headings use h1 with `govuk-heading-l`, then h2 `govuk-heading-m`, h3 `govuk-heading-s`; long-form content can start h1 `govuk-heading-xl`. Do not pick heading levels solely for size. Rare documented hierarchy exceptions, such as notification-banner composition, need accessibility testing rather than a universal “never any exception” rule. Use sentence case. A caption may sit inside the h1 if it is part of the heading's meaning. Single-question labels/legends have distinct valid nesting; see Forms.

Use `govuk-body` (19px) for most body copy, `govuk-body-s` (16px) sparingly, and one `govuk-body-l` lead paragraph when needed. See [headings](https://design-system.service.gov.uk/styles/headings/) and [paragraphs](https://design-system.service.gov.uk/styles/paragraphs/).

## Shared accessibility and focus contract

“Using the GOV.UK Design System in a service does not immediately make that service accessible” ([official accessibility guidance](https://design-system.service.gov.uk/accessibility/)). Preserve names, roles, states, keyboard operation and native semantics; check changed compositions in the actual app. A package install, token match or build is not accessibility evidence.

- Retain yellow **and black** focus treatment, transparent outlines and
  component target areas. Focus styles differ for text, boxes and form inputs;
  a generic yellow ring is not an equivalent replacement. Do not remove focus
  indicators or clip them with overflow.
- Preserve label activation areas and component sizing, including small-control
  variants' documented context. Actual target-size/spacing, narrow reflow and
  contrast need rendered checks; no minimum-pixel claim here certifies a target.
- Error summary takes focus on initialisation; an alert notification banner also
  does unless configured otherwise. A neutral region banner does not. Avoid
  competing route-heading and component auto-focus effects.
- JS initialisation does **not** implement general SPA route focus management.
  Hash links, skip links, tabs and history need coordination with this router.
  No provider modal focus trap, Escape/return-focus API or full destroy API has
  been established. Do not assume one from a component name.
- Current radio/checkbox detail pages explicitly disclose conditional-reveal
  announcements failing WCAG 4.1.2. The accessibility statement, last updated
  December 2024, also lists details/voice-control and file-upload concerns.
  Its general compliance statement is not a v6.6.0 React integration audit;
  retain specific warnings rather than declaring all component use compliant.

Sources: [focus states](https://design-system.service.gov.uk/get-started/focus-states/), [accessibility statement](https://design-system.service.gov.uk/accessibility-statement/), [radios](https://design-system.service.gov.uk/components/radios/), [checkboxes](https://design-system.service.gov.uk/components/checkboxes/). Acceptance environments and manual procedures remain owned by ACCESSIBILITY.md.

## Evidence and style validation

No design-system MCP or CLI was selected. Do not infer a tool integration or research authority from another project or a previous authoring run. Use the named official web detail pages, HTML examples and exact installed `node_modules/govuk-frontend` API/Sass source. Trace exports to definitions; do not repeatedly read a catalogue instead of the relevant component contract. Read current usage/research notes, compare markup and JS to 6.6.0, and disclose any difference. If a required source cannot be retrieved, mark that decision unverified; independent supported work can continue. Do not silently substitute community guidance, another package version, tools or installations.

No token/style validator is selected. The evidenced Sass API rejects unknown colours, variants and functional-role names during compilation, but this is not a complete CSS/token linter or rendered-contrast validator. When changed styles require that API, check existing tooling and obtain approval for any new dependency before installation. Existing application commands belong in REPOSITORY.md. With precompiled CSS, compare changed markup, classes and styles to the pinned source, then perform relevant rendered focus, contrast, narrow and interaction checks; report unchecked aspects honestly.

The community JSON is **not** an authoritative importable token package: syntax/alias/value checks found material v6 mismatches and no DTCG validation. The Tokens topic gives the concrete differences and applicable API. Supplementary [MoJ AI context at f82ba77](https://github.com/ministryofjustice/prototype-kit-ai-context/blob/f82ba77bdc3bb9b832010d1c1be927c8064c003b/ai-context.md) supports some basic labels/content/semantics advice when confirmed by official docs. Do not adopt its Kit/macros/framework rules, blanket compliance, ban on all custom CSS, rigid button wording or sample service promises as app instructions.

## Common unknowns and limits

Product sources were explicitly skipped: no service, journey, permissions, business rules, support/viewport matrix or service-specific research is selected. Provider research is not that evidence. Official [get-started guidance](https://design-system.service.gov.uk/get-started/) warns that discussion ideas may be untested; component detail research limitations still matter when code is available.

React wrappers, StrictMode/remount lifetime, cleanup, hash/history/anchor behavior, CSS/assets deployment and route focus require implementation-specific evidence. Do not infer that later integration resolves these limitations without checking. Async status, empty/partial-failure and dialog/menu behavior have no selected complete provider recipe; charts have guidance but no selected library. No additional themes, token processor, automatic DTCG conformance or app accessibility pass is implied. Resolve applicable gaps before claiming the affected experience ready.
